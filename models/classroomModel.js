// requiring the mongoose library
const mongoose = require('mongoose');

// Defining the schema of classroom.
const classSchema = new mongoose.Schema({
  className:String,
  classCode: String,
  teachers: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'teacher'
  }],
  announcements: [
    // {
    // author: {
    //   type: mongoose.Schema.Types.ObjectID,
    //   ref: 'teacher'
    // },
    // text: String
    // time: Date
  // }
]
});
const classroom = mongoose.model('classroom', classSchema);

// exporting the classroom model
module.exports = classroom;