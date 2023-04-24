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
  },
  program_id: { 
    type: String, 
    ref: "Program" 
  } // add program_id field
});

studentSchema.pre('save', async function (next) {
  const doc = this;
  try {
    if (!doc.isNew) {
      return next();
    }

    let count = await mongoose.model('Student', studentSchema).countDocuments();
    count += 1;
    const id = "S" + "0".repeat(4 - count.toString().length) + count;
    doc.student_id = id;

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = mongoose.model('Student', studentSchema);




/*
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
      },
      program_id: { 
        type: String, 
        ref: "Program" 
      } // add program_id field
});

module.exports = mongoose.model('Student', studentSchema);
*/