var request= require("request"),
      Q = require("q"),
      printf = require("printf"),
      currentMaxItem = -1,
      itemsQueue = [];

function getMaxItem() {
  var defer = Q.defer();

  request("https://hacker-news.firebaseio.com/v0/maxitem.json", function(err, res, body) {
    if(err) {
      return defer.reject(err);
    }

    defer.resolve(body);
  });

  return defer.promise;
}

function getItem(id) {
  var defer = Q.defer();

  var url = printf("https://hacker-news.firebaseio.com/v0/item/%d.json", id);
  request(url, function(err, res, body) {
    if(err) {
      return defer.reject(err);
    }

    defer.resolve(body);
  });

  return defer.promise;
}

function range(a, b) {
  var result = [];

  while(a <= b) {
    result.push(a);
    a = a + 1;
  }

  return result;
}

function doWork(done) {
  if(itemsQueue.length === 0) {
    return done();
  }

  var itemId = itemsQueue.pop();

  getItem(itemId)
    .then(function(item) {
      console.log(item);
      doWork(done);
    });
}

function getItems() {
  var defer = Q.defer();

  doWork(function() {
    defer.resolve();
  });

  return defer.promise;
}

function loop() {
  getMaxItem()
    .then(function(maxItem) {
      maxItem = parseInt(maxItem, 10);

      if(currentMaxItem === maxItem) {
        return loop();
      }

      if(currentMaxItem === -1) {
        currentMaxItem = maxItem;
      }

      itemsQueue = range(currentMaxItem, maxItem);

      console.log("Getting items for:");
      console.log(itemsQueue);

      currentMaxItem = maxItem;

      getItems()
        .then(function() {
          loop();
        });
    });
}

loop();
