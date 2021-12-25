---
layout: 'page'
title: 'timbre.mp3_decode.js'
---

# timbre.mp3_decode.js

Currently you can only decode mp3s with timbre.js in Node. This plugin
allows you to decode mp3s in the browser using
[jsmad](https://github.com/audiocogs/jsmad) and web workers.

## Demo

[Timbre.js MP3 Online Decoding Demo](https://projects.skratchdot.com/timbre.mp3_decode.js/)

## Dependencies

- [timbre.js](https://github.com/mohayonao/timbre.js/)

## Usage

```html
<script src="jsmad.js"></script>
<script src="timbre.js"></script>
<script src="timbre.mp3_decode.js"></script>
<script>
  T('audio')
    .loadthis('test.mp3', function () {
      this.play();
    })
    .on('ended', function () {
      this.pause();
    });
</script>
```

## Developers

    npm install
    grunt build
