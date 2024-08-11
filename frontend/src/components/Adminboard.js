// import React, { useState } from 'react';
// import '../assets/style/Admin.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faChartBar, faCalendarAlt, faUsers, faPlus, faEdit, faSignOutAlt, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// // Main Admin Component
// const Admin = () => {
//   const [activeTab, setActiveTab] = useState('welcome');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return <Profile />;
//       case 'statistics':
//         return <Statistics />;
//       case 'schedules':
//         return <Schedules />;
//       case 'interviewers':
//         return <Interviewers setActiveTab={setActiveTab} />;
//       case 'coders':
//         return <Coders setActiveTab={setActiveTab} />;
//       case 'reports':
//         return <Reports />;
//       default:
//         return <Welcome />;
//     }
//   };

//   return (
//     <div className="admin">
//       <div className="sidebar">
//         <div className="profile-icon">
//           <FontAwesomeIcon icon={faUser} />
//         </div>
//         <ul>
//           <li onClick={() => setActiveTab('profile')}><FontAwesomeIcon icon={faUser} /> Profile</li>
//           <li onClick={() => setActiveTab('statistics')}><FontAwesomeIcon icon={faChartBar} /> Statistics</li>
//           <li onClick={() => setActiveTab('schedules')}><FontAwesomeIcon icon={faCalendarAlt} /> Schedules</li>
//           <li onClick={() => setActiveTab('interviewers')}><FontAwesomeIcon icon={faUsers} /> Interviewers</li>
//           <li onClick={() => setActiveTab('coders')}><FontAwesomeIcon icon={faUsers} /> Coders</li>
//           <li onClick={() => setActiveTab('reports')}><FontAwesomeIcon icon={faEdit} /> Reports</li>
//           <li onClick={() => setActiveTab('welcome')}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</li>
//         </ul>
//       </div>
//       <div className="content">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// // Welcome Component
// const Welcome = () => (
//   <div className="welcome">
//     <h2>Welcome, Admin!</h2>
//     <p>Please select an option from the sidebar to manage the system.</p>
//   </div>
// );

// // Profile Component
// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "Admin",
//     email: "admin@example.com",
//     password: "password123",
//     qualification:"MBA",
//     experience: "5 years"
//   });

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleChange = (e) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     console.log("Profile updated:", profileData);
//     setIsEditing(false);
//   };

//   return (
//     <div className="profile">
//       <h2>Admin Profile</h2>
//       {isEditing ? (
//         <form onSubmit={handleSave}>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={profileData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={profileData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={profileData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit">Update Profile</button>
//         </form>
//       ) : (
//         <div>
//           <p><strong>Name:</strong> {profileData.name}</p>
//           <p><strong>Email:</strong> {profileData.email}</p>
//           <p><strong>Password:</strong> {profileData.password}</p>
//           <button onClick={handleEdit}>Edit</button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Statistics Component
// const Statistics = () => (
//   <div className="statistics">
//     <div className="card">
//       <h3>Users</h3>
//       <p>100</p>
//     </div>
//     <div className="card">
//       <h3>Interviewers</h3>
//       <p>20</p>
//     </div>
//     <div className="card">
//       <h3>Coders</h3>
//       <p>50</p>
//     </div>
//   </div>
// );

// // Schedules Component
// const Schedules = () => {
//   const [schedules, setSchedules] = useState([
//     { id: 1, interviewer: 'John Smith', date: '2024-08-01' },
//     { id: 2, interviewer: 'Jane Doe', date: '2024-08-02' },
//   ]);

//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({ interviewer: '', date: '' });

//   const handleEdit = (schedule) => {
//     setEditingId(schedule.id);
//     setFormData(schedule);
//   };

//   const handleDelete = (id) => {
//     setSchedules(schedules.filter(schedule => schedule.id !== id));
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     setSchedules(schedules.map(schedule => (schedule.id === editingId ? formData : schedule)));
//     setEditingId(null);
//     setFormData({ interviewer: '', date: '' });
//   };

//   return (
//     <div className="schedules">
//       <h2>Schedules</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Interviewer</th>
//             <th>Session Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {schedules.map(schedule => (
//             <tr key={schedule.id}>
//               {editingId === schedule.id ? (
//                 <>
//                   <td><input type="text" name="interviewer" value={formData.interviewer} onChange={handleChange} /></td>
//                   <td><input type="date" name="date" value={formData.date} onChange={handleChange} /></td>
//                   <td>
//                     <button onClick={handleSave}>Save</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{schedule.interviewer}</td>
//                   <td>{schedule.date}</td>
//                   <td>
//                     <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEdit(schedule)} style={{ cursor: 'pointer', marginRight: '10px' }} />
//                     <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(schedule.id)} style={{ cursor: 'pointer' }} />
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Interviewers Component
// const Interviewers = ({ setActiveTab }) => {
//   const [interviewers, setInterviewers] = useState([
//     { id: 1, name: 'John Smith', qualification: 'M.Sc', experience: '5 years', email: 'john@example.com', password: 'password123' },
//     { id: 2, name: 'Jane Doe', qualification: 'B.Tech', experience: '3 years', email: 'jane@example.com', password: 'password456' },
//     // More interviewers...
//   ]);

