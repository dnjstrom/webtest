// This module defines a middleware for expressjs which logs any incoming
// requests using winston. The middleware is configured to log some http
// properties and all of the request body except for the properties in the
// blacklist.
module.exports = function (req, res, next) {
  var _ = require('lodash'),
    util = require('util'),
    logger = require('./logger.js');

  // The following request properties will be logged.
  var whitelist = [
    'httpVersion',
    'originalUrl',
    'query',
    'headers'
  ],

  // Property keys listed below will be redakted from the request body.
  blacklist = [
    'password'
  ];

  // Pick properties to log using the whitelist.
  var entry = _.pick(req, whitelist);

  // Recursively create a deep copy with redacted properties.
  entry.body = _.cloneDeepWith(req.body, function (value, key, object, stack) {
    if (_.includes(blacklist, key)) {
      return '..<' + typeof value + '>..';
    }
  });

  // Log the request with winston.
  logger.log('info', '%s -> %s\n%s', req.method, req.url, util.inspect(entry), {});

  // Hand over to the next middleware.
  next();
}
