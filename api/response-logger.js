// Express.js middleware for logging response codes.
module.exports = function (req, res, next) {
  var logger = require('./logger.js');

  // After the response has been sent, log the statuscode.
  req.on('end', function () {
    var level = (res.statusCode >= 400) ? 'warn' : 'info'
    logger.log(level, 'Response: %d - %s', res.statusCode, res.statusMessage, {});
  });

  // Hand over to the next middleware.
  next();
}
