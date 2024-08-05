import React from "react";
import "./Footer.css";
import Wave from "../../img/wave.png";
import Insta from "@iconscout/react-unicons/icons/uil-instagram";
import Facebook from "@iconscout/react-unicons/icons/uil-facebook";
import Gitub from "@iconscout/react-unicons/icons/uil-github";

const Footer = () => {
  return (
    <div className="footer">
      <img src={Wave} alt="Wave Background" className="footer-wave" />
      <div className="f-content">
        <div className="f-contact-info">
          <span>lingeshsathyanarayana@gmail.com</span>
        </div>
        <div className="f-icons">
         
          <Insta color="white" size={"3rem"} />
          <Facebook color="white" size={"3rem"} />
          <Gitub color="white" size={"3rem"} />
        </div>
        <div className="f-copyright">
          <span><p style={{fontSize:"20px"}}>Copyright ©️ Lingesh Sathya Narayana. All rights reserved.</p></span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
