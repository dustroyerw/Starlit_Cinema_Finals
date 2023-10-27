const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000; // Replace with your desired port number

// Connection URL and Database Name
const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection URL
const dbName = 'Cinema'; // Replace with your database name
const collectionName = 'login'; // Replace with your collection name

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
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
   
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Retrieve data from the request body
  console.log('Received request body:', req.body);

  try {
      // Ensure the database connection is established before searching
      if (!db) {
          console.log('Database connection is not established yet.');
          return res.status(500).json({ error: 'Database connection is not ready.' });
      }

      // Search for the user with the provided username and password
      const user = await db.collection(collectionName).findOne({ username, password });

      if (user) {
          console.log('Login successful for user:', user);
          res.status(200).json(user);
      } else {
          console.log('Invalid username or password.');
          res.status(401).json({ error: 'Invalid username or password.' });
      }
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'An error occurred during login.', message: err.message});
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