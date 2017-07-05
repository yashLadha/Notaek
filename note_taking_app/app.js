var express = require('express')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs')
var flash = require('connect-flash');
var passport = require('passport');

var dbUri = 'mongodb://localhost/note_app';

mongoose.Promise = global.Promise
mongoose.connect(dbUri);

var index = require('./routes/index');
var users = require('./routes/users');
var note = require('./routes/note_take.js');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

var app = express();

app.use(session({secret: 'yashladhaisstud'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var userData = require('./models/user.js')

passport.use(new LocalStrategy(userData.authenticate()))
passport.serializeUser(userData.serializeUser())
passport.deserializeUser(userData.deserializeUser())

app.use('/', index);
app.use('/users', users);
app.use('/notes', note);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var isValidPassword = function(user, password) {
  return bcrypt.compareSync(password, user.password)
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
