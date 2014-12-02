class: center, middle
#Fork it…

---
class:center, middle
#`child_process`

---
#`child_process`
A module allowing us to start separate node applications, or just run arbitrary commands.

---
#`exec`

`exec` starts a shell and gives the first argument as a command to that shell
```javascript
var command = 'kill $(ps fax | grep [/]usr/lib/firefox/firefox | cut -d" " -f 1)';
child_process.exec(command, function(error, stdout, stderr) {
  if (error) {
    console.log(error);
    return;
  }

  console.log(stdout);
  console.log(stderr);
});
```

---
#`execFile`
`execFile` runs a file directly diving it command line parameters

```javascript
var file = 'ls',
    args = ['-l' '-a'];
child_process.execFile(file, args, function (error, stdout, stderr) {
  if (error) {
    console.log(error);
    return;
  }

  console.log(stdout);
  console.log(stderr);
});
```

---
#`child_process.spawn`
Starts a process and returns an object representing that process.

The returned object has as properties `stdin`(a writable stream), `stdout` and `stderr`(readable streams).

It emits `end` when the process ends, `close` when all streams are closed and `error` in case of some error.

---
#`child_process.fork`
A special case of `spawn` that can be used to run node modules, giving you an interface to communicate between the two processes more conveniently.

The returned object has a `send` method, allowing you to send messages to the child process. In the child process, the `process` object also has a `send` method allowing it to send data back to the parent object. Both sides of the IPC channel emit a `message` event when the other end `send`s a message.

Messages can me just strings/buffers or instances of some standard "classes".

```javascript
if (handle instanceof net.Socket) {
  message.type = 'net.Socket';
} else if (handle instanceof net.Server) {
  message.type = 'net.Server';
} else if (handle instanceof process.binding('tcp_wrap').TCP ||
           handle instanceof process.binding('pipe_wrap').Pipe) {
  message.type = 'net.Native';
} else if (handle instanceof dgram.Socket) {
  message.type = 'dgram.Socket';
} else if (handle instanceof process.binding('udp_wrap').UDP) {
  message.type = 'dgram.Native';
} else {
  throw new TypeError("This handle type can't be sent");
}
```

---
class: center, middle
#`cluster`

---
class: center, middle
<big><big><big>Stability: 1 - Experimental</big></big></big>

---
#`fork`
Most often you would just call `cluster.fork` to fork your process.

`cluster.isMaster` tells you if you're running in the master process of the cluster or in a worker.

---
#Sharing servers
The main feature of the `cluster` module is the ability to share servers.

When a worker calls `server.listen` the parameters are serialized and sent as a message to the master process. If the master process doesn't have a server like the one the worker wants to create it will be created, otherwise the same server will be sent back to the worker.

When several processes bind to the same port your OS can load balance between them. Your code does not need to(and practically can't) do any load balancing, node's internal code does not do any load balancing. It's all the work of your OS. Node processes exchange server objects via node's IPC mechanism.
