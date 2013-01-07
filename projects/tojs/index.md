---
layout: "page"
title: "tojs"
---
# tojs #

## Description ##

**tojs** lets you convert files between plain text, javascript strings,
and document.write() statements.

It's original purpose, was to read in an .html file, and output it
as a series of document.write() statements. This is useful when creating
bookmarklets.  You can code your .html page, then run **tojs** on it.
Now all your bookmarklet has to do is include a script tag that points 
to the file you created with **tojs**.

Since version 1.2.0, **tojs** was converted to a node.js project, and now
supports a few different input/output formats.  To see the new options,
check out the **Usage** and **Options** sections below.


## Usage ##

    tojs [options] <files>


## Options ##

    -h, --help           output usage information
    -v, --version        output the version number
    -i, --input [type]   The type of input [plain|js|jsvar|docwrite]
    -o, --output [type]  The type of input [plain|js|jsvar|docwrite]
    -n, --name [name]    If output is "jsvar", this is the variable name
    --oneline            Force output to be on one line only
    --single-quotes      Use single-quotes instead of double-quotes for output
    --no-var             var keyword will not be included in output
    --no-open            document.open() will not be included in output
    --no-close           document.close() will not be included in output


## Examples ##

    $ tojs one.txt two.txt three.txt
    $ tojs -o "docwrite" file.html > file.html.js
    $ tojs -i "docwrite" -o "plain" file.html.js > file.html
    $ tojs -o "jsvar" --oneline --name "myVariable" file.txt
    $ echo -e "one\ntwo\nthree" | tojs


## Installation ##

    npm install -g tojs


## Links ##

[Project Page](http://skratchdot.com/projects/tojs/)

[Github Page](https://github.com/skratchdot/tojs/)


## Version History ##

### v1.2.1 (Released January 2, 2012)

- adding man page

### v1.2.0 (Released December 27, 2012)

- converting to a node.js project so installation instructions have changed

- command line options have changed

- now supports the following input/output types:

  - plain
  
  - js
  
  - jsvar

  - docwrite

- can now pipe data from stdin or use a list of files as input (similar to the unix cat command)

### v1.1.0 (Released November 5, 2012)

- fixing formatting of help text

- adding 2 new command line options

  - **-o** | **--no-open** -- don't print the document.open() statement

  - **-c** | **--no-close** -- don't print the document.close() statement

### v1.0.0 (Released November 4, 2012)

- Initial Release
