// src/services/api.js
const API_URL = 'http://localhost:3000/api/data';

export const fetchData = async () => {
  const response = await fetch(API_URL);
  const jsonData = await response.json();
  return jsonData;
};

export const fetchCountryData = async (countryName) => {
  const response = await fetch(`${API_URL}/${countryName}`);
  const countryData = await response.json();
  return countryData;
};
