// src/components/Intro.js
import React from 'react';
import '../assets/styles/Intro.css';
import introImage from '../assets/images/Intro.jpeg'; // Adjust the path according to your folder structure

const Intro = () => {
  return (
    <div className="intro-container">
      <div className="intro-text">
        <h1>Master the interview & land a job worth loving.</h1>
        <p>Simulate realistic interviews for over 120 different job positions and level up your skills in no time.</p>
        <button className="learn-more-button">Learn More</button>
      </div>
      <div className="intro-image">
        <img src={introImage} alt="Interview practice on a laptop" />
      </div>
    </div>
  );
};

export default Intro;
