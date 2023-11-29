// App.js
import React, { useState } from 'react';
import MyMap from './components/MyMap';
import CountryInfoPanel from './components/CountryInfoPanel';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (countryData) => {
    setSelectedCountry(countryData);
  };

  return (
    <div>
      <MyMap onCountryClick={handleCountryClick} />
      <CountryInfoPanel countryData={selectedCountry} />
    </div>
  );
};

export default App;