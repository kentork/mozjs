
// call_indirect.wast:3
let $1 = instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\xd9\x80\x80\x80\x00\x12\x60\x00\x00\x60\x00\x01\x7f\x60\x00\x01\x7e\x60\x00\x01\x7d\x60\x00\x01\x7c\x60\x01\x7f\x01\x7f\x60\x01\x7e\x01\x7e\x60\x01\x7d\x01\x7d\x60\x01\x7c\x01\x7c\x60\x02\x7d\x7f\x01\x7f\x60\x02\x7f\x7e\x01\x7e\x60\x02\x7c\x7d\x01\x7d\x60\x02\x7e\x7c\x01\x7c\x60\x01\x7f\x01\x7f\x60\x01\x7e\x01\x7e\x60\x01\x7d\x01\x7d\x60\x01\x7c\x01\x7c\x60\x01\x7f\x01\x7e\x03\xa7\x80\x80\x80\x00\x26\x01\x02\x03\x04\x05\x06\x07\x08\x0a\x0c\x09\x0b\x0d\x0e\x0f\x10\x01\x02\x03\x04\x02\x01\x02\x03\x04\x01\x02\x03\x04\x0a\x11\x06\x06\x05\x05\x00\x00\x00\x04\x85\x80\x80\x80\x00\x01\x70\x01\x17\x17\x07\x9b\x82\x80\x80\x00\x15\x08\x74\x79\x70\x65\x2d\x69\x33\x32\x00\x10\x08\x74\x79\x70\x65\x2d\x69\x36\x34\x00\x11\x08\x74\x79\x70\x65\x2d\x66\x33\x32\x00\x12\x08\x74\x79\x70\x65\x2d\x66\x36\x34\x00\x13\x0a\x74\x79\x70\x65\x2d\x69\x6e\x64\x65\x78\x00\x14\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x69\x33\x32\x00\x15\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x69\x36\x34\x00\x16\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x66\x33\x32\x00\x17\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x66\x36\x34\x00\x18\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x69\x33\x32\x00\x19\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x69\x36\x34\x00\x1a\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x66\x33\x32\x00\x1b\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x66\x36\x34\x00\x1c\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x1d\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x1e\x03\x66\x61\x63\x00\x1f\x03\x66\x69\x62\x00\x20\x04\x65\x76\x65\x6e\x00\x21\x03\x6f\x64\x64\x00\x22\x07\x72\x75\x6e\x61\x77\x61\x79\x00\x23\x0e\x6d\x75\x74\x75\x61\x6c\x2d\x72\x75\x6e\x61\x77\x61\x79\x00\x24\x09\x9d\x80\x80\x80\x00\x01\x00\x41\x00\x0b\x17\x00\x01\x02\x03\x04\x05\x06\x07\x0a\x08\x0b\x09\x1f\x20\x21\x22\x23\x24\x25\x0c\x0d\x0e\x0f\x0a\xae\x84\x80\x80\x00\x26\x85\x80\x80\x80\x00\x00\x41\xb2\x02\x0b\x85\x80\x80\x80\x00\x00\x42\xe4\x02\x0b\x87\x80\x80\x80\x00\x00\x43\x00\x20\x73\x45\x0b\x8b\x80\x80\x80\x00\x00\x44\x00\x00\x00\x00\x00\xc8\xae\x40\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x01\x0b\x84\x80\x80\x80\x00\x00\x20\x01\x0b\x84\x80\x80\x80\x00\x00\x20\x01\x0b\x84\x80\x80\x80\x00\x00\x20\x01\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x00\x11\x01\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x01\x11\x02\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x02\x11\x03\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x03\x11\x04\x00\x0b\x8a\x80\x80\x80\x00\x00\x42\xe4\x00\x41\x05\x11\x06\x00\x0b\x89\x80\x80\x80\x00\x00\x41\x20\x41\x04\x11\x05\x00\x0b\x8a\x80\x80\x80\x00\x00\x42\xc0\x00\x41\x05\x11\x06\x00\x0b\x8c\x80\x80\x80\x00\x00\x43\xc3\xf5\xa8\x3f\x41\x06\x11\x07\x00\x0b\x90\x80\x80\x80\x00\x00\x44\x3d\x0a\xd7\xa3\x70\x3d\xfa\x3f\x41\x07\x11\x08\x00\x0b\x8e\x80\x80\x80\x00\x00\x43\x66\x66\x00\x42\x41\x20\x41\x08\x11\x09\x00\x0b\x8c\x80\x80\x80\x00\x00\x41\x20\x42\xc0\x00\x41\x09\x11\x0a\x00\x0b\x95\x80\x80\x80\x00\x00\x44\x00\x00\x00\x00\x00\x00\x50\x40\x43\x00\x00\x00\x42\x41\x0a\x11\x0b\x00\x0b\x93\x80\x80\x80\x00\x00\x42\xc0\x00\x44\x66\x66\x66\x66\x66\x06\x50\x40\x41\x0b\x11\x0c\x00\x0b\x89\x80\x80\x80\x00\x00\x20\x01\x20\x00\x11\x06\x00\x0b\x89\x80\x80\x80\x00\x00\x42\x09\x20\x00\x11\x0e\x00\x0b\x98\x80\x80\x80\x00\x00\x20\x00\x50\x04\x7e\x42\x01\x05\x20\x00\x20\x00\x42\x01\x7d\x41\x0c\x11\x06\x00\x7e\x0b\x0b\xa2\x80\x80\x80\x00\x00\x20\x00\x42\x01\x58\x04\x7e\x42\x01\x05\x20\x00\x42\x02\x7d\x41\x0d\x11\x06\x00\x20\x00\x42\x01\x7d\x41\x0d\x11\x06\x00\x7c\x0b\x0b\x95\x80\x80\x80\x00\x00\x20\x00\x45\x04\x7f\x41\x2c\x05\x20\x00\x41\x01\x6b\x41\x0f\x11\x05\x00\x0b\x0b\x96\x80\x80\x80\x00\x00\x20\x00\x45\x04\x7f\x41\xe3\x00\x05\x20\x00\x41\x01\x6b\x41\x0e\x11\x05\x00\x0b\x0b\x87\x80\x80\x80\x00\x00\x41\x10\x11\x00\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x12\x11\x00\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x11\x11\x00\x00\x0b");

