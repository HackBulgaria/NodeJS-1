var v4l2camera = require('v4l2camera'),
    debug = require('debug')('streamer'),
    net = require('net'),
    camera = new v4l2camera.Camera('/dev/video0');

function writeImage(connection) {
  var size = camera.width * camera.height,
      rgb = camera.toRGB(),
      metaDataBuffer = new Buffer(4);

  metaDataBuffer.writeUInt16BE(camera.width, 0);
  metaDataBuffer.writeUInt16BE(camera.height, 2);

  var buffer = Buffer.concat([metaDataBuffer, new Buffer(rgb), new Buffer([0])]);

  debug('writing', buffer.length, 'bytes to client');
  connection.write(buffer);
}

net.createServer({allowHalfOpen: true}, function (connection) {
  connection.on('error', function (error) {
    debug('connection error:', error);
    clearTimeout(connection.timeout);
  });

  connection.on('close', function () {
    debug('client closed');
    clearTimeout(connection.timeout);
  });

  connection.on('data', function (chunk) {
    debug('got:' + chunk);
  });

  connection.timeout = setTimeout(function writeLoop() {
    writeImage(connection);
    connection.timeout = setTimeout(writeLoop, 1000);
  }, 100);
}).listen(3000);

camera.start();

camera.capture(function captureLoop() {
  camera.capture(captureLoop);
});
