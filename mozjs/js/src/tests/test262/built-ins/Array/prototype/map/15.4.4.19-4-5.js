// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-array.prototype.map
es5id: 15.4.4.19-4-5
description: Array.prototype.map throws TypeError if callbackfn is number
---*/

  var arr = new Array(10);
assert.throws(TypeError, function() {
    arr.map(5);
});

reportCompare(0, 0);
