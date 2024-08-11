import React from 'react';
import '../../assets/styles/Mentor/MentorReports.css'; // Create this file for CSS styling

const studentData = [
  { registerNo: '101', name: 'Alice Johnson', email: 'alice@example.com', password: 'pass1', dept: 'CSE', batch: '2021', section: 'A', ratings: 4.5, contact: '1234567890', completedInterviews: 5, totalInterviews: 6 },
  { registerNo: '102', name: 'Bob Smith', email: 'bob@example.com', password: 'pass2', dept: 'IT', batch: '2022', section: 'B', ratings: 4.0, contact: '0987654321', completedInterviews: 4, totalInterviews: 6 },
  // More student data here...
];

const calculateAveragePercentage = (students) => {
  const totalPercentage = students.reduce((acc, student) => {
    const percentage = (student.completedInterviews / student.totalInterviews) * 100;
    return acc + percentage;
  }, 0);
  return (totalPercentage / students.length).toFixed(2);
};

const MentorReports = () => {
  const averagePercentage = calculateAveragePercentage(studentData);

  return (
    <div className="mentor-reports-container">
      <h1 className="mentor-reports-title">Mentor Student Section</h1>
      
      <div className="mentor-reports-summary">
        <h2>Average Completion Percentage of Interviews</h2>
        <p className="mentor-reports-percentage">{averagePercentage}%</p>
      </div>

      <table className="mentor-reports-table">
        <thead>
          <tr>
            <th>Register No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Batch</th>
            <th>Section</th>
            <th>Ratings</th>
            <th>Contact</th>
            <th>Completed Interviews</th>
            <th>Total Interviews</th>
            <th>Completion Percentage</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student, index) => {
            const percentage = ((student.completedInterviews / student.totalInterviews) * 100).toFixed(2);
            return (
              <tr key={index}>
                <td>{student.registerNo}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.dept}</td>
                <td>{student.batch}</td>
                <td>{student.section}</td>
                <td>{student.ratings}</td>
                <td>{student.contact}</td>
                <td>{student.completedInterviews}</td>
                <td>{student.totalInterviews}</td>
                <td>{percentage}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MentorReports;
