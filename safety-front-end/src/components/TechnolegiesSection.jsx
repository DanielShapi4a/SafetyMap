// TechnologiesSection.jsx

import React from "react";
import pythonImage from "../images/python.jpg";
import mongodbImage from "../images/mongodb.png";
import reactImage from "../images/react.png";
import jsImage from "../images/javascript.png";
import Nodejs from "../images/Nodejs.png";


const TechnologiesSection = () => {
    const technologiesStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: '20px', 
    };
  
    const techImageStyle = {
      width: '40px', 
      height: '40px',
      marginRight: '10px', // Adjust as needed
    };
  
    return (
      <div style={technologiesStyle}>
        <img src={pythonImage} alt="Python" style={techImageStyle} />
        <img src={mongodbImage} alt="MongoDB" style={techImageStyle} />
        <img src={reactImage} alt="React" style={techImageStyle} />
        <img src={jsImage} alt="JavaScript" style={techImageStyle} />
        <img src={Nodejs} alt="JavaScript" style={techImageStyle} />
      </div>
    );
  };
  
  export default TechnologiesSection;