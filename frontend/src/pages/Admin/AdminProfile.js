
import React, { useState, useEffect } from 'react';
import '../../assets/styles/Admin/AdminProfile.css';
import AdminProfileImg from '../../assets/images/boy.png';

const ProfileAdmin = () => {
  const [adminData, setAdminData] = useState({
    username: 'admin_user',
    email: 'admin@example.com',
    password: 'password123',
    phoneNumber: '123-456-7890',
    qualification: 'Master’s in Computer Science',
    role: 'Administrator',
    experience: '10 years',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalAdmins, setTotalAdmins] = useState(50); // Example total number of admins

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const emptyFields = Object.values(adminData).some(field => field === '');
    if (emptyFields) {
      alert('Fields cannot be empty');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmSave = () => {
    setShowConfirmation(false);
    setIsEditing(false);
    // Add logic to save updated data
    alert('Data saved successfully');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  return (
    <div className='profile-admin-whole-container'>
      <div className="profile-admin-container">
        <div className="profile-image-container">
          <img src={AdminProfileImg} alt="Admin" className="profile-image" />
        </div>
        <h2>Admin Profile</h2>
        <form className="profile-form">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={adminData.username} disabled />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={adminData.email} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={adminData.password} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input 
              type="text" 
              name="phoneNumber" 
              value={adminData.phoneNumber} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Qualification:</label>
            <input 
              type="text" 
              name="qualification" 
              value={adminData.qualification} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input type="text" value={adminData.role} disabled />
          </div>
          <div className="form-group">
            <label>Years of Experience:</label>
            <input 
              type="text" 
              name="experience" 
              value={adminData.experience} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          {isEditing ? (
            <div className="form-actions">
              <button type="button" className="profile-save-button" onClick={handleSaveClick}>Save</button>
              <button type="button" className="profile-cancel-button" onClick={handleCancelClick}>Cancel</button>
            </div>
          ) : (
            <button type="button" className="profile-edit-button" onClick={handleEditClick}>Edit</button>
          )}
        </form>
        
        {showConfirmation && (
          <div className="confirmation-dialog">
            <p>Are you sure you want to save the changes?</p>
            <button type="button" className="confirm-yes-button" onClick={confirmSave}>Yes</button>
            <button type="button" className="confirm-no-button" onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        )}
      </div>
      {/* <div className="total-admin-card">
        <h3>Total Admins</h3>
        <div className="circular-progress">
          <div className="circular-number">{totalAdmins}</div>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileAdmin;
