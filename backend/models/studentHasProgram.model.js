const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentHasProgramSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
      },
      program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        required: true
      },
      registerDate: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('StudentHasProgram', studentHasProgramSchema);