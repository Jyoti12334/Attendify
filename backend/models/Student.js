const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  bluetoothUUID: String,
  faceEncoding: [Number],
});

module.exports = mongoose.model("Student", StudentSchema);
