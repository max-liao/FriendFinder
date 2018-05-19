// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// var promise = require(path.join(__dirname, "/app/public/survey.html"));
// console.log("server");'

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// =============================================================
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

var friends = require(path.join(__dirname, "/app/data/friends.js"));

app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

app.post("/api/test", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newfriend = req.body;
  var newscores = newfriend.scores;
  console.log(newscores);
  // console.log(Object.keys(friends.friends[0]));

  var differencesarray = [];
  var solution = 50;
  var solutionname;

  for (i=0; i< friends.friends.length; i++){
    differencesarray[i] = 0;
    console.log(friends.friends[i].scores);
    for (j=0; j<10; j++){
      var statdifference = Math.abs(friends.friends[i].scores[j] - newscores[j]);
      // console.log(statdifference);  
      differencesarray[i] += statdifference;
    }
    if (solution > differencesarray[i]){
      solution = differencesarray[i];
      solutionname = friends.friends[i].name;
      solutionphoto = friends.friends[i].photo;
    }
  }
  
  // var modal = document.getElementById('myModal');
  console.log(solutionname);
  console.log(solutionphoto);

  var match = {
    name: solutionname,
    photo: solutionphoto,
  }

  // window.alert(solutionname);
  // modal.innerHTML(solutionname);
  // console.log(differencesarray);
  // solution = Math.min(differencesarray)
  // console.log(solution);  
  // Using a RegEx Pattern to remove spaces from newtable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();

  // friends.push(newfriend);
  res.json(match);

});


// app.get('/hellow', function (req, res) {
//   res.send('hello world')
// })
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
