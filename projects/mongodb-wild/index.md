---
layout: "page"
title: "MongoDB - wild.js"
---
# MongoDB - wild.js #

[Project Page](https://www.skratchdot.com/projects/mongodb-wild/)  
[Source Code](https://github.com/skratchdot/mongodb-wild/)  
[Issues](https://github.com/skratchdot/mongodb-wild/issues/)  

## Description: ##

Adds a wildcard search to the mongodb shell.  You can run the new
wild() function on a collection, or on a query result.
The search is performed by converting each document to json,
and then running a regex on that json.

## Usage: ##

{% highlight javascript %}
// Search entire users collection for Bob
db.users.wild('Bob');
db.users.wild(/Bob/gi);
db.users.find().wild('Bob');

// Search for exact values of 'Bob'
db.users.wild(': "Bob"');

// Search for exact keys called 'Bob'
db.users.wild('"Bob" :');

// Search for documents containing 'Bob', filtering by last name of 'Smith'
db.users.wild('Bob', {'name.last' : 'Smith'});
db.users.find({'name.last' : 'Smith'}).wild('Bob');
{% endhighlight %}

## Installation: ##

Download: [wild.js](https://github.com/skratchdot/mongodb-wild/raw/master/wild.js)

### Option 1 ###

Add this script to your .mongorc.js file.  

See: [http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js](http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js)

### Option 2 ###

Start the shell after executing this script  

    mongo --shell wild.js
