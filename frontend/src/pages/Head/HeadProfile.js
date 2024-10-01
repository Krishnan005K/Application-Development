import React, { useState } from 'react';
import '../../assets/styles/Admin/AdminProfile.css';
import { FiEdit } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

const HODProfileDashboard = () => {
  // Sample Data for Charts
  const scoreData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Score",
        data: [85, 80, 90, 95, 88, 92, 85],
        backgroundColor: "#73a2df",
        borderColor: "#002F6C",
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const ratingData = {
    labels: ["Excellent", "Very Good", "Good", "Average", "Below Average"],
    datasets: [
      {
        data: [50, 25, 15, 7, 3],
        backgroundColor: ["#004b94", "#0073e6", "#59b2ff", "#9fd3ff", "#c2e2ff"],
      },
    ],
  };

  // HOD Profile State
  const [profile, setProfile] = useState({
    name: 'Lingesh',
    email: 'cse@gmail.com',
    password: '********',
    overallDepartmentStatus: '80% of department tasks completed',
    dailyStatus: 'Completed 75% of today’s tasks',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you can add code to save the changes to your backend or database if necessary.
  };

  return (
    <div className="profile-dashboard">
      <div className="profile-header">
        <h2 className="profile-title">HOD Profile</h2>
        <button className="edit-button" onClick={handleEditToggle}>
          {isEditing ? 'Save' : 'Edit Profile'} <FiEdit />
        </button>
      </div>

      <div className="profile-info-section">
        {Object.keys(profile).map((key) => (
          <div className="info-card" key={key}>
            <h3>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</h3>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={profile[key]}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <p>{profile[key]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Department Performance</h3>
          <Line data={scoreData} />
        </div>
        <div className="chart-card">
          <h3>Task Completion Breakdown</h3>
          <Pie data={ratingData} />
        </div>
      </div>

      <div className="score-status-section">
        <div className="info-card">
          <h3>Department Status:</h3>
          <p>85% of goals achieved</p>
        </div>
        <div className="info-card">
          <h3>Overall Rating:</h3>
          <p>4.7/5</p>
        </div>
      </div>
    </div>
  );
};
 export default HODProfileDashboard;