// call_indirect.wast:167
assert_return(() => call($1, "type-i32", []), 306);

// call_indirect.wast:168
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x74\x79\x70\x65\x2d\x69\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x02\x40\x10\x00\x01\x42\xe4\x02\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-i64", []), int64("356"))

// call_indirect.wast:169
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7d\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x74\x79\x70\x65\x2d\x66\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9a\x80\x80\x80\x00\x01\x94\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbc\x43\x00\x20\x73\x45\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-f32", []), 3890.)

// call_indirect.wast:170
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7c\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x74\x79\x70\x65\x2d\x66\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9e\x80\x80\x80\x00\x01\x98\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbd\x44\x00\x00\x00\x00\x00\xc8\xae\x40\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-f64", []), 3940.)

// call_indirect.wast:172
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x91\x80\x80\x80\x00\x01\x02\x24\x31\x0a\x74\x79\x70\x65\x2d\x69\x6e\x64\x65\x78\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x02\x40\x10\x00\x01\x42\xe4\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-index", []), int64("100"))

// call_indirect.wast:174
assert_return(() => call($1, "type-first-i32", []), 32);

// call_indirect.wast:175
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x95\x80\x80\x80\x00\x01\x02\x24\x31\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x69\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x02\x40\x10\x00\x01\x42\xc0\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-first-i64", []), int64("64"))

// call_indirect.wast:176
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7d\x02\x95\x80\x80\x80\x00\x01\x02\x24\x31\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x66\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9a\x80\x80\x80\x00\x01\x94\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbc\x43\xc3\xf5\xa8\x3f\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-first-f32", []), 1.32000005245)

// call_indirect.wast:177
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7c\x02\x95\x80\x80\x80\x00\x01\x02\x24\x31\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x66\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9e\x80\x80\x80\x00\x01\x98\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbd\x44\x3d\x0a\xd7\xa3\x70\x3d\xfa\x3f\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-first-f64", []), 1.64)

// call_indirect.wast:179
assert_return(() => call($1, "type-second-i32", []), 32);

// call_indirect.wast:180
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x96\x80\x80\x80\x00\x01\x02\x24\x31\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x69\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x02\x40\x10\x00\x01\x42\xc0\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-second-i64", []), int64("64"))

// call_indirect.wast:181
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7d\x02\x96\x80\x80\x80\x00\x01\x02\x24\x31\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x66\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9a\x80\x80\x80\x00\x01\x94\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbc\x43\x00\x00\x00\x42\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-second-f32", []), 32.)

// call_indirect.wast:182
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7c\x02\x96\x80\x80\x80\x00\x01\x02\x24\x31\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x66\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9e\x80\x80\x80\x00\x01\x98\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbd\x44\x66\x66\x66\x66\x66\x06\x50\x40\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-second-f64", []), 64.1)

