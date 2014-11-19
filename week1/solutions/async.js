var async = require("async");

function eventualSquare(n, cb) {
    setTimeout(function() {
      cb(n * n);
    }, 100);
}

var numbers = [1, 2, 3, 4, 5];

var asyncPrepared = numbers.map(function(n){
  return function(callback) {
    eventualSquare(n, function(squareResult) {
      callback(null, squareResult);
    });
  };
});

async.series(asyncPrepared, function(err, results) {
  console.log(results);
});

// Искаме да приложим eventualSquare в/у numbers:
// 1. Да изпълняваме последователно: eventualSquare(1), eventualSquare(2), eventualSquare(3), ...,
// Да знаем, кога сме готови с целият списък.

// 2. Искаме да изпълним паралелно - не ни интересува последователност
// Искаме да знаем, кога сме готови с целият списък
