# Who follows you back on GitHub

## Graph module

Write a module that exports a constructor function `DirectedGraph` for instantiating objects.
Let the module be called `graph.js`

To export something from the module, you have to do:

```javascript
function DirectedGraph() {
    // ...
}

module.exports = DirectedGraph;
```

After this, you can require it like that:

```javascript
var Graph = require("./graph");
var graph1 = new Graph(..);
```

### Graph class

The Graph should be:

* Directed
* Unweighted
* Node names should be strings

Don't bother making it more abstract to handle more cases.

There should be the following public methods for the `Graph`:

* A method, called `addEdge(nodeA, nodeB)` - which adds an edge between two nodes. If the nodes does not exist, they should be created.
* A method, called `getNeighborsFor(node)` which returns a list of nodes (strings) for the given `node`
* A method, called `pathBetween(nodeA, nodeB)`, which returns `true` if there is a path between `nodeA` and `nodeB`. Keep in kind that the graph is directed!
* A method, called `toString()` which returns a string representation of the grap. This can be the stringified version of the internal structure of the graph. **Don't draw circles and `-->`**

### Test the Graph class.

Using a library of your choice, make a test-suite for testing the `DirectedGraph` class.

Make sure all public methods works just fine - create a test graph and assert if methods work OK.

**You can use the following testing libraries:**

* Mocha - https://github.com/mochajs/mocha - as a test runner
* Chai - http://chaijs.com/ - as an assertion library

## Who Follows you back?

We are going to implement a NodeJS application, which can give the answer to the fundamental question of the universe - Who follows you back on GitHub?

We want to have the following high-level functionality:

* A app / module that calls the GitHub API and builds the social graph for a given users
* Several HTTP endpoints (use expresss!) for querying someone's social graph.

**Since building the social graph can take a long time, think about how to make it more efficient from user's perspective!**

### Implementation details

* Use the [GitHub API](https://developer.github.com/v3/) to fetch the users that a given users follow.
* Make sure to create yourself a GitHub Application from your settings and obtain `client_id` and `client_secret`. This is because of API Rate Limiting - https://developer.github.com/v3/rate_limit/
* Make calls with your `client_id` and `client_secret` in order to have `5000` requests per hour!
* Make a module / class that takes a given GitHub username and a **depth of the social graph to build**, which uses the `graph.js` module from the previous task.

Be sure not to build graphs with depth `>= 4` - it's going to take forever ;)

**The class the represents the GitHub social network should have the following methods:**

* `following` - returns a list with the usersnames of everyone the user follows
* `isFollowing` - accepts a username and returns `true`/`false` if the main user follows the one specified by the argument
* `stepsTo` - accepts a username and return the number of hops needed to ge to that user following the `following`(pun not quite intended) relation


### Endpoints

The app we are building should have the following endpoints:

* `POST /createGraphFor` - accepts a JSON in the form:

 ```json
 {
    "username": "kunev",
    "depth": 3
}
 ```

**and returns a unique graph id, which we will use to query the graph.**

* `GET /graph/{graphId}` - returns the social graph for the given `graphId`. If the graph has not been created yet, return a message that says so.

* `GET /mutually_follow/{graphId}/{username}` - this methods checks for the social graph with `graphId` and the given `{username}` the following thing:

If the user's social graph (`graphId`) and the given `username` follows each other, this should return:

```json
{
    "relation": "mutual"
}
 ```

If the first user follows the second, but not vice versa:

```json
{
    "relation": "first"
}
```

In the opposite situation:

```json
{
    "relation": "second"
}
```
