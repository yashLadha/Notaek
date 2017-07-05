var userData = require('../models/user.js')
var express = require('express')
var router = express.Router()
var noteModel = require('../models/note.js')


router.get('/createNote', function(req, res) {
  if (req.user)
    res.render('note_create', {title: 'Note Create', user: req.user})
  else
    res.redirect('/')
})

router.post('/createNote', function(req, res) {
  if (req.user) {
    userInfo = req.user
    postTitle = req.body.title
    postContent = req.body.content

    postError = true
    
    if (postTitle) {
      noteModel.find({author: userInfo._id, title: postTitle}, function(err, note) {
        if (err)
          console.log('Post already present')
        else {
          note = new noteModel({title: postTitle, author: userInfo._id, content: postContent})
          note.save(function(err) {
            if (err)
              console.log('Note is not able to save properly')
            else {
              postError = false
              console.log('Note is saved properly')
              res.redirect('/createNote')
            }
          })
        }
      })
    }
  }
})

router.get('/', function(req, res) {
  if (req.user) {
    userInfo = req.user
    queryObj = noteModel.find({author: userInfo._id}).exec()
    queryObj.then((results) => {
      console.log('Results: ' + results)
      res.render('note_index', {notes: results, user: userInfo})
    }).catch((err) => {
      console.log(err);
    })
  }
  else
    res.redirect('/')
})

module.exports = router
