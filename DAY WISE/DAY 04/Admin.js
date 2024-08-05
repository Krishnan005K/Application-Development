import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/Admin.css';

function Admin() {
    const navigate = useNavigate();

    const [adminDetails, setAdminDetails] = useState({
        name: 'Admin Name',
        email: 'admin@example.com',
        phone: '123-456-7890'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState('schedule');
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState("");

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setAdminDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleLogout = () => {
        navigate("/");
    };

    const handleDownload = (section) => {
        let content = "";
        switch (section) {
            case 'schedule':
                content = "Interviewer 1 - 10:00 AM to 11:00 AM, 2024-07-27\nInterviewer 2 - 11:00 AM to 12:00 PM, 2024-07-28";
                break;
            case 'interviewers':
                content = "Interviewer 1\nInterviewer 2";
                break;
            case 'users':
                content = "User 1\nUser 2";
                break;
            case 'reports':
                content = "Coder 1 - Interview on 2024-07-26 at 10:00 AM\nCorrect Questions: 8/10\nRemarks: Excellent\n\nCoder 2 - Interview on 2024-07-26 at 11:00 AM\nCorrect Questions: 7/10\nRemarks: Good";
                break;
            default:
                break;
        }
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${section}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'schedule':
                return (
                    <div className="admin-section">
                        <h2>Interviewers and Scheduled Timings</h2>
                        <div className="admin-buttons">
                            <button onClick={() => showPopupForm("Add Schedule")}>Add Schedule</button>
                            <button onClick={() => handleDownload('schedule')}>Download Schedules</button>
                        </div>
                        <div className="interviewers-list">
                            <p>Interviewer 1 - 10:00 AM to 11:00 AM, 2024-07-27</p>
                            <p>Interviewer 2 - 11:00 AM to 12:00 PM, 2024-07-28</p>
                        </div>
                    </div>
                );
            case 'interviewers':
                return (
                    <div className="admin-section">
                        <h2>List of Interviewers</h2>
                        <div className="admin-buttons">
                            <button onClick={() => showPopupForm("Add Interviewer")}>Add Interviewer</button>
                            <button onClick={() => handleDownload('interviewers')}>Download Interviewers</button>
                        </div>
                        <div className="interviewers-list">
                            <p>Interviewer 1</p>
                            <p>Interviewer 2</p>
                        </div>
                    </div>
                );
            case 'users':
                return (
                    <div className="admin-section">
                        <h2>List of Users</h2>
                        <div className="admin-buttons">
                            <button onClick={() => showPopupForm("Add User")}>Add User</button>
                            <button onClick={() => handleDownload('users')}>Download Users</button>
                        </div>
                        <div className="coders-list">
                            <p>User 1</p>
                            <p>User 2</p>
                        </div>
                    </div>
                );
            case 'profile':
                return (
                    <div className="admin-section">
                        <h2>Admin Profile</h2>
                        {isEditing ? (
                            <div className="admin-profile">
                                <input
                                    type="text"
                                    name="name"
                                    value={adminDetails.name}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={adminDetails.email}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={adminDetails.phone}
                                    onChange={handleEditChange}
                                />
                                <button onClick={() => setIsEditing(false)}>Save</button>
                            </div>
                        ) : (
                            <div className="admin-profile">
                                <p>Name: {adminDetails.name}</p>
                                <p>Email: {adminDetails.email}</p>
                                <p>Phone: {adminDetails.phone}</p>
                                <button onClick={() => setIsEditing(true)}>Edit</button>
                            </div>
                        )}
                    </div>
                );
            case 'reports':
                return (
                    <div className="admin-section">
                        <h2>Coder Reports</h2>
                        <div className="admin-buttons">
                            <button onClick={() => handleDownload('reports')}>Download Reports</button>
                        </div>
                        <div className="reports-list">
                            <p>Coder 1 - Interview on 2024-07-26 at 10:00 AM</p>
                            <p>Correct Questions: 8/10</p>
                            <p>Remarks: Excellent</p>
                            <p>Coder 2 - Interview on 2024-07-26 at 11:00 AM</p>
                            <p>Correct Questions: 7/10</p>
                            <p>Remarks: Good</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const showPopupForm = (title) => {
        setPopupContent(title);
        setShowPopup(true);
    };

    const closePopupForm = () => {
        setShowPopup(false);
        setPopupContent("");
    };

    return (
        <div className="admin-page">
            <div className="sidebar">
                <ul>
                    <li onClick={() => setActiveSection('schedule')}>Schedule</li>
                    <li onClick={() => setActiveSection('interviewers')}>Interviewers</li>
                    <li onClick={() => setActiveSection('users')}>Users</li>
                    <li onClick={() => setActiveSection('profile')}>Profile</li>
                    <li onClick={() => setActiveSection('reports')}>Reports</li>
                </ul>
            </div>
            <div className="content">
                <h1>Welcome Back, Admin!</h1>
                {renderSection()}
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>{popupContent}</h2>
                        <form>
                            {/* Add form inputs based on popupContent */}
                            <input type="text" placeholder="Enter details here..." />
                            <button type="button" onClick={closePopupForm}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
