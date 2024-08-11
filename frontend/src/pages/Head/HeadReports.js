// HeadReports.js
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import '../../assets/styles/Head/HeadReports.css';

const HeadReports = () => {
  const [selectedBatch, setSelectedBatch] = useState('2024');

  const allData = {
    2021: [
      { name: 'Class A', Rating: 82 },
      { name: 'Class B', Rating: 75 },
      { name: 'Class C', Rating: 88 },
    ],
    2022: [
      { name: 'Class A', Rating: 85 },
      { name: 'Class B', Rating: 80 },
      { name: 'Class C', Rating: 90 },
    ],
    2023: [
      { name: 'Class A', Rating: 80 },
      { name: 'Class B', Rating: 77 },
      { name: 'Class C', Rating: 85 },
    ],
    2024: [
      { name: 'Class A', Rating: 85 },
      { name: 'Class B', Rating: 78 },
      { name: 'Class C', Rating: 92 },
    ],
  };

  const data = allData[selectedBatch];

  return (
    <div className="head-reports">
      <h2>Overall Rating Graph of Entire Classes</h2>

      <div className="batch-filter">
        <label htmlFor="batch">Select Batch: </label>
        <select id="batch" value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <ResponsiveContainer width="60%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Rating" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeadReports;
