// requiring the mongoose library
const mongoose = require('mongoose');
const passport=require('passport');
const passportLocalMongoose=require('passport-local-mongoose');

// Defining the schema of classroom.
const classSchema = new mongoose.Schema({
  className:String,
  classCode: String,
  teachers: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'teacher'
  }],
  announcements: [
    {
    author: String,
    text: String,
    time: String
  }
],
teams:[{
  type:mongoose.Schema.Types.ObjectID,
  ref:'team'
}]
});
classSchema.plugin(passportLocalMongoose);
const classroom = mongoose.model('classroom', classSchema);

// exporting the classroom model
module.exports = classroom;