--- 
layout: post
title: "mesh: MongoDB insertArray() addition"
published: true
categories:
- MongoDB
- Shell
tags: 
- MongoDB
- Shell
- Shell Extensions
- Projects
- Update
---

I just updated [mesh - MongoDB Extended Shell](http://skratchdot.com/projects/mesh/)
again by adding a function that you can call on [MongoDB](http://www.mongodb.org/) collections.

The new function is called **insertArray()**.

It allows you to insert an array of objects into a collection using a shell version of
[Syntactic Sugar](http://en.wikipedia.org/wiki/Syntactic_sugar).

All it does is loop through the array that was passed in, calling
**DBCollection.insert()** on each object in the array.

If an item in the array is not an object, it will stop processing and throw an error.

If you don't pass in a valid array, it will throw an error.

Example uses are:

{% highlight js %}
// insert 2 items into myCollection
var myArray = [{_id:1,test:1}, {_id:2,test:"foo"}];
db.myCollection.insertArray(myArray);

// transfer 10 items from collection1 into collection2
db.collection2.insertArray(db.collection1.find().limit(10).toArray());
{% endhighlight %}

Below is the function definition.  Rather than using
[polyfills](http://en.wikipedia.org/wiki/Polyfill), it relies
[underscore.js](http://underscorejs.org/) (which is included in
[mesh.js](http://skratchdot.com/projects/mesh/)).

{% highlight js %}
/*jslint nomen: true, plusplus: true */
/*global _, DBCollection, print */
/**
 * @function
 * @name insertArray
 * @memberOf DBCollection
 * @param {array} arr - The array of objects to insert.
 * @param {object} options - pass through to DBCollection.prototype.insert()
 * @param {boolean} _allow_dot - pass through to DBCollection.prototype.insert()
 * @throws {Exception} - when arr is not an Array.
 */
DBCollection.prototype.insertArray = function (arr, options, _allow_dot) {
	'use strict';
	var i, obj;
	if (_.isArray(arr)) {
		for (i = 0; i < arr.length; i++) {
			obj = arr[i];
			if (_.isObject(obj) && !_.isFunction(obj)) {
				this.insert(obj, options, _allow_dot);
			} else {
				print('Cannot insert a non-object, so skipping: ' + obj);
			}
		}
	} else {
		throw 'first argument is not an array!';
	}
};
{% endhighlight %}
