var express = require ('express'),
    bodyParser = require('body-parser'),
    rand = require('generate-key'),
    app = express(),
    data = {
      users: [],
      chirps: [],
    };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function authUser (username, key) {
  var user = data.users.filter(function (user) {
    return user.name === username;
  });

  if (user[0]) {
    return key === user[0].key ? user[0].id : false;
  }
}

function userExists (username) {
  var user = data.users.filter(function (user) {
    return user.name === username;
  })[0];

  return user;
}

app.post('/chirp', function (req, res) {
  var chirp = req.body,
      userId = authUser(chirp.user, chirp.key);

  if (userId) {
    data.chirps.push({
      'userId': userId,
      'chirpTime': Date.now(),
      'chirpText': chirp.chirpText,
    });
  }

  res.json({
    'chirpId': data.length - 1,
  });
});

app.post('/register', function (req, res) {
  var user,
      userId;

  console.log(req.body);
  if (userExists(req.body.username)) {
    res.status(403);
    res.end();
    return;
  }

  user = {
    username: req.body.user,
    key: rand.generateKey(100),
  };

  data.users.push(user);

  userId = data.users.length - 1;
  console.log('Registered user: ' + user.username);
  res.json({
    userId: userId,
    key: user.key,
  });
});

app.get('/all_chirps', function (req, res) {
  res.json(data.chirps);
});


app.listen(8000);
