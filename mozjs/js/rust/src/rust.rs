/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

//! Rust wrappers around the raw JS apis

use ac::AutoCompartment;
use libc::c_uint;
use heapsize::HeapSizeOf;
use std::char;
use std::ffi;
use std::ptr;
use std::slice;
use std::mem;
use std::u32;
use std::default::Default;
use std::ops::{Deref, DerefMut};
use std::thread;
use jsapi::root::*;
use jsval;
use glue::{CreateAutoObjectVector, CreateCallArgsFromVp, AppendToAutoObjectVector, DeleteAutoObjectVector, IsDebugBuild};
use glue::{CreateAutoIdVector, SliceAutoIdVector, DestroyAutoIdVector};
use glue::{NewCompileOptions, DeleteCompileOptions};

const DEFAULT_HEAPSIZE: u32 = 32_u32 * 1024_u32 * 1024_u32;

// From Gecko:
// Our "default" stack is what we use in configurations where we don't have a compelling reason to
// do things differently. This is effectively 1MB on 64-bit platforms.
const STACK_QUOTA: usize = 128 * 8 * 1024;

// From Gecko:
// The JS engine permits us to set different stack limits for system code,
// trusted script, and untrusted script. We have tests that ensure that
// we can always execute 10 "heavy" (eval+with) stack frames deeper in
// privileged code. Our stack sizes vary greatly in different configurations,
// so satisfying those tests requires some care. Manual measurements of the
// number of heavy stack frames achievable gives us the following rough data,
// ordered by the effective categories in which they are grouped in the
// JS_SetNativeStackQuota call (which predates this analysis).
//
// (NB: These numbers may have drifted recently - see bug 938429)
// OSX 64-bit Debug: 7MB stack, 636 stack frames => ~11.3k per stack frame
// OSX64 Opt: 7MB stack, 2440 stack frames => ~3k per stack frame
//
// Linux 32-bit Debug: 2MB stack, 426 stack frames => ~4.8k per stack frame
// Linux 64-bit Debug: 4MB stack, 455 stack frames => ~9.0k per stack frame
//
// Windows (Opt+Debug): 900K stack, 235 stack frames => ~3.4k per stack frame
//
// Linux 32-bit Opt: 1MB stack, 272 stack frames => ~3.8k per stack frame
// Linux 64-bit Opt: 2MB stack, 316 stack frames => ~6.5k per stack frame
//
// We tune the trusted/untrusted quotas for each configuration to achieve our
// invariants while attempting to minimize overhead. In contrast, our buffer
// between system code and trusted script is a very unscientific 10k.
const SYSTEM_CODE_BUFFER: usize = 10 * 1024;

// Gecko's value on 64-bit.
const TRUSTED_SCRIPT_BUFFER: usize = 8 * 12800;

trait ToResult {
    fn to_result(self) -> Result<(), ()>;
}

impl ToResult for bool {
    fn to_result(self) -> Result<(), ()> {
        if self {
            Ok(())
        } else {
            Err(())
        }
    }
}

// ___________________________________________________________________________
// friendly Rustic API to runtimes

/// A wrapper for the `JSContext` structure in SpiderMonkey.
pub struct Runtime {
    cx: *mut JSContext,
}

