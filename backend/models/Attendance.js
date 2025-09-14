const mongoose = require("mongoose");
const Student = require("./Student");

const AttendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  date: Date,
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
