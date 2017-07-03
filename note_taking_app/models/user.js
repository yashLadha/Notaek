var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');

var userDataSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String},
  email: {type: String, required: true}
})

userDataSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('UserData', userDataSchema)

