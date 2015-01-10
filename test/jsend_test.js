var chai = require('chai');

chai.should();
chai.use(require('../index'));

describe('chai-jsend', function() {

  var data = {foo: 'bar'};

  var responseBodies = {
    success: {status: 'success', data: data},
    fail: {status: 'fail', data: data},
    error: {status: 'error', data: data, message: 'message', code: 404}
  };

  var responses = {
    success: {body: responseBodies.success},
    fail: {body: responseBodies.fail},
    error: {body: responseBodies.error}
  };

  it('should check if response succeeds', function() {
    responses.success.should.have.succeeded;
    responseBodies.success.should.have.succeeded;

    responses.fail.should.not.have.succeeded;
    responseBodies.fail.should.not.have.succeeded;

    responses.error.should.not.have.succeeded;
    responseBodies.error.should.not.have.succeeded;
  });

  it('should check if response succeeds with data', function() {
    responses.success.should.have.succeededWith(data);
    responseBodies.success.should.have.succeededWith(data);
  });

  it('should check if response fails', function() {
    responses.success.should.not.have.failed;
    responseBodies.success.should.not.have.failed;

    responses.fail.should.have.failed;
    responseBodies.fail.should.have.failed;

    responses.error.should.not.have.failed;
    responseBodies.error.should.not.have.failed;
  });

  it('should check if response fails with data', function() {
    responses.fail.should.have.failedWith(data);
    responseBodies.fail.should.have.failedWith(data);
  });

  it('should check if response errors', function() {
    responses.success.should.not.have.errored;
    responseBodies.success.should.not.have.errored;

    responses.fail.should.not.have.errored;
    responseBodies.fail.should.not.have.errored;

    responses.error.should.have.errored;
    responseBodies.error.should.have.errored;
  });

  it('should check if response errors with data', function() {
    var errorData = {data: data, message: 'message', code: 404};
    responses.error.should.have.erroredWith('message');
    responseBodies.error.should.have.erroredWith('message');
    responses.error.should.have.erroredWith(errorData);
    responseBodies.error.should.have.erroredWith(errorData);
  });
});
