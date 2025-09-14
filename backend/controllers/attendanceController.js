const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const detectFaces = require("../utils/faceRecognition");
const sendEmail = require("../utils/sendEmail");
const { checkBluetoothProximityForAll } = require("../utils/bleScanner");

exports.markAttendance = async (req, res) => {
  const names = await detectFaces();
  console.log("Detected Names:", names);

  const students = await Student.find({ name: { $in: names } });
  const date = new Date();

  for (let student of students) {
    await sendEmail(
      student.email,
      "Today's Notes",
      "Attached are today's class notes."
    );
  }

  const detectionCounts = {};
  for (const student of students) {
    detectionCounts[student.name] = 0;
  }

  let checks = 0;
  const interval = setInterval(
    async () => {
      checks++;
      console.log(`[🔄] Bluetooth scan attempt ${checks}/5`);

      const results = await checkBluetoothProximityForAll(students);
      for (let student of students) {
        if (results[student.name]) {
          detectionCounts[student.name]++;
          console.log(
            `[✅] Detected ${student.name} (${detectionCounts[student.name]}/3)`
          );
        } else {
          console.log(`[❌] ${student.name} not detected.`);
        }
      }

      if (checks >= 5) {
        clearInterval(interval);

        for (let student of students) {
          if (detectionCounts[student.name] >= 3) {
            console.log(`[📋] Marking ${student.name} present.`);
            await Attendance.create({ studentId: student._id, date });
          } else {
            console.log(`[⚠️] ${student.name} not detected enough times.`);
          }
        }
      }
    },
    1 * 60 * 1000
  );

  res.json({
    message: "Emails sent. Attendance will be checked over 5 minutes.",
  });
};

exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("studentId")
      .sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch attendance records" });
  }
};
