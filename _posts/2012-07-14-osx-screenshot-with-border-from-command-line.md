--- 
layout: post
title: "OSX Screenshot With Border From Command Line"
published: true
categories:
- OSX
- Screenshot
- Bash
- Shell
tags: 
- OSX
- Screenshot
- ImageMagick
- Bash
- Shell
- screencapture
- framecapture
---

There are a few ways you can take [screenshots in OSX](http://guides.macrumors.com/Taking_Screenshots_in_Mac_OS_X),
and a few ways you can add borders to images.

Recently I've found the need to take screenshots of portions of my screen, and add
a border to the resultant images.  Most of the methods I was using were very time consuming.

I decided to script something out so I could easily use the commandline to accomplish this task.

After some evaluation, I decided to use [screencapture](http://guides.macrumors.com/screencapture)
and [ImageMagick](http://www.imagemagick.org/).

[ImageMagick](http://www.imagemagick.org/) comes with of few utilities, one of which is 
[import](http://www.imagemagick.org/script/import.php).

I could have used that tool exclusively (and not used screencapture) if it weren't for the fact
that import relies on the [X Window System](http://en.wikipedia.org/wiki/X_Window_System) (in
OSX it's called X11).  I wanted something that could take a screenshot without being in an X11
window.

In the end, I created a shell script called [framecapture](/projects/framecapture/).

It's a very basic script:

{% highlight bash %}
#!/bin/bash

screencapture -is "$1"
convert "$1" -mattecolor blue -frame 6x6+2+2 "$1"
{% endhighlight %}

But I decided to add some error handling, and optional parameters to it.

You can view it on [Github](https://github.com/skratchdot/framecapture/), or install it by running:

{% highlight bash %}
sudo curl https://raw.github.com/skratchdot/framecapture/master/framecapture.sh -o /usr/local/bin/framecapture
sudo chmod +x /usr/local/bin/framecapture
{% endhighlight %}

