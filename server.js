// Library imports
var express = require('express'),
    app = express(),
    router = express.Router(),
    path = require('path'),
    mongo = require('mongodb'),
    monk = require('monk');

// Custom imports and definitions
var api = require('./api/api.js'),
    port = 3000;

// Connect to the database. The "database" host url is defined
// automatically by docker through the "link" flag.
var db = monk('database:27017/test');

// Make the db available too request handlers.
app.use(function (req, res, next) {
  req.db = db;
  next();
});


// Mount the single-page admin interface under "/admin"
app.use('/admin', express.static(path.join(__dirname, '/public')));

// Mount the api under "/admin/api".
app.use('/admin/api', api(router));


// Actually launch the server.
app.listen(port, function () {
  console.log('Mock CodeServer listening on port ' + port + '!');
});
