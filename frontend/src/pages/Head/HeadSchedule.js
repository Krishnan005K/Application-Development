import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/Head/HeadSchedule.css';

function HeadSchedule() {
  const [schedules, setSchedules] = useState([]);
  const token = localStorage.getItem('token'); // Assume token is stored in localStorage

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/interviews', config);
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <div className="schedule-container">
      {schedules.map((schedule) => (
        <div key={schedule.id} className="schedule-card">
          <h3 className="schedule-title">{schedule.title}</h3>
          <p className="schedule-description">{schedule.description}</p>
          <p className="schedule-round">Round: {schedule.roundName}</p>
          <p className="schedule-date">Scheduled Date: {schedule.scheduleDate}</p>
          <p className="schedule-batch">Assigned Batch: {schedule.assignedBatch}</p>
        </div>
      ))}
    </div>
  );
}

export default HeadSchedule;
