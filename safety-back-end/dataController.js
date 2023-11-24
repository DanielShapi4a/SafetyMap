// dataController.js
const express = require('express');
const { connectToDatabase } = require('./db');

const router = express.Router();

// Endpoint to fetch all data
router.get('/api/data', async (req, res) => {
  const collection = await connectToDatabase();
  try {
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch data for a specific country
router.get('/api/data/:countryName', async (req, res) => {
  const { countryName } = req.params;
  const collection = await connectToDatabase();
  try {
    const countryData = await collection.findOne({ Country: countryName });
    if (!countryData) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.json(countryData);
  } catch (error) {
    console.error(`Error fetching data for ${countryName}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
