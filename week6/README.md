class: center
#Streams
![stream](src/img/stream.jpg)
---
#Streams

A `stream` is an abstraction that represents a sequence of data being "fed" to a program(or being produced by it) over the course of time.

--

It could be extended to a lot of things, but at first you can think about reading/writing from/to files or over the network.

---
#Streams

NodeJS has a built in abstraction for streams. It's implemented in the `stream` module.

* `Readable`
* `Writable`
* `Duplex`
* `Transform`

---
#Streams are event emitters

* `readable` - from now on data will start flowing
* `data` - a new piece of data has come
* `end` - no more data will be transmitted
* `close` - the underlying resource(file descriptor, network socket) has been closed
* `error` - there was some error

---
#Stream modes

### non-flowing
The default mode for each stream. It means data is only read out of the resource when explicitly asked for.

This means data is read into the buffer of the stream and accessible through a call to `read([size])`.

`read` attempts to read as much bytes as requested(or all in the buffer if called without an argument). Returns `null` if the buffer is empty or doesn't contain enough data.

---
#Stream methods
### flowing

A stream in flowing mode will read as much data as possible and emit the `data` event whenever there is new data available.

---
#Readable stream methods

* `read([size])` - only useful in non-flowing mode
* `setEncoding([encoding])` - state the stream data's encoding, so you get a string in the `'data'` handlers instead of a buffer
* `pause()`/`resume()` - pause and resume the emitting of `data` events
* `pipe(destination,[options])`/`unpipe([destination])` - pipe and unpipe a `Readable` stream's output to a `Writable` stream
* `unshift(chunk)` - return data to the buffer[*](#transform-footnote)
* `wrap(stream)` - for wrapping old-style streams(pre node 0.10)

.footnote[
<a id="transform-footnote">using too much of these means you should consider using `stream.Transform`</a>
]

---
#Writable stream

### methods
* `write(data, [encoding], [callback])` - write data to the stream. The return value indicates if you can keep writing right away
* `end([chunk], [encoding], [callback])` - end writing to the stream. Calling `write` after you've called `end` will raise an error

--

### events
* `drain` - if `write` returns `false`, the `drain` event will signal when it's ok to continue writing to the stream
* `finish` - emitted when after calling `end` all data has been sent to the underlying system
* `pipe` - emitted when a `Readable` stream is piped to this one
* `unpipe` - what could this be?!

---
#Duplex and Transform

`Duplex` streams implement both the `Readable` and the `Writable` interface

`Transform` streams are like `Duplex`, but they manipulate the data written to them to produce the data they stream back

---
#Implementing `Readable` streams

* `_read([size])` - called from other internal methods of `Readable` as a result of someone calling `read([size])`
* `push(chunk, [encoding])` - writes data to the stream, so the consumer can access it

####<big>**NB**</big>
* `_read` and `push` should **never** be called from client code, only frmo the internal methods of the stream object
* when implementing a `Readable` stream our code should **never** call `read` or set handlers for `data`, `end` etc. events

---
#Implementing `Writable` streams

* `_write(chunk, encoding, callback)` - called when someone wants to write to the stream

####<big>**NB**</big>
* `_write` should not be called from client code, only by the internal methods of the stream object
* when implementing a `Writable` stream our code should **never** call `write` and set handlers for `drain`, `finish` etc. events

---
#Implementing `Duplex` streams

There is no multiple inheritance in javascript. So `Duplex` implements both a `Readable` and a `Writable` stream's interface, but does that not by inheriting both. It inherits `Readable` and then ["parasitically" inherits]() `Writable`.

---
#Implementign `Transform` streams

A common task is to want to do an operation on a big chunk of data. This can be achieved with a `Duplex` stream, that defines its `_write` method to save data in some buffer and then the `_read` method to attempt to get the data from that buffer and process it somehow. But like we said that is a *pretty common task*.

For that reason the `Transform` stream expects us to define only one method when implementing it, the `_transform` method.

* `_transform(chunk, encoding, callback)` - expects a chunk of data, possibly the encoding of it's a `String` and a callback to call when the processing is finished
* `push(data, [encoding]` - same as `Readable`'s `push`
* `_flush(callback)` - called when all potentially buffered data should be processed and sent for reading

--
###events
* `finish` - emitted when `end()` is called
* `end` - emitted after all data has been output, that is after the callback of `_flush` has been called

---
#Quirks

* `_writableState.buffer` and `_readableState.buffer`
* `stream.read(0)` and `stream.push('')`

---
#Materials
Take a look at:
* [node's documentation on streams](http://nodejs.org/api/stream.html)
* [stream-handbook](https://github.com/substack/stream-handbook)
* [nodestreams](http://nodestreams.com/) is a helpful playground project to help you better grasp what streams can do
