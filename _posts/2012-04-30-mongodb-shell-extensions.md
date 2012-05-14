--- 
layout: post
title: MongoDB - Shell Extensions
categories:
- MongoDB
tags: 
- MongoDB
- Shell Extensions
- Projects
- Update
---

Last Friday I read the blog post [Meet Variety, a Schema Analyzer for MongoDB](http://blog.mongodb.org/post/21923016898/meet-variety-a-schema-analyzer-for-mongodb).

I tried [Variety](https://github.com/JamesCropcho/variety/) out, but it didn't quite do what I wanted, and it also created a few DBs/Collections on my server that I didn't expect.

Over the weekend, I decided to write my own implementation called: [mongodb-schema](/projects/mongodb-schema).  After finishing that script, I created a few more shell extensions.

Please note, these are just quick examples I whipped up, and are not really meant to be run on large collections (unless you use "limit", or are willing to wait a really long time).  They are definitely not "production ready".

Here are the scripts:

- [mongodb-distinct-types](/projects/mongodb-distinct-types) - Similar to the db.myCollection.distinct() function, distinctTypes() will return "types" rather than "values".

- [mongodb-flatten](/projects/mongodb-flatten) - The flatten() function is a mapReduce that flattens documents into key/value pairs.

- [mongodb-schema](/projects/mongodb-schema) - A schema analysis tool for MongoDB.

- [mongodb-wild](/projects/mongodb-wild) - Adds a wildcard search to the mongodb shell.
