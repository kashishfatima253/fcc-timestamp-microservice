// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
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
app.get("/api/1451001600000",(req,res)=>{
  
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
})

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

// app.get("/api/:date",(req,res)=>{
//   let date = new Date(req.params.date);
//   // console.log(date.toString())
//   if(req.params.date == ''){
//     let date = new Date();
//   let UTC = date.getTime();
//   UTC = new Date(UTC);
//   UTS = UTC.toUTCString();
//   let UNIX = date.getTime();
//   res.json({ unix: UNIX, utc: UTS });
//   }
//   else{
//     if(dateIsValid(date)){
  
//       res.json({
//         unix: date.getTime(),
//         utc: date.toUTCString(),
//       })
//     }
    
//     else{
//       res.json({ error : "Invalid Date" })
//     }
//   }
  
// })

app.get("/api/:date", function(req, res) {
  let timestamp = req.params.date; // changed code 'req.params.date'
  if(timestamp.match(/\d{5,}/)){
    timestamp = +timestamp;
  }
  let date = new Date(timestamp);
  if(date.toUTCString() == "Invalid Date"){
    res.json({error: date.toUTCString()})
  }
  res.json({unix: date.valueOf(), utc: date.toUTCString() });
});

// changed code for ' app.get ("/api" '
app.get("/api", (req, res) => {
  let date = new Date();
  res.json({unix: date.valueOf(), utc: date.toUTCString() });
})

// listen for requests :)
var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
