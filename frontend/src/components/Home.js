import React from "react";
import BannerBackground from "../assets/images/home-banner-background.png";
import BannerImage from "../assets/images/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import '../assets/styles/Home.css';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="Banner Background" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading animate-heading">
            Prepare for Your Dream Job with Our Mock Interviews
          </h1>
          <p className="primary-text animate-text">
            Practice and refine your interview skills with our expert-designed mock interview system. Get personalized feedback and improve your chances of success.
          </p>
          <button className="secondary-button animate-button">
            Get Started <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section animate-image">
          <img src={BannerImage} alt="Banner" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
