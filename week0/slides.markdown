class: center, inverse
![hackbg](src/img/HackBG-logo.png)
![node](src/img/node.png)

---


# First thing's first
### nvm

https://github.com/creationix/nvm

```
curl https://raw.githubusercontent.com/creationix/nvm/v0.17.1/install.sh | bash
```

---
# First thing's fisrt
### windows
http://nodejs.org/download/

---
# REPL
Pretty much what you're used to with Chrome/Firefox dev tools

```javascript
    node
    > var a = 42;
    undefined
    > var b = 73;
    undefined
    > a + b;
    115
    > "" + a;
    '42'
    > ['coffee', 'tea', 'sugar', 'cinnamon'].length
    4
    > 
```

---
# Applications/packages
Every applications can be treated as a node package. It's not mandatory to do this in order to run an application, but is considered a good practice and offers quite a bit of conveniences.

---

## npm
#### Node Package Manager

```bash
    npm init
    …
```

Creates a `package.json` file, which describes our package:

```json
{
  "name": "example_package",
  "version": "0.0.0",
  "description": "an example package for the Hack Bulgaria nodejs course",
  "main": "index.js",
  "scripts": {
    "test": "test.js"
  },
  "repository": {
    "type": "git",
    "url": "git://git@github.com:HackBulgaria/NodeJS-1/example_package"
  },
  "author": "Hack Bulgaria",
  "license": "MIT"
}
```

---
# Dependencies

Every language has this issue to some extent. Different applications often depend on different libraries/modules/packages. Some times those dependencies result in applications conflicting with one another.

* RVM gem sets/Bundler GEMFILEs
* Python's virtualenv
* etc …

#### Node has `./node_modules`

---
# node_modules
Each application/package holds it's own dependencies locally in a `./node_modules` directory within it's own root directory. Those can be specified in `package.json` and are usually installed using `npm`.

```bash
    npm install express --save
    npm install mocha chai --save-dev
    npm remove mocha --save-dev
```

---
So our `package.json` now looks like this:

```json
{
  "name": "example_package",
  "version": "0.0.0",
  "description": "an example package for the Hack Bulgaria nodejs course",
  "main": "index.js",
  "scripts": {
    "test": "test.js"
  },
  "repository": {
    "type": "git",
    "url": "git://git@github.com:HackBulgaria/NodeJS-1/example_package"
  },
  "author": "Hack Bulgaria",
  "license": "MIT",
  "devDependencies": {
    "chai": "^1.9.2",
    "mocha": "^1.21.4"
  },
  "dependencies": {
    "express": "^4.9.5"
  }
}
```

---
# Global packages
Some packages need to be installed globally on your system in order for them to work. Things like coffee script, grunt etc. These offer a global executable file which needs to be in yout `$PATH` in order to be easily runnable. For such cases there is the `-g` flag for `npm install` which tells npm to install to some global location, rather than the local `./node_modules`.

**NB!!** This is only useful for packages that *MUST* be installed globally in order to be useful. Installing in `./node_modules` is preferred.

If using `nvm` or `n` you can simply invode `npm install -g <some-package>`. If you are using `node` installed from your system's package manager you will most probably need privileged access to the system in order to install packages globally.

---

# fs

```javascript
    var fs = require('fs');
    fs.readFile(fileName, function(error, data) {
      if (error) {
        console.error('Error reading file: ' + error);
      } else {
        console.log('File contents: ' + data.toString())
      }
    });
```

---

# http(https)
```javascript
  var http = require('http');
  http.get('http://some.awesome.place.com/interesting_thin.gz', function(res) {
    res.on('data', function(data) {
      console.log(data.toString())
    });
  });
```

# API documentation

http://nodejs.org/api
