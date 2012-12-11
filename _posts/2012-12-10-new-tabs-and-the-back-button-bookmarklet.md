--- 
layout: post
title: "New Tabs and the Back Button - Bookmarklet"
categories:
- Javascript
- Bookmarklet
tags: 
- Javascript
- Bookmarklet
---

If you're anything like me, then you constantly open links in new tabs.  Sometimes,
if the link has been open for a while, you forget what page you were on when you clicked
the link.  The back button is disabled since you are in a new tab.

To get around this issue, I use a simple bookmarklet that takes me back to the document
referrer.  I place the bookmarklet underneath my back button, so I have easy access to it.

Here's a screenshot of a disabled back button (in a new tab):

![without referrer bookmarklet](/images/posts/2012/12/10/without.png)

Here's a screenshot of my browser with the "referrer" bookmarklet:

![with referrer bookmarklet](/images/posts/2012/12/10/with.png)

To install the bookmarklet, drag this link to your bookmark toolbar:

<a href="javascript:(function(){document.location=document.referrer;}());">&lt;&lt; referrer</a>

All the bookmarklet does is:

{% highlight js %}
document.location=document.referrer;
{% endhighlight %}
