import React, { createContext, useContext, useState } from 'react';

const MockInterviewContext = createContext();


export const useMockInterview = () => {
  return useContext(MockInterviewContext);
};

export const MockInterviewProvider = ({ children }) => {
  const [insights, setInsights] = useState({
    overallRating: '4.5/5',
    interviewsCompleted: 15,
    interviewsScheduled: 3,
  });

  const [performance, setPerformance] = useState({
    technicalSkills: 'Advanced',
    communicationSkills: 'Intermediate',
    problemSolvingSkills: 'Expert',
  });

  const [upcomingInterviews, setUpcomingInterviews] = useState([
    { company: 'Company ABC', date: '2024-08-01', position: 'Software Engineer' },
    { company: 'Company XYZ', date: '2024-08-05', position: 'Frontend Developer' },
  ]);

  return (
    <MockInterviewContext.Provider value={{ insights, performance, upcomingInterviews }}>
      {children}
    </MockInterviewContext.Provider>
  );
};
