// Library imports.
var express = require('express'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    path = require('path'),
    nocache = require('connect-nocache')(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongo = require('mongodb'),
    mongoose = require('mongoose');

// Custom imports and definitions.
var bears = require('./api/bears.js'),
    logger = require('./api/logger.js'),
    responseLogger = require('./api/response-logger.js'),
    requestLogger = require('./api/request-logger.js'),
    port = 3000;

// Set mongoose to use full native promises.
mongoose.Promise = global.Promise;

// Parse json from post request body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log incomoing requests automatically.
app.use(requestLogger);

// Log outgoing error responses automatically.
app.use(responseLogger);

// Connect to the database. The "database" host url is defined automatically by
// docker through the "link" flag.
mongoose.connect('mongodb://database/test');

mongoose.connection.on('error', function (err) {
  logger.error('Could not connect to the database: ', err)
});


// Allow querying for users.
var User = mongoose.model('User', new mongoose.Schema(), 'users');


// Enable sessions.
app.use(session({ secret: 'keyboard cat' }));

// Configure user authentication.
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (userid, done) {
  User.findById(userid).then(function (user) {
    done(null, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('###################');
    console.log(username, password);
    User.findOne({username: username}).lean()
      .then(function (user) {
        console.log(user);
        console.log('################:', user.password === password);
        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false, { message: 'Incorrect password'});
        }
      })
      .catch(function (err) {
        console.log(err);
        done(null, false, { message: 'Incorrect username.'});
      });
  }
));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/bears',
  failureRedirect: '/login'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Disallow caching of api-calls.
app.use('/api', nocache);

// Refuse access to the api unless authenticated.
app.use('/api', function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send(401);
  }
});

// Mount the bear api under "/admin/api/bears".
app.use('/api/bears', bears(mongoose, router))

// Mount the single-page admin interface under "/admin".
app.use('/', express.static(path.join(__dirname, '/public')));

// Redirect everything else to the angular app.
app.get('*', function (req, res) {
  res.sendfile(path.join(__dirname, '/public/index.html'));
})

// Actually launch the server.
app.listen(port, function () {
  logger.info('Server listening on port ' + port + '!');
});
