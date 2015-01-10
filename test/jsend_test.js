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

  it('should check if response is successful', function() {
    responses.success.should.be.successful;
    responseBodies.success.should.be.successful;

    responses.fail.should.not.be.successful;
    responseBodies.fail.should.not.be.successful;

    responses.error.should.not.be.successful;
    responseBodies.error.should.not.be.successful;
  });

  it('should check if response is successful with data', function() {
    responses.success.should.be.successfulWith(data);
    responseBodies.success.should.be.successfulWith(data);
  });

  it('should check if response is failure', function() {
    responses.success.should.not.be.failure;
    responseBodies.success.should.not.be.failure;

    responses.fail.should.be.failure;
    responseBodies.fail.should.be.failure;

    responses.error.should.not.be.failure;
    responseBodies.error.should.not.be.failure;
  });

  it('should check if response is failure with data', function() {
    responses.fail.should.be.failureWith(data);
    responseBodies.fail.should.be.failureWith(data);
  });

  it('should check if response is error', function() {
    responses.success.should.not.be.error;
    responseBodies.success.should.not.be.error;

    responses.fail.should.not.be.error;
    responseBodies.fail.should.not.be.error;

    responses.error.should.be.error;
    responseBodies.error.should.be.error;
  });

  it('should check if response is error with data', function() {
    var errorData = {data: data, message: 'message', code: 404};
    responses.error.should.be.errorWith('message');
    responseBodies.error.should.be.errorWith('message');
    responses.error.should.be.errorWith(errorData);
    responseBodies.error.should.be.errorWith(errorData);
  });
});
