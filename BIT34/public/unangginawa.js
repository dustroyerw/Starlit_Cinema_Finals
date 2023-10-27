// server.js
const express = require('express');
const path = require('path');
const webpage1 = require('/webpage1');
const webpage2 = require('/webpage2');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(`
  <html>
  <head></head>
  <body><h1>Welcome De La Salle University!</h1> 
  <ul>

<li><a href="/webpage1">About</a></li>
<li><a href="/webpage2">Admission</a></li>
</ul>
</body></html>
`);
});

app.get('/webpage1', webpage1.handleRequest);
app.get('/webpage2', webpage1.handleRequest);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
