const express = require('express');

const app = express();

const port = 8080;

const webpage1 = require('./public/webpage1');
const webpage2 = require('./public/webpage2');
const webpage3 = require('./public/webpage3');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>EA2 Finals</title>
      <link rel="stylesheet" href="EA4.css">
    </head>
    <body>
    <center><img src="nbs.png" width="500" height ="200"></center>
     <h1>FEATURED BOOKS</h1>
      <a href="/webpage2">CART</a>
      <ul>
    <li><a href="/webpage1">Local Books</a>
    <li><a href="/webpage3">International Books</a></li>
    <center>
    <br>
    <li>El Filibusterismo </li>
    <img src="elfili.jpg" width="200" height ="350">
    <p>P=130</p>
    <li>Noli Me Tangere</li>
    <img src="noli.jpg" width="200" height ="350">
    <p>P=130</p>
    <li>The Little Prince</li>
    <img src="tlp.jpg" width="200" height ="350">
    <p>P=150</p>
    <li>The Kite Runner</li>
    <img src="tkl.jpg" width="200" height = "350">
    <p>P=150</p>
    <li>The Alchemist</li>
    <img src="alch.jpg" width="200" height = "350">
    <p>P=160</p>
    <li>War and Peace</li>
    <img src="warandpeace.jpg" width="200" height = "350">
    <p>P=160</p>
    </center>

      </ul>
      <br>
      <br>
      <br>
      <p>Created by: Joshua Luigi C. Delos Santos BIT34</p>
      <img src="prof.jpg" width="200" height = "200">

      <p>Click <a href="/">here</a> to go to back to top of the page.</p>
    </body>




    </html>




  `);




});

app.get('/webpage1', webpage1.handleRequest);
app.get('/webpage2', webpage2.handleRequest);
app.get('/webpage3', webpage3.handleRequest);




app.listen(port, () => {




  console.log(`Server running on port ${port}`);




});