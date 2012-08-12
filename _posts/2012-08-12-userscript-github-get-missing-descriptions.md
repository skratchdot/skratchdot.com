--- 
layout: post
title: "Userscript - Github: Get Missing Descriptions"
categories:
- Userscript
- Javascript
tags: 
- Userscript
- Javascript
- Git
- Github
---

On [Github](https://github.com) profiles, not all the repositories
have description info listed underneath them. Only the repositories
with recent updates contain detailed information.

This is necessary for users with a large number of repos so that page
load times are acceptable (also, there's no need to show all repo info
for someone with 1000+ repos).

To find out more about older repositories, you have to visit each repo page.

To help out with this manual process, I've created:
[Github: Get Missing Descriptions](https://github.com/skratchdot/github-get-missing-descriptions.user.js/).

This script adds a button that will update "simple" repo listings with the
project's description, as well as the last time it was updated.  Each button
click will make a max of 50 ajax requests. If there are more than 50 repos without
descriptions, you will have to click the button multiple times.

**You can check it out here:**

- [Project Page](http://skratchdot.com/projects/github-get-missing-descriptions.user.js/)

- [Github Page](https://github.com/skratchdot/github-get-missing-descriptions.user.js/)

- [Install](https://github.com/skratchdot/github-get-missing-descriptions.user.js/raw/master/github-get-missing-descriptions.user.js)


Here is the current description from [README.md](https://raw.github.com/skratchdot/github-get-missing-descriptions.user.js/master/README.md):

### Description ###
If there are missing descriptions on a Github profile page, 
a button will be added. When clicked, ajax requests will be made 
to grab the descriptions.

### Screenshots ###

#### Before installing the user script: ####
  
![Before Installation](https://github.com/skratchdot/github-get-missing-descriptions.user.js/raw/master/images/before.png)
  
#### After installing the user script: ####
  
**Before clicking the button:**  
![After Installation (before clicking the button)](https://github.com/skratchdot/github-get-missing-descriptions.user.js/raw/master/images/after1.png)
  
**After clicking the button:**  
![After Installation (after clicking the button)](https://github.com/skratchdot/github-get-missing-descriptions.user.js/raw/master/images/after2.png)
  
