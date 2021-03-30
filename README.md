![Archived](https://img.shields.io/badge/Current_Status-archived-blue?style=flat)

Connect Dynamic Middleware
==========================

Allow to change the middleware dynamically in a running connect/express application.

Example
-------

Let's imagine you have this simplistic express server:

    var express = require('express');
    var application = express();
    application.use(express.cookieParser('this is the secret!'));
    application.get('/',function(req,res) {
      res.send(200, 'Hello !');
    });
    application.listen(6666);

Now let's imagine you want to modify the secret associated with the cookie parser middleware. Of course, you don't want to restart your server... Just use the dynamic connect middleware :


    var express = require('express');
    var cdm = require('connect-dynamic-middleware');
    var application = express();
    var cookieMiddleware = cdm(express.cookieParser('this is the secret!'));
    application.use(cookieMiddleware);
    application.get('/',function(req,res) {
      res.send(200, 'Hello !');
    });
    application.put('/cookieSecret/:secret', function(req,res) {
      var newSecret = req.params.secret;
      cookieMiddleware.setMiddleware(express.cookieParser(newSecret));
      res.send(200, 'OK');
    });
    application.listen(6666);


Tests
-----

Use the command:

    grunt

to launch the test suite. For it to work, you'll need gjslint, and a Mongodb server listening on localhost:27017.

Licence
-------

MIT

Others
------

This was coded with love by [Linagora](http://linagora.com).

Use, share, fork, send pull requests !
