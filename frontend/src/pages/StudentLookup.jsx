import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLookup = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/students/find?email=${email}`
      );
      navigate(`/student/${res.data._id}`);
    } catch (err) {
      alert("Student not found");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Check Your Attendance
        </h2>

        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter your registered email to view your attendance record.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            View Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLookup;
