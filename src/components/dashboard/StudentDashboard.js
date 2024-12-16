import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar links for students
  const sidebarLinks = [
    { name: "Dashboard", icon: <FaUserGraduate />, href: "#" },
    { name: "View Classes", icon: <FaChalkboardTeacher />, href: "#" },
  ];

  // Sample attendance data
  const attendanceData = {
    present: 18,
    absent: 2,
    holidays: 5,
  };

  // Pie chart data configuration
  const chartData = {
    labels: ["Present", "Absent", "Holidays"],
    datasets: [
      {
        data: [attendanceData.present, attendanceData.absent, attendanceData.holidays],
        backgroundColor: ["#10B981", "#EF4444", "#FBBF24"],
        hoverBackgroundColor: ["#059669", "#DC2626", "#D97706"],
      },
    ],
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 w-64 bg-gray-800 p-4 fixed top-0 left-0 h-full transition-transform duration-300 z-50`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Student Panel</h2>
          <button
            className="text-white sm:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            X
          </button>
        </div>
        <ul className="space-y-4">
          {sidebarLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="flex items-center text-white p-2 hover:bg-gray-700 rounded"
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="flex justify-around items-center mb-6">
          <button
            className="sm:hidden text-gray-800 mr-3 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars size={24} />
          </button>

          <div className="flex justify-between w-full items-center gap-3 md:gap-6">
            <h1 className="text-xl md:text-3xl font-bold whitespace-nowrap text-gray-800">
              Student Dashboard
            </h1>
          </div>
        </header>

        {/* Attendance Chart */}
        <div className="bg-white w-full p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Attendance Overview</h2>
          <div className="w-72 mx-auto">
            <Pie data={chartData} />
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Present: <span className="font-bold">{attendanceData.present}</span> days
            </p>
            <p className="text-gray-700">
              Absent: <span className="font-bold">{attendanceData.absent}</span> days
            </p>
            <p className="text-gray-700">
              Holidays: <span className="font-bold">{attendanceData.holidays}</span> days
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white p-4 rounded shadow">
            <p>No recent activity yet.</p>
          </div>
        </div>

        {/* Outlet for rendering child components */}
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
