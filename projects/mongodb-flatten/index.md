---
layout: "page"
title: "MongoDB - flatten.js"
---
# MongoDB - flatten.js #

[Project Page](http://skratchdot.com/projects/mongodb-flatten/)  
[Source Code](https://github.com/skratchdot/mongodb-flatten/)  
[Issues](https://github.com/skratchdot/mongodb-flatten/issues/)  

## Description: ##

This project provides a way to flatten documents into id/key/value
pairs. The flatten() function accepts a collectionName parameter.
This collection will be emptied, and the newly flattened data will
be stored there. If a collectionName is not passed, then a temporary
collection will be created with a name in the format: temp.flatten_TIMESTAMP.

## Usage: ##

{% highlight javascript %}
// Flatten all user documents, and store the results in: temp.flatten_TIMESTAMP
result = db.users.flatten();

// Flatten all user documents, and store the result in the users_flattened collection
result = db.users.flatten('users_flattened');

// Flatten user documents that have the first name of Bob. Store in a collection
result = db.users.find({ 'name.first' : 'Bob' }).flatten('users_flattened');

// Flatten the first 20 user documents into a dynamically named collection
result = db.users.find().limit(20).flatten();

// Get the number of keys in one document
db.users.find({
	'_id' : ObjectId('4f9c2374992274fc8d468675')
}).flatten().count();
{% endhighlight %}

## Example Result Set: ##

{% highlight javascript %}
> // Start fresh with a new collection called 'users'
> db.users.remove();
> 
> // Add a few records with different schemas
> db.users.insert({'name' : {'first' : 'John', 'last' : 'Smith'}, 'isRegistered' : false, 'tags' : ['male']});
> db.users.insert({'name' : {'first' : 'Bob', 'last' : 'Smith'}, 'isRegistered' : false, 'tags' : ['male','new']});
> db.users.insert({'name' : {'first' : 'Amy', 'last' : 'Smart'}, 'isRegistered' : 1, 'tags' : ['female']});
> db.users.insert({'name' : 'Bob Smith', 'isRegistered' : '0', 'tags' : ['male']});
> 
> // Print our results to the console
> db.users.flatten().find();
Flattening 4 document(s) into the "temp.flatten_1350767969827" collection.
{ "_id" : 1, "i" : ObjectId("5083156186df9e6600186e38"), "k" : "_id", "v" : ObjectId("5083156186df9e6600186e38") }
{ "_id" : 2, "i" : ObjectId("5083156186df9e6600186e38"), "k" : "name.first", "v" : "John" }
{ "_id" : 3, "i" : ObjectId("5083156186df9e6600186e38"), "k" : "name.last", "v" : "Smith" }
{ "_id" : 4, "i" : ObjectId("5083156186df9e6600186e38"), "k" : "isRegistered", "v" : false }
{ "_id" : 5, "i" : ObjectId("5083156186df9e6600186e38"), "k" : "tags.0", "v" : "male" }
{ "_id" : 6, "i" : ObjectId("5083156186df9e6600186e39"), "k" : "_id", "v" : ObjectId("5083156186df9e6600186e39") }
{ "_id" : 7, "i" : ObjectId("5083156186df9e6600186e39"), "k" : "name.first", "v" : "Bob" }
{ "_id" : 8, "i" : ObjectId("5083156186df9e6600186e39"), "k" : "name.last", "v" : "Smith" }
{ "_id" : 9, "i" : ObjectId("5083156186df9e6600186e39"), "k" : "isRegistered", "v" : false }
{ "_id" : 10, "i" : ObjectId("5083156186df9e6600186e39"), "k" : "tags.0", "v" : "male" }
{ "_id" : 11, "i" : ObjectId("5083156186df9e6600186e39"), "k" : "tags.1", "v" : "new" }
{ "_id" : 12, "i" : ObjectId("5083156186df9e6600186e3a"), "k" : "_id", "v" : ObjectId("5083156186df9e6600186e3a") }
{ "_id" : 13, "i" : ObjectId("5083156186df9e6600186e3a"), "k" : "name.first", "v" : "Amy" }
{ "_id" : 14, "i" : ObjectId("5083156186df9e6600186e3a"), "k" : "name.last", "v" : "Smart" }
{ "_id" : 15, "i" : ObjectId("5083156186df9e6600186e3a"), "k" : "isRegistered", "v" : 1 }
{ "_id" : 16, "i" : ObjectId("5083156186df9e6600186e3a"), "k" : "tags.0", "v" : "female" }
{ "_id" : 17, "i" : ObjectId("5083156186df9e6600186e3b"), "k" : "_id", "v" : ObjectId("5083156186df9e6600186e3b") }
{ "_id" : 18, "i" : ObjectId("5083156186df9e6600186e3b"), "k" : "name", "v" : "Bob Smith" }
{ "_id" : 19, "i" : ObjectId("5083156186df9e6600186e3b"), "k" : "isRegistered", "v" : "0" }
{ "_id" : 20, "i" : ObjectId("5083156186df9e6600186e3b"), "k" : "tags.0", "v" : "male" }
{% endhighlight %}

## Installation: ##

Download: [flatten.js](https://github.com/skratchdot/mongodb-flatten/raw/master/flatten.js)

### Option 1 ###

Add this script to your .mongorc.js file.  

See: [http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js](http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js)

### Option 2 ###

Start the shell after executing this script  

    mongo --shell flatten.js
