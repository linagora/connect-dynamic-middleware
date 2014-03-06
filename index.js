'use strict';

module.exports = function(middleware) {
  var dynamicMiddleware = function(req, res, next) {
    middleware(req, res, next);
  };
  dynamicMiddleware.setMiddleware = function(newMiddleware) {
    middleware = newMiddleware;
  };
  return dynamicMiddleware;
};
