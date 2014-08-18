chai = require('chai');

function makeAssertion(obj, flags) {
  var assertion = chai.expect(obj);
  if (flags.negate) {assertion = assertion.not;}
  return assertion;
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

  // Success

  Assertion.addProperty('succeeded', function() {
    makeAssertion(this._obj.status, this.__flags).eq('success');
  });

  Assertion.addMethod('succeededWith', function(data) {
    makeAssertion(this._obj.status, this.__flags).eq('success');
    makeAssertion(this._obj.data, this.__flags).deep.eq(data);
  });

  // Fail

  Assertion.addProperty('failed', function() {
    makeAssertion(this._obj.status, this.__flags).eq('fail');
  });

  Assertion.addMethod('failedWith', function(data) {
    makeAssertion(this._obj.status, this.__flags).eq('fail');
    makeAssertion(this._obj.data, this.__flags).deep.eq(data);
  });

  // Error

  Assertion.addProperty('errored', function() {
    makeAssertion(this._obj.status, this.__flags).eq('error');
  });

  Assertion.addMethod('erroredWith', function(data) {
    var assertedData = clone(data);
    var obj = this._obj;
    makeAssertion(obj.status, this.__flags).eq('error');

    if (typeof obj.data !== 'undefined') {
      makeAssertion(obj.data, this.__flags).deep.eq(data.data);
    }

    if (typeof obj.code !== 'undefined') {
      makeAssertion(obj.code, this.__flags).eq(data.code);
    }

    if (typeof obj.message !== 'undefined') {
      makeAssertion(obj.message, this.__flags).eq(data.message);
    }
  });
};
