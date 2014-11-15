var request = require('request'),
      URI_PATTERN = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
var Q = require("q");

function getUrlsFrom(url) {
  var defered = Q.defer();

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      defered.resolve(body.match(URI_PATTERN));
    } else {
      defered.reject(error);
    }
  });

  return defered.promise;
}


var urlsQueue = ["https://hackbulgaria.com"];

function scrape() {
  var url = urlsQueue.shift();

  getUrlsFrom(url)
  .then(function(urls) {
    console.log(urls);
    urlsQueue = urlsQueue.concat(urls);
    scrape();
  })
  .fail(function(error) {
    console.log("FAILED");
    console.log(error);
  })
  .done();
}

scrape();