//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});

//   const handleEdit = (interviewer) => {
//     setEditingId(interviewer.id);
//     setFormData(interviewer);
//   };

//   const handleDelete = (id) => {
//     setInterviewers(interviewers.filter(interviewer => interviewer.id !== id));
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     setInterviewers(interviewers.map(interviewer => (interviewer.id === editingId ? formData : interviewer)));
//     setEditingId(null);
//     setFormData({});
//   };

//   return (
//     <div className="interviewers">
//       <h2>Interviewers</h2>
//       <button onClick={() => setActiveTab('addInterviewer')}><FontAwesomeIcon icon={faPlus} /> Add Interviewer</button>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Qualification</th>
//             <th>Experience</th>
//             <th>Email</th>
//             <th>Password</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {interviewers.map(interviewer => (
//             <tr key={interviewer.id}>
//               {editingId === interviewer.id ? (
//                 <>
//                   <td><input type="text" name="name" value={formData.name} onChange={handleChange} /></td>
//                   <td><input type="text" name="qualification" value={formData.qualification} onChange={handleChange} /></td>
//                   <td><input type="text" name="experience" value={formData.experience} onChange={handleChange} /></td>
//                   <td><input type="email" name="email" value={formData.email} onChange={handleChange} /></td>
//                   <td><input type="password" name="password" value={formData.password} onChange={handleChange} /></td>
//                   <td>
//                     <button onClick={handleSave}>Save</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{interviewer.name}</td>
//                   <td>{interviewer.qualification}</td>
//                   <td>{interviewer.experience}</td>
//                   <td>{interviewer.email}</td>
//                   <td>{interviewer.password}</td>
//                   <td>
//                     <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEdit(interviewer)} style={{ cursor: 'pointer', marginRight: '10px' }} />
//                     <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(interviewer.id)} style={{ cursor: 'pointer' }} />
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Coders Component
// const Coders = ({ setActiveTab }) => {
//   const [coders, setCoders] = useState([
//     { id: 1, name: 'Alice Johnson', email: 'alice@example.com', password: 'password123' },
//     { id: 2, name: 'Bob Brown', email: 'bob@example.com', password: 'password456' },
//     // More coders...
//   ]);

//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});

//   const handleEdit = (coder) => {
//     setEditingId(coder.id);
//     setFormData(coder);
//   };

//   const handleDelete = (id) => {
//     setCoders(coders.filter(coder => coder.id !== id));
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     setCoders(coders.map(coder => (coder.id === editingId ? formData : coder)));
//     setEditingId(null);
//     setFormData({});
//   };

//   return (
//     <div className="coders">
//       <h2>Coders</h2>
//       <button onClick={() => setActiveTab('addCoder')}><FontAwesomeIcon icon={faPlus} /> Add Coder</button>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Password</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {coders.map(coder => (
//             <tr key={coder.id}>
//               {editingId === coder.id ? (
//                 <>
//                   <td><input type="text" name="name" value={formData.name} onChange={handleChange} /></td>
//                   <td><input type="email" name="email" value={formData.email} onChange={handleChange} /></td>
//                   <td><input type="password" name="password" value={formData.password} onChange={handleChange} /></td>
//                   <td>
//                     <button onClick={handleSave}>Save</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{coder.name}</td>
//                   <td>{coder.email}</td>
//                   <td>{coder.password}</td>
//                   <td>
//                     <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEdit(coder)} style={{ cursor: 'pointer', marginRight: '10px' }} />
//                     <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(coder.id)} style={{ cursor: 'pointer' }} />
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Reports Component
// const Reports = () => {
//   const [reports, setReports] = useState([
//     { id: 1, student: 'Alice Johnson', date: '2024-07-15', score: 85 },
//     { id: 2, student: 'Bob Brown', date: '2024-07-16', score: 92 },
//     { id: 3, student: 'Charlie Davis', date: '2024-07-17', score: 78 },
//   ]);

//   return (
//     <div className="reports">
//       <h2>Student Reports</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Student Name</th>
//             <th>Date</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map(report => (
//             <tr key={report.id}>
//               <td>{report.student}</td>
//               <td>{report.date}</td>
//               <td>{report.score}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Admin;
