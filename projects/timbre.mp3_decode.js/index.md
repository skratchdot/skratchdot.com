---
layout: "page"
title: "timbre.mp3_decode.js"
---
# timbre.mp3_decode.js

Currently you can only decode mp3s with timbre.js in Node.  This plugin
allows you to decode mp3s in the browser using [jsmad]().

I've included source and minified versions of jsmad in this repo.


## Demo

[Timbre.js MP3 Online Decoding Demo](http://skratchdot.github.io/timbre.mp3_decode.js/)


## Dependencies

- [timbre.js](https://github.com/mohayonao/timbre.js/)

- [jsmad](https://github.com/audiocogs/jsmad/)


## Usage

{% highlight html %}
	<script src="jsmad.js"></script>
	<script src="timbre.js"></script>
	<script src="timbre.mp3_decode.js"></script>
	<script>
		T('audio').loadthis('test.mp3', function() {
		  this.play();
		}).on('ended', function() {
		  this.pause();
		});
	</script>
{% endhighlight %}

