import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HeadMentor() {
  const [mentors, setMentors] = useState([]);
  const [dept, setDept] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    dept: '',
    batch: '',
    sec: '',
    experience: '',
    overallratings: '',
  });
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState('');

  // Fetch the head's department based on email
  const email = localStorage.getItem('email');
  const token = localStorage.getItem("token");
  useEffect(() => {
      const fetchHeadDetails = async () => {
          try {
              setIsLoading(true);
              const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:8080/api/heads/${email}`, config);
        setDept(response.data.dept); // Assuming the API returns the department
        console.log('Department fetched:', response.data.dept); // Debugging line
      } catch (error) {
        console.error('Error fetching head details:', error);
        setShowToast('Error fetching department details');
      } finally {
        setIsLoading(false);
      }
    };

    if (email) {
      fetchHeadDetails();
    }
  }, [email]);

  // Fetch mentors based on the department
  useEffect(() => {
    const fetchMentorsByDept = async () => {
      if (dept) {
        try {
          setIsLoading(true);
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(`http://localhost:8080/api/mentors/department/${dept}`, config);
          setMentors(response.data);
          console.log('Mentors fetched:', response.data); // Debugging line
        } catch (error) {
          console.error('Error fetching mentors:', error);
          setShowToast('Error fetching mentor details');
        } finally {
          setIsLoading(false);
        }
      } else {
        setMentors([]); // Clear mentors if no department is set
      }
    };

    fetchMentorsByDept();
  }, [dept]);

  // Filter mentors
  useEffect(() => {
    const applyFilters = () => {
      const filtered = mentors.filter((mentor) => {
        return (
          (!filters.name || mentor.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (!filters.email || mentor.email.toLowerCase().includes(filters.email.toLowerCase())) &&
          (!filters.department || mentor.department.toLowerCase().includes(filters.department.toLowerCase())) &&
          (!filters.batch || mentor.batch.toLowerCase().includes(filters.batch.toLowerCase())) &&
          (!filters.sec || mentor.sec.toLowerCase().includes(filters.section.toLowerCase())) &&
          (!filters.experience || mentor.experience.toString() === filters.experience) &&
          (!filters.overallratings || mentor.overallratings.toString() === filters.overallratings)
        );
      });
      setFilteredMentors(filtered);
      console.log('Filtered Mentors:', filtered); // Debugging line
    };

    applyFilters();
  }, [filters, mentors]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className='admin-mentor'>
      {isLoading && <p>Loading...</p>}
      {showToast && <p>{showToast}</p>}
      
      <div className="admin-mentor-filters">
        {/* Filter inputs */}
        {Object.keys(filters).filter(key => key !== 'dept').map(key => (
          <div className="admin-mentor-filter-group" key={key}>
            <label htmlFor={`${key}-filter`}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type={key === 'experience' || key === 'overallratings' ? 'number' : 'text'}
              id={`${key}-filter`}
              name={key}
              placeholder={`Enter ${key}`}
              value={filters[key]}
              onChange={handleFilterChange}
            />
          </div>
        ))}
      </div>
      
      <div className="admin-mentor-container">
        <h2>Mentor Details</h2>
        <div className="card-container">
          <div className="card full-row-card">
            <h3>Total Mentors</h3>
            <div className="count-circle">{filteredMentors.length}</div>
          </div>
        </div>

        <div className="admin-mentor-table-wrapper">
          <table className="admin-mentor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Batch</th>
                <th>Section</th>
                <th>Years of Experience</th>
                <th>Overall Ratings</th>
              </tr>
            </thead>
            <tbody>
              {filteredMentors.map((mentor) => (
                <tr key={mentor.email}>
                  <td>{mentor.name}</td>
                  <td>{mentor.email}</td>
                  <td>{mentor.dept}</td>
                  <td>{mentor.batch}</td>
                  <td>{mentor.sec}</td>
                  <td>{mentor.experience}</td>
                  <td>{mentor.overallratings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HeadMentor;
