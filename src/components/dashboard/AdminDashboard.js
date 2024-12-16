import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  FaBars,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaTachometerAlt,
  FaPlusSquare,
} from "react-icons/fa";


const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseName, setCourseName] = useState("");

  // Utility function for creating a course
  const createCourse = async (courseName) => {
    if (!courseName.trim()) {
      alert("Course name is required.");
      return;
    }

    try {
     
      setIsModalOpen(false);
      setCourseName("");
    } catch (error) {
      console.error("Error creating course:", error.message);
      alert("Failed to create course. Try again.");
    }
  };

  const sidebarLinks = [
    { name: "Dashboard", icon: <FaTachometerAlt />, href: "/admin/dashboard" },
    { name: "Create Class / Course", icon: <FaPlusSquare />, href: "/admin/create-course" },
    { name: "Add Teacher", icon: <FaChalkboardTeacher />, href: "/admin/add-teacher" },
    { name: "Add Student", icon: <FaUserGraduate />, href: "/admin/add-student" },
  ];

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50 text-black">
        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0 w-64 bg-gray-800 p-4 fixed top-0 left-0 h-full transition-transform duration-300 z-50`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
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
                <Link
                  to={link.href}
                  className="flex items-center text-white p-2 hover:bg-gray-700 rounded w-full text-left"
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6 sm:ml-64 w-full h-screen transition-all duration-300">
          <header className="flex justify-between items-center mb-6">
            <button
              className="sm:hidden text-gray-800 mr-3 focus:outline-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaBars size={24} />
            </button>

            <div className="flex justify-between w-full items-center gap-3 md:gap-6">
              <h1 className="text-xl md:text-3xl font-bold whitespace-nowrap text-gray-800">
                Admin Dashboard
              </h1>
              <button className="bg-purple-600 text-sm font-semibold md:text-base p-2 md:px-4 md:py-2 text-white rounded hover:bg-purple-700"
                onClick={() => setIsModalOpen(true)}
              >
                +  Class
              </button>
            </div>
          </header>


          <Outlet />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-20 bg-black bg-opacity-70 w-full h-full flex items-center justify-center z-50"
          >
            <div
              className="absolute top-1/2 left-1/2 w-[200px] h-[200px] transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg flex justify-center items-center max-w-xs"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Create Class / Course
                </h3>
                <input
                  type="text"
                  placeholder="Enter course name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-purple-300"
                />
                <div className="flex justify-around gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:ring focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => createCourse(courseName)}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:ring focus:ring-purple-300"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
