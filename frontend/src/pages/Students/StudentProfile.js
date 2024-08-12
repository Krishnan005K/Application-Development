import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/Admin/AdminProfile.css';
import AdminProfileImg from '../../assets/images/attend-interview-image.png';
// import AdminCharts from './AdminCharts';

const ProfileAdmin = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    qualification: '',
    role: '',
    experience: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const email = localStorage.getItem('email');

  useEffect(() => {
    if (email) {
      fetchStudentData();
    } else {
      console.error("No email found in localStorage");
    }
  }, [email]);

  const fetchStudentData = async () => {
    if (!email) {
      console.error("No email provided for fetching data.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`http://127.0.0.1:8080/students/email/${email}`, config);

      setStudentData({
        name: response.data.name || '',
        email: response.data.email || '',
        password: response.data.password || '',
        phoneNumber: response.data.phoneNumber || '',
        qualification: response.data.qualification || '',
        role: response.data.role || '',
        experience: response.data.experience || '',
      });
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const emptyFields = Object.values(studentData).some(field => field === '');
    if (emptyFields) {
      alert('Fields cannot be empty');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`http://127.0.0.1:8080/students/updateByEmail/${email}`, studentData, config);
      setShowConfirmation(false);
      setIsEditing(false);
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error saving student data:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  return (
    <div className='profile-admin-whole-container'>
      <div className="profile-admin-container">
        <div className="profile-image-container">
          <img src={AdminProfileImg} alt="Admin" className="profile-image" />
        </div>
        <h2>Student Profile</h2>
        <form className="profile-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleChange}
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={studentData.email} 
              onChange={handleChange} 
              disabled
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={studentData.password} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input 
              type="text" 
              name="phoneNumber" 
              value={studentData.phoneNumber} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Qualification:</label>
            <input 
              type="text" 
              name="qualification" 
              value={studentData.qualification} 
              onChange={handleChange} 
              disabled={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input 
              type="text" 
              name="role" 
              value={studentData.role} 
              disabled 
            />
          </div>
          <div className="form-group">
            <label>Years of Experience:</label>
            <input 
              type="text" 
              name="experience" 
              value={studentData.experience} 
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
      </div>
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to save the changes?</p>
          <div className="confirmation-actions">
            <button className="confirm-button" onClick={confirmSave}>Yes</button>
            <button className="cancel-button" onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        </div>
      )}
      {/* <AdminCharts /> */}
    </div>
  );
};

export default ProfileAdmin;
