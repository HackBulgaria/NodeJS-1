# Materials for week2

We are goint to tap into Mongo and Mongoose.

## Materials for Mongo

* A good introduction to Mongo is this webcast - https://www.youtube.com/watch?v=w5qr4sx5Vt0 (1hour of length)
* After this, you can just go to the MongoDB official manual - http://docs.mongodb.org/manual/ - it is very good!
* In order to install Mongo properly, check this - http://www.mongodb.org/downloads
* User Interface for exploring Mongo - http://www.mongovue.com/
* Mongo commands cheat sheet - http://www.mongodbspain.com/wp-content/uploads/2014/03/MongoDBSpain-CheatSheet-p1.jpg
* BigDataBorat Twitter Account - https://twitter.com/BigDataBorat
## Importing the test data

Thre is a `dump.zip` file, located in week2 folder.

Extract it and find the `data.bson` file. You can import it to mongo with the following command:

```
$ mongorestore --collection data --db weather data.bson
```

This will create a new database, called `weather` with one collection, called `data`. We can use this for testing purposes.

The collection is from the [Mongo University MOOC](https://university.mongodb.com/)
