import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  FaBars,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaTachometerAlt,
  FaClipboardList,
} from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Import Chart.js

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("January");

  // Sample data for demonstration
  const data = {
    January: {
      totalStudents: 200,
      totalPresent: 150,
      totalAbsent: 50,
    },
    February: {
      totalStudents: 220,
      totalPresent: 170,
      totalAbsent: 50,
    },
    // Add data for other months...
  };

  // Sidebar links
  const sidebarLinks = [
    { name: "Dashboard", icon: <FaTachometerAlt />, href: "#" },
    { name: "Take Attendance", icon: <FaClipboardList />, href: "#" },
    { name: "Manage Students", icon: <FaUserGraduate />, href: "#" },
    { name: "Send Notices", icon: <FaChalkboardTeacher />, href: "#" },
  ];

  // Data for charts
  const pieChartData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [data[selectedMonth].totalPresent, data[selectedMonth].totalAbsent],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const barChartData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [data[selectedMonth].totalPresent, data[selectedMonth].totalAbsent],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="flex flex-col  sm:flex-row min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 w-64 bg-gray-800 p-4 fixed top-0 left-0 h-full transition-transform duration-300 z-50`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Teacher Panel</h2>
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
        <header className="flex justify-between items-center mb-6">
          <button
            className="sm:hidden text-gray-800 mr-3 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars size={24} />
          </button>

          <div className="flex justify-between w-full items-center gap-3 md:gap-6">
            <h1 className="text-xl md:text-3xl font-bold whitespace-nowrap text-gray-800">
              Teacher Dashboard
            </h1>
            <div className="flex items-center">
              <p className=" sm:hidden md:block md:mr-2">
                Select Month:
              </p>
              <select
                id="month-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-gray-200 p-2 rounded"
              >
                <option value="January">January</option>
                <option value="February">February</option>
              </select>
            </div>
          </div>
        </header>

        {/* Statistics Cards */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <div className="flex-shrink-0 bg-purple-500 p-2 rounded-full">
              <FaUserGraduate className="text-white" />
            </div>
            <div>
              <h3 className="text-gray-600">Total Students</h3>
              <p className="text-2xl font-bold">{data[selectedMonth].totalStudents}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <div className="flex-shrink-0 bg-blue-500 p-2 rounded-full">
              <FaClipboardList className="text-white" />
            </div>
            <div>
              <h3 className="text-gray-600">Total Present</h3>
              <p className="text-2xl font-bold">{data[selectedMonth].totalPresent}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <div className="flex-shrink-0 bg-yellow-500 p-2 rounded-full">
              <FaChalkboardTeacher className="text-white" />
            </div>
            <div>
              <h3 className="text-gray-600">Total Absent</h3>
              <p className="text-2xl font-bold">{data[selectedMonth].totalAbsent}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Attendance Distribution</h3>
              <div className="chart-container">
                <Pie data={pieChartData} />
              </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Monthly Attendance Trends</h3>
              <div className="chart-container">
                <Bar data={barChartData} />
              </div>
            </div>
          </div>
        </div>

        {/* Outlet for rendering child components */}
        <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
      </div>
    </div>
  );
};

export default TeacherDashboard;
