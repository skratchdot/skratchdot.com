---
layout: "page"
title: "domFormat"
---
domFormat
===================


### Description ###

domFormat is a simple javascript library to get DOM nodes as formatted/pretty
strings.  It provides a simple API with 2 functions:  

{% highlight javascript %}
domFormat.init(settings);
domFormat.getString(node);
{% endhighlight %}

I created it as a way to help compare the generated source of 2 pages when
doing development.  Before creating this library, I had searched for another
library to do something similar, but everything I evaluated gave results
that were formatted slightly different than they way I wanted.  
  
This code is designed to run in the browser, and uses the browser's native 
DOM parsing to create a "prettified" string.  


### Links ###

[Source Code / Download](https://github.com/skratchdot/domFormat/)  
[Examples](http://skratchdot.github.io/domFormat/examples/index-html5.html)  
[Bookmarklet](http://skratchdot.github.io/domFormat/bookmarklet/index.html)

### Libraries Used / Included ###

[CSS Beautify](https://github.com/senchalabs/cssbeautify)

- Originally written by Ariya Hidayat

- Copyright (C) 2011 Sencha Inc.  

[JS Beautifier](https://github.com/einars/js-beautify)

- Originally written by Einar Lielmanis


### Browser Support ###

Most modern browsers are supported with the caveat that IE support/output
is somewhat strange.  
  
IE Quirks/Bugs:  

* Tag names will be in all uppercase because IE doesn't support 
  node.prefix and node.localName when parsing DOM nodes

* For the same reason above, namespaces will not be printed 
  correctly: &lt;svg:svg /&gt; will turn into &lt;SVG /&gt;

* &lt;style /&gt; and &lt;script /&gt; tags lose their contents

* Doctype nodes are treated as a comment (standards vs quirks mode)


### Version History ###

#### v1.3 - Released October 5, 2013

* Changing links from skratchdot.github.com -> skratchdot.github.io

#### v1.2 - Released November 17, 2012 ####

* Updating [CSS Beautify](https://github.com/senchalabs/cssbeautify)

* Updating [JS Beautifier](https://github.com/einars/js-beautify)

* Updating [Bookmarklet](http://skratchdot.github.io/domFormat/bookmarklet/index.html)

#### v1.1 - Released November 6, 2012 ####

* Fixing IE bug when rendering Node.DOCUMENT_TYPE_NODE

* Reformatting source code.

#### v1.0 - Released July 25, 2011 ####

* Initial Release

* Known Bugs:  

  1. IE Quirks/Bugs listed in the Browser Support section above
  2. Unsupported node types:  
    *  Node.ENTITY_REFERENCE_NODE === 5
    *  Node.ENTITY_NODE === 6
    *  Node.PROCESSING_INSTRUCTION_NODE === 7
    *  Node.NOTATION_NODE === 12

