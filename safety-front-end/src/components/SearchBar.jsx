// SearchBar.jsx
import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import mapData from "../countries.geo.json";

const SearchBar = ({ onSearch, zoomToCountry }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Parse the imported GeoJSON file to extract country names
    const parsedCountryList = mapData.features.map(
      (feature) => feature.properties.name
    );
    setCountryList(parsedCountryList);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter countries based on input value (starting with the entered letters)
    const filteredCountries = countryList.filter((country) =>
      country.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredCountries.slice(0, 5)); // Show first 5 matches
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Pass the searchTerm to the onSearch function
    zoomToCountry(searchTerm); // Zoom to the selected country
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
    zoomToCountry(suggestion); // Zoom to the selected country on suggestion click
  };

  return (
    <form onSubmit={handleSubmit} className="search-container" style={{margin:'30px'}}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </div>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
