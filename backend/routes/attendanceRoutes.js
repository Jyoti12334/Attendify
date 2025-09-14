const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");

router.get("/", getAllAttendance);
router.post("/mark", markAttendance);

module.exports = router;
