import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Admin/Student.css';

function Student() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [formData, setFormData] = useState({
    userId: '',
    registerNo: '',
    name: '',
    email: '',
    password: '',
    dept: '',
    batch: '',
    section: '',
    ratings: '',
    contact: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ show: false, message: '', icon: null });

  const token = localStorage.getItem('token');
  const apiUrl = 'http://127.0.0.1:8080/api/admin/students'; // Adjust endpoint if needed

  useEffect(() => {
    axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setStudents(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiUrl, token]);

  const filteredStudents = students.filter(student =>
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     String(student.userId).includes(searchTerm)) &&
    (deptFilter === '' || student.dept === deptFilter)
  );

  const handleInputChange = (e, index = null) => {
    if (index !== null) {
      const updatedStudents = [...students];
      updatedStudents[index] = { ...updatedStudents[index], [e.target.name]: e.target.value };
      setStudents(updatedStudents);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateFields = (data) => {
    let isValid = true;
    let errors = {};
    if (!data.registerNo) errors.registerNo = 'Register No is required';
    if (!data.name) errors.name = 'Name is required';
    if (!data.email) errors.email = 'Email is required';
    if (!data.password) errors.password = 'Password is required';
    if (!data.dept) errors.dept = 'Department is required';
    if (!data.batch) errors.batch = 'Batch is required';
    if (!data.section) errors.section = 'Section is required';
    if (!data.ratings) errors.ratings = 'Ratings are required';
    if (!data.contact) errors.contact = 'Contact is required';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      isValid = false;
    } else {
      setErrors({});
    }
    return isValid;
  };

  const showPopup = (message, icon) => {
    setPopup({ show: true, message, icon });
    setTimeout(() => {
      setPopup({ show: false, message: '', icon: null });
    }, 5000);
  };

  const handleAddOrEdit = async () => {
    if (validateFields(formData)) {
      if (editingIndex !== null) {
        const updatedStudent = students[editingIndex];
        await axios.put(`${apiUrl}/${updatedStudent.userId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
          const updatedStudents = [...students];
          updatedStudents[editingIndex] = response.data;
          setStudents(updatedStudents);
          setEditingIndex(null);
          setFormData({
            userId: '',
            registerNo: '',
            name: '',
            email: '',
            password: '',
            dept: '',
            batch: '',
            section: '',
            ratings: '',
            contact: ''
          });
          showPopup('Student updated successfully!', faCheck);
        }).catch((error) => {
          console.log(error);
        });
      } else {
        await axios.post(apiUrl, formData, {
          headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
          setStudents([...students, response.data]);
          setFormData({
            userId: '',
            registerNo: '',
            name: '',
            email: '',
            password: '',
            dept: '',
            batch: '',
            section: '',
            ratings: '',
            contact: ''
          });
          showPopup('Student added successfully!', faCheck);
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  };

  const handleEditClick = (index) => {
    setTempData({ ...students[index] });
    setEditingIndex(index);
    setFormData(students[index]);
  };

  const handleSaveClick = () => {
    setEditingIndex(null);
    setTempData(null);
  };

  const handleCancelClick = () => {
    const updatedStudents = [...students];
    updatedStudents[editingIndex] = tempData;
    setStudents(updatedStudents);
    setEditingIndex(null);
    setTempData(null);
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const studentToDelete = students[index];
      await axios.delete(`${apiUrl}/${studentToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
        showPopup('Student deleted successfully!', faTrash);
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <div className="student-view">
      <h2>Student Management</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by ID, Name, or Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>
      </div>

      <div className="student-form-container">
        <div className="student-form">
          <input type="text" name="registerNo" placeholder="Register No" value={formData.registerNo} onChange={handleInputChange} />
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          <input type="text" name="dept" placeholder="Department" value={formData.dept} onChange={handleInputChange} />
          <input type="text" name="batch" placeholder="Batch" value={formData.batch} onChange={handleInputChange} />
          <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleInputChange} />
          <input type="number" name="ratings" placeholder="Ratings" value={formData.ratings} onChange={handleInputChange} />
          <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleInputChange} />
         
          <button className="add-student-button" onClick={handleAddOrEdit}>
            <FontAwesomeIcon icon={faPlus} /> {editingIndex !== null ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Register No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Department</th>
            <th>Batch</th>
            <th>Section</th>
            <th>Ratings</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td><input type="text" name="registerNo" value={student.registerNo} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="name" value={student.name} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="email" name="email" value={student.email} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="password" name="password" value={student.password} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="dept" value={student.dept} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="batch" value={student.batch} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="section" value={student.section} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="number" name="ratings" value={student.ratings} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td><input type="text" name="contact" value={student.contact} onChange={(e) => handleInputChange(e, index)} /></td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} onClick={handleSaveClick} className="action-icon" />
                    <FontAwesomeIcon icon={faTimes} onClick={handleCancelClick} className="action-icon" />
                  </td>
                </>
              ) : (
                <>
                  <td>{student.registerNo}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.password}</td>
                  <td>{student.dept}</td>
                  <td>{student.batch}</td>
                  <td>{student.section}</td>
                  <td>{student.ratings}</td>
                  <td>{student.contact}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(index)} className="action-icon" />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} className="action-icon" />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {popup.show && (
        <div className="popup">
          <FontAwesomeIcon icon={popup.icon} className="popup-icon" />
          <p className="popup-message">{popup.message}</p>
        </div>
      )}
    </div>
  );
}

export default Student;
