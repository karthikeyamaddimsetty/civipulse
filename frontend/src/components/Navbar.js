// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  return (
    <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">CivicPulse</div>
      <div className="flex items-center space-x-4">
        <span className="text-sm">👋 Welcome, {user.name} ({user.role})</span>
        <Link to="/home" className="hover:underline">Home</Link>
        <Link to="/submit" className="hover:underline">Submit Case</Link>
        <Link to="/analytics" className="hover:underline">Analytics</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <button onClick={logout} className="text-red-400 hover:underline">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