impl Runtime {
    /// Creates a new `JSContext`.
    pub fn new() -> Runtime {
        use std::cell::UnsafeCell;
        use std::sync::{Once, ONCE_INIT};
        use std::sync::atomic::{AtomicPtr, Ordering};

        unsafe {
            #[derive(Debug)]
            struct Parent(UnsafeCell<*mut JSContext>);
            unsafe impl ::std::marker::Sync for Parent {}

            impl Parent {
                fn set(&self, val: *mut JSContext) {
                    assert!(self.get().is_null());
                    self.as_atomic().store(val, Ordering::SeqCst);
                    assert_eq!(self.get(), val);
                }

                fn get(&self) -> *mut JSContext {
                    self.as_atomic().load(Ordering::SeqCst)
                }

                fn as_atomic(&self) -> &AtomicPtr<JSContext> {
                    unsafe {
                        mem::transmute(&self.0)
                    }
                }
            }

            static PARENT: Parent = Parent(UnsafeCell::new(0 as *mut _));
            static ONCE: Once = ONCE_INIT;

            ONCE.call_once(|| {
                // There is a 1:1 relationship between threads and JSContexts,
                // so we must spawn a new thread for the parent context.
                let _ = thread::spawn(move || {
                    let is_debug_mozjs = cfg!(feature = "debugmozjs");
                    let diagnostic = JS::detail::InitWithFailureDiagnostic(is_debug_mozjs);
                    if !diagnostic.is_null() {
                        panic!("JS::detail::InitWithFailureDiagnostic failed: {}",
                               ffi::CStr::from_ptr(diagnostic).to_string_lossy());
                    }

                    let context = JS_NewContext(
                        DEFAULT_HEAPSIZE, ChunkSize as u32, ptr::null_mut());
                    assert!(!context.is_null());
                    JS::InitSelfHostedCode(context);
                    PARENT.set(context);

                    loop {
                        thread::sleep(::std::time::Duration::new(::std::u64::MAX, 0));
                    }
                });

                while PARENT.get().is_null() {
                    thread::yield_now();
                }
            });

            assert_eq!(IsDebugBuild(), cfg!(feature = "debugmozjs"));

            let js_context = JS_NewContext(DEFAULT_HEAPSIZE,
                                           ChunkSize as u32,
                                           JS_GetParentRuntime(PARENT.get()));
            assert!(!js_context.is_null());

            // Unconstrain the runtime's threshold on nominal heap size, to avoid
            // triggering GC too often if operating continuously near an arbitrary
            // finite threshold. This leaves the maximum-JS_malloc-bytes threshold
            // still in effect to cause periodical, and we hope hygienic,
            // last-ditch GCs from within the GC's allocator.
            JS_SetGCParameter(
                js_context, JSGCParamKey::JSGC_MAX_BYTES, u32::MAX);

            JS_SetNativeStackQuota(
                js_context,
                STACK_QUOTA,
                STACK_QUOTA - SYSTEM_CODE_BUFFER,
                STACK_QUOTA - SYSTEM_CODE_BUFFER - TRUSTED_SCRIPT_BUFFER);

            JS::InitSelfHostedCode(js_context);

            let opts = JS::ContextOptionsRef(js_context);
            (*opts).set_baseline_(true);
            (*opts).set_ion_(true);
            (*opts).set_nativeRegExp_(true);

            JS::SetWarningReporter(js_context, Some(report_warning));

            JS_BeginRequest(js_context);

            Runtime {
                cx: js_context,
            }
        }
    }

    /// Returns the underlying `JSContext` object.
    pub fn cx(&self) -> *mut JSContext {
        self.cx
    }

    pub fn evaluate_script(&self, glob: JS::HandleObject, script: &str, filename: &str,
                           line_num: u32, rval: JS::MutableHandleValue)
                    -> Result<(),()> {
        let script_utf16: Vec<u16> = script.encode_utf16().collect();
        let filename_cstr = ffi::CString::new(filename.as_bytes()).unwrap();
        debug!("Evaluating script from {} with content {}", filename, script);
        // SpiderMonkey does not approve of null pointers.
        let (ptr, len) = if script_utf16.len() == 0 {
            static empty: &'static [u16] = &[];
            (empty.as_ptr(), 0)
        } else {
            (script_utf16.as_ptr(), script_utf16.len() as c_uint)
        };
        assert!(!ptr.is_null());
        unsafe {
            let _ac = AutoCompartment::with_obj(self.cx(), glob.get());
            let options = CompileOptionsWrapper::new(self.cx(), filename_cstr.as_ptr(), line_num);

            if !JS::Evaluate2(self.cx(), options.ptr, ptr as *const u16, len as _, rval) {
                debug!("...err!");
                Err(())
            } else {
                // we could return the script result but then we'd have
                // to root it and so forth and, really, who cares?
                debug!("...ok!");
                Ok(())
            }
        }
    }
}

impl Drop for Runtime {
    fn drop(&mut self) {
        unsafe {
            JS_EndRequest(self.cx);
            JS_DestroyContext(self.cx);
        }
    }
}

// This is measured through `glue::CollectServoSizes`.
impl HeapSizeOf for Runtime {
    fn heap_size_of_children(&self) -> usize {
        0
    }
}

// ___________________________________________________________________________
// Rooting API for standard JS things

pub trait RootKind {
    #[inline(always)]
    fn rootKind() -> JS::RootKind;
}

impl RootKind for *mut JSObject {
    #[inline(always)]
    fn rootKind() -> JS::RootKind { JS::RootKind::Object }
}

