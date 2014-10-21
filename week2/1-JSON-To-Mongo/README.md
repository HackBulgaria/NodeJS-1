# Importing JSON to Mongo

We are going to warm-up with a very simple task - a node script that reads JSON files are arguments and import them in mongo collections.

For the task, use the [Native Node Adapter](https://github.com/mongodb/node-mongodb-native), to connect with Mongo.

Lets have the following directory structure:

```
.
├── config.json
├── json-to-mongo.js
└── people.json
```

Where `json-to-mongo.js` is our import script.

If we run:

```
$ node json-to-mongo.js people.json
```

The following things should happen:

* In `config.json`, there is a `mongoConnectionUrl` key, holding the connection string for Mongo - `"mongodb://localhost:27017/database-name"`
* The script should import in `database-name`, in the collection `people` the data from `people.json`
* The collection, in which the data is going to is determined by the name of the JSON file we are importing
* `people.json` shold contain an array of JSON objects.

Implement the `json-to-mongo.js` script, following the specification above.
