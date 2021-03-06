// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-dataview.prototype.getuint8
description: >
  ToIndex conversions on byteOffset
info: |
  24.2.4.10 DataView.prototype.getUint8 ( byteOffset )

  1. Let v be the this value.
  2. Return ? GetViewValue(v, byteOffset, true, "Uint8").

  24.2.1.1 GetViewValue ( view, requestIndex, isLittleEndian, type )

  ...
  4. Let getIndex be ? ToIndex(requestIndex).
  ...
features: [DataView.prototype.setUint8]
---*/

var buffer = new ArrayBuffer(4);
var sample = new DataView(buffer, 0);

sample.setUint8(0, 39);
sample.setUint8(1, 42);
sample.setUint8(2, 7);
sample.setUint8(3, 77);

var obj1 = {
  valueOf: function() {
    return 2;
  }
};

var obj2 = {
  toString: function() {
    return 3;
  }
};

assert.sameValue(sample.getUint8(-0), 39, "-0");
assert.sameValue(sample.getUint8(obj1), 7, "object's valueOf");
assert.sameValue(sample.getUint8(obj2), 77, "object's toString");
assert.sameValue(sample.getUint8(""), 39, "the Empty string");
assert.sameValue(sample.getUint8("0"), 39, "string '0'");
assert.sameValue(sample.getUint8("2"), 7, "string '1'");
assert.sameValue(sample.getUint8(true), 42, "true");
assert.sameValue(sample.getUint8(false), 39, "false");
assert.sameValue(sample.getUint8(NaN), 39, "NaN");
assert.sameValue(sample.getUint8(null), 39, "null");
assert.sameValue(sample.getUint8(0.1), 39, "0.1");
assert.sameValue(sample.getUint8(0.9), 39, "0.9");
assert.sameValue(sample.getUint8(1.1), 42, "1.1");
assert.sameValue(sample.getUint8(1.9), 42, "1.9");
assert.sameValue(sample.getUint8(-0.1), 39, "-0.1");
assert.sameValue(sample.getUint8(-0.99999), 39, "-0.99999");
assert.sameValue(sample.getUint8(undefined), 39, "undefined");
assert.sameValue(sample.getUint8(), 39, "no arg");

reportCompare(0, 0);
