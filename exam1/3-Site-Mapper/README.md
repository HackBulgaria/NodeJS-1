# Site mapper

The task is to expose an HTTP API for requesting site maps.

## Ednpoints

It needs to have the following endpoints:

* `POST` `/map` - accepts JSON requests that should have a key `"url"`, which value is the address of the site we want to crawl(scheme, host name and optionally a port). Return an id assigned to the site and starts building it.
* `GET` `/sitemap` - accepts JSON requests with one key `"id"`, to get the site map for that site. The possible return values are:
  * if the crawling has not yet finished: `{"status": "currently crawling"}`
  * if it's finished:
    ```javascript
    {
      "status": "done",
      "sitemap": [
        {
          "url": "http://reddit.com", // this url
          "links": […], // holds links to these urls
        },
        …
      ]
    }
   ```

## Notes

### Don't repeat work
If we send a request to `/map` for generating a site map for a URL we've already requested we should always return the same id, thus not crawling a site twice.

### Don't go too deep
Site maps could get quite big, so limit them to 500 links in total. This means the response to `/sitemap` should have a `"sitemap"` property with length of no more than 500.

### robots.txt
Respect a site's [robots.txt](http://www.robotstxt.org/) when crawling it to build a site map.


### Libraries
You can use whatever libraries you find useful for this task, but here are our recommendations:

* [robots.js](https://github.com/ekalinin/robots.js) - gives you an interface for parsing robots.txt files and checking their rules
* [node-htmlparser](https://github.com/tautologistics/node-htmlparser) - lets you parse html into an object representing the DOM
* [node-soupselect](https://github.com/harryf/node-soupselect) - lets you use css selectors on the object produced by node-htmlparser
--
* [Q](https://github.com/kriskowal/q) - if things are about to turn into a callback hell, refactor a bit and use a deferred, it always helps to make code more readable.
