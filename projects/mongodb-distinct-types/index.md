---
layout: "page"
title: "MongoDB - distinct-types.js"
---
# MongoDB - distinct-types.js #

[Project Page](http://skratchdot.com/projects/mongodb-distinct-types/)  
[Source Code](https://github.com/skratchdot/mongodb-distinct-types/)  
[Issues](https://github.com/skratchdot/mongodb-distinct-types/issues/)  

## Description: ##

Similar to the db.myCollection.distinct() function, distinctTypes() will return
"types" rather than "values".  To accomplish this, it adds the following
function to the DBCollection prototype:  

{% highlight javascript %}
DBCollection.prototype.distinctTypes = function (keyString, query, limit, skip) {};
{% endhighlight %}

## Usage: ##

{% highlight javascript %}
// we hope this would return ['bson'] not ['bson','string']
db.users.distinctTypes('name');

// should return ['string']
db.users.distinctTypes('name.first');

// should return ['string']
db.users.distinctTypes('address.phone');

// only search documents that have { 'name.first' : 'Bob' }
db.users.distinctTypes('address.phone', {'name.first':'Bob'});

// only search the first 10 documents
db.users.distinctTypes('address.phone', {}, 10);

// only search documents 10-15
db.users.distinctTypes('address.phone', {}, 10, 5);
{% endhighlight %}

## Caveats: ##

By design, distinctTypes() returns 'bson' rather than 'object'.
It will return 'numberlong' rather than 'number', etc.

## Installation: ##

Download: [distinct-types.js](https://github.com/skratchdot/mongodb-distinct-types/raw/master/distinct-types.js)

### Option 1 ###

Add this script to your .mongorc.js file.  

See: [http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js](http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js)

### Option 2 ###

Start the shell after executing this script  

    mongo --shell distinct-types.js
