--- 
layout: post
title: domFormat - v1.0 (Released July 25, 2011)
categories:
- Javascript
- Bookmarklet
tags: 
- Bookmarklet
- DOM
- Javascript
- Projects
---

domFormat is a simple javascript library to get DOM nodes as formatted/pretty strings.

You can find the source code here:

[https://github.com/skratchdot/domFormat](https://github.com/skratchdot/domFormat)

And some examples here:

[http://skratchdot.github.com/domFormat/examples/index-html5.html](http://skratchdot.github.com/domFormat/examples/index-html5.html)

Here are 2 bookmarklets:

- [\-\- Show Source \-\-](javascript:%28function%28%29{var%20doc%3Ddocument.cloneNode%28true%29%7C%7Cdocument%3Bvar%20script%3Ddocument.createElement%28'script'%29%3Bscript.setAttribute%28'src'%2C'http%3A%2F%2Fskratchdot.github.com%2FdomFormat%2FdomFormat.min.js'%29%3Bscript.addEventListener%28'load'%2Cfunction%28%29%7Bvar%20domString%3DdomFormat.getString%28doc%29%3Bdocument.write%28'%3Ctextarea%20wrap%3D%22off%22%20id%3D%22showSource%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bwhitespace%3Anowrap%3B%22%3E%3C%2Ftextarea%3E'%29%3Bdocument.getElementById%28'showSource'%29.value%3DdomString%3Bdocument.close%28%29%3B%7D%2Cfalse%29%3Bdocument.body.appendChild%28script%29%3B}%28%29%29;)

- [\-\- Reload Page With Formatted Source \-\-](javascript:%28function%28%29{var%20doc%3Ddocument.cloneNode%28true%29%7C%7Cdocument%3Bvar%20script%3Ddocument.createElement%28'script'%29%3Bscript.setAttribute%28'src'%2C'http%3A%2F%2Fskratchdot.github.com%2FdomFormat%2FdomFormat.min.js'%29%3Bscript.addEventListener%28'load'%2Cfunction%28%29%7Bvar%20domString%3DdomFormat.getString%28doc%29%3Bdocument.write%28domString%29%3Bdocument.close%28%29%3B%7D%2Cfalse%29%3Bdocument.body.appendChild%28script%29%3B}%28%29%29;)
