const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_id: {
        type: String,
        required: true,
        unique: true
      },
      name: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      contact: {
        type: String,
        required: true
      }
});

module.exports = mongoose.model('Student', studentSchema);