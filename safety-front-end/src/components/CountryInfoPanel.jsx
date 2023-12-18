// CountryInfoPanel.jsx
import React from "react";
import "./CountryInfoPanel.css";

const CountryInfoPanel = ({ countryData }) => {
  if (!countryData) {
    return null;
  }

  return (
    <div className="country-info-panel" style={{color:"black"}}>
      <h2>{countryData.Country}</h2>
      <p>Warning Level: {countryData["Warning Level"]}</p>
      <p>Recommendation: {countryData.Recommendation}</p>
      <p>Threatened Area: {countryData["The Threatened Area"]}</p>
      <p>Detail: {countryData.Detail}</p>
    </div>
  );
};

export default CountryInfoPanel;
