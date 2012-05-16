---
layout: page
title: MongoDB - flatten.js
---
# MongoDB - flatten.js #

[Project Page](http://skratchdot.com/projects/mongodb-flatten/)  
[Source Code](https://github.com/skratchdot/mongodb-flatten/)  
[Issues](https://github.com/skratchdot/mongodb-flatten/issues/)  

## Description: ##

The flatten() function is a mapReduce that flattens documents into
key/value pairs.  Since this is a mapReduce, you can access the 
keys via 'value.data.k' and the values via 'value.data.v'.

## Usage: ##

	// Flatten all user documents, and return the result inline.
	result = db.users.flatten();
	
	// Flatten all user documents, and store the result in the users_flattened collection
	result = db.users.flatten('users_flattened');
	
	// Flatten user documents that have the first name of Bob. Store in a collection
	db.users.flatten({
		'out' : 'users_flattened',
		'query' : { 'name.first' : 'Bob' }
	});
	
	// Get the number of keys in one document
	db.users.flatten({
		query : { '_id' : ObjectId('4f9c2374992274fc8d468675') }
	}).results[0].value.data.length;

## Installation: ##

Download: [flatten.js](https://github.com/skratchdot/mongodb-flatten/raw/master/flatten.js)

### Option 1 ###

Add this script to your .mongorc.js file.  

See: [http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js](http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js)

### Option 2 ###

Start the shell after executing this script  

    mongo --shell flatten.js
