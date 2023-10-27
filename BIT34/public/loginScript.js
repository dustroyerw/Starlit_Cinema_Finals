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
document.querySelector('.login-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const data = { username, password };

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    alert(result.message);
    document.getElementById('username').value = ""; // Clear the input fields
    document.getElementById('password').value = ""; // Clear the input fields
  } catch (error) {
    console.error('Error inserting record:', error);
    alert('An error occurred while inserting the record.');
  }
});
}