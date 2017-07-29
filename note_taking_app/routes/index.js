var express = require('express');
var passport = require('passport');
var userData = require('../models/user.js');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Login', message: req.flash('loginMessage') });
});

router.post('/loginUser',passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/createUser', function(req, res) {
  res.render('createUser', {title: 'Create User'});
});

router.post('/addUser', function(req, res) {
  var user = {
    username: req.body.username,
    email: req.body.email
  };
  
  if (req.body.passport) {
    console.log('password received');
  }
  userData.register(new userData(user), req.body.password, function(err, user) {
    if (err) {
      console.log('Error occured while saving the user' + err);
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
};

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
