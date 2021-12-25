---
layout: post
title: 'mesh: the MongoDB Extended Shell'
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

I saw a blog post today called:
[mongo, the MongoDB Shell](http://blog.mongodb.org/post/27406586932/mongo-the-mongodb-shell).

Since I work in the shell some, and have written a few shell extensions, I decided to create
[mesh: MongoDB Extended Shell](/projects/mesh/).

The hope is that it will grow into a collection of community created scripts that add functionality
to the default mongo shell (while not interfering with it).

So far, I've included a few utility libraries: [underscore.js](http://underscorejs.org),
[underscore.string.js](http://epeli.github.com/underscore.string/), and
[moment.js](http://momentjs.com/).

I've also included some of the extensions that I've created in the past. Additionally, there's
some code so that **"console"** calls end up wrapping the built in **print()** function. The idea
is that eventually I'll add some logic to the console calls so they behave in a more "standard" way.

Another feature is the **mesh.setPrompt()** function. You can pass in a function, or a number 0-4. There
are a few different types of prompts you can use:

- 0: '>' reset to default prompt
- 1: 'dbname>'
- 2: 'dbname>' for PRIMARY, '(dbname)>' for SECONDARY
- 3: 'host:dbname>'
- 4: '\[YYYY-MM-DD hh:mm:ss\] host:dbname>'
- passing in a function() is the same thing as setting: prompt = myFunction()

**mesh.setPrompt()** was inspired by the blog post:
[http://www.kchodorow.com/blog/2011/06/27/ps1/](http://www.kchodorow.com/blog/2011/06/27/ps1/)

Check it out here (and download) here: [https://github.com/skratchdot/mesh/](https://github.com/skratchdot/mesh/)
