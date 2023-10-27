function handleRequest(req, res) {

    res.send(`




    <html>




    <head>




      <title>EA2 Finals</title>




      <link rel="stylesheet" href="EA4.css">

    </head>



    <body>

    <center><img src="nbs.png" width="500" height ="200"></center>
  
      <ul>
      <a href="/webpage2">CART</a>
      <li><a href="/webpage1">Local Books</a>
     <center><h1>INTERNATIONAL BOOKS</p></h1>
      <br>
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
  
      </ul>
  
  
  
  
    </body>

      '<p>Click <a href="/">here</a> to go to the home page.</p>'


    </body>




    </html>




  `);


  }
  module.exports = {

    handleRequest,

  };