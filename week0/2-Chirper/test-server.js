var http = require('http'),
      pandaCounter = 0;

http.createServer(function (req, res) {
  var payload = "";

  console.log(req.url);
  console.log(req.method);

  req.on('data', function(chunk) {
    console.log("Received body data:");
    console.log(chunk.toString());
    payload += chunk.toString();
  });

  req.on('end', function() {
    pandaCounter ++;
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end("PANDATIGAN " + pandaCounter);
  });

}).listen(8080);
