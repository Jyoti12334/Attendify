import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
  const { id } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/students/${id}/attendance`)
      .then((res) => setRecords(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Attendance History</h2>
      <ul className="bg-white shadow rounded-lg divide-y">
        {records.map((record, index) => (
          <li key={index} className="p-4">
            {new Date(record.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