impl RootKind for *mut JSFlatString {
    #[inline(always)]
    fn rootKind() -> JS::RootKind { JS::RootKind::String }
}

impl RootKind for *mut JSFunction {
    #[inline(always)]
    fn rootKind() -> JS::RootKind { JS::RootKind::Object }
}

impl RootKind for *mut JSString {
    #[inline(always)]
    fn rootKind() -> JS::RootKind { JS::RootKind::String }
}

impl RootKind for *mut JS::Symbol {
    #[inline(always)]
    fn rootKind() -> JS::RootKind { JS::RootKind::Symbol }
}

impl RootKind for *mut JSScript {
    #[inline(always)]
    fn rootKind() -> JS::RootKind { JS::RootKind::Script }
}

impl RootKind for jsid {
    #[inline(always)]
    fn rootKind() -> JS::RootKind { JS::RootKind::Id }
}

impl RootKind for JS::Value {
    #[inline(always)]
    fn rootKind() -> JS::RootKind { JS::RootKind::Value }
}

impl<T> JS::Rooted<T> {
    pub fn new_unrooted(initial: T) -> JS::Rooted<T> {
        JS::Rooted {
            stack: ptr::null_mut(),
            prev: ptr::null_mut(),
            ptr: initial,
        }
    }

    unsafe fn get_rooting_context(cx: *mut JSContext) -> *mut JS::RootingContext {
        mem::transmute(cx)
    }

    unsafe fn get_root_stack(cx: *mut JSContext)
                             -> *mut *mut JS::Rooted<*mut ::std::os::raw::c_void>
        where T: RootKind
    {
        let kind = T::rootKind() as usize;
        let rooting_cx = Self::get_rooting_context(cx);
        &mut rooting_cx.as_mut().unwrap().stackRoots_[kind] as *mut _ as *mut _
    }

    pub unsafe fn register_with_root_lists(&mut self, cx: *mut JSContext)
        where T: RootKind
    {
        self.stack = Self::get_root_stack(cx);
        let stack = self.stack.as_mut().unwrap();
        self.prev = *stack as *mut _;

        *stack = self as *mut _ as usize as _;
    }

    pub unsafe fn remove_from_root_stack(&mut self) {
        assert!(*self.stack == mem::transmute(&*self));
        *self.stack = self.prev;
    }
}

/// Rust API for keeping a JS::Rooted value in the context's root stack.
/// Example usage: `rooted!(in(cx) let x = UndefinedValue());`.
/// `RootedGuard::new` also works, but the macro is preferred.
pub struct RootedGuard<'a, T: 'a> {
    root: &'a mut JS::Rooted<T>
}

impl<'a, T> RootedGuard<'a, T> {
    pub fn new(cx: *mut JSContext, root: &'a mut JS::Rooted<T>) -> Self where T: RootKind {
        unsafe {
            root.register_with_root_lists(cx);
        }
        RootedGuard {
            root: root
        }
    }

    pub fn handle(&self) -> JS::Handle<T> {
        unsafe {
            JS::Handle::from_marked_location(&self.root.ptr)
        }
    }

    pub fn handle_mut(&mut self) -> JS::MutableHandle<T> {
        unsafe {
            JS::MutableHandle::from_marked_location(&mut self.root.ptr)
        }
    }

    pub fn get(&self) -> T where T: Copy {
        self.root.ptr
    }

    pub fn set(&mut self, v: T) {
        self.root.ptr = v;
    }
}

impl<'a, T> Deref for RootedGuard<'a, T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.root.ptr
    }
}

impl<'a, T> DerefMut for RootedGuard<'a, T> {
    fn deref_mut(&mut self) -> &mut T {
        &mut self.root.ptr
    }
}

impl<'a, T> Drop for RootedGuard<'a, T> {
    fn drop(&mut self) {
        unsafe {
            self.root.remove_from_root_stack();
        }
    }
}

#[macro_export]
macro_rules! rooted {
    (in($cx:expr) let $name:ident = $init:expr) => {
        let mut __root = $crate::jsapi::root::JS::Rooted::new_unrooted($init);
        let $name = $crate::rust::RootedGuard::new($cx, &mut __root);
    };
    (in($cx:expr) let mut $name:ident = $init:expr) => {
        let mut __root = $crate::jsapi::root::JS::Rooted::new_unrooted($init);
        let mut $name = $crate::rust::RootedGuard::new($cx, &mut __root);
    }
}

