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


programSchema.pre('save', async function (next) {
  const doc = this;
  try {
    if (!doc.isNew) {
      return next();
    }

    let count = await mongoose.model('Program', programSchema).countDocuments();
    count += 1;
    const id = "P" + "0".repeat(2 - count.toString().length) + count;
    doc.program_id = id;

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = mongoose.model('Program', programSchema);