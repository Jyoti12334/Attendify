import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useAdmin } from "./contexts/AdminContext";

import StudentDashboard from "./pages/StudentDashboard";
import TakeAttendance from "./pages/TakeAttendance";
import RegisterStudent from "./pages/RegisterStudent";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentLookup from "./pages/StudentLookup";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";

function App() {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Attendify
        </h1>
        <div className="space-x-4">
          {!isAdmin && (
            <Link
              to="/lookup"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Student Dashboard
            </Link>
          )}
          {isAdmin && (
            <>
              <Link
                to="/attendance"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Take Attendance
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Register Student
              </Link>
              <Link
                to="/teacher"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Teacher Dashboard
              </Link>
            </>
          )}
          {!isAdmin && (
            <Link
              to="/admin"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Admin Login
            </Link>
          )}
        </div>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/:id" element={<StudentDashboard />} />
          <Route path="/lookup" element={<StudentLookup />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/register" element={<RegisterStudent />} />
          <Route path="/attendance" element={<TakeAttendance />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </main>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
