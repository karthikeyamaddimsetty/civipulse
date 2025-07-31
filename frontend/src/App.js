// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axiosInstance from "./utils/axiosInstance";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import SubmitCasePage from "./pages/SubmitCasePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await axiosInstance.get("/auth/me");
        setUser({ ...res.data, token }); // Restore token
      } catch (err) {
        console.error("Auth check failed:", err.message);
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      {user && <Navbar user={user} logout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/home" />
            ) : (
              <LoginPage setUser={setUser} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/home" />
            ) : (
              <RegisterPage setUser={setUser} />
            )
          }
        />
        <Route
          path="/home"
          element={user ? <HomePage user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/submit"
          element={user ? <SubmitCasePage user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/analytics"
          element={user ? <AnalyticsPage user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage user={user} /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
