const express = require('express');
const path = require('path');

const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const uri = 'mongodb://127.0.0.1:27017/Cinema';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('public', path.join(__dirname, 'public'));

app.get('/', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri, options);
    const db = client.db();
    const collection = db.collection('Movies1');

    // Fetch data from MongoDB
    const data = await collection.find({}).toArray();

    // Render the EJS template and pass the data
    res.render('index', { data });

    // Remember to close the MongoDB connection
    client.close();
  } catch (err) {
    console.error('Error fetching data from MongoDB:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