impl<T> JS::Handle<T> {
    pub fn get(&self) -> T
        where T: Copy
    {
        unsafe { *self.ptr }
    }

    pub unsafe fn from_marked_location(ptr: *const T) -> JS::Handle<T> {
        JS::Handle {
            ptr: mem::transmute(ptr),
        }
    }
}

impl<T> Deref for JS::Handle<T> {
    type Target = T;

    fn deref<'a>(&'a self) -> &'a T {
        unsafe { &*self.ptr }
    }
}

impl<T> JS::MutableHandle<T> {
    pub unsafe fn from_marked_location(ptr: *mut T) -> JS::MutableHandle<T> {
        JS::MutableHandle {
            ptr: ptr,
        }
    }

    pub fn handle(&self) -> JS::Handle<T> {
        unsafe {
            JS::Handle::from_marked_location(self.ptr as *const _)
        }
    }

    pub fn get(&self) -> T
        where T: Copy
    {
        unsafe { *self.ptr }
    }

    pub fn set(&self, v: T)
        where T: Copy
    {
        unsafe { *self.ptr = v }
    }
}

impl<T> Deref for JS::MutableHandle<T> {
    type Target = T;

    fn deref<'a>(&'a self) -> &'a T {
        unsafe { &*self.ptr }
    }
}

impl<T> DerefMut for JS::MutableHandle<T> {
    fn deref_mut<'a>(&'a mut self) -> &'a mut T {
        unsafe { &mut *self.ptr }
    }
}

impl JS::HandleValue {
    pub fn null() -> JS::HandleValue {
        unsafe {
            JS::NullHandleValue
        }
    }

    pub fn undefined() -> JS::HandleValue {
        unsafe {
            JS::UndefinedHandleValue
        }
    }
}

const ConstNullValue: *mut JSObject = 0 as *mut JSObject;

impl JS::HandleObject {
    pub fn null() -> JS::HandleObject {
        unsafe {
            JS::HandleObject::from_marked_location(&ConstNullValue)
        }
    }
}

impl Default for jsid {
    fn default() -> jsid {
        unsafe {
            JSID_VOID
        }
    }
}

impl Default for JS::Value {
    fn default() -> JS::Value { jsval::UndefinedValue() }
}

impl Default for JS::CompartmentOptions {
    fn default() -> Self { unsafe { ::std::mem::zeroed() } }
}

const ChunkShift: usize = 20;
const ChunkSize: usize = 1 << ChunkShift;

#[cfg(target_pointer_width = "32")]
const ChunkLocationOffset: usize = ChunkSize - 2 * 4 - 8;

pub trait GCMethods<T> {
    unsafe fn initial() -> T;
    unsafe fn post_barrier(v: *mut T, prev: T, next: T);
}

impl GCMethods<jsid> for jsid {
    unsafe fn initial() -> jsid { JSID_VOID }
    unsafe fn post_barrier(_: *mut jsid, _: jsid, _: jsid) {}
}

impl GCMethods<*mut JSObject> for *mut JSObject {
    unsafe fn initial() -> *mut JSObject { ptr::null_mut() }
    unsafe fn post_barrier(v: *mut *mut JSObject,
                           prev: *mut JSObject, next: *mut JSObject) {
        JS::HeapObjectPostBarrier(v, prev, next);
    }
}

impl GCMethods<*mut JSString> for *mut JSString {
    unsafe fn initial() -> *mut JSString { ptr::null_mut() }
    unsafe fn post_barrier(_: *mut *mut JSString, _: *mut JSString, _: *mut JSString) {}
}

impl GCMethods<*mut JSScript> for *mut JSScript {
    unsafe fn initial() -> *mut JSScript { ptr::null_mut() }
    unsafe fn post_barrier(_: *mut *mut JSScript, _: *mut JSScript, _: *mut JSScript) { }
}

impl GCMethods<*mut JSFunction> for *mut JSFunction {
    unsafe fn initial() -> *mut JSFunction { ptr::null_mut() }
    unsafe fn post_barrier(v: *mut *mut JSFunction,
                           prev: *mut JSFunction, next: *mut JSFunction) {
        JS::HeapObjectPostBarrier(mem::transmute(v),
                                  mem::transmute(prev), mem::transmute(next));
    }
}

