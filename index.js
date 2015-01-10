var chai = require('chai');

function makeAssertion(obj, flags) {
  var assertion = chai.expect(obj);
  if (flags.negate) {assertion = assertion.not;}
  return assertion;
}

function getBody(res) {
  return res.body || res;
}

module.exports = function(chai, utils) {
  var Assertion = chai.Assertion;

  // Success

  Assertion.addProperty('succeeded', function() {
    var body = getBody(this._obj);
    makeAssertion(body.status, this.__flags).eq('success');
  });

  Assertion.addMethod('succeededWith', function(data) {
    var body = getBody(this._obj);
    makeAssertion(body.status, this.__flags).eq('success');
    makeAssertion(body.data, this.__flags).deep.eq(data);
  });

  // Fail

  Assertion.addProperty('failed', function() {
    var body = getBody(this._obj);
    makeAssertion(body.status, this.__flags).eq('fail');
  });

  Assertion.addMethod('failedWith', function(data) {
    var body = getBody(this._obj);
    makeAssertion(body.status, this.__flags).eq('fail');
    makeAssertion(body.data, this.__flags).deep.eq(data);
  });

  // Error

  Assertion.addProperty('errored', function() {
    var body = getBody(this._obj)
    makeAssertion(body.status, this.__flags).eq('error');
  });

  Assertion.addMethod('erroredWith', function(data) {
    var body = getBody(this._obj);
    makeAssertion(body.status, this.__flags).eq('error');

    if (typeof data === 'string') {
      // Assert message.
      makeAssertion(body.message, this.__flags).eq(data);
    } else {
      // Assert response.
      if (typeof body.data !== 'undefined') {
        makeAssertion(body.data, this.__flags).deep.eq(data.data);
      }

      if (typeof body.code !== 'undefined') {
        makeAssertion(body.code, this.__flags).eq(data.code);
      }

      if (typeof body.message !== 'undefined') {
        makeAssertion(body.message, this.__flags).eq(data.message);
      }
    }

  });
};
