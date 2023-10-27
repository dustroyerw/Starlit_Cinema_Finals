const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000; // Replace with your desired port number

// Connection URL and Database Name
const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection URL
const dbName = 'Cinema'; // Replace with your database name
const collectionName = 'regis'; // Replace with your collection name

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

// Serve the HTML form
app.get('/regis', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/regis.html'));
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle user registration
app.post('/regis', async (req, res) => {
  const { username, email, password, confirmpassword } = req.body; // Retrieve data from the request body
  console.log('Received request body:', req.body);

  try {
    // Ensure the database connection is established before insertion
    if (!db) {
      console.log('Database connection is not established yet.');
      return res.status(500).json({ error: 'Database connection is not ready.' });
    }

    // Here, you should check if the username and password exist in the database and perform authentication logic.
    // For this example, let's just insert the data into the collection to demonstrate the process.
    const result = await db.collection(collectionName).insertOne({
      username,
      email,
      password,
      confirmpassword,
    });

    console.log('Inserted document:');
    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (err) {
    console.error('Error inserting record:', err);
    res.status(500).json({ error: 'An error occurred while inserting the record.' });
  }
});

// Search route
app.get('/search', async (req, res) => {
  const { username } = req.query;

  try {
    // Ensure the database connection is established before searching
    if (!db) {
      console.log('Database connection is not established yet.');
      return res.status(500).json({ error: 'Database connection is not ready.' });
    }

    // Search for the user record with the provided username
    const user = await db.collection(collectionName).findOne({ username });

    if (user) {
      console.log('User found:', user);
      res.status(200).json(user);
    } else {
      console.log('No user found with the provided username.');
      res.status(404).json({ error: 'No user found with the provided username.' });
    }
  } catch (err) {
    console.error('Error searching for user:', err);
    res.status(500).json({ error: 'An error occurred while searching for the user.' });
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
