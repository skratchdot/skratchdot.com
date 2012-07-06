---
layout: page
title: domFormat
---

 domFormat - v1.0 (Released July 25, 2011)
===========================================
  
### Description ###

domFormat is a simple javascript library to get DOM nodes as formatted/pretty
strings.  It provides a simple API with 2 functions:  
  
    domFormat.init(settings);  
    domFormat.getString(node);  
  
I created it as a way to help compare the generated source of 2 pages when
doing development.  Before creating this library, I had searched for another
library to do something similar, but everything I evaluated gave results
that were formatted slightly different than the way I wanted.  
  
This code is designed to run in the browser, and uses the browser's native 
DOM parsing to create a "prettified" string.  

  
### Links ###

[Source Code / Download](https://github.com/skratchdot/domFormat)  
[Examples](http://skratchdot.github.com/domFormat/examples/index-html5.html)  
  
  
### Libraries Used / Included ###

[CSS Beautify](https://github.com/senchalabs/cssbeautify)

- Originally written by Ariya Hidayat
- Copyright (C) 2011 Sencha Inc.  

[JS Beautifier](https://github.com/einars/js-beautify)

- Originally written by Einar Lielmanis
  
  
### Browser Support ###

Most modern browsers are supported with the caveat that IE support/output
is somewhat strange.  
  
**IE Quirks/Bugs:**

- Tag names will be in all uppercase because IE doesn't support
  node.prefix and node.localName when parsing DOM nodes

- For the same reason above, namespaces will not be printed 
  correctly: &lt;svg:svg /&gt; will turn into &lt;SVG /&gt;
  
- &lt;style /&gt; and &lt;script /&gt; tags lose their contents

- Doctype nodes are treated as a comment (standards vs quirks mode)
  
  
### Bookmarklets ###

**Show Source** *(not minified)*:

    javascript:(function() {
     var doc = document.cloneNode(true) || document;
    	var script = document.createElement('script');
    	script.setAttribute('src', 'http://skratchdot.github.com/domFormat/domFormat.min.js');
    	script.addEventListener('load', function() {
    		var domString = domFormat.getString(doc);
    		document.write('<textarea wrap="off" id="showSource" style="width:100%;height:100%;border:0;margin:0;padding:0;whitespace:nowrap;"></textarea>');
    		document.getElementById('showSource').value = domString;
    		document.close();
    	}, false);
    	document.body.appendChild(script);
    }());

**Show Source** *(ready to <a href="javascript:%28function%28%29{var%20doc%3Ddocument.cloneNode%28true%29%7C%7Cdocument%3Bvar%20script%3Ddocument.createElement%28'script'%29%3Bscript.setAttribute%28'src'%2C'http%3A%2F%2Fskratchdot.github.com%2FdomFormat%2FdomFormat.min.js'%29%3Bscript.addEventListener%28'load'%2Cfunction%28%29%7Bvar%20domString%3DdomFormat.getString%28doc%29%3Bdocument.write%28'%3Ctextarea%20wrap%3D%22off%22%20id%3D%22showSource%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bwhitespace%3Anowrap%3B%22%3E%3C%2Ftextarea%3E'%29%3Bdocument.getElementById%28'showSource'%29.value%3DdomString%3Bdocument.close%28%29%3B%7D%2Cfalse%29%3Bdocument.body.appendChild%28script%29%3B}%28%29%29;">bookmark</a>)*:

    javascript:%28function%28%29{var%20doc%3Ddocument.cloneNode%28true%29%7C%7Cdocument%3Bvar%20script%3Ddocument.createElement%28'script'%29%3Bscript.setAttribute%28'src'%2C'http%3A%2F%2Fskratchdot.github.com%2FdomFormat%2FdomFormat.min.js'%29%3Bscript.addEventListener%28'load'%2Cfunction%28%29%7Bvar%20domString%3DdomFormat.getString%28doc%29%3Bdocument.write%28'%3Ctextarea%20wrap%3D%22off%22%20id%3D%22showSource%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bwhitespace%3Anowrap%3B%22%3E%3C%2Ftextarea%3E'%29%3Bdocument.getElementById%28'showSource'%29.value%3DdomString%3Bdocument.close%28%29%3B%7D%2Cfalse%29%3Bdocument.body.appendChild%28script%29%3B}%28%29%29;

  
**Reload Page With Formatted Source** *(not minified)*:

    javascript:(function() {
    	var doc = document.cloneNode(true) || document;
    	var script = document.createElement('script');
    	script.setAttribute('src', 'http://skratchdot.github.com/domFormat/domFormat.min.js');
    	script.addEventListener('load', function() {
    		var domString = domFormat.getString(doc);
    		document.write(domString);
    		document.close();
    	}, false);
    	document.body.appendChild(script);
    }());

**Reload Page With Formatted Source** *(ready to <a href="javascript:%28function%28%29{var%20doc%3Ddocument.cloneNode%28true%29%7C%7Cdocument%3Bvar%20script%3Ddocument.createElement%28'script'%29%3Bscript.setAttribute%28'src'%2C'http%3A%2F%2Fskratchdot.github.com%2FdomFormat%2FdomFormat.min.js'%29%3Bscript.addEventListener%28'load'%2Cfunction%28%29%7Bvar%20domString%3DdomFormat.getString%28doc%29%3Bdocument.write%28domString%29%3Bdocument.close%28%29%3B%7D%2Cfalse%29%3Bdocument.body.appendChild%28script%29%3B}%28%29%29;">bookmark</a>)*:

    javascript:%28function%28%29{var%20doc%3Ddocument.cloneNode%28true%29%7C%7Cdocument%3Bvar%20script%3Ddocument.createElement%28'script'%29%3Bscript.setAttribute%28'src'%2C'http%3A%2F%2Fskratchdot.github.com%2FdomFormat%2FdomFormat.min.js'%29%3Bscript.addEventListener%28'load'%2Cfunction%28%29%7Bvar%20domString%3DdomFormat.getString%28doc%29%3Bdocument.write%28domString%29%3Bdocument.close%28%29%3B%7D%2Cfalse%29%3Bdocument.body.appendChild%28script%29%3B}%28%29%29;

### Version History ###

#### v1.0 - Released July 25, 2011 ####

- Initial Release

- Known Bugs:

  1. IE Quirks/Bugs listed in the Browser Support section above

  2. Unsupported node types:
    - Node.ENTITY_REFERENCE_NODE === 5
    - Node.ENTITY_NODE === 6
    - Node.PROCESSING_INSTRUCTION_NODE === 7
    - Node.NOTATION_NODE === 12

