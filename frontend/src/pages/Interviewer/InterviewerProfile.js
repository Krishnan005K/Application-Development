import React, { useState } from 'react';
import '../../assets/styles/Interviewer/InterviewerProfile.css'; // Ensure this path is correct
import InterviewerProfileImg from '../../assets/images/attend-interview-image.png'; // Replace with actual path

const InterviewerProfile = () => {
  const [interviewerData, setInterviewerData] = useState({
    username: 'interviewer_user',
    email: 'interviewer@example.com',
    password: 'password123',
    phoneNumber: '987-654-3210',
    qualification: 'Bachelor’s in Software Engineering',
    role: 'Interviewer',
    experience: '5 years',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const emptyFields = Object.values(interviewerData).some(field => field === '');
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
    setInterviewerData({ ...interviewerData, [e.target.name]: e.target.value });
  };

  return (
    <div className='profile-interviewer-whole-container'>
      <div className="profile-interviewer-container">
        <div className="profile-image-container">
          <img src={InterviewerProfileImg} alt="Interviewer" className="profile-image" />
        </div>
        <h2>Interviewer Profile</h2>
        <form className="profile-form">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={interviewerData.username} disabled />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={interviewerData.email} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={interviewerData.password} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input 
              type="text" 
              name="phoneNumber" 
              value={interviewerData.phoneNumber} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Qualification:</label>
            <input 
              type="text" 
              name="qualification" 
              value={interviewerData.qualification} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input type="text" value={interviewerData.role} disabled />
          </div>
          <div className="form-group">
            <label>Years of Experience:</label>
            <input 
              type="text" 
              name="experience" 
              value={interviewerData.experience} 
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
    </div>
  );
};

export default InterviewerProfile;
