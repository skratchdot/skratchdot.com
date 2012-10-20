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
// All 4 of these statements are the same as:
//
//     db.users.distinct('name.first')
//
db.users.distinct2('name.first');
db.users.distinct2('name.first', false);
db.users.distinct2(['name.first']);
db.users.distinct2(['name.first'], false);

// you can pass in an array of values
db.users.distinct2(['name.first','name.last']);

// you can get counts
db.users.distinct2('name.first', true);

// you can get distinct values from the results of a query
db.users.find({'name.first':'Bob'}).distinct('name.last');
{% endhighlight %}

## Installation: ##

Download: [distinct2.js](https://github.com/skratchdot/mongodb-distinct2/raw/master/distinct2.js)

### Option 1 ###

Add this script to your .mongorc.js file.  

See: [http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js](http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js)

### Option 2 ###

Start the shell after executing this script  

    mongo --shell distinct2.js
