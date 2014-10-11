var http = require('http'),
      pandaCounter = 0;

http.createServer(function (req, res) {
  var payload = "";

  console.log(req.url.indexOf("/createPanda"));
  console.log(req.method);

  if(req.url.indexOf("/createPanda") === 0) {
    pandaCounter+= 1;
    res.end("Panda counter = " + pandaCounter);
  }

  req.on('data', function(chunk) {
        console.log("Received body data:");
        console.log(chunk.toString());
        payload += chunk.toString();
  });

  req.on('end', function() {
        console.log(JSON.parse(payload));
        // empty 200 OK response for now
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.end("PANDATIGAN");
  });

}).listen(8080);
