---
layout: page
title: Github - Twitter Link
---
User Script : GitHub Twitter Link
=================================

### Description ###

This is a user script that adds a twitter link on Github profile
pages if a corresponding user name exists at Twitter. It utilizes
local storage to minimize multiple Twitter API requests. If a corresponding
user name is not found, then we will not check for it again. At some point I
may add a "time limit" on when to check again.

### Requirements ###
- Your browser must support user scripts (see Installation instructions below)
- Your browser must support window.localStorage

### Installation ###

1. Make sure you have user scripts enabled in your browser (these instructions refer to the latest versions of the browsers):  
    * CHROME: User scripts are enabled by default. Continue to STEP 2.
    * FIREFOX: Install [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/), then continue to STEP 2.
    * IE: Install [Trixie](http://www.bhelpuri.net/Trixie/). Continue to STEP 2.
    * SAFARI: Install [SIMBL](http://www.culater.net/software/SIMBL/SIMBL.php). Install [GreaseKit](http://8-p.info/greasekit/). Continue to STEP 2.
    * OPERA: Follow instructions located on Opera's site: [User JS](http://www.opera.com/docs/userjs/). Continue to STEP 2.
2. Install the "GitHub Twitter Link" user script by clicking here: [github-twitter-link.user.js](https://github.com/skratchdot/github-twitter-link.user.js/raw/master/github-twitter-link.user.js).  

### Screenshots ###

#### Before installing the user script: ####

![Before Installation](https://github.com/skratchdot/github-twitter-link.user.js/raw/master/images/before.png)  

#### After installing the user script: ####

**Twitter account exists:**  
![After Installation - Account exists](https://github.com/skratchdot/github-twitter-link.user.js/raw/master/images/after1.png)  

**Twitter account doesn't exist:**  
![After Installation - Account doesn't exist](https://github.com/skratchdot/github-twitter-link.user.js/raw/master/images/after2.png)  
  
