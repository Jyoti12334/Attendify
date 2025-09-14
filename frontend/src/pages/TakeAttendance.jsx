import React, { useState } from "react";
import axios from "axios";

export default function TeacherDashboard() {
  const [message, setMessage] = useState("");

  const markAttendance = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/attendance/mark");
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Failed to start attendance. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Teacher Dashboard
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Press the button below to begin attendance using face and Bluetooth
          detection.
        </p>

        <button
          onClick={markAttendance}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Start Attendance
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center italic">
          Press <span className="font-bold text-blue-600">Q</span> to trigger
          face capture.
        </p>

        {message && (
          <div className="mt-6 bg-blue-50 text-blue-700 border border-blue-200 rounded-md p-3 text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
