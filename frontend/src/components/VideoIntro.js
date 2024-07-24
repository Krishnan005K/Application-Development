import React from 'react';
import '../assets/styles/VideoIntro.css';
import videoFile from '../assets/video.mp4'; // Adjust the path according to your folder structure

const VideoIntro = () => {
  return (
    <div className="video-intro-container">
      <div className="video-intro-content">
        <video className="video-frame" controls>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-intro-text">
        <h2>Complete Online Video Course</h2>
        <p>Become an interview expert with this series of fun-to-watch lessons. We'll teach you how to avoid common pitfalls so you can ace the interview.</p>
        <button className="learn-more-button">Learn More</button>
      </div>
    </div>
  );
};

export default VideoIntro;
