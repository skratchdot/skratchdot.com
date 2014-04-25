--- 
layout: post
title: "tojs - (a shell script)"
categories:
- Bash
- Shell
- Node.js
tags: 
- Bash
- Shell
- Javascript
- Bookmarklet
- Github
- Projects
---

Earlier today I was updating one of my
[bookmarklets](http://projects.skratchdot.com/domFormat/bookmarklet/index.html)
when I ran into the need to convert a html string to a javascript variable.

I was going to create a quick webpage to do it for me, but that would have still required me
to do a lot of manual copy-n-pasting (copying the html into a form, clicking a button, and pasting the
result into a new file).

What I really wanted was a one liner that I could use in my terminal.

I ended up using a combination of **cat** and **sed** to get my desired output.  The combined result
is a shell script called: [tojs](https://github.com/skratchdot/tojs/).

You can install it by running the following commands:

**NOTE:  
THE FOLLOWING INSTALLATION INSTRUCTIONS ARE OUTDATED. SEE THE UPDATED SECTION BELOW.**

{% highlight bash %}
sudo curl https://raw.github.com/skratchdot/tojs/1.1.0/tojs.sh -o /usr/local/bin/tojs
sudo chmod +x /usr/local/bin/tojs
{% endhighlight %}

**UPDATED (12/27/2012):**

[tojs](https://github.com/skratchdot/tojs/) was converted to a [node.js](http://nodejs.org/) project
on December 27th, 2012. Due to this fact, the installation instructions have changed. This project
now requires [npm](https://npmjs.org/) and can be installed by running:

{% highlight bash %}
npm install -g tojs
{% endhighlight %}

