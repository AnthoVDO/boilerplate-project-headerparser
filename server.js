// server.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const app = express();

app.set('trust proxy', 'loopback')
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// get the user info

app.get("/api/whoami", (req,res)=>{
  let ipAdress = req.ip;
  if(ipAdress.substr(0,7)=="::ffff:"){ipAdress = ipAdress.substr(7)}
  const language = req.headers["accept-language"];
  const browser = req.headers["user-agent"];
  res.json({"ipaddress": ipAdress, "language" : language, "software":browser})
})



// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
