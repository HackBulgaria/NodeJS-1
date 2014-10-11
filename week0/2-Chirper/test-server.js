var http = require('http');

http.createServer(function (req, res) {
  console.log(req.url);
  console.log(req.method);

  req.on('data', function(chunk) {
        console.log("Received body data:");
        console.log(chunk.toString());
  });

  req.on('end', function() {
        // empty 200 OK response for now
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.end("PANDATIGAN");
  });

}).listen(9615);
