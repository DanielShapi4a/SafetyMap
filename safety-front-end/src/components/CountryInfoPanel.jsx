// CountryInfoPanel.jsx

import React from 'react';
import './CountryInfoPanel.css';

const CountryInfoPanel = ({ countryData }) => {
  if (!countryData) {
    return null;
  }

  return (
    <div className="country-info-panel" style={{color:"black"}}>
      <h2>{countryData.Country}</h2>
      <p>Warning Level: {countryData['warning level']}</p>
      <p>Recommendation: {countryData.recommendation}</p>
      <p>Threatened Area: {countryData['the threatened area']}</p>
      <p>Detail: {countryData.detail}</p>
    </div>
  );
};

export default CountryInfoPanel;
