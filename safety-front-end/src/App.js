import React, { useState } from 'react';
import Map from './Map';
import CountryDetails from './CountryDetails';


const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (countryCode) => {
    // Handle country click logic, set selectedCountry, etc.
  };

  return (
    <div>
      <Map data={yourData} onCountryClick={handleCountryClick} />
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
