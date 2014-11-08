# Smart Phonebook

We are going to create a simple web application that keeps phone numbers and names together.

We are going to need a REST API for our server, in order to perform all the CRUD operations required.

__There are two main objects:__

* **contacts**, which consist of a phone number and a name
* **groups**, which are collection of contacts.

## CRUD for Contacts

First and foremost, we will need a way to manage our contacts.

A contacts consist of two things:

```json
{
    "phoneNumber": "....",
    "personIdentifier": "..."
}
```

Every contact should be identified by some unique identifier (For example, the id from Mongo)

### Endpoints

We are interested in the following CRUD operations:

* Creating a new contact
* Reading all contacts
* Reading a given contact
* Deleting a given contact

Don't bother handling the updating of a contact.

### Testing the endpoints

Be sure to test your endpoints one way or another. There is a rich toolsuite for testing in the Node ecosystem, so choose wisely!

## Groups and Smart Groups

Our app will have the feature to group contacts together, under a name.

But to have a little twist, there won't be any **Create / Update / Delete** operations for creating groups.

Groups will be created only from our application - if certain criteria for all contacts are met, the app will create a new group for us.

### Criteria for groups

#### Common Words in Names

If there is a common word between two `personIdentifiers` in two contacts, those contacts are grouped together. If there is no existing group with that common word, such group is created. Otherwise - it is updated with the new contacts.

For example, lets have two concat names:

* `"Ivan Mladost"`
* `"Maria MLADOST"`

We see that if we ignore the case (and so should your app), there is a common word `"mladost"` in it, which will result in a new group:

```json
{
    "groupName": "Mladost",
    "contacts": [
        ....
    ]
}
```

If there are two common words, that are different from each other, two groups should be created!

For example, if we have:

* `"Rado Georgiev Mladost"`
* `"Rado Ivanov Mladost"`

Two groups with names `"Rado"` and `"Mladost"` should be created.

#### Really close words, should also form Fuzzy groups!

Sometimes, when we write names for our contacts, we misspell things.

But our app should handle that case too!

If there are two words in the names of two contacts, that has **edit distance** less than or equal to two, they should form a **fuzzy group**, which has two names - both the two words.

For example, lets have:

* `"Rado Mladost"`
* `"Rado Mldost"`

The edit distance (also called Levenshtein distance) between `"Mladost"` and `"Mldost"` is 1, so this should form a group, which looks like this:

```json
{
    "groupName": ["Mladost", "Mldost"],
    "type": "fuzzy",
    "contacts": [
        ...
    ]
}
```

[You can use the following library, to compute the Levenshtein distance.](https://github.com/gf3/Levenshtein)

### Endpoints

We should be able to list all groups and contacts in there.

## Guides

### Libraries

* Use Express for HTTP routing
* Use Mongo for storage
* Promises / Mongoose is up to you

### Group forming

* Always ignore case, but when you create a new group, the name should start with an upper case!
* To take different words, just split by whitespace - this should be enough for the task (No need for tokenizing)
