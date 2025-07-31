import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold">CivicPulse</div>
        <div className="space-x-6">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/submit-case" className="hover:underline">
            Submit Case
          </Link>
          <Link to="/analytics" className="hover:underline">
            Analytics
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="hover:underline text-red-300"
          >
            Logout
          </button>
        </div>
      </nav>
      <header className="bg-white shadow px-6 py-4 text-gray-700 text-lg font-semibold">
        Welcome, {user?.name} ({user?.role})
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
