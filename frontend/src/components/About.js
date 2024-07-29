import React from "react";
import AboutBackground from "../assets/images/about-background.png";
import AboutBackgroundImage from "../assets/images/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import '../assets/styles/About.css';
const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="About Background" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage}   alt="About Background Image" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Master Your Interview Skills with Our Platform
        </h1>
        <p className="primary-text">
          Our mock interview system is designed to help you practice and refine your interview techniques. Get constructive feedback and improve your confidence.
        </p>
        <p className="primary-text">
          Whether you're preparing for your first interview or looking to enhance your skills, our platform offers tailored experiences to meet your needs.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
