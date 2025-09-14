const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const { spawn } = require("child_process");

exports.registerStudent = async (req, res) => {
  const { name, email, bluetoothUUID } = req.body;

  const python = spawn("python", [
    __dirname + "/../utils/capture_face.py",
    name,
  ]);

  let responseSent = false;

  python.stdout.on("data", async (data) => {
    if (responseSent) return;

    try {
      const faceEncoding = JSON.parse(data.toString());

      const newStudent = new Student({
        name,
        email,
        bluetoothUUID,
        faceEncoding,
      });

      await newStudent.save();
      res.json({ message: "Student registered successfully" });
      responseSent = true;
    } catch (err) {
      console.error("Error parsing or saving:", err);
      res.status(500).json({ error: "Internal server error" });
      responseSent = true;
    }
  });

  python.stderr.on("data", (data) => {
    if (!responseSent) {
      console.error("Python Error:", data.toString());
      res.status(500).json({ error: "Error running Python script" });
      responseSent = true;
    }
  });

  python.on("error", (err) => {
    if (!responseSent) {
      console.error("Failed to start subprocess.", err);
      res.status(500).json({ error: "Failed to start Python process" });
      responseSent = true;
    }
  });
};
exports.getAttendanceForStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const records = await Attendance.find({ studentId }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
};

exports.findStudent = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ error: "Not found" });

    res.json(student); // returns _id, name, etc.
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
