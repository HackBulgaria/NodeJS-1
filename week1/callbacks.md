class: center, middle
# Callback hell

---
# Callback hell

Everything in node and in javascript as a whole is mostly done through the callback mechanism. We issue an action to be taken and provide a function to be called once the action has ended that receives the result(or possibly the error) of the action execution.

Like so:

```javascript
fs.readFile('/etc/passwd', function (err, data) {
  if (error) {
    …
  } else {
    …
  }
});
```

---
# Callback hell

That's a pretty trivial example and most real world apps do far more complex stuff than this. A big useful interesting app written in node could include logic that almost literally looks like this

```javascript
panda(pandaArgs, function(err, result) {
  if (err) {
    …
  } else {
    unicorn(unicornArgs, function(err, result) {
      if (err) {
        …
      } else {
        narwal(narwalArgs, function(err, result) {
          …
        }
      }
    }
  }
}
```

---
class: center, middle
![callbacks](img/callbacks.jpg)

---
# async

[async](https://github.com/caolan/async) is a javascript library that exposes a nice API for solving the callback issue by making everything asynchronous and allowing us to cope with it in a somewhat centralised manner.

It has its own realisations of `map`, `each`, `filter`, `result`, etc.

---
# async

It also has a bunch of [control flow functions](https://github.com/caolan/async#control-flow) that solve the callback hell problem in some of its most popular forms and patterns.


---
# Promises

Promises are a concept that solves the issue with asynchronous calls depending strongly on one another.

The basic concept is that whenever a function has to do some asynchronous task instead of accepting a callback that will be called when the action is executed it returns a promise object, that acts as a relay between the asynchronous action and the rest of the application.

Promises are part of the ES6 standard.

The basic concept for promises is described in the [Promises/A+](https://promisesaplus.com/) standard.

---
# Promises

The simple idea of a promise interface:

```javascript
var promise = fetchDataFromNetwork('www.someplace.tld');
promise.then(function success(data) {
  …
}, function fail (error) {
  …
});
```

---
# Q

[Q](https://github.com/kriskowal/q#the-beginning) realises a Promises/A+ compatible API. It also has a nice way of promisifying/denodeifying standard callback base async functions.

---
# defered

```javascript
function () {
  var deferred = Q.defer();
  fs.readFile("foo.txt", "utf-8", function (error, text) {
    if (error) {
      deferred.reject(new Error(error));
    } else {
      deferred.resolve(text);
    }
  });
  return deferred.promise;
}
```
