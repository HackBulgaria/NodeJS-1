var request= require("request"),
      printf = require("printf"),
      currentMaxItem = 8624816;

function getMaxItem(cb) {
  request("https://hacker-news.firebaseio.com/v0/maxitem.json", function(err, res, body) {
    cb(body);
  });
}

function getItem(id, cb) {
  var url = printf("https://hacker-news.firebaseio.com/v0/item/%d.json", id);
  request(url, function(err, res, body) {
    cb(body);
  });
}

function range(a, b) {
  var result = [];

  while(a <= b) {
    result.push(a);
    a = a + 1;
  }

  return result;
}

function loop() {
  getMaxItem(function(maxItem) {
    maxItem = parseInt(maxItem, 10);

    if(currentMaxItem === -1) {
      // Пускаме за 1ви път
      getItem(maxItem, function(item) {
        console.log(item);
        currentMaxItem = maxItem;
        loop();
      });
    } else {
      // Имаме някакъв друг maxItem
      console.log("We have maxItem already");
      var itemsToGet = range(currentMaxItem, maxItem),
            lastItem = itemsToGet[itemsToGet.length - 1];
      console.log(itemsToGet);
      // [id1, id2, id3], getItem
      itemsToGet.forEach(function(itemId) {
        getItem(itemId, function(item) {
          console.log(item);
          if(itemId === lastItem) {
            console.log("Last item");
            currentMaxItem = maxItem;
            loop();
          }
        });
      });
    }
  });
}

loop();

// ако за първи път пускаме програмата - трябва да вземем сегашния maxItem
// и след това, на определен интервал, питаме кой е новият maxItem?
// Взимаме списъка с id-тата между currentMaxItem и maxItem
// За всички id-та, взимаме getItem от съответното id
// Пак повтаряме, на определен интервал от време
