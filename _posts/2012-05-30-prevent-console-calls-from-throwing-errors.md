---
layout: post
title: Prevent console calls from throwing errors
categories:
  - Javascript
tags:
  - Javascript
  - console
---

If you try to use **window.console** calls in older browsers, an error will be thrown.

There are a few ways to get around this. One way is to use a
[console polyfill](http://www.calormen.com/polyfill/#console). Another way is to
use a [console wrapper](http://benalman.com/projects/javascript-debug-console-log/).
Yet one additional way is by creating empty functions for all the available
**window.console** calls.

This blog post provides some code to achieve the third method listed above. The code
first ensures that **window.console** exists. It then ensures that all functions in
the [Firebug Console API](http://getfirebug.com/wiki/index.php/Console_API)
exist in the **window.console** object. We default to an empty function so older browsers
don't throw errors. If a given **window.console** function already exists, we will use the
default browser behavior.

### Un-Minified Version:

<!-- prettier-ignore-start -->
```js
/*jslint browser: true, plusplus: true */
(function (window) {
	'use strict';

	var i = 0,
		emptyFunction = function () {},
		functionNames = [
			'assert', 'clear', 'count', 'debug', 'dir',
			'dirxml', 'error', 'exception', 'group', 'groupCollapsed',
			'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table',
			'time', 'timeEnd', 'timeStamp', 'trace', 'warn'
		];

	// Make sure window.console exists
	window.console = window.console || {};

	// Make sure all functions exist
	for (i = 0; i < functionNames.length; i++) {
		window.console[functionNames[i]] = window.console[functionNames[i]] || emptyFunction;
	}

}(window));
```
<!-- prettier-ignore-end -->

### Minified Version:

<!-- prettier-ignore-start -->
```js
/* https://www.skratchdot.com/2012/05/prevent-console-calls-from-throwing-errors/ */
(function(b){var a=0,c=function(){},d=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"];b.console=b.console||{};for(a=0;a<d.length;a++){b.console[d[a]]=b.console[d[a]]||c}}(window));
```
<!-- prettier-ignore-end -->
