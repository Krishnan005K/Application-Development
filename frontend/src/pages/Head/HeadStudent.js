import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Head/HeadStudent.css';

function HeadStudent() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [formData, setFormData] = useState({ registerNo: '', name: '', email: '', password: '', dept: '', batch: '', section: '', ratings: '', contact: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [headDept, setHeadDept] = useState(''); // New state for head's department

  const token = localStorage.getItem('token');
  const apiUrl = 'http://127.0.0.1:8080/api/head';

  useEffect(() => {
    const headId = localStorage.getItem('userId');
    axios.get(`${apiUrl}/department/${headId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      setHeadDept(response.data.dept); // Set the head's department
    }).catch(error => console.error("There was an error fetching the head's department!", error));
  }, [apiUrl, token]);

  useEffect(() => {
    // Fetch students by head's department
    axios.get("http://localhost:8080/students/all")  // Update this API endpoint to match your backend
      .then(response => setStudents(response.data))
      .catch(error => console.error("There was an error fetching the students!", error));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/students/all", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setStudents(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [apiUrl, token]);

  useEffect(() => {
    // Fetch students based on selected department
    if (filterDept) {
      axios.get(`${apiUrl}/students?dept=${filterDept}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        setStudents(response.data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [filterDept, apiUrl, token]);

  const filteredStudents = students.filter(student =>
    (filterBatch === '' || student.batch === filterBatch) &&
    (filterSection === '' || student.section === filterSection) &&
    (student.registerNo ? student.registerNo.toLowerCase().includes(searchTerm.toLowerCase()) : false ||
      student.name ? student.name.toLowerCase().includes(searchTerm.toLowerCase()) : false ||
      student.email ? student.email.toLowerCase().includes(searchTerm.toLowerCase()) : false)
  );
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStudentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], [name]: value };
    setStudents(updatedStudents);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleSaveClick = () => {
    setEditingIndex(null);
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
  };

  const handleAddStudent = () => {
    const { registerNo, name, email, password, dept, batch, section, ratings, contact } = formData;
    if (registerNo && name && email && password && dept && batch && section && ratings && contact) {
      if (students.some(student => student.registerNo === registerNo || student.email === email)) {
        alert('Student with this ID or Email already exists.');
      } else {
        setStudents([...students, formData]);
        setFormData({ registerNo: '', name: '', email: '', password: '', dept: '', batch: '', section: '', ratings: '', contact: '' });
      }
    } else {
      alert('All fields must be filled out.');
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
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
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
          {headDept && <option value={headDept}>{headDept}</option>}
        </select>
        <select value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)}>
          <option value="">All Batches</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)}>
          <option value="">All Sections</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

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
        <button className="add-student-button" onClick={handleAddStudent}>
          <FontAwesomeIcon icon={faPlus} /> Add Student
        </button>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Register No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Dept</th>
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
                  <td>{student.registerNo}</td>
                  <td><input type="text" name="name" value={student.name} onChange={(e) => handleStudentChange(e, index)} /></td>
                  <td><input type="email" name="email" value={student.email} onChange={(e) => handleStudentChange(e, index)} /></td>
                  <td><input type="password" name="password" value={student.password} onChange={(e) => handleStudentChange(e, index)} /></td>
                  <td><input type="text" name="dept" value={student.dept} onChange={(e) => handleStudentChange(e, index)} /></td>
                  <td><input type="text" name="batch" value={student.batch} onChange={(e) => handleStudentChange(e, index)} /></td>
                  <td><input type="text" name="section" value={student.section} onChange={(e) => handleStudentChange(e, index)} /></td>
                  <td><input type="number" name="ratings" value={student.ratings} onChange={(e) => handleStudentChange(e, index)} /></td>
                  <td><input type="text" name="contact" value={student.contact} onChange={(e) => handleStudentChange(e, index)} /></td>
                  <td>
                    <button onClick={() => handleSaveClick()}>Save</button>
                    <button onClick={() => handleCancelClick()}>Cancel</button>
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
                    <button onClick={() => handleEditClick(index)}><FontAwesomeIcon icon={faEdit} /></button>
                    <button onClick={() => handleDelete(index)}><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HeadStudent;
