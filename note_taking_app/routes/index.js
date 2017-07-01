var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var userData = mongoose.model('UserData');
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
    email: req.body.useremail
  };

  console.log('User received' + user);

});

router.get('/createUser', function(req, res) {
  res.render('createUser', {title: 'Create User'});
});

router.post('/addUser', function(req, res) {
  var user = {
    username: req.body.username,
    email: req.body.useremail
  };

  var userData = mongoose.model('UserData');
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
