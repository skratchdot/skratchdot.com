--- 
layout: post
title: "Can't Install Userscripts in Chrome 21+"
published: true
categories:
- Userscript
tags: 
- Userscript
- Chrome
---

Today I was updating one of my [userscripts](https://github.com/skratchdot/github-repo-filter-info.user.js/),
but when I went to test my changes in Chrome, I saw the following warning:

![Chrome Userscript / Extension Warning Message](/images/posts/2012/08/04/userscripts.png)

The [learn more](http://www.chromium.org/administrators/policy-list-3#ExtensionInstallSources)
link took me to this page:

[http://www.chromium.org/administrators/policy-list-3#ExtensionInstallSources](http://www.chromium.org/administrators/policy-list-3#ExtensionInstallSources)

Following the directions for OSX, I tried adding the **ExtensionInstallSources** preference
via the command line:

_Chrome:_

    defaults write com.google.Chrome ExtensionInstallSources -array "https://github.com/skratchdot/*"

_Chrome Canary:_

    defaults write com.google.Chrome.canary ExtensionInstallSources -array "https://github.com/skratchdot/*"

I restarted Chrome, and still could not install my userscript.

After reading through this bug:

[http://code.google.com/p/chromium/issues/detail?id=138054](http://code.google.com/p/chromium/issues/detail?id=138054)

I found the **--enable-easy-off-store-extension-install** switch.  By using that, I was able to start
Chrome from the command line to install my userscript.

_Chrome:_

    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --enable-easy-off-store-extension-install

_Chrome Canary:_

    /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --enable-easy-off-store-extension-install

It would be nice if the **"Tools"->"Extensions"** page (aka **chrome://chrome/extensions/**)
had a list of whitelist/blacklist URLs that you could edit.  That page allows you to enter
"Developer Mode", so it makes sense to have a few more options there.

***EDIT:***

This workaround exists as well:

1. Download the user script.
2. Open **chrome://chrome/extensions/**.
3. Drag and drop the user script file on the page you opened in step 2.

