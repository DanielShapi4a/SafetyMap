// src/services/api.js
require("dotenv").config();

const API_URL = process.env.BASE_URL || 'http://localhost:3000/api/data';

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
