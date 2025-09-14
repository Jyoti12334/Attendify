import React, { useState } from "react";
import axios from "axios";

export default function RegisterStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bluetoothUUID, setBluetoothUUID] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/register",
        {
          name,
          email,
          bluetoothUUID,
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Registration failed. Please check inputs or server.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Register New Student
        </h1>

        <p className="text-gray-600 text-sm mb-6 text-center">
          Fill in the student details below. After clicking register, the camera
          will capture the face.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="text"
            placeholder="Bluetooth MAC Address (e.g. AA:BB:CC:DD:EE:FF)"
            value={bluetoothUUID}
            onChange={(e) => setBluetoothUUID(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-6 transition"
        >
          Register & Capture Face
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center italic">
          Make sure your camera is on. You need to press{" "}
          <span className="text-blue-700 font-bold">Q</span> to confirm the face
          capture .
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
