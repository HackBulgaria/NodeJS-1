var express = require("express");
var app = express();

var data = [{
  "rank": 1,
  "keyword": "JavaScript",
  "count": 10000
}, {
  "rank": 2,
  "keyword": "Python",
  "count": 8000
}];


app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", ["X-Requested-With", "Content-Type", "Access-Control-Allow-Methods"]);
  res.header("Access-Control-Allow-Methods", ["GET"]);
  next();
});

app.get("/keywords", function(req, res) {
  res.json(data);
});

app.listen(8000);
