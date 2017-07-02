var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var userData = require('../models/user.js')
var router = express.Router();

router.get('/', function(req, res, next) {
  userData.find(function(err, doc) {
    if (err) {
      console.log('Error has occured');
    } else {
      res.render('index', { title: 'Index', userList: doc });
    }
  });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Login', message: req.flash('loginMessage') });
});

router.post('/loginUser', function(req, res) {

  var user = {
    username: req.body.username,
    password: req.body.password
  };

  console.log('User received' + user);

});

router.get('/createUser', function(req, res) {
  res.render('createUser', {title: 'Create User'});
});

router.post('/addUser', function(req, res) {
  var user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    email: req.body.email
  };

  var userNew = new userData(user);
  userNew.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('New user added');
    }
  });

  res.redirect('/');

});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

module.exports = router;
