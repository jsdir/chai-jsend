var chai = require('chai');

chai.should();
chai.use(require('../index'));

describe('chai-jsend', function() {

  var responses = {
    success: {status: 'success', data: {foo: 'bar'}},
    fail: {status: 'fail', data: {foo: 'bar'}},
    error: {status: 'error', data: {foo: 'bar'}, message: 'message', code: 404}
  };

  it('should check if response succeeds', function() {
    responses.success.should.have.succeeded;
    responses.fail.should.not.have.succeeded;
    responses.error.should.not.have.succeeded;
  });

  it('should check if response succeeds with data', function() {
    var data = {foo: 'bar'};
    responses.success.should.have.succeededWith(data);
  });

  it('should check if response fails', function() {
    responses.success.should.not.have.failed;
    responses.fail.should.have.failed;
    responses.error.should.not.have.failed;
  });

  it('should check if response fails with data', function() {
    var data = {foo: 'bar'};
    responses.fail.should.have.failedWith(data);
  });

  it('should check if response errors', function() {
    responses.success.should.not.have.errored;
    responses.fail.should.not.have.errored;
    responses.error.should.have.errored;
  });

  it('should check if response errors with data', function() {
    var data = {data: {foo: 'bar'}, message: 'message', code: 404};
    responses.error.should.have.erroredWith(data);
  });
});
