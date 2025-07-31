// ✅ CivicPulse Frontend Features Implementation
// This includes: Badge colors, status update, assign case, dashboard charts, filtering, and My Cases page.

// We'll break this into updated code sections for:
// 1. CaseCard.js – status badge color
// 2. AllCasesPage.js – status update + assign dropdown (for Admin/NGO)
// 3. DashboardAnalytics.js – chart of submitted vs resolved cases
// 4. FilterControls.js – filter by status/location
// 5. MyCasesPage.js – view citizen's submitted cases
// 6. Backend caseRoutes.js – filtering logic for role


// 1️⃣ CaseCard.js
import React from 'react';

const statusColor = {
  Pending: 'bg-yellow-300 text-yellow-800',
  'In Progress': 'bg-blue-300 text-blue-800',
  Resolved: 'bg-green-300 text-green-800',
};

const CaseCard = ({ caseData }) => {
  const { title, description, location, status, createdAt } = caseData;
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-700">{description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor[status]}`}>{status}</span>
        <span className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CaseCard;