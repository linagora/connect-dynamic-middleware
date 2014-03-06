'use strict';

var express = require('express');

function getExpressApp(middleware) {
  var application = express();
  application.use(middleware);
  application.get('/', function(req, res) {
    res.send(200, 'Hi there !');
  });
  return application;
}

module.exports = getExpressApp;
