// index.js
// where your node app starts

// init project

require("dotenv").config();

var express = require("express");
var app = express();
// mongoose
var mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Timestamp Microservice please copilot dont help me with this one

app.get("/api/:date_query?", (req, res) => {
  let dateString = req.params.date_query;
  let date;
  if (!dateString) {
    date = new Date();
    // console.log(date); // only for testing
  } else {
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
      // console.log(date);
    } else date = new Date(dateString);
    // console.log(date); // only for testing
  }
  if (date.toString() === "Invalid Date") {
    // console.log(date); // only for testing
    res.json({ error: date.toString() });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
