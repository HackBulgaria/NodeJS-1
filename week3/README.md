class: center, middle
# Testing

---

# Jasmine

[Jasmine](http://jasmine.github.io/) is one of the most famous javascript testing frameworks. It defines itself as a tool for behaviour driven development.

---

# Jasmine examples

In the [jasmine github repo](https://github.com/mhevery/jasmine-node/tree/master/spec)

---
# Chai

[Chai](http://chaijs.com/) is an assertion library for node and client side javascript. It supports both `expect().to` and `should` style assertions. It also provides an extended version of the built in `assert` module.

It has a plugin system. A nice example for a plugin is [Chai as Promised](http://chaijs.com/plugins/chai-as-promised) which exposes a nicer API for testing promises.

---
# Mocha

[Mocha](http://mochajs.org/#getting-started) is a testing framework for node and client side javascript. It can be used with any assertion library(for instance chai). It supports [several interfaces](http://mochajs.org/#interfaces) for running tests.

---
# Sinon

[Sinon](http://sinonjs.org/) supports testing with spies, stubs, mocks etc. It can be [used together with chai](http://chaijs.com/plugins/sinon-chai).

---
# Testing HTTP(S) APIs

Visinmedia's [SuperAgent](https://github.com/visionmedia/superagent) can be used to test HTTP(S) APIs with a [pretty simple setup](https://github.com/visionmedia/superagent/blob/master/test/node/agency.js)

---
class: center, middle
# Headless browser

---
# PhantomJS/SlimerJS

[PhantomJS](http://phantomjs.org/) - WebKit
[SlimerJS](http://www.slimerjs.org/) - Gecko
[Chimera](https://github.com/deanmao/node-chimera)

---
# Testing in headless browsers

[CaspeJS](http://casperjs.org/)

---
# ZombieJS

[ZombieJS](http://zombie.labnotes.org/)
