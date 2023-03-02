const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    require: true,
  },
  number: {
    type: String,
    unique: true,
    require: true,
  },
});

module.exports = mongoose.model("Person", personSchema);
