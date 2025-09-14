const { spawn } = require("child_process");

function recognizeFaces() {
  return new Promise((resolve, reject) => {
    const python = spawn("python", [__dirname + "/face_recognizer.py"]);
    let dataString = "";

    python.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error("Python Error:", data.toString());
    });

    python.on("close", (code) => {
      try {
        const result = JSON.parse(dataString || "[]");
        resolve(result);
      } catch (err) {
        console.error("Failed to parse JSON:", dataString);
        reject(err);
      }
    });
  });
}

module.exports = recognizeFaces;
