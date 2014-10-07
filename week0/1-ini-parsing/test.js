var child_process = require('child_process'),
    expect = require('chai').expect;


function testWithFile(fileName, expected) {
  var process = child_process.spawn('./solution.js', [fileName]);

  process.on('error', function (error) {
    console.error('Error');
    console.error(error);
  });

  process.on('close', function (code) {
    var result;
    if (code) {
      console.error('Return code ' + code);
    } else {
      result = require('./' + fileName.replace(/.ini$/, '.json'));
      expect(result).to.deep.eq(expected);
    }
  });
}

testWithFile('config.ini', {
  "panda": {
    "name": "Stamat",
    "lazyness": "95",
    "cuteness": "123"
  },
  "unicorn": {
    "name": "Pencho",
    "age": "0.3 bilion",
    "horns": "1",
    "probability": "0.1e-50000"
  }
});

testWithFile('sloppy_config.ini', {
  "panda": {
    "name": "Stamat",
    "lazyness": "95",
    "cuteness": "123"
  },
  "unicorn": {
    "name": "Pencho",
    "age": "0.3 bilion",
    "horns": "1",
    "probability": "0.1e-50000"
  },
  "narwal": {
    "mamal": "true",
    "horns": "0",
    "huge_teeth": "1"
  }
});
