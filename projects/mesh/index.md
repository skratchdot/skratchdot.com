---
layout: "page"
title: "mesh: MongoDB Extended Shell"
---
 mesh - MongoDB Extended Shell
===============================


## Description ##

mesh (**M**ongoDB **E**xtended **Sh**ell) is a javascript file that extends
the mongo shell.  It includes some useful libraries, as well as new functions
for dealing with Mongo collections and queries.


## What's Included? ##

- [underscore.js](http://documentcloud.github.com/underscore/) - Underscore.js is a
  utility-belt library for JavaScript that provides support for the usual functional
  suspects (each, map, reduce, filter...) without extending any core JavaScript objects.

- [underscore.string.js](http://epeli.github.com/underscore.string/) - Javascript lacks
  complete string manipulation operations.  This an attempt to fill that gap.

- [moment.js](http://momentjs.com/) - A lightweight javascript date library for parsing,
  validating, manipulating, and formatting dates.

- [science.js](https://github.com/jasondavies/science.js) - Scientific and statistical computing
  in JavaScript.

- [distinct2()](http://skratchdot.com/projects/mongodb-distinct2/) - Similar to the built-in distinct()
  function, but with more capabilities.

- [distinctTypes()](http://skratchdot.com/projects/mongodb-distinct-types/) - Similar to the 
  db.myCollection.distinct() function, distinctTypes() will return "types" rather than "values".

- [flatten()](http://skratchdot.com/projects/mongodb-flatten/) - The flatten() function is a 
  mapReduce that flattens documents into key/value pairs.

- [schema()](http://skratchdot.com/projects/mongodb-schema/) - A schema analysis tool for MongoDB.

- [wild()](http://skratchdot.com/projects/mongodb-wild/) - Adds a wildcard search to the mongodb shell.

- A console wrapper so calls like console.log() and console.dir() don't error out

- mesh.setPrompt(): a way to configure your prompt. Can set a default in mesh.config.js

- mesh.keys(): will return all the "global" properties as a sorted array.

- [JSON-js](https://github.com/douglascrockford/JSON-js) - JSON.stringify() and JSON.parse()

- mesh.oid() - a wrapper for ObjectId()

- mesh.tid() - a wrapper for creating ObjectId values based on a timestamp

- a few [underscore.js mixins](https://github.com/skratchdot/snippets/tree/master/underscore.js/)

- [DBCollection.insertArray()](https://github.com/skratchdot/mesh/blob/master/src/mongodb.insertArray.js) - insert an array of objects into a collection


## Installation ##

**Download:** [mesh.js](https://github.com/skratchdot/mesh/raw/master/mesh.js)

### Option 1 ###

Add this script to your .mongorc.js file.  

_See:_ [http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js](http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell#Overview-TheMongoDBInteractiveShell-.mongorc.js)

_Example .mongorc.js:_

    load('mesh.js');
    load('mesh.config.js');


### Option 2 ###

Start the shell after executing this script  

    mongo --shell mesh.js


## Configuration ##

You can configure mesh by calling **mesh.config(settings)**. The benefit of keeping a config file,
is that you won't lose your default settings when updating mesh. Currently, there are 2 config values:
defaultPrompt and aliases.

You can create a file "mesh.config.js".  It might look like:

    mesh.config({
    		defaultPrompt : 4,		// 0-4 or a string
    		aliases : {				// can pass in a map of aliases.
    			't' : 'mesh.tid',	// t() is an alias for mesh.tid()
    			'o' : 'ObjectId',	// o() is an alias for ObjectId()
    			'm' : 'mesh'		// m is an alias for mesh
    		}
    });

Now, when starting the shell, you can pass in the **mesh.config.js** file along with your 
**mesh.js** file like:

    mongo --shell mesh.js mesh.config.js

Or if you are using .mongorc.js:

    load('mesh.js');
    load('mesh.config.js');

## Usage ##

coming soon


## For Developers ##


#### Getting The Code ####

    git clone git://github.com/skratchdot/mesh.git
    cd mesh
    git submodule update --init --recursive


#### Updating submodule sources ####

    git submodule foreach git pull


## Version History ##

#### v1.4.3 - Released March 7, 2013
  * adding mesh.ops which prints all operations.
  * no longer printing version when tabbing.
  * updating the following libraries: [JSON-js](https://github.com/douglascrockford/JSON-js),
  [moment](http://momentjs.com/), [distinct2()](http://skratchdot.com/projects/mongodb-distinct2/),
  [schema()](http://skratchdot.com/projects/mongodb-schema/), and
  [underscore.js](http://documentcloud.github.com/underscore/)

#### v1.4.2 - Released February 7, 2013
  * updating the following libraries: [moment](http://momentjs.com/),
  [science.js](https://github.com/jasondavies/science.js),
  [underscore.js](http://documentcloud.github.com/underscore/), and
  [underscore.string.js](http://epeli.github.com/underscore.string/)

#### v1.4.1 - Released December 10, 2012
  * adding [DBCollection.insertArray()](https://github.com/skratchdot/mesh/blob/master/src/mongodb.insertArray.js)
  * adding [JSON-js](https://github.com/douglascrockford/JSON-js) - json2.js and cycle.js
  * updating [distinct2()](http://skratchdot.com/projects/mongodb-distinct2/),
  [underscore.js](http://documentcloud.github.com/underscore/), and
  [moment.js](http://momentjs.com/)

#### v1.4.0 - Released December 9, 2012
  * updating [distinct2()](http://skratchdot.com/projects/mongodb-distinct2/)
  * adding some [underscore.js mixins](https://github.com/skratchdot/snippets/tree/master/underscore.js/)
    - [underscore.aggregate.js](https://github.com/skratchdot/snippets/tree/master/underscore.js/underscore.aggregate.js)
    - [underscore.avg.js](https://github.com/skratchdot/snippets/tree/master/underscore.js/underscore.avg.js)
    - [underscore.deepExtend.js](https://github.com/skratchdot/snippets/tree/master/underscore.js/underscore.deepExtend.js)
    - [underscore.deepPluck.js](https://github.com/skratchdot/snippets/tree/master/underscore.js/underscore.deepPluck.js)
    - [underscore.keyToObject.js](https://github.com/skratchdot/snippets/tree/master/underscore.js/underscore.keyToObject.js)
    - [underscore.stdev.js](https://github.com/skratchdot/snippets/tree/master/underscore.js/underscore.stdev.js)
    - [underscore.sum.js](https://github.com/skratchdot/snippets/tree/master/underscore.js/underscore.sum.js)
    - [underscore.variance.js](https://github.com/skratchdot/snippets/tree/master/underscore.js/underscore.variance.js)

#### v1.3.1 - Released November 15, 2012
  * adding mesh.setAliases()
  * removing globalTid and globalOid from mesh.config in favor of using 'aliases'.
  * mesh.tid() now accepts an optional "increment" argument
  * reload mesh each time load('mesh.js') is called
  * fixing build process (version and date replaced)
  * fixing bug w/ how hostname is determined in prompt
  * removing moment() / window hack

#### v1.3.0 - Released November 13, 2012
  * updating libraries: [moment.js](http://momentjs.com/),
  [distinct2()](http://skratchdot.com/projects/mongodb-distinct2/),
  [underscore.js](http://documentcloud.github.com/underscore/), and
  [underscore.string.js](http://epeli.github.com/underscore.string/)
  * adding mesh.oid() - a wrapper for ObjectId()
  * adding mesh.tid() - a wrapper for creating ObjectId values based on a timestamp
  * config values to change mesh.tid() to t() or mesh.oid() to o()

#### v1.2.4 - Released October 22, 2012
  * updating libraries: [flatten()](http://skratchdot.com/projects/mongodb-flatten/)
  and [underscore.js](http://documentcloud.github.com/underscore/)

#### v1.2.3 - Released October 21, 2012
  * updating libraries: [flatten()](http://skratchdot.com/projects/mongodb-flatten/)

#### v1.2.2 - Released October 20, 2012
  * updating libraries: [flatten()](http://skratchdot.com/projects/mongodb-flatten/),
  [underscore.js](http://documentcloud.github.com/underscore/), and
  [underscore.string.js](http://epeli.github.com/underscore.string/)

#### v1.2.1 - Released October 7, 2012
  * updating libraries: [moment.js](http://momentjs.com/),
  [distinct2()](http://skratchdot.com/projects/mongodb-distinct2/), and
  [underscore.js](http://documentcloud.github.com/underscore/)
  * [json2.js](https://github.com/douglascrockford/JSON-js) is now included due 
    to the [distinct2()](http://skratchdot.com/projects/mongodb-distinct2/) upgrade

#### v1.2.0 - Released September 24, 2012
  * mesh.setPrompt() is now mesh.prompt()
  * updating libraries
  * adding mesh.time() which displays function execution times

#### v1.1.4 - Released August 20, 2012
  * removing [Sugar](http://sugarjs.com/) (rely on [underscore.js](http://documentcloud.github.com/underscore/) instead)
  * updating submodules

#### v1.1.3 - Released August 16, 2012
  * adding [science.js](https://github.com/jasondavies/science.js)

#### v1.1.2 - Released August 16, 2012
  * Mix in non-conflicting string functions to the Underscore namespace
  * adding [Sugar](http://sugarjs.com/)
  * using minified version of [moment.js](http://momentjs.com/)

#### v1.1.1 - Released August 16, 2012
  * Updating submodules
  * Updating README.md with "What's Included?" descriptions
  * Updating README.md with "For Deveopers" section
  * Small fix to [distinct2.js](http://skratchdot.com/projects/mongodb-distinct2/)

#### v1.1.0 - Released August 15, 2012 ####
  * Adding [distinct2.js](http://skratchdot.com/projects/mongodb-distinct2/)
  * implementing mesh.toString() so the console prints help info

#### v1.0.0 - Released July 17, 2012 ####
  * Initial Release
