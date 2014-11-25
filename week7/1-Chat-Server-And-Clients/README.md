#Chat server

Implement a simple chat server supporting some form of simple user identification(authentication would be a nice plus). That means each user should have a unique nickname. Multiple users connected to the server should be able to see each other's messages.

--

#Clients

##Console client

Make a minimal console client allowing you to send a message to a user, a room or everyone on the server and receive messages meant for you or for rooms you've joined.

##WebApp client

Make a simple web application to display messages send to users and rooms on the server. Add the ability to send messages to users/rooms.

---

#Development stages

A good idea would be to go through the following stages of implementing your solution:

##First stage

One server acts as one room. That means all users connected to the server see the messages from all other users. No channels/rooms, no personal queries.

##Second stage

Add personal queries between users so people could talk one on one.

##Third stage

Add rooms. Each user can choose a room to join. All users in one room get the messages from all other users in the same room.

---

#Architecture

You need to decide how to organise the different parts to work together.

## WebSocket proxy

You can have a main server handling all the messages, taking care of rooms, queries and users implementing only a simple TCP socket interface with some protocol of your own choice. That way the console clients would be pretty simple to implement and can exist without ever caring about websockets.

Then to include a web application in the whole picture you'll need a separate application that exposes a websocket server for the web client and relays that to the main server via TCP sockets.

### Proxy communication

* one socket open between the websocket proxy and the main chat server and send all information through it
* or keep a separate socket for each websocket connection you receive

## WebSocket only

The main chat server could only expose a websocket interface. That way your console clients need to also connect via websockets, but your webapp can talk directly to the server and not suffer the delay of being proxied.


#Libraries

* [ws](https://www.npmjs.org/package/ws) - an implementation of WebSockets for node
* [prompt](https://www.npmjs.org/package/prompt) - a nice way to make interactive console applications with node
* [node-term-ui](https://github.com/jocafa/node-term-ui) - a UI toolkit for console apps
* [blessed](https://github.com/chjj/blessed) - a curses like library for node in case you're into sleeker text UI
* [socket.io](http://socket.io) - an abstraction over websockets allowing you to send more complex messages than just text
