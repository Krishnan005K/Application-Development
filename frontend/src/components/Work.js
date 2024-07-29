import React from "react";
import ScheduleMeet from "../assets/images/schedule-meet-image.png";
import AttendInterview from "../assets/images/attend-interview-image.png";
import MasterSkills from "../assets/images/master-skills-image.png";
import '../assets/styles/Work.css';

const Work = () => {
  const workInfoData = [
    {
      image: ScheduleMeet,
      title: "Schedule a Meet",
      text: "Easily schedule a mock interview at a time that works for you. Our flexible scheduling options ensure you can practice without disrupting your routine.",
    },
    {
      image: AttendInterview,
      title: "Attend the Interview",
      text: "Participate in a realistic mock interview conducted by experts. Receive immediate feedback and constructive criticism to help you improve.",
    },
    {
      image: MasterSkills,
      title: "Master Your Skills",
      text: "Refine your interview techniques and boost your confidence with our tailored feedback. Track your progress and master the skills needed to succeed.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Our mock interview system is designed to help you prepare effectively. Follow these steps to make the most of our services.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} style={{ width: "200px", height: "200px" }} alt={data.title} />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
