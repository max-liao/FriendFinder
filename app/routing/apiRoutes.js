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

var friends = require("../data/friends.js");

app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

// Create New tables - takes in JSON input
app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user app/data/friends.js
  // This works because of our body-parser middleware
  var newfriend = req.body;

  // Using a RegEx Pattern to remove spaces from newtable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();

  console.log(newfriend);

  friends.push(newfriend);

  res.json(newfriend);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
