### Data about Bulgarian cities

`geo.zip` in this folder holds geospacial data about cities in Bulgaria. It defines each city as a list of points. That's the polygon describing the city outline.

You can unzip it to a directory called `geo` and then load it in your mongodb server by running `mongorestore geo` from the command line. That will add a database called `geo` with one collection in it called `features`.

```json
{
  "_id" : ObjectId("544b571756b55d1bc11af6ed"),
  "type" : "Feature",
  "properties" : {
    "name" : "Аксаково",
    "id" : 83,
    "pid" : 4,
    "pop" : 20426,
    "oblast" : "Варна"
  },
  "geometry" : {
    "type" : "Polygon",
    "coordinates" : [
      [
        [
          27.985,
          43.404
        ],
        [
          28.024,
          43.36
        ],
        [
          28.042,
          43.309
        ],
        …
        …
        …
        [
          27.966,
          43.407
        ],
        [
          27.985,
          43.404
        ]
      ]
    ]
  }
}
```

The key `geometry` holds a GeoJSON definition of a polygon. We can run `db.features.ensureIndex({ 'geometry' : '2dsphere' }` to tell mongo that the field `geometry` in each document in the  `features` collection should be indexed as a GeoJSON object, in order to be able to make geo queries on our data.

We can now make a query to check in which city is a point on the map located.

```javascript
db.features.find(
{
	"geometry": { // we are querying the geometry property of each document in the collection
		"$geoIntersects": {
			"$geometry": { 
				"type": "Point",
				"coordinates": [23.985729217529297, 42.030679234530766]
			} 
		} 
	} 
}, 
{ "properties.name": 1}
)
```

Here [`$geoIntersects`](http://docs.mongodb.org/manual/reference/operator/query/geoIntersects/#op._S_geoIntersects) is the geospacial query operator we want to use to check for intersection objects and [`$geometry`](http://docs.mongodb.org/manual/reference/operator/query/geometry/#op._S_geometry) is another geospacial operator which converts a GeoJSON object to something other geospacial operators can use as an argument.

If you run this query on the data in `geo.zip` you should get `{ "_id" : ObjectId("544b571756b55d1bc11af7e6"), "properties" : { "name" : "Велинград" } }` as a result.

Alternatively the following queries for all cities that are within the polygon defined with `coordinates`.

```javascript
db.features.find(
{
	"geometry": {
		"$geoWithin": { 
			"$geometry": { 
				"type": "Polygon", 
				"coordinates": [
					[
						[24.312744140625, 42.35042512243457],
						[25.191650390625, 42.391008609205045],
						[24.686279296875, 41.75492216766298],
						[24.312744140625, 42.35042512243457]
					]
				]
			} 
		} 
	} 
}, 
{ "properties.name": 1}
)
```

If we used `$geoIntersects` instead of `$geoWithin` we would get all the cities that intersect with our polygon, but aren't necessarily completely inside it.
