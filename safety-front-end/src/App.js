// App.js
import React, { useState } from "react";
import MyMap from "./components/MyMap";
import CountryInfoPanel from "./components/CountryInfoPanel";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (countryData) => {
    setSelectedCountry(countryData);
  };

  const handleSearch = (searchTerm) => {
    // Perform your search logic here with the searchTerm
    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <MyMap onCountryClick={handleCountryClick} />
      <CountryInfoPanel countryData={selectedCountry} />
    </div>
  );
};

export default App;
