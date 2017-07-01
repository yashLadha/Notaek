var mongoose = require('mongoose')

var Schema = mongoose.Schema
var noteSchema = new Schema({
  title: {type: String, required: true},
  author: String,
  content: String
})

module.exports = mongoose.model('NoteData', noteSchema)