impl GCMethods<JS::Value> for JS::Value {
    unsafe fn initial() -> JS::Value { jsval::UndefinedValue() }
    unsafe fn post_barrier(v: *mut JS::Value, prev: JS::Value, next: JS::Value) {
        JS::HeapValuePostBarrier(v, &prev, &next);
    }
}

// ___________________________________________________________________________
// Implementations for various things in jsapi.rs

impl Drop for JSAutoCompartment {
    fn drop(&mut self) {
        unsafe { JS_LeaveCompartment(self.cx_, self.oldCompartment_); }
    }
}

impl JSJitMethodCallArgs {
    #[inline]
    pub fn get(&self, i: u32) -> JS::HandleValue {
        unsafe {
            if i < self._base.argc_ {
                JS::HandleValue::from_marked_location(self._base.argv_.offset(i as isize))
            } else {
                JS::UndefinedHandleValue
            }
        }
    }

    #[inline]
    pub fn index(&self, i: u32) -> JS::HandleValue {
        assert!(i < self._base.argc_);
        unsafe {
            JS::HandleValue::from_marked_location(self._base.argv_.offset(i as isize))
        }
    }

    #[inline]
    pub fn index_mut(&self, i: u32) -> JS::MutableHandleValue {
        assert!(i < self._base.argc_);
        unsafe {
            JS::MutableHandleValue::from_marked_location(self._base.argv_.offset(i as isize))
        }
    }

    #[inline]
    pub fn rval(&self) -> JS::MutableHandleValue {
        unsafe {
            JS::MutableHandleValue::from_marked_location(self._base.argv_.offset(-2))
        }
    }
}

// XXX need to hack up bindgen to convert this better so we don't have
//     to duplicate so much code here
impl JS::CallArgs {
    #[inline]
    pub unsafe fn from_vp(vp: *mut JS::Value, argc: u32) -> JS::CallArgs {
        CreateCallArgsFromVp(argc, vp)
    }

    #[inline]
    pub fn index(&self, i: u32) -> JS::HandleValue {
        assert!(i < self._base.argc_);
        unsafe {
            JS::HandleValue::from_marked_location(self._base.argv_.offset(i as isize))
        }
    }

    #[inline]
    pub fn index_mut(&self, i: u32) -> JS::MutableHandleValue {
        assert!(i < self._base.argc_);
        unsafe {
            JS::MutableHandleValue::from_marked_location(self._base.argv_.offset(i as isize))
        }
    }

    #[inline]
    pub fn get(&self, i: u32) -> JS::HandleValue {
        unsafe {
            if i < self._base.argc_ {
                JS::HandleValue::from_marked_location(self._base.argv_.offset(i as isize))
            } else {
                JS::UndefinedHandleValue
            }
        }
    }

    #[inline]
    pub fn rval(&self) -> JS::MutableHandleValue {
        unsafe {
            JS::MutableHandleValue::from_marked_location(self._base.argv_.offset(-2))
        }
    }

    #[inline]
    pub fn thisv(&self) -> JS::HandleValue {
        unsafe {
            JS::HandleValue::from_marked_location(self._base.argv_.offset(-1))
        }
    }

    #[inline]
    pub fn calleev(&self) -> JS::HandleValue {
        unsafe {
            JS::HandleValue::from_marked_location(self._base.argv_.offset(-2))
        }
    }

    #[inline]
    pub fn callee(&self) -> *mut JSObject {
        self.calleev().to_object()
    }
}

impl JSJitGetterCallArgs {
    #[inline]
    pub fn rval(&self) -> JS::MutableHandleValue {
        self._base
    }
}

impl JSJitSetterCallArgs {
    #[inline]
    pub fn get(&self, i: u32) -> JS::HandleValue {
        assert!(i == 0);
        self._base.handle()
    }
}

// ___________________________________________________________________________
// Wrappers around things in jsglue.cpp

pub struct AutoObjectVectorWrapper {
    pub ptr: *mut JS::AutoObjectVector
}

impl AutoObjectVectorWrapper {
    pub fn new(cx: *mut JSContext) -> AutoObjectVectorWrapper {
        AutoObjectVectorWrapper {
            ptr: unsafe {
                 CreateAutoObjectVector(cx)
            }
        }
    }

    pub fn append(&self, obj: *mut JSObject) -> bool {
        unsafe {
            AppendToAutoObjectVector(self.ptr, obj)
        }
    }
}

