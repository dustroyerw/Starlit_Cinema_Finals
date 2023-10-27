const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Import the admitoneHTML from the admitone.js file
const admitoneHTML = require('./admitonehtml');

// Middleware to parse JSON requests
app.use(express.json());

// Serve the HTML form
app.get('/', (req, res) => {
  res.send(admitoneHTML); // Serve the HTML content
});

// Rest of your backend code

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});