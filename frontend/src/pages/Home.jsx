import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" h-[620px] bg-gradient-to-r from-blue-50 via-white to-blue-100 py-10 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Welcome to Attendify
        </h1>
        <p className="text-gray-600 text-lg mb-10 mt-10">
          A smart and secure system to manage attendance with face recognition
          and proximity deetction and automated mailing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg p-6 rounded-xl text-center border border-blue-100 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Student Dashboard
            </h2>
            <p className="text-gray-500">
              View your attendance records by email.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl text-center border border-blue-100 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Admin Login
            </h2>
            <p className="text-gray-500">Login to access teacher tools.</p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl text-center border border-blue-100 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Register Student
            </h2>
            <p className="text-gray-500">
              Register a new student with face , name , email and BLE id.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl text-center border border-blue-100 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Take Attendance
            </h2>
            <p className="text-gray-500">
              Use face detection and blue-tooth proximity to mark attendance.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl text-center border border-blue-100 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Teacher Dashboard
            </h2>
            <p className="text-gray-500">View and manage student attendance.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl text-center border border-blue-100 hover:shadow-xl">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Mail Notes
            </h2>
            <p className="text-gray-500">
              Automatically emails class notes to students marked present
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
