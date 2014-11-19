var Q = require("q");

// callback hell:

// 1. Nested async functions
// 2. Async workflow = [a1, a2, ..., an], async

function async() {
  var defer = Q.defer();
  setTimeout(function() {
    defer.resolve();
  }, 1000);

  return defer.promise;
}

async()
  .then(function() {
    console.log("First");
    return async();
  })
  .then(function() {
    console.log("Second");
  });

function eventualSquare(n) {
  var defer = Q.defer();
    setTimeout(function() {
      defer.resolve(n * n);
    }, 100);

  return defer.promise;
}

var numbers = [1, 2, 3, 4, 5];
var promisedNumbers = numbers.map(function(n) {
  return eventualSquare(n);
});

Q
  .all(promisedNumbers)
  .then(function(result) {
    console.log(result);
  });