// call_indirect.wast:184
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x41\x05\x42\x02\x10\x00\x01\x42\x02\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch", [5, int64("2")]), int64("2"))

// call_indirect.wast:185
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x41\x05\x42\x05\x10\x00\x01\x42\x05\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch", [5, int64("5")]), int64("5"))

// call_indirect.wast:186
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9c\x80\x80\x80\x00\x01\x96\x80\x80\x80\x00\x00\x02\x40\x41\x0c\x42\x05\x10\x00\x01\x42\xf8\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch", [12, int64("5")]), int64("120"))

// call_indirect.wast:187
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x41\x0d\x42\x05\x10\x00\x01\x42\x08\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch", [13, int64("5")]), int64("8"))

// call_indirect.wast:188
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x41\x14\x42\x02\x10\x00\x01\x42\x02\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch", [20, int64("2")]), int64("2"))

// call_indirect.wast:189
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x93\x80\x80\x80\x00\x01\x8d\x80\x80\x80\x00\x00\x02\x40\x41\x00\x42\x02\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch", [0, int64("2")]))

// call_indirect.wast:190
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x93\x80\x80\x80\x00\x01\x8d\x80\x80\x80\x00\x00\x02\x40\x41\x0f\x42\x02\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch", [15, int64("2")]))

// call_indirect.wast:191
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x93\x80\x80\x80\x00\x01\x8d\x80\x80\x80\x00\x00\x02\x40\x41\x17\x42\x02\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch", [23, int64("2")]))

// call_indirect.wast:192
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x93\x80\x80\x80\x00\x01\x8d\x80\x80\x80\x00\x00\x02\x40\x41\x7f\x42\x02\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch", [-1, int64("2")]))

// call_indirect.wast:193
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x97\x80\x80\x80\x00\x01\x91\x80\x80\x80\x00\x00\x02\x40\x41\xe7\x84\xce\xc2\x04\x42\x02\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch", [1213432423, int64("2")]))

// call_indirect.wast:195
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x41\x05\x10\x00\x01\x42\x09\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch-structural", [5]), int64("9"))

// call_indirect.wast:196
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x41\x05\x10\x00\x01\x42\x09\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch-structural", [5]), int64("9"))

// call_indirect.wast:197
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x41\x0c\x10\x00\x01\x42\x80\x93\x16\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch-structural", [12]), int64("362880"))

// call_indirect.wast:198
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x41\x14\x10\x00\x01\x42\x09\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch-structural", [20]), int64("9"))

// call_indirect.wast:199
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x91\x80\x80\x80\x00\x01\x8b\x80\x80\x80\x00\x00\x02\x40\x41\x0b\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch-structural", [11]))

// call_indirect.wast:200
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x91\x80\x80\x80\x00\x01\x8b\x80\x80\x80\x00\x00\x02\x40\x41\x16\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch-structural", [22]))

// call_indirect.wast:202
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x61\x63\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x00\x10\x00\x01\x42\x01\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fac", [int64("0")]), int64("1"))

// call_indirect.wast:203
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x61\x63\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x01\x10\x00\x01\x42\x01\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fac", [int64("1")]), int64("1"))

// call_indirect.wast:204
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x61\x63\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9a\x80\x80\x80\x00\x01\x94\x80\x80\x80\x00\x00\x02\x40\x42\x05\x10\x00\x01\x42\xf8\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fac", [int64("5")]), int64("120"))

// call_indirect.wast:205
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x61\x63\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa2\x80\x80\x80\x00\x01\x9c\x80\x80\x80\x00\x00\x02\x40\x42\x19\x10\x00\x01\x42\x80\x80\x80\xde\x87\x92\xec\xcf\xe1\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fac", [int64("25")]), int64("7034535277573963776"))

// call_indirect.wast:207
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x69\x62\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x00\x10\x00\x01\x42\x01\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fib", [int64("0")]), int64("1"))

// call_indirect.wast:208
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x69\x62\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x01\x10\x00\x01\x42\x01\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fib", [int64("1")]), int64("1"))

// call_indirect.wast:209
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x69\x62\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x02\x10\x00\x01\x42\x02\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fib", [int64("2")]), int64("2"))

// call_indirect.wast:210
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x69\x62\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x05\x10\x00\x01\x42\x08\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fib", [int64("5")]), int64("8"))

// call_indirect.wast:211
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x69\x62\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x42\x14\x10\x00\x01\x42\xc2\xd5\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fib", [int64("20")]), int64("10946"))

// call_indirect.wast:213
assert_return(() => call($1, "even", [0]), 44);

