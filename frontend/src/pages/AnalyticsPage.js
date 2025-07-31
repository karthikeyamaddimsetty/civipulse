import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axiosInstance.get("/cases");
      const cases = res.data;

      // Group by month
      const monthlyData = {};

      cases.forEach((c) => {
        const date = new Date(c.createdAt);
        const month = date.toLocaleString("default", { month: "short", year: "numeric" });

        if (!monthlyData[month]) {
          monthlyData[month] = { month, submitted: 0, resolved: 0 };
        }

        monthlyData[month].submitted += 1;
        if (c.status === "Resolved") {
          monthlyData[month].resolved += 1;
        }
      });

      const formatted = Object.values(monthlyData).sort((a, b) =>
        new Date("1 " + a.month) - new Date("1 " + b.month)
      );
      setData(formatted);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Case Analytics</h1>
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="submitted" fill="#3182ce" name="Submitted Cases" />
            <Bar dataKey="resolved" fill="#38a169" name="Resolved Cases" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AnalyticsPage;
