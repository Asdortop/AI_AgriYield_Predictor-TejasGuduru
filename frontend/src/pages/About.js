import React from "react";

const About = () => {
  return (
    <div>
      <h2>About SmartCrop</h2>
      <p>
        SmartCrop is a crop yield prediction app using LightGBM. Features: Crop, State, Season, Annual Rainfall, Fertilizer and Pesticide.
      </p>
      <p>
        The app returns a SHAP-based explanation with top contributing features for each prediction.
      </p>
    </div>
  );
};

export default About;

