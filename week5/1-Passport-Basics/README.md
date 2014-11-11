# Apps with Passport.js

We are going to make some basic authentication for our web applications - username & password.

We are goint to use [Passport.js](http://passportjs.org/) as our primary weapon!

Since the library has some things we should know about, we are going to implement a few different login/logout scenarios!

## Good old username / password login!

### The Express App

Make a simple **static express app**, with the following structure:

```
.
├── app.js
└── public
    └── index.html
```

Our application should serve static files with the following mapping:

* At `/` url, use `public/` folder as root. This means - serve everything from the public folder.

You can read more about serving static files here - http://expressjs.com/4x/api.html#express.static

### The Database

Use a simple Mongo database, that knows about our users.

Each user consists of two things:

* username
* password

You can use ODM, if you like it.

### HTML for Login / Logout

In `index.html`, create a simple login / logout functionallity.

Use forms / buttons / JavaScript - whatever you like!

### Putting it all together

And when we are ready, use the [Passport's LocalStrategy](http://passportjs.org/guide/username-password/) to implement the login / logout functionallity!
