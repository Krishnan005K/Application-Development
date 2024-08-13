import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import '../../assets/styles/Head/HeadChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function HeadChart() {
  const [department, setDepartment] = useState('');
  const [departmentData, setDepartmentData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);
  const [filters, setFilters] = useState({
    batch: '',
    section: '',
  });

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch head details to get the department
  const fetchHeadDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/heads/id/${userId}`, config);
      setDepartment(response.data.dept);
    } catch (error) {
      console.error('Error fetching head details:', error);
    }
  };

  // Fetch data for the charts based on department and filters
  const fetchData = async () => {
    if (!department) return;
    try {
      const [departmentResponse, studentsResponse, batchResponse, ratingsResponse] = await Promise.all([
        axios.get(`http://localhost:8080/api/heads/ratings/department/${department}`, config),
        axios.get(`http://localhost:8080/api/heads/ratings/students/dept/${department}/section/${filters.section}`, config),
        // axios.get(`http://localhost:8080/api/heads/ratings/students/dept/${department}/section/${filters.section}/batch/${filters.batch}`, config),
        // axios.get(`http://localhost:8080/api/heads/ratings/department/${department}`, config),
      ]);

      setDepartmentData(departmentResponse.data);
      setStudentsData(studentsResponse.data);
      setBatchData(batchResponse.data);
      setRatingsData(ratingsResponse.data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  useEffect(() => {
    fetchHeadDetails();
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [department, filters]);

  // Update filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="head-chart">
      <div className="charts-container">
        <div className="chart">
          <h3>Whole Department Performance</h3>
          <Line
            data={{
              labels: departmentData.map(item => item.label),
              datasets: [
                {
                  label: 'Performance',
                  data: departmentData.map(item => item.value),
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
              ],
            }}
          />
        </div>

        <div className="chart">
          <div className="filters">
            <h3>Filter Students Performance</h3>
            <select name="batch" onChange={handleFilterChange} value={filters.batch}>
              <option value="">All Batches</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
            <select name="section" onChange={handleFilterChange} value={filters.section}>
              <option value="">All Sections</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <h3>Students' Performance</h3>
          <Pie
            data={{
              labels: studentsData.map(item => item.label),
              datasets: [
                {
                  label: 'Performance',
                  data: studentsData.map(item => item.value),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                  ],
                },
              ],
            }}
          />
        </div>

        <div className="chart">
          <h3>Batch-wise Performance</h3>
          <Bar
            data={{
              labels: batchData.map(item => item.label),
              datasets: [
                {
                  label: 'Performance',
                  data: batchData.map(item => item.value),
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  borderColor: 'rgba(153, 102, 255, 1)',
                },
              ],
            }}
          />
        </div>

        <div className="chart">
          <h3>Department Ratings Out of 5</h3>
          <Pie
            data={{
              labels: ratingsData.map(item => item.label),
              datasets: [
                {
                  label: 'Ratings',
                  data: ratingsData.map(item => item.value),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HeadChart;