impl Drop for AutoObjectVectorWrapper {
    fn drop(&mut self) {
        unsafe { DeleteAutoObjectVector(self.ptr) }
    }
}

pub struct CompileOptionsWrapper {
    pub ptr: *mut JS::ReadOnlyCompileOptions
}

impl CompileOptionsWrapper {
    pub fn new(cx: *mut JSContext, file: *const ::libc::c_char, line: c_uint) -> CompileOptionsWrapper {
        CompileOptionsWrapper {
            ptr: unsafe { NewCompileOptions(cx, file, line) }
        }
    }
}

impl Drop for CompileOptionsWrapper {
    fn drop(&mut self) {
        unsafe { DeleteCompileOptions(self.ptr) }
    }
}

// ___________________________________________________________________________
// Fast inline converters

#[inline]
pub unsafe fn ToBoolean(v: JS::HandleValue) -> bool {
    let val = *v.ptr;

    if val.is_boolean() {
        return val.to_boolean();
    }

    if val.is_int32() {
        return val.to_int32() != 0;
    }

    if val.is_null_or_undefined() {
        return false;
    }

    if val.is_double() {
        let d = val.to_double();
        return !d.is_nan() && d != 0f64;
    }

    if val.is_symbol() {
        return true;
    }

    js::ToBooleanSlow(v)
}

#[inline]
pub unsafe fn ToNumber(cx: *mut JSContext, v: JS::HandleValue) -> Result<f64, ()> {
    let val = *v.ptr;
    if val.is_number() {
        return Ok(val.to_number());
    }

    let mut out = Default::default();
    if js::ToNumberSlow(cx, v, &mut out) {
        Ok(out)
    } else {
        Err(())
    }
}

#[inline]
unsafe fn convert_from_int32<T: Default + Copy>(
    cx: *mut JSContext,
    v: JS::HandleValue,
    conv_fn: unsafe extern "C" fn(*mut JSContext, JS::HandleValue, *mut T) -> bool)
        -> Result<T, ()> {

    let val = *v.ptr;
    if val.is_int32() {
        let intval: i64 = val.to_int32() as i64;
        // TODO: do something better here that works on big endian
        let intval = *(&intval as *const i64 as *const T);
        return Ok(intval);
    }

    let mut out = Default::default();
    if conv_fn(cx, v, &mut out) {
        Ok(out)
    } else {
        Err(())
    }
}

#[inline]
pub unsafe fn ToInt32(cx: *mut JSContext, v: JS::HandleValue) -> Result<i32, ()> {
    convert_from_int32::<i32>(cx, v, js::ToInt32Slow)
}

#[inline]
pub unsafe fn ToUint32(cx: *mut JSContext, v: JS::HandleValue) -> Result<u32, ()> {
    convert_from_int32::<u32>(cx, v, js::ToUint32Slow)
}

#[inline]
pub unsafe fn ToUint16(cx: *mut JSContext, v: JS::HandleValue) -> Result<u16, ()> {
    convert_from_int32::<u16>(cx, v, js::ToUint16Slow)
}

#[inline]
pub unsafe fn ToInt64(cx: *mut JSContext, v: JS::HandleValue) -> Result<i64, ()> {
    convert_from_int32::<i64>(cx, v, js::ToInt64Slow)
}

#[inline]
pub unsafe fn ToUint64(cx: *mut JSContext, v: JS::HandleValue) -> Result<u64, ()> {
    convert_from_int32::<u64>(cx, v, js::ToUint64Slow)
}

#[inline]
pub unsafe fn ToString(cx: *mut JSContext, v: JS::HandleValue) -> *mut JSString {
    let val = *v.ptr;
    if val.is_string() {
        return val.to_string();
    }

    js::ToStringSlow(cx, v)
}

pub unsafe extern fn report_warning(_cx: *mut JSContext, report: *mut JSErrorReport) {
    fn latin1_to_string(bytes: &[u8]) -> String {
        bytes.iter().map(|c| char::from_u32(*c as u32).unwrap()).collect()
    }

    let fnptr = (*report)._base.filename;
    let fname = if !fnptr.is_null() {
        let c_str = ffi::CStr::from_ptr(fnptr);
        latin1_to_string(c_str.to_bytes())
    } else {
        "none".to_string()
    };

    let lineno = (*report)._base.lineno;
    let column = (*report)._base.column;

    let msg_ptr = (*report)._base.message_.data_ as *const u16;
    let msg_len = (0usize..).find(|&i| *msg_ptr.offset(i as isize) == 0).unwrap();
    let msg_slice = slice::from_raw_parts(msg_ptr, msg_len);
    let msg = String::from_utf16_lossy(msg_slice);

    warn!("Warning at {}:{}:{}: {}\n", fname, lineno, column, msg);
}

