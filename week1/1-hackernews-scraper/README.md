# HackerNews Subscriber App

We want to build a larger system that does something more interesting and complex this time.

And we like [Hacker News](https://news.ycombinator.com/). It's a simple concept, which is in a big part what makes it popular.

It's a nice example of doing things [The UNIX Way](https://en.wikipedia.org/wiki/Unix_philosophy#Mike_Gancarz:_The_UNIX_Philosophyx). A simple application that does one thing: lets people post links and comments. Sadly people operate pretty badly when allowed to use just one such tools embodying a UNIX-style manner of work. We need at least a few to be happy.

First we really wish we wouldn't miss really interesting stories from HN, just because we couldn't watch it constantly and decide which we like.

We'd prefer to be able to just **scrape for new threads about pandas** (you never saw that one coming, did you?). And here's an idea of how to solve our issue, of course trying to maintain a UNIX-style architecture.

**We are going to build 3 separate parts of software to deal with this task.**

Each of them is pretty capable of working on its own and should we ever decide one of them is ineffective and should be changed or heavily modified, doing so should be practically invisible to the other components.

We are going to have:

* A subscriber to manage emails & keywords
* A notifier to send emails about new threads
* A scraper, that communicates with the HackerNews API

## Subscriber

We want to have a simple service listening for HTTP requests which allows us to subscribe for a "bag" of words that we find interesting. We should be able to post json data to the subscriber in the following format:

```json
{
    "email": "ziltoid@4th.dim",
    "keywords": [
        "coffee",
        "destruction",
        "omniscience"
    ]
}
```

This means that from now on we want to get notified at `ziltoid@4th.dim` for all new HN articles containing any of the words `coffee`, `destruction` or `omniscience`.

**The server should return a unique subscriber id**, which we can use later to unsubscribe from the service:

```json
{
    "email": "ziltoid@4th.dim",
    "subscriberId": "bananispijami123123"
}
```

**Submitting a mail several times with different keywords is totally fine.** This is a nice way to cluster articles into different mails.

We can do the following requests:

```json
{
    "email": "ziltoid@4th.dim",
    "keywords": [
        "meshuggah",
        "planet smasher"
    ]
}
````

```json
{
    "email": "ziltoid@4th.dim",
    "keywords": [
        "panda destroyer"
    ]
}
```

We will have 3 different subscriber IDs for `ziltoid` and this is fine.

All data about emails and keywords should be persisted in  `subscribrers.json` file(of course you can call the file anything else).

You can use [node-persist](https://github.com/simonlast/node-persist) library for that.

### API Endpoints for the subscriber

We should have the following API endpoints:

* `POST /subscribe` - as explained above, this creates a new subscriber
* `POST /unsubscribe` - takes a JSON payload with a single `"subscriberId"` and unsubscribes it if possible
* `GET /listSubscribers` - returns a list of all subscribers with their emails, ids and keywords. This is great for testing purposes

## Notifier

It *periodically reads* data from a json file containing information about new articles, then reads the data submitted through the subscriber and decides what mails need to be sent.

The notifier marks each article as processed once it sends mails about it to all the addresses in the `subscribers.json` file.

**The notifier makes the matching phase between the titles of the articles and the keywords for each subscriber!**

### Note on *periodically reads*

The notifier has an HTTP server up, listening for a POST request to `/newArticles`. A request to this URL makes the notifier read the data from `articles.json` and `subscribers.json` and send the respective mails.

### Matching phase & Sending notifications

It is enough only 1 of the keywords from a bag of keywords for a given subscriber to match in a story's title, for the notifier to send an email.

For one subscriber, the notifier should check for all new articles if there are any matches and send the articles that match in one email.

**Again, lets repeat:**

* There can be multiple subscriptions for 1 email - the notifier should send different emails for different subscriptions
* For one subscriber, if there are more than 1 articles that match some of his keywords, the notifier should send **1 email** with articles listed in there.

## Scraper

The most complex part of our setup is going to be the scraper which will poll the [HackerNews API](https://github.com/HackerNews/API) every two minutes and write all new articles to `articles.json`.

We'll poll for the latest [maxitem](https://hacker-news.firebaseio.com/v0/maxitem) from the API and decide which items we want to fetch. To make the decision easier we want to keep the last `maxitem` in our `articles.json` file.

We're only interested in items with `item['type'] === 'story'`, those are the main articles.

**Once the scrapre polls & saves the articles, it sends a POST request to the notifier, to wake him up.**

### Polling mechanism

For example, lets say that we poll the `maxitem` and we get `8452389`. We fetch the following article or comment - https://hacker-news.firebaseio.com/v0/item/8452389.json?print=pretty

This returns a story in JSON format:

```
{
  "by" : "oliveremberton",
  "id" : 8452389,
  "score" : 1,
  "text" : "",
  "time" : 1413273932,
  "title" : "How to debug your brain",
  "type" : "story",
  "url" : "http://oliveremberton.com/2014/how-to-debug-your-brain/"
}
```

After two minutes, the `maxitem` is `8452393`. Our last `maxitem` was `8452389`, so we have 4 new API calls to make, in order to get:

* `8452390`
* `8452391`
* `8452392`
* `8452393` - this is where we stop.

And we repeat that every two minutes.

### Gotchas

Keep in mind that HTTP get requests are async and you should fetch new article only after the previous is done. You will have to make an async While loop, so give it a good think!

## Libraries

 * [express](http://expressjs.com/)
 * [node-persist](https://github.com/simonlast/node-persist)
 * [Nodemailer](https://github.com/andris9/Nodemailer)
