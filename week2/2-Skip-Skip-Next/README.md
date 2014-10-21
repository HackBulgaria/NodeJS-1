# Displaying top keywords from our HackerNews Scraper

Last week, we finished the Scraper that wanted to read the entire HackerNews! Now, we are going to migrate the persist layer to Django and after this, play with the different queries and commands.

At the end, we must bring the web application, located in `app` to life with read data!


## Moving data to Mongo

The data from the Scraper is kept in a JSON format:

* You should migrate that data to Mongo one way or another.
* You should change the persistence layer to Mongo too. This means new keywords are saved directly there.

You can use the `json-to-mongo.js` app that we wrote in the previous task.

## Web Application

We have constructed for you a simple web application, that consists of a table with two buttons.

The table displays 3 columns - rank (position), keyword and count for that keyword.

We want to display only ten items in that table, starting from top 10 keywords (descending order)!

* If the `next` button is clicked, display the `(last_item_in_table) + 10` items - the next 10
* If the `prev` button is clicked, display the `(first_item_in_table) - 10` items - the previous 10
* Make sure to handle corner cases - when there are no next or prev data to display

#### Starting the application

To start the application, you have to do:

```
$ bower install
```

After this open index.html in your favourite web browser and enjoy!

If you do not have bower, try with:

```
$ npm install -g bower
```

## Making thing happen

Once the data is migrated, you can finish the code to the Scraper so it works with the web application.

Things to use and try out:

* http://docs.mongodb.org/manual/reference/method/cursor.sort/
* http://docs.mongodb.org/manual/reference/method/cursor.limit/
* http://docs.mongodb.org/manual/reference/method/cursor.skip/

Use the Native Driver to achieve everything!
