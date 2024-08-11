import React from 'react';
import '../../assets/styles/Admin/ScheduleAdmin.css';

const ScheduleAdminDashboard = () => {
  const schedules = [
    { intervieweeEmail: 'john@example.com', interviewerEmail: 'jane@example.com', dateTime: '2023-07-01T10:00', roundNumber: '1', roundName: 'Initial', duration: '1h' },
    { intervieweeEmail: 'alice@example.com', interviewerEmail: 'bob@example.com', dateTime: '2023-01-15T14:00', roundNumber: '2', roundName: 'Technical', duration: '2h' },
    { intervieweeEmail: 'mary@example.com', interviewerEmail: 'mark@example.com', dateTime: '2024-07-28T09:00', roundNumber: '3', roundName: 'HR', duration: '1h' },
    // Add more schedules here
  ];

  const today = new Date().toISOString().split('T')[0];
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const totalSchedules = schedules.length;
  const pastSixMonthsSchedules = schedules.filter(schedule => new Date(schedule.dateTime) >= sixMonthsAgo).length;
  const todaysSchedules = schedules.filter(schedule => schedule.dateTime.startsWith(today)).length;

  return (
    <div className="schedule-admin-container">
      <h2>Interview Schedules</h2>

      <div className="schedule-admin-cards">
        <div className="schedule-admin-card">
          <h3>Total Schedules</h3>
          <p>{totalSchedules}</p>
        </div>
        <div className="schedule-admin-card">
          <h3>Past 6 Months Schedules</h3>
          <p>{pastSixMonthsSchedules}</p>
        </div>
        <div className="schedule-admin-card">
          <h3>Today's Schedules</h3>
          <p>{todaysSchedules}</p>
        </div>
      </div>

      <div className="schedule-details">
        {schedules.map((schedule, index) => (
          <div key={index} className="schedule-card">
            <div className="schedule-header">
              <h3>Schedule {index + 1}</h3>
            </div>
            <p><strong>Interviewee Email:</strong> {schedule.intervieweeEmail}</p>
            <p><strong>Interviewer Email:</strong> {schedule.interviewerEmail}</p>
            <p><strong>Date & Time:</strong> {new Date(schedule.dateTime).toLocaleString()}</p>
            <p><strong>Round Number & Name:</strong> {schedule.roundNumber} - {schedule.roundName}</p>
            <p><strong>Duration:</strong> {schedule.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleAdminDashboard;
