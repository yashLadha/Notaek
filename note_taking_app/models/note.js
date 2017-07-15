var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');

var Schema = mongoose.Schema;
var noteSchema = new Schema({
  title: {type: String, required: true, es_indexed: true},
  author: {type: String, es_indexed: true},
  content: {type: String}
});

noteSchema.plugin(mongoosastic);
var note = mongoose.model('NoteData', noteSchema);
note.createMapping(function(err, mapping) {
  if (err) {
      console.log('Error while mapping: ' + err);
  } else {
      console.log('Mapping Created' + mapping);
  }
});

module.exports = note;
