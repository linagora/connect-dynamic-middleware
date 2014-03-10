'use strict';

var request = require('supertest');
var expressBuilder = require('./fixtures/express');

describe('The connect-dynamic-middleware', function() {
  it('should work', function(done) {
    var passThrough = function(req, res, next) {
      next();
    };
    var dn = require('../')(passThrough);
    var app = expressBuilder(dn);
    request(app)
      .get('/')
      .expect(200)
      .expect(/Hi there/)
      .end(done);
  });

  it('should allow changing the middleware dynamically', function(done) {
    var passThrough = function(req, res, next) {
      next();
    };
    var blockAll = function(req, res, next) {
      res.send(503);
    };

    function testBlock() {
      request(app)
      .get('/')
      .expect(503)
      .end(done);
    }

    var dn = require('../')(passThrough);
    var app = expressBuilder(dn);
    request(app)
      .get('/')
      .expect(200)
      .expect(/Hi there/)
      .end(function() {
        dn.setMiddleware(blockAll);
        testBlock();
      });
  });

});
