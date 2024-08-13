import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/Student/Schedules.css"; // Import a custom CSS file for styling

function Schedules() {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  useEffect(() => {
    const fetchUpcomingInterviews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/interviews/upcoming");
        setUpcomingInterviews(response.data);
      } catch (error) {
        console.error("Error fetching upcoming interviews:", error);
      }
    };

    fetchUpcomingInterviews();
  }, []);

  return (
    <div className="schedules-container">
      <h2>Upcoming Interviews</h2>
      {upcomingInterviews.length >= 0 ? (
        <div className="cards-container">
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="card">
              <h3 className="card-title">{interview.title}</h3>
              <p className="card-date">
                <strong>Date:</strong> {interview.scheduleDate}
              </p>
             
              <p className="card-description">
                {interview.description || "No description provided"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming interviews scheduled.</p>
      )}
    </div>
  );
}

export default Schedules;
