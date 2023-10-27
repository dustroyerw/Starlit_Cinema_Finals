// public/webpage1.js
function handleRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<link rel="stylesheet" href="/css/style.css">');
    res.write('<h1>Hello from File 1!</h1>');
    res.write('<p>Click <a href="/">here</a> to go to the home page.</p>');
    res.end();
  }
  
  module.exports = {
    handleRequest,
  };
  