import React from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = () => {
    const user = useSelector((state) => state.user);
    if (!user) {
        return <div className="text-red-500">User data is not available.</div>;
    }
    console.log(user);

    const renderDashboardContent = () => {
        switch (user.user.role) {
            case "admin":
                return (
                    <>

                        {/* Content */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                                <div className="flex-shrink-0 bg-purple-500 p-2 rounded-full">
                                    <i className="fas fa-dollar-sign text-white"></i>
                                </div>
                                <div>
                                    <h3 className="text-gray-600">Total Revenue</h3>
                                    <p className="text-2xl font-bold">$405,091.00</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                                <div className="flex-shrink-0 bg-blue-500 p-2 rounded-full">
                                    <i className="fas fa-chalkboard-teacher text-white"></i>
                                </div>
                                <div>
                                    <h3 className="text-gray-600">Total Classes</h3>
                                    <p className="text-2xl font-bold">15</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                                <div className="flex-shrink-0 bg-green-500 p-2 rounded-full">
                                    <i className="fas fa-users text-white"></i>
                                </div>
                                <div>
                                    <h3 className="text-gray-600">Total Teachers</h3>
                                    <p className="text-2xl font-bold">20</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                                <div className="flex-shrink-0 bg-yellow-500 p-2 rounded-full">
                                    <i className="fas fa-user-graduate text-white"></i>
                                </div>
                                <div>
                                    <h3 className="text-gray-600">Total Students</h3>
                                    <p className="text-2xl font-bold">200</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                            <div className="bg-white p-4 rounded shadow">
                                <p>No recent activity yet.</p>
                            </div>
                        </div>
                    </>
                );
            case "student":
                return (
                    <StudentDashboard />
                );
            case "teacher":
            default:
                return (
                    <TeacherDashboard />
                );
        }
    };

    return (
        <>
            {renderDashboardContent()}
        </>
    );
};

export default Dashboard;
