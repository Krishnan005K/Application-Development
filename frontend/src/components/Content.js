import React from 'react';
import '../assets/styles/Content.css';
import contentImage from '../assets/images/Intro.jpeg'; // Adjust the path according to your folder structure

const Content = () => {
  return (
    <div>
        <div className="content-container">
        <div className="content-text">
            <h2>Take Mock Interviews On Your Own</h2>
            <p>Take unlimited interviews and master your skills from anywhere. No awkward meetups required.</p>
        
        </div>
        <div className="content-image">
            <img src={contentImage} alt="Mock interviews on a laptop" />
        </div>        
    </div>
        <div className="content-container">
        <div className="content-image">
            <img src={contentImage} alt="Mock interviews on a laptop" />
        </div>        
        <div className="content-text">
            <h2>Take Mock Interviews On Your Own</h2>
            <p>Take unlimited interviews and master your skills from anywhere. No awkward meetups required.</p>
        
        </div>
    </div>
    </div>
    
  );
};

export default Content;
