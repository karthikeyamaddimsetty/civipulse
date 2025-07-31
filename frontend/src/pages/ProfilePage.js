// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance"; // ✅ use interceptor

const ProfilePage = ({ user }) => {
  const [userCases, setUserCases] = useState([]);

  const fetchUserCases = async () => {
    try {
      const res = await axios.get("/cases");
      const allCases = res.data;

      const filtered = allCases.filter(
        (c) =>
          c.submittedBy === user._id ||
          c.createdBy === user._id ||
          c.submittedBy?._id === user._id ||
          c.createdBy?._id === user._id
      );

      setUserCases(filtered);
    } catch (err) {
      console.error("Failed to load user cases");
    }
  };

  useEffect(() => {
    fetchUserCases();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="mb-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Submitted Cases</h2>
      {userCases.length === 0 ? (
        <p>No submitted cases.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userCases.map((c) => (
            <div key={c._id} className="border p-4 rounded bg-white shadow">
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="text-gray-700">{c.description}</p>
              {c.location && <p><strong>Location:</strong> {c.location}</p>}
              <p><strong>Status:</strong> {c.status}</p>
              {c.image && (
                <img
                  src={`${axios.defaults.baseURL}/uploads/${c.image}`}
                  alt="Case"
                  className="w-full mt-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
