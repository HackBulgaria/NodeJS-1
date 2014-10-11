# Twitter clone in a single process

Using the `http` module write a Chirpr(über innovative naming right there!) - a twitter-like service.

## The Chirp API

We want to be able to make the following calls:

 * `GET /all_chirps` - returns all the chirps for all the users we have. Newest chirps should be first.
 * `POST /chirp` - expects `user`, `key` and `chirpText` arguments. Creates a new chirp on behalf of `user` and returns a `chirpId`, which should be unique for every chirp!
 * `GET /all_users` - returns all the registered users.
 * `POST /register` - expects `user` as argument. Creates a new user and returns a `key` for that user. If the user already exists just returns a 409 response code.
 * `GET /my_chirps` - expects `user` and `key` as arguments. Returns all chirps of `user`
 * `DELETE /chirp` - expects `key` and `chirpId` as arguments. Deletes the chirp with the given id if the key matches the key of the chirp owner. Otherwise returns a 403 response code.
 * `GET /chirps` - expects either `chirpId` or `userId` as an argument. If given both ignores `chirpId`. Returns a list of chirps.

Some specification:

* `user` should be a username - a string
* `key` should be a unique string for each user
* **The arguments to the API calls should be in JSON format!**
* **All returns should be in JSON format!**

### Formats

`/chirps`, `/all_chirps` and `/my_chirps` should return a json list with objects for the chirps:

```json
[
    {
        "userId": 12,
        "chirpId": 48,
        "chirpText": "Търсим нов служител. Нужно е да е наполовина човеко-прасе, наполовина - мечка. Желание за работа с #WordPress е многу от съществено значка.",
        "chirpTime": "10-10-2014 12:54"
    }
]
```

`/all_users` should return a list of objects for all the registered users with their id, name and the number of chirps they have.

```json
    [
        {
            "user": "Stancho",
            "userId": 31,
            "chirps": 43,
        }
    ]
```

### Testing things out

Now, you should implement a Client for our Chirp API. Of course, using NodeJS.
This should be entirely different code and project!

The client should be console-like and accept different arguments in order to use the API.

For example, if we run the client like that:

```
$ node chirp_client.js --register --user=RadoRado
<Response from the API here>
```

[Use argparse to parse your arguments.](https://github.com/nodeca/argparse)

### Specification of all API calls

The most important thing for our API client should be one `config.json` file, located relatively in the same directory, which will store the API url:

```json
{
    "api_url": "http://localhost:8080"
}
```

If you have an API key (a registered user), you should add it to the `config.json` file too:

```json
{
    "api_url": "http://localhost:8080",
    "user": "RadoRado",
    "key": "bananispijami"
}
```

All other API calls should rely on that `config.json`. The only exception is the API call for registering.

#### Registering user

This should look like this:

```
$ node chirp_client.js --register --user=RadoRado
<Response from the API here>
```

Once you have the response, update the `config.json` file with the user and the returned API key. If there is an existing user in `config.json`, overwrite it.

#### Get all chirps

This should look like this:

```
$ node chirp_client.js --getall
<RETURNS ALL CHIRPS IN JSON FORMAT>
```

This call does not require `user` and `key` in `config.json`


#### Get my chirps

This should look like this:

```
$ node chirp_client.js --getself
<RETURNS ALL CHIRPS IN JSON FORMAT>
```

This call requires `user` and `key` in `config.json`

#### Create new chirp

This should look like this:

```
$ node chirp_client.js --create --message="Relationship status: пътувам с автобус"
<RESPONSE FROM API WITH CHIRP ID>
```

This call requires `user` and `key` in `config.json`


#### Delete a chirp

This should look like this:

```
$ node chirp_client.js --delete --chirpid=12
<RESPONSE FROM API>
```

This call requires `user` and `key` in `config.json`

## NB

We're going extreme NODB! Keep all your data in-memory.

You can use this to make JSON curl requests:

```
curl -H "Content-Type: application/json" --data @body.json http://localhost:8080/
```

Where `body.json` is local file.
For more options, check here - curl -H "Content-Type: application/json" --data @body.json http://localhost:8080/ui/webapp/conf
