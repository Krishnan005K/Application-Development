import React, { useState } from 'react';
import '../../assets/styles/Admin/AdminProfile.css';
import { FiEdit } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

const AdminProfileDashboard = () => {
  // Sample Data for Charts
  const performanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Performance",
        data: [75, 85, 80, 90, 95, 70, 88],
        backgroundColor: "#73a2df",
        borderColor: "#002F6C",
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const overallData = {
    labels: ["Excellent", "Very Good", "Good", "Average", "Below Average"],
    datasets: [
      {
        data: [50, 30, 15, 3, 2],
        backgroundColor: ["#004b94", "#0073e6", "#59b2ff", "#9fd3ff", "#c2e2ff"],
      },
    ],
  };

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin',
    email: 'k@gmail.com',
    password: '',
    contact: '+9876543210',
    overallPerformance: '90%',
    dailyPerformance: '90% ',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add code to save the changes to your backend or database if necessary.
  };

  return (
    <div className="admin-profile-dashboard">
      <div className="profile-header">
        <h2 className="profile-title">Admin Profile</h2>
        <button className="edit-button" onClick={handleEditToggle}>
          {isEditing ? 'Save' : 'Edit Profile'} <FiEdit />
        </button>
      </div>

      <div className="profile-info-section">
        {Object.keys(adminProfile).map((key) => (
          <div className="info-card" key={key}>
            <h3>{key.charAt(0).toUpperCase() + key.slice(1)}:</h3>
            {isEditing ? (
              <input
                type={key === 'password' ? 'password' : 'text'}
                name={key}
                value={adminProfile[key]}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <p>{adminProfile[key]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Daily Performance</h3>
          <Line data={performanceData} />
        </div>
        <div className="chart-card">
          <h3>Overall Performance Breakdown</h3>
          <Pie data={overallData} />
        </div>
      </div>

      <div className="performance-status-section">
        <div className="info-card">
          <h3>Overall College Performance:</h3>
          <p>{adminProfile.overallPerformance}</p>
        </div>
        <div className="info-card">
          <h3>Daily Performance Status:</h3>
          <p>{adminProfile.dailyPerformance}</p>
        </div>
      </div>
    </div>
  );
};
export default AdminProfileDashboard;