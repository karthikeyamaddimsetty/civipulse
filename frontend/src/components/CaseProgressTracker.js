import React from 'react';

const statuses = ['Pending', 'In Progress', 'Resolved'];

const CaseProgressTracker = ({ currentStatus = 'Pending' }) => {
  const statusIndex = statuses.indexOf(currentStatus);

  return (
    <div className="p-6 bg-white dark:bg-gray-700 shadow rounded w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Case Progress</h2>
      <div className="flex justify-between items-center">
        {statuses.map((status, i) => (
          <div key={status} className="flex flex-col items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${i <= statusIndex ? 'bg-green-500' : 'bg-gray-400'}`}>
              {i + 1}
            </div>
            <span className="mt-2 text-sm">{status}</span>
            {i < statuses.length - 1 && <div className="h-1 w-full bg-gray-300 mt-2"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseProgressTracker;
