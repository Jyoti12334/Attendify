const express = require("express");
const router = express.Router();
const {
  registerStudent,
  getAttendanceForStudent,
  findStudent,
} = require("../controllers/studentController");

router.get("/:studentId/attendance", getAttendanceForStudent);
router.get("/find", findStudent);
router.post("/register", registerStudent);

module.exports = router;
