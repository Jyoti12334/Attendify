import { useEffect, useState } from "react";
import axios from "axios";

const TeacherDashboard = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/attendance")
      .then((res) => setRecords(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Students' Attendance</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Student</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{record.studentId.name}</td>
                <td className="px-4 py-2 border">{record.studentId.email}</td>
                <td className="px-4 py-2 border">
                  {new Date(record.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;
