const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const programSchema = new Schema({
    program_id: {
        type: String,
        required: true,
        unique: true
      },
      name: {
        type: String,
        required: true
      },
      duration: {
        type: String,
        required: true
      },
      cost: {
        type: String,
        required: true
      }
});

module.exports = mongoose.model('Program', programSchema);