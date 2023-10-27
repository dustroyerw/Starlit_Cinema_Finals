const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000; // Replace with your desired port number

// Connection URL and Database Name
const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection URL
const dbName = 'Cinema'; // Replace with your database name
const regisCollectionName = 'regis'; // Replace with your registration collection name
const loginCollectionName = 'login'; // Replace with your login collection name
const bookingCollectionName = 'admitone'; // Replace with your booking collection name

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

// Serve the HTML forms for registration, login, and movie ticket booking
app.get('/regis', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/regis.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.get('/admitone', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admitone.html'));
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle user registration
app.post('/regis', async (req, res) => {
  const { username, email, password, confirmpassword } = req.body; // Retrieve data from the request body
  console.log('Received registration request body:', req.body);

  try {
    // Ensure the database connection is established before insertion
    if (!db) {
      console.log('Database connection is not established yet.');
      return res.status(500).json({ error: 'Database connection is not ready.' });
    }

    // Here, you should check if the username and password exist in the database and perform authentication logic.
    // For this example, let's just insert the data into the collection to demonstrate the process.
    const result = await db.collection(regisCollectionName).insertOne({
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


// Handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Retrieve data from the request body
  console.log('Received login request body:', req.body);

  try {
    // Ensure the database connection is established before searching
    if (!db) {
      console.log('Database connection is not established yet.');
      return res.status(500).json({ error: 'Database connection is not ready.' });
    }

    // Search for the user with the provided username and password
    const user = await db.collection(loginCollectionName).findOne({ username, password });

    if (user) {
      console.log('Login successful for user:', user);
      res.status(200).json(user);
    } else {
      console.log('Invalid username or password.');
      res.status(401).json({ error: 'Invalid username or password.' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'An error occurred during login.', message: err.message });
  }
});

// Handle movie ticket booking
app.post('/admitone', async (req, res) => {
  try {
    const { movie, quantity } = req.body;
    // Ensure the database connection is established before insertion
    if (!db) {
      console.log('Database connection is not established yet.');
      return res.status(500).json({ error: 'Database connection is not ready.' });
    }

    // Here, you should check if the user is logged in (authentication).
    // For this example, let's assume the user is already authenticated.

    // Insert the booking data into the MongoDB collection
    const collection = db.collection(bookingCollectionName);
    await collection.insertOne({ movie, quantity });

    // Send a response back to the client
    res.json({ message: 'Booking successful!' });
  } catch (error) {
    console.error('Error inserting booking record:', error);
    res.status(500).json({ message: 'An error occurred while booking the movie ticket.' });
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
