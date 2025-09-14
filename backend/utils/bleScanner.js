const { spawn } = require("child_process");

function checkBluetoothProximityForAll(students) {
  return new Promise((resolve) => {
    const nameMap = students
      .filter((s) => s.bluetoothUUID)
      .reduce((acc, s) => {
        acc[s.name] = s.bluetoothUUID;
        return acc;
      }, {});

    for (const [studentName, btName] of Object.entries(nameMap)) {
      console.log("Checking Bluetooth for student:", studentName, btName);
    }

    const inputJson = JSON.stringify(nameMap);
    const python = spawn("python", [__dirname + "/bleScanner.py", inputJson]);

    let output = "";
    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error("BLE Python Error:", data.toString());
    });

    python.on("close", () => {
      try {
        const result = JSON.parse(output);
        resolve(result); 
      } catch (err) {
        console.error("Failed to parse BLE result:", output);
        resolve({});
      }
    });
  });
}

module.exports = { checkBluetoothProximityForAll };
