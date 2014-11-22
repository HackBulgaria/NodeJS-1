#Video consumer

##Streamer
The file `streamer.js` implements a server, that accepts connections on port 3000 and starts sending image data to them live from a camera on the machine the server is running on.

Each time a connection is made the following data is sent:

* one `UInt16` for the width of the image
* one `UInt16` for the height of the image
* `3 * width * height` bytes of RGB data for the actual image
* `0` byte signifying the end of the image

##Consumer
Your task is to establish a connection to the server in `streamer.js` and save the output from it as a png file. Implement a `Transform` stream that takes the bytes sent from the server as input and produces a `Buffer` with the data to be written to the png file.

Write each frame you get from the server as a separate png file.

You can use the [png node module](https://www.npmjs.org/package/png) or [pngjs](https://www.npmjs.org/package/pngjs) for creating the file.

##Faking a video source
If you want to use a fake video instance you can look into [v4l2loopback](https://github.com/umlaeute/v4l2loopback), which can create a fake video device for you. Then you just need to feed it some signal, which you could do with gstreamer [as shown here](https://github.com/umlaeute/v4l2loopback/wiki/Gstreamer).
