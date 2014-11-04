# Express with Mongo / Mongoose & Tests

So far, we have finished the first part in our NodeJS Journey.

**We have grasped the following topics:**

* Working with the file system
* Working with the HTTP module
* Why is everything so async?
* Working with Express for making HTTP APIs
* Consuming 3rd party APIs and making async while loops
* Working with Mongo and the Native Driver for Node
* Testing our applications in different styles.

Now, we want to recap everything and make a simple & stupid CRUD application, so everything becomes clear.

## The idea - A simple code-snippet system

We are going to make a small web app (frontend is up to you, if you want), which keeps snippets of code.

Each snippet has the following data:

* The language of the code
* The filename
* The code itself
* The name of the creator of the snippet (Can be nickname or some unique id. Your choice)

**You will have two primary goals:**

1. Create an RESTful Express API which CRUDs code snippets.
2. Test RESTful API for working correctly

## Libraries to use

* Express for the REST API
* [Mongoose](http://mongoosejs.com/) for making models & storing them in Mongo
* [Mocha](https://github.com/mochajs/mocha), [Chai](http://chaijs.com/) and [SuperTest](https://www.npmjs.org/package/supertest) for testing

Everything else you think can do the job for you.

## Endpoints for CRUD

This is up to you, but be sure to include endpoints for:

* Creating snippets
* Updating existing snippet
* Deleting a snippet
* Listing all snippets
* Listing snippets by creator
* Listing a single snippet by some unique identifier

## Making the app smart

You can make the app a little-bit smarter by infering the language just from the file name.

For example, if you upload a `app.js` file, the language should be infered as JavaScript.

You can take a look at [`gist.github.com`](https://gist.github.com/)
