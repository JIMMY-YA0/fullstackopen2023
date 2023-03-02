const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    minLength: [3, "Name must habe at least 8 length"],
    required: [true, "Name field is required"],
  },
  number: {
    type: String,
    unique: true,
    minLength: [8, "Number must habe at least 8 length"],
    required: [true, "Number field is required"],
    validate: {
      validator: (number) => /^\d{2,3}-\d+$/.test(number),
      message: "Phone number should be in the format of XX-XXXXXXXXX or XXX-XXXXXXXXX.",
    },
  },
});

module.exports = mongoose.model("Person", personSchema);
