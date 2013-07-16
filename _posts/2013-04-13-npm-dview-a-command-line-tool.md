--- 
layout: post
title: "npm-dview - (a command line tool)"
categories:
- Bash
- Shell
- Node.js
tags: 
- Bash
- Shell
- Javascript
- Node
- Github
- Projects
---

I've been working on a few node apps lately, and have sometimes been specifying specific
version numbers in my [package.json](https://npmjs.org/doc/json.html#dependencies) files
rather than using [Tilde-Version-Ranges](https://npmjs.org/doc/json.html#Tilde-Version-Ranges)
or [X-Version-Ranges](https://npmjs.org/doc/json.html#X-Version-Ranges). When specifying specific
version numbers, running `npm update` will not update those packages.

There's not an easy way to compare the versions you specified in your package.json file
with the latest remotely published version.  

In comes [npm-dview](/projects/npm-dview) to the rescue.  Check out the
[project page](/projects/npm-dview) for screenshots and other usage instructions.

Or install now by running:

{% highlight bash %}
npm install -g npm-dview
{% endhighlight %}

