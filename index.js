chai = require('chai');

function assertInclude(obj, data) {
  chai.expect(obj).to.include(data);
}

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

module.exports = function(chai, utils) {
  var Assertion = chai.Assertion;

  Assertion.addProperty('succeeded', function() {
    assertInclude(this._obj, {status: 'success'});
  });

  Assertion.addProperty('failed', function() {
    assertInclude(this._obj, {status: 'fail'});
  });

  Assertion.addProperty('errored', function() {
    assertInclude(this._obj, {status: 'error'});
  });

  Assertion.addMethod('succeededWith', function(data) {
    assertInclude(this._obj, {status: 'success', data: data});
  });

  Assertion.addMethod('failedWith', function(data) {
    assertInclude(this._obj, {status: 'fail', data: data});
  });

  Assertion.addMethod('erroredWith', function(data) {
    var assertedData = clone(data);
    assertedData.status = 'error';
    assertInclude(this._obj, assertedData);
  });
};
