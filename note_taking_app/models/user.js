var mongoose = require('mongoose')

var Schema = mongoose.Schema

var userDataSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true}
})

module.exports = mongoose.model('UserData', userDataSchema)

