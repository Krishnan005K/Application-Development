import React, { useState } from 'react';
import '../../assets/styles/Admin/AdminProfile.css';
import { FiEdit } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

const ProfileDashboard = () => {
  // Sample Data for Charts
  const scoreData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Score",
        data: [80, 85, 70, 90, 95, 75, 88],
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
        data: [40, 30, 20, 5, 5],
        backgroundColor: ["#004b94", "#0073e6", "#59b2ff", "#9fd3ff", "#c2e2ff"],
      },
    ],
  };

  // Profile State
  const [profile, setProfile] = useState({
    name: 'Krishnan',
    registerNo: 'CS123',
    email: 'string@gmail.com',
    phone: '+123-456-7890',
    department: 'Computer Science',
    batch: '2022',
    dailyStatus: 'Completed 85% of tasks',
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
        <h2 className="profile-title">Student Profile</h2>
        <button className="edit-button" onClick={handleEditToggle}>
          {isEditing ? 'Save' : 'Edit Profile'} <FiEdit />
        </button>
      </div>

      <div className="profile-info-section">
        {Object.keys(profile).map((key) => (
          <div className="info-card" key={key}>
            <h3>{key.charAt(0).toUpperCase() + key.slice(1)}:</h3>
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
          <h3>Daily Scores</h3>
          <Line data={scoreData} />
        </div>
        <div className="chart-card">
          <h3>Ratings Breakdown</h3>
          <Pie data={ratingData} />
        </div>
      </div>

      <div className="score-status-section">
        <div className="info-card">
          <h3>Total Score:</h3>
          <p>750/1000</p>
        </div>
        <div className="info-card">
          <h3>Ratings:</h3>
          <p>4.5/5</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
