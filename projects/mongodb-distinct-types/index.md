---
layout: page
title: MongoDB - distinct-types.js
---
# MongoDB - distinct-types.js #

[Project Page](http://skratchdot.github.com/mongodb-distinct-types/)  
[Source Code](https://github.com/skratchdot/mongodb-distinct-types/)  
[Issues](https://github.com/skratchdot/mongodb-distinct-types/issues/)  

## Description: ##

Similar to the db.myCollection.distinct() function, distinctTypes() will return
"types" rather than "values".  To accomplish this, it adds the following
function to the DBCollection prototype:  

    DBCollection.prototype.distinctTypes = function (keyString, query, limit, skip) {};

## Usage: ##

    db.users.distinctTypes('name'); // we hope this would return ['bson'] not ['bson','string']
    db.users.distinctTypes('name.first'); // should return ['string']
    db.users.distinctTypes('address.phone'); // should return ['string']
    db.users.distinctTypes('address.phone', {'name.first':'Bob'}); // only search documents that have { 'name.first' : 'Bob' }
    db.users.distinctTypes('address.phone', {}, 10); // only search the first 10 documents
    db.users.distinctTypes('address.phone', {}, 10, 5); // only search documents 10-15

## Caveats: ##

By design, distinctTypes() returns 'bson' rather than 'object'.
It will return 'numberlong' rather than 'number', etc.

## Installation: ##

Download: [distinct-types.js](https://github.com/skratchdot/mongodb-distinct-types/raw/master/distinct-types.js)

### Option 1 ###

Add this script to your .mongorc.js file.  

See: http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js

### Option 2 ###

Start the shell after executing this script  

    mongo --shell distinct-types.js
