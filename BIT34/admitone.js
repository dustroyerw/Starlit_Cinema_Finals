const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000; // Replace with your desired port number

// Connection URL and Database Name
const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection URL
const dbName = 'Cinema'; // Replace with your database name
const collectionName = 'admitone'; // Replace with your collection name

let db; // Global variable to hold the MongoDB database reference

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    db = client.db(dbName);
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admitone.html'));
});
app.use(express.static(path.join(__dirname, 'public')));

app.post('/admitone', async (req, res) => {
  try {
    const { movie, quantity } = req.body;
     // Insert the form data into the MongoDB collection
     const collection = db.collection(collectionName);
     await collection.insertOne({ movie, quantity });
     // Send a response back to the client
     res.json({ message: 'Booking successful!' });
   } catch (error) {
     console.error('Error inserting record:', error); // Add this line for more detailed logging
     res.status(500).json({ message: 'An error occurred while inserting the record.' });
   }
 });

// Start the server and connect to the database
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
