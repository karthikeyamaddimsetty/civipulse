// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance"; // ✅ axios with baseURL and token

const HomePage = ({ user }) => {
  const [cases, setCases] = useState([]);

  const fetchCases = async () => {
    try {
      const res = await axios.get("/cases");
      setCases(res.data);
    } catch (err) {
      console.error("Failed to load cases");
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`/cases/${id}/status`, { status: newStatus });
      fetchCases();
    } catch (err) {
      alert("Please login again"); // likely token expired
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this case?")) return;
    try {
      await axios.delete(`/cases/${id}`);
      fetchCases();
    } catch (err) {
      alert("Failed to delete case");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Submitted Cases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((c) => (
          <div key={c._id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="text-gray-700">{c.description}</p>
            {c.location && <p><strong>Location:</strong> {c.location}</p>}
            <p><strong>Status:</strong> {c.status}</p>
            {c.image && (
              <img
                src={`https://civicpulse1-1.onrender.com/uploads/${c.image}`}
                alt="Case"
                className="w-full mt-2 rounded"
              />
            )}

            {(user.role === "Admin" || user.role === "NGO") && (
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleStatusUpdate(c._id, "In Progress")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => handleStatusUpdate(c._id, "Resolved")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                >
                  Mark Resolved
                </button>
              </div>
            )}

            {user.role === "Admin" && (
              <div className="mt-2">
                <button
                  onClick={() => handleDelete(c._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                >
                  Delete Case
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
