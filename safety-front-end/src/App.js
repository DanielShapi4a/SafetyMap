// App.js
import React, { useState } from "react";
import MyMap from "./components/MyMap";
import CountryInfoPanel from "./components/CountryInfoPanel";
import SearchBar from "./components/SearchBar";
import { fetchCountryData } from "./services/api"; // Import the fetchCountryData function

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [mapCenter, setMapCenter] = useState([30, 10]);
  const [mapZoom, setMapZoom] = useState(2);

  const handleCountryClick = (countryData) => {
    setSelectedCountry(countryData);
  };

  const handleSearch = async (searchTerm) => {
    console.log("Before setMapCenter:", mapCenter);
    console.log("Before setMapZoom:", mapZoom);

    if (typeof searchTerm === "string" && searchTerm.trim() !== "") {
      try {
        const countryData = await fetchCountryData(searchTerm);
        setSelectedCountry(countryData);

        if (countryData && countryData.latlng) {
          setMapCenter(countryData.latlng);
          setMapZoom(3);
          console.log("After setMapCenter:", mapCenter);
          console.log("After setMapZoom:", mapZoom);
        }
      } catch (error) {
        console.error("Error searching for country:", error);
      }
    }
  };

  const zoomToCountry = (country) => {
    // Implement your logic to zoom to the specific country
    // Update the mapCenter and mapZoom state accordingly
    console.log(`Zooming to ${country}`);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} zoomToCountry={zoomToCountry} />
      <MyMap onCountryClick={handleCountryClick} mapCenter={mapCenter} mapZoom={mapZoom} />
      <CountryInfoPanel countryData={selectedCountry} />
    </div>
  );
};

export default App;
