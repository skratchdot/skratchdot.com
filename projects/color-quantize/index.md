---
layout: "page"
title: "color-quantize"
---
# color-quantize

[![NPM version](https://badge.fury.io/js/color-quantize.svg)](http://badge.fury.io/js/color-quantize)
[![Build Status](https://travis-ci.org/skratchdot/color-quantize.png?branch=master)](https://travis-ci.org/skratchdot/color-quantize)
[![Code Climate](https://codeclimate.com/github/skratchdot/color-quantize.png)](https://codeclimate.com/github/skratchdot/color-quantize)
[![Coverage Status](https://coveralls.io/repos/skratchdot/color-quantize/badge.png)](https://coveralls.io/r/skratchdot/color-quantize)
[![Dependency Status](https://david-dm.org/skratchdot/color-quantize.svg)](https://david-dm.org/skratchdot/color-quantize)
[![devDependency Status](https://david-dm.org/skratchdot/color-quantize/dev-status.svg)](https://david-dm.org/skratchdot/color-quantize#info=devDependencies)

[![NPM](https://nodei.co/npm/color-quantize.png)](https://npmjs.org/package/color-quantize)


## Description

Convert colors to websafe / websmart values


## Getting Started

Install the module with: `npm install color-quantize`

{% highlight javascript %}
var colorQuantize = require('color-quantize');
colorQuantize.websafe('#cd1289'); // "#CC0099"
colorQuantize.websmart('#cd1289'); // "#CC1188"
{% endhighlight %}


## Documentation

This library uses the [onecolor](https://github.com/One-com/one-color) parser,
so colorString can in many different formats (i.e. #ff00cc, rgb(13,42,255), etc).

#### colorQuantize.websafe(colorString)

Return a hex code from the 216 web-safe color palette.

colorString can be in any format supported by [onecolor](https://github.com/One-com/one-color).

Same as calling: `colorQuantize.quantize(colorString, 51)`

#### colorQuantize.websmart(colorString)

Return a hex code from the 4096 web-smart color palette.

colorString can be in any format supported by [onecolor](https://github.com/One-com/one-color).

Same as calling: `colorQuantize.quantize(colorString, 17)`

#### colorQuantize.quantize(colorString, quantizeAmount)

Quantize a colorString by the given quantizeAmount.

colorString can be in any format supported by [onecolor](https://github.com/One-com/one-color).

quantizeAmount must be an integer.


## Additional Links

- [4096 Web Smart Colors](http://cloford.com/resources/colours/websmart1.htm)
- [Original Inspiration](http://mudcu.be/sphere/)


## Release History

#### v0.1.0 - Released June 21, 2014

- initial release


## License
Copyright (c) 2014 skratchdot  
Licensed under the MIT license.
