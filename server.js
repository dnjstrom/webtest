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
    port = 3000;

// Set mongoose to use full native promises.
mongoose.Promise = global.Promise;

// Parse json from post request body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the database. The "database" host url is defined
// automatically by docker through the "link" flag.
mongoose.connect('mongodb://database/test');

// Mount the single-page admin interface under "/admin".
app.use('/admin', express.static(path.join(__dirname, '/public')));

// Mount the bear api under "/admin/api/bear".
app.use('/admin/api/bears', bear(mongoose, router));

// Actually launch the server.
app.listen(port, function () {
  console.log('Mock CodeServer listening on port ' + port + '!');
});
