// Library imports.
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = express.Router(),
    path = require('path'),
    mongo = require('mongodb'),
    mongoose = require('mongoose');

// Custom imports and definitions.
var bear = require('./api/bear.js'),
    logger = require('./api/logger.js'),
    requestLogger = require('./api/request-logger.js'),
    port = 3000;

// Set mongoose to use full native promises.
mongoose.Promise = global.Promise;

// Parse json from post request body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log incomoing requests automatically.
app.use(requestLogger);

// Connect to the database. The "database" host url is defined
// automatically by docker through the "link" flag.
mongoose.connect('mongodb://database/test');

mongoose.connection.on('error', function (err) {
  logger.error('Could not connect to the database: ', err)
});

// Mount the single-page admin interface under "/admin".
app.use('/admin', express.static(path.join(__dirname, '/public')));

// Mount the bear api under "/admin/api/bear".
app.use('/admin/api/bears', bear(mongoose, router));

// Actually launch the server.
app.listen(port, function () {
  logger.info('Server listening on port ' + port + '!');
});
