// db.js
const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://danielshapira3:Data1234@cluster0.xqlbyho.mongodb.net/safety-info';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('safety-info').collection('safety');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = { connectToDatabase };
