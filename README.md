chai-jsend
==========

[![Build Status](https://travis-ci.org/jsdir/chai-jsend.png)](https://travis-ci.org/jsdir/chai-jsend) [![Dependency Status](https://david-dm.org/jsdir/chai-jsend.svg)](https://david-dm.org/jsdir/chai-jsend) [![NPM version](https://badge.fury.io/js/chai-jsend.png)](http://badge.fury.io/js/chai-jsend)

Chai plugin for asserting JSend responses.

Installation
------------

`npm install --save-dev chai-jsend`

Assertions
----------

## Success

#### response.should.have.succeeded

#### response.should.have.succeededWith

##### Usage:

```js
describe('success', function() {
  it('should succeed', function(done) {
    req.get('/users/1').end(function(err, res) {
      if (err) {return done(err);}
      res.should.have.succeeded;
      res.should.have.succeededWith({name: 'Random'});
    });
  });
});
```

## Failure

#### response.should.have.failed

#### response.should.have.failedWith

##### Usage:

```js
describe('success', function() {
  it('should succeed', function(done) {
    req.get('/users/1').end(function(err, res) {
      if (err) {return done(err);}
      res.should.have.failed;
      res.should.have.failedWith({id: 'Unknown user.'});
    });
  });
});
```

## Error

#### response.should.have.errored

#### response.should.have.erroredWith

##### Usage:

```js
describe('success', function() {
  it('should succeed', function(done) {
    req.get('/users/1').end(function(err, res) {
      if (err) {return done(err);}
      res.should.have.errored;
      res.should.have.erroredWith({
        code: 500,
        message: 'Server error.',
        data: {power_level: 9001}
      });
    });
  });
});
```
