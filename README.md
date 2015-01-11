chai-jsend
==========

[![Build Status](https://img.shields.io/travis/jsdir/chai-jsend.svg?style=flat)](https://travis-ci.org/jsdir/chai-jsend)
[![Dependency Status](https://img.shields.io/david/jsdir/chai-jsend.svg?style=flat)](https://david-dm.org/jsdir/chai-jsend)
[![NPM version](https://img.shields.io/npm/v/chai-jsend.svg?style=flat)](https://www.npmjs.org/package/chai-jsend)


Chai plugin for asserting JSend responses.

Installation
------------

`npm install --save-dev chai-jsend`

Assertions
----------

## Success

- `success`
- `successWith`

### Usage:

```js
describe('success', function() {
  it('should succeed', function(done) {
    req.get('/users/1').end(function(err, res) {
      if (err) {return done(err);}
      res.should.be.success;
      res.should.be.successWith({name: 'Random'});
    });
  });
});
```

## Failure

- `failure`
- `failureWith`

### Usage:

```js
describe('failure', function() {
  it('should fail', function(done) {
    req.get('/users/1').end(function(err, res) {
      if (err) {return done(err);}
      res.should.be.failure;
      res.should.be.failureWith({id: 'Unknown user.'});
    });
  });
});
```

## Error

- `error`
- `errorWith`

### Usage:

```js
describe('errors', function() {
  it('should error', function(done) {
    req.get('/users/1').end(function(err, res) {
      if (err) {return done(err);}
      res.should.be.error;
      res.should.be.errorWith('Server error.');
      res.should.be.errorWith({
        code: 500,
        message: 'Server error.',
        data: {power_level: 9001}
      });
    });
  });
});
```
