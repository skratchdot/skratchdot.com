--- 
layout: post
title: "Userscript - Github: Twitter Link"
categories:
- Userscript
- Javascript
tags: 
- Userscript
- Javascript
- Git
- Github
- Twitter
---

While browsing [Github](https://github.com) profiles, I notice I'll frequently
change the url from [github.com](https://github.com) to [twitter.com](https://twitter.com)
to see if that particular user has a [Twitter](https://twitter.com) account.

To save on some of that manual activity, I created a new userscript today:
[Github: Twitter Link](https://github.com/skratchdot/github-twitter-link.user.js/).


**You can check it out here:**

- [Project Page](http://skratchdot.com/projects/github-twitter-link.user.js/)

- [Github Page](https://github.com/skratchdot/github-twitter-link.user.js/)

- [Install](https://github.com/skratchdot/github-twitter-link.user.js/raw/master/github-twitter-link.user.js)


Here is the current description from [README.md](https://raw.github.com/skratchdot/github-twitter-link.user.js/master/README.md):

### Description ###
This is a user script that adds a twitter link on Github profile
pages if a corresponding user name exists at Twitter. It utilizes
local storage to minimize multiple Twitter API requests. If a corresponding
user name is not found, then we will not check for it again. At some point I
may add a "time limit" on when to check again.

### Screenshots ###

#### Before installing the user script: ####

![Before Installation](https://github.com/skratchdot/github-twitter-link.user.js/raw/master/images/before.png)  

#### After installing the user script: ####

**Twitter account exists:**  
![After Installation - Account exists](https://github.com/skratchdot/github-twitter-link.user.js/raw/master/images/after1.png)  

**Twitter account doesn't exist:**  
![After Installation - Account doesn't exist](https://github.com/skratchdot/github-twitter-link.user.js/raw/master/images/after2.png)  
  
