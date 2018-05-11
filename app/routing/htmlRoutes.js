// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

// console.log(path.join(__dirname, "../public/home.html"));


app.get("/:request", function(req, res) {
  var request = req.params.request;
  console.log(request);
  switch (request){
    case "survey":
      // res.sendFile(path.join(__dirname, "/../public/survey.html"));
      res.sendFile(path.join(__dirname, "../public/survey.html"));
    break;
    default:
      res.sendFile(path.join(__dirname, "../public/home.html"));
  }
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