impl JSNativeWrapper {
    fn is_zeroed(&self) -> bool {
        let JSNativeWrapper { op, info } = *self;
        op.is_none() && info.is_null()
    }
}

pub struct IdVector(*mut JS::AutoIdVector);

impl IdVector {
    pub unsafe fn new(cx: *mut JSContext) -> IdVector {
        let vector = CreateAutoIdVector(cx);
        assert!(!vector.is_null());
        IdVector(vector)
    }

    pub fn get(&self) -> *mut JS::AutoIdVector {
        self.0
    }
}

impl Drop for IdVector {
    fn drop(&mut self) {
        unsafe {
            DestroyAutoIdVector(self.0)
        }
    }
}

impl Deref for IdVector {
    type Target = [jsid];

    fn deref(&self) -> &[jsid] {
        unsafe {
            let mut length = 0;
            let pointer = SliceAutoIdVector(self.0 as *const _, &mut length);
            slice::from_raw_parts(pointer, length)
        }
    }
}

/// Defines methods on `obj`. The last entry of `methods` must contain zeroed
/// memory.
///
/// # Failures
///
/// Returns `Err` on JSAPI failure.
///
/// # Panics
///
/// Panics if the last entry of `methods` does not contain zeroed memory.
///
/// # Safety
///
/// - `cx` must be valid.
/// - This function calls into unaudited C++ code.
pub unsafe fn define_methods(cx: *mut JSContext, obj: JS::HandleObject,
                             methods: &'static [JSFunctionSpec])
                             -> Result<(), ()> {
    assert!({
        match methods.last() {
            Some(&JSFunctionSpec { name, call, nargs, flags, selfHostedName }) => {
                name.is_null() && call.is_zeroed() && nargs == 0 && flags == 0 &&
                selfHostedName.is_null()
            },
            None => false,
        }
    });

    JS_DefineFunctions(cx, obj, methods.as_ptr()).to_result()
}

/// Defines attributes on `obj`. The last entry of `properties` must contain
/// zeroed memory.
///
/// # Failures
///
/// Returns `Err` on JSAPI failure.
///
/// # Panics
///
/// Panics if the last entry of `properties` does not contain zeroed memory.
///
/// # Safety
///
/// - `cx` must be valid.
/// - This function calls into unaudited C++ code.
pub unsafe fn define_properties(cx: *mut JSContext, obj: JS::HandleObject,
                                properties: &'static [JSPropertySpec])
                                -> Result<(), ()> {
    assert!({
        match properties.last() {
            Some(ref spec) => {
                slice::from_raw_parts(spec as *const _ as *const u8,
                                      mem::size_of_val(spec))
                    .iter()
                    .all(|byte| *byte == 0)
            },
            None => false,
        }
    });

    JS_DefineProperties(cx, obj, properties.as_ptr()).to_result()
}

static SIMPLE_GLOBAL_CLASS_OPS: JSClassOps = JSClassOps {
    addProperty: None,
    delProperty: None,
    getProperty: None,
    setProperty: None,
    enumerate: Some(JS_EnumerateStandardClasses),
    resolve: Some(JS_ResolveStandardClass),
    mayResolve: Some(JS_MayResolveStandardClass),
    finalize: None,
    call: None,
    hasInstance: None,
    construct: None,
    trace: Some(JS_GlobalObjectTraceHook),
};

/// This is a simple `JSClass` for global objects, primarily intended for tests.
pub static SIMPLE_GLOBAL_CLASS: JSClass = JSClass {
    name: b"Global\0" as *const u8 as *const _,
    flags: (JSCLASS_IS_GLOBAL | ((JSCLASS_GLOBAL_SLOT_COUNT & JSCLASS_RESERVED_SLOTS_MASK) << JSCLASS_RESERVED_SLOTS_SHIFT)) as u32,
    cOps: &SIMPLE_GLOBAL_CLASS_OPS as *const JSClassOps,
    reserved: [0 as *mut _; 3]
};