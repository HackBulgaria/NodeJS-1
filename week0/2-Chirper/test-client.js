var http = require("http");

http.get("http://localhost:8080", function(res) {
  res.on("data", function(data) {
    console.log(data.toString());
  });
});
