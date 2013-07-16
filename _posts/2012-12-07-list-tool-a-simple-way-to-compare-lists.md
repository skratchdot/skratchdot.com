--- 
layout: post
title: "List Tool: a simple way to compare lists"
categories:
- Javascript
tags: 
- Javascript
- Lists
- Sets
- Bootstrap
- Projects
---

This week at work I was comparing 2 lists from 2 different sources.  I frequently
perform tasks like this, and always end up writing the same comparison code over and over.

One night after work, I decided to write a simple web app to do the list comparisons
for me.

As of now, the app has the following features:

- [set operations](https://en.wikipedia.org/wiki/Set_%28mathematics%29)

- other operations: sort, reverse, unique, trim

- uses the [Ace Editor](https://github.com/ajaxorg/ace/) (instead of default textarea elements)

- uses [Twitter Bootstrap](http://github.com/twitter/bootstrap/)

- [responsive design](http://bradfrost.github.com/this-is-responsive/): 4 different display sizes
  will change the layout

- live editing: the results/counts will be updated as you add new items to lists

- a logo visualization of the currently selected comparison operation

- using [Web Workers](http://www.w3.org/TR/workers/) (when available) to support larger datasets

You can check out the project page here:  

[Project Page](http://skratchdot.com/projects/list-tool/)

You can bookmark, and use the application here:  

[List Tool](http://skratchdot.github.io/list-tool/)

