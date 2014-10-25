### Geospatial stuff in mongo

Geospatial indexes in mongo allow us to make "geo requests" to our data such as:

- get the nearest X points within a certain distance
- get the points from our data that are in a certain box/polygon/circle

In order to do that we create a special [2d sphere index](http://docs.mongodb.org/manual/core/2dsphere/) on a collection. Once we have done that we can do various [geospatial](http://docs.mongodb.org/manual/reference/operator/query-geospatial/) to that collection.

We will use this functionality to create the service for our simple geo-enabled web app.

###The Save-It-Find-It web applications

We have 2 web apps which work complementary. We called them SaveIt and FindIt. One will be used to save the location, and the other when a user wants to find locations that are within some range from his position (range is in km).

#####Save-It app

The first web app saves a location (restaurant, landmark or w/e).

A location is defined by a name, location and tags.

- The name is an arbitrary string
- The location can be set by clicking on the map.
- The tags are a list of words (space separated) that will be used for filtering.

A sample json that will be **sent** by the web app would be:
> {
>  'name': 'MyOwnRestaurant',
>  'position': { 'lng': 3.412, 'lat': 5.132 }, 'tags': ['blackjack', 'hookers']
> }


Your job on the client is to make the appropriate **$.ajax** call to the `POST locations` endpoint that will save the location in mongo. 

> Do not forget to run **bower install** in */week2/3-Geolocation-and-stuff/save-it*. Then just open **index.html**

#####Find-It app

The find-it app is used when a user wants to find all locations with the specified tags within a certain range (in km).

You will need to implement the **$.ajax** call to the `GET locations` endpoint, that gets all locations within a certain range. The locations should be further filtered by the tags that are provided.

> Do not forget to run **bower install** in */week2/3-Geolocation-and-stuff/find-it*. Then just open **index.html**

#### And for our NodeJs side

On the server side we need a server that has 2 endpoints:

`GET locations` - Used by our Find-It app. By providing a **range**, **position** and **tags** will return all locations with the specified tags that are within the specified range from the position (range is in km).

`POST locations` - Used by our Save-It app. Sending a location with name, position and tags will save the location to our mongodb. 
> Do not forget to convert the position from { lat, lng } object to GeoJson format. Follow the [Link](http://geojson.org/geojson-spec.html#id2) to see the specification of the point structure.
  

### Hints
[http://geojson.org/geojson-spec.html#id2](http://geojson.org/geojson-spec.html#id2) - GeoJson specification that is used by mongo

[2dsphere index in mongo](http://docs.mongodb.org/manual/core/2dsphere/) will be used so mongo can work with geo queries for our data.

[$nearSphere](http://docs.mongodb.org/manual/reference/operator/query/nearSphere/) how to make the 'near' query.





