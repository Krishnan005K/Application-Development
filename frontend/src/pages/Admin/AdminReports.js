import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import '../../assets/styles/Admin/AdminReports.css';

const AdminReports = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('2024');

  // Example data with batches included; adjust as needed
  const allData = [
    { name: 'Class A', CSE: 85, IT: 78, CIVIL: 92, MECH: 75, EEE: 88, ECE: 80 },
    { name: 'Class B', CSE: 88, IT: 82, CIVIL: 90, MECH: 78, EEE: 86, ECE: 85 },
    { name: 'Class C', CSE: 90, IT: 80, CIVIL: 89, MECH: 80, EEE: 85, ECE: 87 },
  ];

  // Adjust logic to include batch filter if needed
  const filteredData = allData.map((entry) => ({
    name: entry.name,
    Rating: selectedDept === 'All' 
      ? (entry.CSE + entry.IT + entry.CIVIL + entry.MECH + entry.EEE + entry.ECE) / 6
      : entry[selectedDept],
  }));

  return (
    <div className="admin-reports">
      <h2 className='over'>Overall Rating Graph of Entire Classes</h2>
      <div className="filters">
        <div className="filter">
          <label htmlFor="batch-select">Batch:</label>
          <select id="batch-select" value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="dept-select">Department:</label>
          <select id="dept-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
            <option value="All">All</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="CIVIL">CIVIL</option>
            <option value="MECH">MECH</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
          </select>
        </div>
      </div>
      <div className="admin-reports-container">
        <ResponsiveContainer width="60%" height={400}>
          <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Rating" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminReports;
