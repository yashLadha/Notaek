var userData = require('../models/user.js');
var express = require('express');
var router = express.Router();
var noteModel = require('../models/note.js');


router.get('/createNote', function(req, res) {
  if (req.user)
    res.render('note_create', {title: 'Note Create', user: req.user});
  else
    res.redirect('/');
});

router.post('/createNote', function(req, res) {
  if (req.user) {
    userInfo = req.user;
    postTitle = req.body.title;
    postContent = req.body.content;
    if (postTitle) {
      noteModel.find({author: userInfo._id, title: postTitle}, function(err, note) {
        if (err)
          console.log('Post already present');
        else {
          note = new noteModel({title: postTitle, author: userInfo._id, content: postContent});
          note.save(function(err) {
            if (err)
              console.log('Note is not able to save properly');
            else {
              console.log('Note is saved properly');
              res.redirect('/notes/createNote');
              note.on('es-indexed', function() {
                console.log('Document is indexed');
              });
            }
          });
        }
      });
    }
  }
});


var ans = [];
var fuzzyPost = function(text, user, callback) {
  noteModel.search({
    bool: {
      must: {
        fuzzy: {
          title: text // Text for applying fuzzy search query
        }
      },
      filter: {
        term: {
          author: user._id
        }
      }
    }
  }, {hydrate: true}, function(err, result) {
    if (err) {
      console.log('Error finding data' + err);
      callback(null);
    } else {
      callback(result.hits.hits);
    }
  });
};

// api callback for sending the fuzzy posts search results
router.get('/async/:text', function(req, res) {
  user = req.user;
  if (user) {
    console.log('Request received: ' + req.params.text);
    var text = req.params.text;
    fuzzyPost(text, user, function(ans) {
      res.json(ans);
    });
  }
});

router.get('/', function(req, res) {
  if (req.user) {
    userInfo = req.user;
    noteModel.search({
      match: {
        author: userInfo._id
      }
    }, {hydrate: true}, function(err, result) {
      if(err) {
        console.log('No data found');
        res.redirect('/');
      } else {
        console.log(result.hits.hits);
        res.render('note_index', {notes: result.hits.hits, user: userInfo});
      }
    });
  }
  else
    res.redirect('/');
});

module.exports = router;
