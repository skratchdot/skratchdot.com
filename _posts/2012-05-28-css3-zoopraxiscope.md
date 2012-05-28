--- 
layout: post
title: CSS3 Zoopraxiscope
categories:
- CSS3
tags: 
- CSS3
- Zoopraxiscope
- CSS Transforms
- CSS Animations
---
I was going through some old files on my laptop, and found this snippet of code I created back in
April.  On April 9th, there was a google doodle for
[Eadweard J. Muybridge's 182nd Birthday](http://www.google.com/doodles/eadweard-j-muybridges-182nd-birthday).

I saw a post on [HackerNews](http://news.ycombinator.com/item?id=3816692)
in which someone created a pure CSS version of the google doodle.

I created a [JSFiddle](http://jsfiddle.net/F5Uf5/) snippet that day, but never posted it anywhere.

Anyways, I've cleaned the example up a bit, and posted it below. It now contains pure CSS3 controls
to turn the demo on/off or change the speed of the animation.

## Demo ##

<style type="text/css" media="screen">
	img#zoopraxiscope {
		width:230px;
		height:230px;		
	}
	@-webkit-keyframes spin {
		from { -webkit-transform: rotate(0deg); }
		to { -webkit-transform: rotate(-360deg); }
	}
	@-moz-keyframes spin {
		from { -moz-transform: rotate(0deg); }
		to { -moz-transform: rotate(-360deg); }
	}
	@-ms-keyframes spin {
		from { -ms-transform: rotate(0deg); }
		to { -ms-transform: rotate(-360deg); }
	}
	a#animation-on:target~input[value=fast]:checked~img#zoopraxiscope {
		-webkit-animation: spin 230ms infinite linear; 
		-moz-animation: spin 230ms infinite linear; 
		-ms-animation: spin 230ms infinite linear; 
	}
	a#animation-on:target~input[value=medium]:checked~img#zoopraxiscope {
		-webkit-animation: spin 920ms infinite linear; 
		-moz-animation: spin 920ms infinite linear; 
		-ms-animation: spin 920ms infinite linear; 
	}
	a#animation-on:target~input[value=slow]:checked~img#zoopraxiscope {
		-webkit-animation: spin 2000ms infinite linear; 
		-moz-animation: spin 2000ms infinite linear; 
		-ms-animation: spin 2000ms infinite linear; 
	}
</style>

<form style="text-align:center">
	<h3>Turn Animation</h3>
	<a id="animation-off" href="#animation-off">Off</a>
	<a id="animation-on" href="#animation-on">On</a>
	<br />
	<h3>Speed:</h3>
	<label for="fast">Fast:</label>
	<input type="radio" name="speed" value="fast" checked="checked" />
	<br />
	<label for="medium">Medium:</label>
	<input type="radio" name="speed" value="medium" />
	<br />
	<label for="slow">Slow:</label>
	<input type="radio" name="speed" value="slow" />
	<div style="height:50px">&nbsp;</div>
	<img id="zoopraxiscope" src="/images/zoopraxiscope.jpg" />
</form>

## CSS: ##
{% highlight css %}
<style type="text/css" media="screen">
	img#zoopraxiscope {
		width:230px;
		height:230px;		
	}
	@-webkit-keyframes spin {
		from { -webkit-transform: rotate(0deg); }
		to { -webkit-transform: rotate(-360deg); }
	}
	@-moz-keyframes spin {
		from { -moz-transform: rotate(0deg); }
		to { -moz-transform: rotate(-360deg); }
	}
	@-ms-keyframes spin {
		from { -ms-transform: rotate(0deg); }
		to { -ms-transform: rotate(-360deg); }
	}
	a#animation-on:target~input[value=fast]:checked~img#zoopraxiscope {
		-webkit-animation: spin 230ms infinite linear; 
		-moz-animation: spin 230ms infinite linear; 
		-ms-animation: spin 230ms infinite linear; 
	}
	a#animation-on:target~input[value=medium]:checked~img#zoopraxiscope {
		-webkit-animation: spin 920ms infinite linear; 
		-moz-animation: spin 920ms infinite linear; 
		-ms-animation: spin 920ms infinite linear; 
	}
	a#animation-on:target~input[value=slow]:checked~img#zoopraxiscope {
		-webkit-animation: spin 2000ms infinite linear; 
		-moz-animation: spin 2000ms infinite linear; 
		-ms-animation: spin 2000ms infinite linear; 
	}
</style>
{% endhighlight %}

## HTML: ##
{% highlight html %}
<form style="text-align:center">
	<h3>Turn Animation</h3>
	<a id="animation-off" href="#animation-off">Off</a>
	<a id="animation-on" href="#animation-on">On</a>
	<br />
	<h3>Speed:</h3>
	<label for="fast">Fast:</label>
	<input type="radio" name="speed" value="fast" checked="checked" />
	<br />
	<label for="medium">Medium:</label>
	<input type="radio" name="speed" value="medium" />
	<br />
	<label for="slow">Slow:</label>
	<input type="radio" name="speed" value="slow" />
	<div style="height:50px">&nbsp;</div>
	<img id="zoopraxiscope" src="/images/zoopraxiscope.jpg" />
</form>
{% endhighlight %}


## Links ##

Inspired by the [Google Doodle](http://www.google.com/doodles/eadweard-j-muybridges-182nd-birthday)
on April 9th, 2012 celebrating Eadweard J. Muybridge

_See:_

- [http://news.ycombinator.com/item?id=3816692](http://news.ycombinator.com/item?id=3816692)

- [http://en.wikipedia.org/wiki/Zoopraxiscope](http://en.wikipedia.org/wiki/Zoopraxiscope)

- [http://davidwalsh.name/css-spin-revisited](http://davidwalsh.name/css-spin-revisited)

- [http://www.tangledindesign.com/blog/how-to-trigger-css3-transitions-on-click-using-target/](http://www.tangledindesign.com/blog/how-to-trigger-css3-transitions-on-click-using-target/)

_See also:_

- [http://jsfiddle.net/F5Uf5/](http://jsfiddle.net/F5Uf5/)
