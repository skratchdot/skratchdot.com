---
layout: "page"
title: "tojs"
---
# tojs #

[Project Page](http://skratchdot.com/projects/tojs/)

[Github Page](https://github.com/skratchdot/tojs/)

## Description ##

Read in an .html file, and output it as a series of document.write() statements.

This is useful when creating bookmarklets.  You can code your .html page, then
run **tojs.sh** on it. Now all your bookmarklet has to do is include a script tag
that points to the file you created with **tojs**.


## Usage ##

    tojs [options] <input_filename>
    tojs [options] <input_filename> > <output_filename>


## Options ##

    -h | --help        print help information
    -o | --no-open     don't print the document.open() statement
    -c | --no-close    don't print document.close() statement"


## Installation ##

    sudo curl https://raw.github.com/skratchdot/tojs/master/tojs.sh -o /usr/local/bin/tojs
    sudo chmod +x /usr/local/bin/tojs


## Version History ##

### v1.1 (Released November 5, 2012)

- fixing formatting of help text

- adding 2 new command line options

  - **-o** | **--no-open** -- don't print the document.open() statement

  - **-c** | **--no-close** -- don't print the document.close() statement

### v1.0 (Released November 4, 2012)

- Initial Release