// call_indirect.wast:214
assert_return(() => call($1, "even", [1]), 99);

// call_indirect.wast:215
assert_return(() => call($1, "even", [100]), 44);

// call_indirect.wast:216
assert_return(() => call($1, "even", [77]), 99);

// call_indirect.wast:217
assert_return(() => call($1, "odd", [0]), 99);

// call_indirect.wast:218
assert_return(() => call($1, "odd", [1]), 44);

// call_indirect.wast:219
assert_return(() => call($1, "odd", [200]), 99);

// call_indirect.wast:220
assert_return(() => call($1, "odd", [77]), 44);

// call_indirect.wast:222
assert_exhaustion(() => call($1, "runaway", []));

// call_indirect.wast:223
assert_exhaustion(() => call($1, "mutual-runaway", []));

// call_indirect.wast:228
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x0a\x8d\x80\x80\x80\x00\x01\x87\x80\x80\x80\x00\x00\x41\x00\x11\x00\x00\x0b");

// call_indirect.wast:236
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8e\x80\x80\x80\x00\x01\x88\x80\x80\x80\x00\x00\x41\x00\x11\x00\x00\x45\x0b");

// call_indirect.wast:244
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x01\x7e\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8e\x80\x80\x80\x00\x01\x88\x80\x80\x80\x00\x00\x41\x00\x11\x00\x00\x45\x0b");

// call_indirect.wast:253
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x01\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8d\x80\x80\x80\x00\x01\x87\x80\x80\x80\x00\x00\x41\x00\x11\x00\x00\x0b");

// call_indirect.wast:261
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x02\x7c\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8d\x80\x80\x80\x00\x01\x87\x80\x80\x80\x00\x00\x41\x00\x11\x00\x00\x0b");

// call_indirect.wast:269
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x41\x01\x41\x00\x11\x00\x00\x0b");

// call_indirect.wast:277
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x44\x00\x00\x00\x00\x00\x00\x00\x40\x41\x01\x41\x00\x11\x00\x00\x0b");

// call_indirect.wast:288
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x01\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8e\x80\x80\x80\x00\x01\x88\x80\x80\x80\x00\x00\x41\x01\x01\x11\x00\x00\x0b");

// call_indirect.wast:296
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x01\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x41\x00\x42\x01\x11\x00\x00\x0b");

// call_indirect.wast:305
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x02\x7f\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x90\x80\x80\x80\x00\x01\x8a\x80\x80\x80\x00\x00\x01\x41\x01\x41\x00\x11\x00\x00\x0b");

// call_indirect.wast:315
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x02\x7f\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x90\x80\x80\x80\x00\x01\x8a\x80\x80\x80\x00\x00\x41\x01\x01\x41\x00\x11\x00\x00\x0b");

// call_indirect.wast:325
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x02\x7f\x7c\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x44\x00\x00\x00\x00\x00\x00\xf0\x3f\x41\x01\x41\x00\x11\x00\x00\x0b");

// call_indirect.wast:335
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x02\x7c\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x41\x01\x44\x00\x00\x00\x00\x00\x00\xf0\x3f\x41\x00\x11\x00\x00\x0b");

// call_indirect.wast:349
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8d\x80\x80\x80\x00\x01\x87\x80\x80\x80\x00\x00\x41\x00\x11\x01\x00\x0b");

// call_indirect.wast:356
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x91\x80\x80\x80\x00\x01\x8b\x80\x80\x80\x00\x00\x41\x00\x11\x94\x98\xdb\xe2\x03\x00\x0b");

// call_indirect.wast:367
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x04\x85\x80\x80\x80\x00\x01\x70\x01\x02\x02\x09\x88\x80\x80\x80\x00\x01\x00\x41\x00\x0b\x02\x00\x00");

// call_indirect.wast:375
assert_unlinkable("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x0a\x09\x87\x80\x80\x80\x00\x01\x00\x41\x0a\x0b\x01\x00\x0a\x88\x80\x80\x80\x00\x01\x82\x80\x80\x80\x00\x00\x0b");

// call_indirect.wast:384
assert_unlinkable("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x0a\x09\x87\x80\x80\x80\x00\x01\x00\x41\x7f\x0b\x01\x00\x0a\x88\x80\x80\x80\x00\x01\x82\x80\x80\x80\x00\x00\x0b");

// call_indirect.wast:393
assert_unlinkable("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x0a\x09\x87\x80\x80\x80\x00\x01\x00\x41\x76\x0b\x01\x00\x0a\x88\x80\x80\x80\x00\x01\x82\x80\x80\x80\x00\x00\x0b");