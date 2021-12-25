---
layout: post
title: Userscripts and Content Security Policy
published: true
categories:
  - Userscript
  - Javascript
tags:
  - Userscript
  - Javascript
  - Git
  - Github
  - CSP
---

Last month, Github started to include some
[Content Security Policy Headers](https://en.wikipedia.org/wiki/Content_Security_Policy).

They wrote a [blog post](https://github.com/blog/1477-content-security-policy) describing
the problems CSP headers try to solve, how to prepare your app for including the headers,
and listed some of the current limitations you may encounter when using the headers.

I've ran into some of these limitations with the Github userscripts I've authored.

First off, to make a cross browser userscript, there are a few problems that I've ran into.
If your userscript needs to access variables on a page, you can use a few techniques:

- [Unsafe Window](http://wiki.greasespot.net/UnsafeWindow)
- [Location Hack](http://wiki.greasespot.net/Location_hack)
- [Content Script Injection](http://wiki.greasespot.net/Content_Script_Injection)

Of these three, **Content Script Injection** is the preferred method. It works for both
Firefox and Chrome. I've been using a variation of that method for most of the scripts I've
written in the past.

Here's how I would typically write my scripts:

```javascript
// Create some js that you want to inject into the page
var main = function () {};

// Inject our main script into the page
var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
```

After Github started sending CSP headers, my userscripts broke by throwing errors like:

    CSP ERROR:  Couldn't parse invalid source 'unsafe-inline'

To fix Firefox, I temporarily removed the **Content Script Injection** hacks I was using. Here's
an example commit I made back in April:

[https://github.com/skratchdot/github-repo-counts.user.js/commit/80f77bc3d588ef5fcd411a3dc77062166b091713](https://github.com/skratchdot/github-repo-counts.user.js/commit/80f77bc3d588ef5fcd411a3dc77062166b091713)

What I forgot when making those commits, is that Chrome userscripts do not work the same way as
Firefox userscripts.

To make Chrome userscripts work, I _needed_ to use **Content Script Injection**. The issue is that
Github is sending the following CSP headers:

    x-content-security-policy: default-src *; script-src https://github.com https://a248.e.akamai.net https://jobs.github.com https://ssl.google-analytics.com https://secure.gaug.es https://collector.githubapp.com https://gist.github.com; style-src https://github.com https://a248.e.akamai.net 'unsafe-inline'; object-src https://github.com https://a248.e.akamai.net

If you notice, I can only use the **Content Script Injection** method from the following domains:

- [https://github.com](https://github.com)
- [https://a248.e.akamai.net](https://a248.e.akamai.net)
- [https://jobs.github.com](https://jobs.github.com)
- [https://ssl.google-analytics.com](https://ssl.google-analytics.com)
- [https://secure.gaug.es](https://secure.gaug.es)
- [https://collector.githubapp.com](https://collector.githubapp.com)
- [https://gist.github.com](https://gist.github.com)

I had been hotlinking my scripts from the raw.github.com domain.

To fix, I started hosting my scripts in a [Gist](https://gist.github.com/skratchdot/5604120).

Since Firefox supports the @require userscript annotation, I rely on that. For Chrome, I am using
**Content Script Injection**. The reason I didn't use **Content Script Injection** for Firefox, is
because @require does some caching, and I was also experiencing some weird behavior in Firefox in
which certain requests to [gist.github.com](https://gist.github.com/) were returning no content
(0 byte requests)- and my scripts weren't working.

I haven't experienced that behavior with Chrome requests.

Another method I was toying with, is by injecting the scripts via an iframe. Go to any
[github.com](https://github.com/) page, and run the following code in Chrome's console:

```javascript
var injectViaScript = function (fn) {
  var script = document.createElement('script');
  script.textContent = '(' + fn.toString() + '());';
  document.body.appendChild(script);
  document.body.removeChild(script);
};

var injectViaIframe = function (fn) {
  var fnName = 'dynamic_fn_' + new Date().getTime(),
    iframe = document.createElement('iframe');
  iframe.onload = function () {
    parent.window[fnName] = new Function('(' + fn.toString() + '());');
    parent.window[fnName]();
    parent.document.body.removeChild(iframe);
  };
  document.body.appendChild(iframe);
};

// This will throw an error
injectViaScript(function () {
  alert('Hello from script!');
});

// This will work
injectViaIframe(function () {
  alert('Hello from iframe!');
});
```

That seemed like an approach I could take, but was running into scoping issues, so
gave up trying. I ended up settling on the @require method for Firefox, and the
**Content Script Injection** from [gist.github.com](https://gist.github.com/) for Chrome.
