const express = require('express');
const { connectToDatabase } = require('./db');
const dataController = require('./dataController');
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(cors()); 

// Use the routes defined in dataController.js
app.use('/', dataController);

// Start the server after connecting to MongoDB
connectToDatabase()
  .then(() => {
    console.log(`Server is running on port ${port} 😊`);
    console.log('Connected to MongoDB 😊');
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
