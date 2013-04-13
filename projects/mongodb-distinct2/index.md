---
layout: "page"
title: "MongoDB - distinct2.js"
---
# MongoDB - distinct2.js #

[Project Page](http://skratchdot.com/projects/mongodb-distinct2/)  
[Source Code](https://github.com/skratchdot/mongodb-distinct2/)  
[Issues](https://github.com/skratchdot/mongodb-distinct2/issues/)  

## Description: ##

Similar to the db.myCollection.distinct() function, distinct2() allows
you to pass in an array of keys to get values for.  It also allows you
to pass in an optional "count" argument.  When true, you can easily get
the counts for your distinct values.

You can also call distinct2() on the results of a query (something you
can't currently do with the built in distinct() function).

To accomplish this, it adds the following functions to our built in mongo prototypes:  

{% highlight javascript %}
DBCollection.prototype.distinct2 = function (keys, count) {};
DBQuery.prototype.distinct2 = function (keys, count) {};
{% endhighlight %}

## Usage: ##

{% highlight javascript %}
// All 5 of these statements are the same as:
//
//     db.users.distinct('name.first')
//
db.users.distinct2('name.first');
db.users.distinct2('name.first', false);
db.users.distinct2(['name.first']);
db.users.distinct2(['name.first'], false);
db.users.find().distinct2('name.first');

// you can pass in an array of values
db.users.distinct2(['name.first','name.last']);

// you can get counts
db.users.distinct2('name.first', true);

// you can get distinct values from the results of a query
db.users.find({'name.first':'Bob'}).distinct2('name.last');

//
// When calling distinct2() on large datasets, status on the operation
// will be printed to the shell. By default, the status interval is 1000ms.
// If you would like more/less frequent updates, you can pass in an interval
// time to a setStatusInterval() function. If you would like to disable
// status updates, you can pass in a negative number.
//

// Print status updates every 5 seconds:
db.users.distinct2.setStatusInterval(5000);

// Disable status updates
db.users.distinct2.setStatusInterval(0);

// distinct2 can be used like group(), but has a simpler syntax.
// Take for instance the following 2 queries (which return the same
// results- but in a slightly different format). Let's say the users
// collection has 37 documents. All users have a first name of either
// 'Bob' or 'Amy'. Compare these 2 queries (and results):

// query 1
db.users.distinct2("name.first", true);
// result 1
[
	[ "Bob", 22 ],
	[ "Amy", 15 ]
]

// query 2
db.users.group({
	key : { "name.first" : 1 },
	$reduce : function (curr, result) { result.total++; },
	initial : { total : 0 }
});
// result 2
[
	{ "first.name" : "Bob", "total" : 22 },
	{ "first.name" : "Amy", "total" : 15 }
]

{% endhighlight %}

## Installation: ##

Download: [distinct2.js](https://github.com/skratchdot/mongodb-distinct2/raw/master/distinct2.js)

### Option 1 ###

Add this script to your .mongorc.js file.  

See: [http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js](http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js)

### Option 2 ###

Start the shell after executing this script  

    mongo --shell distinct2.js

### Disclaimer

This is not a highly efficient function. Use caution when running this on large
collections.  It works great on smaller datasets, but may be unusable on huge
collections.  There is a status line that will be printed every 1000ms. You can always
ctrl-c if it takes too long.
