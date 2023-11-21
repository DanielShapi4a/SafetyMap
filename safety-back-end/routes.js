// routes.js
const express = require('express');
const { connectToDatabase } = require('./db');

const router = express.Router();

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

module.exports = router;
