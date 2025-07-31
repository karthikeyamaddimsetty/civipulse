// src/components/FilterControls.js
import React from 'react';

const FilterControls = ({ statusFilter, setStatusFilter }) => {
  return (
    <div className="mb-4 flex gap-3">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded px-3 py-1"
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>
  );
};

export default FilterControls;
