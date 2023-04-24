const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentHasProgramSchema = new Schema({
    student_id: {
        type: String,
        ref: 'Student',
        required: true
      },
      program_id: {
        type: String,
        ref: 'Program',
        required: true
      },
      registerDate: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('StudentHasProgram', studentHasProgramSchema);