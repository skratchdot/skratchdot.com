---
layout: "page"
title: "color-blind"
---
# color-blind

[![NPM version](https://badge.fury.io/js/color-blind.svg)](http://badge.fury.io/js/color-blind)
[![Build Status](https://travis-ci.org/skratchdot/color-blind.png?branch=master)](https://travis-ci.org/skratchdot/color-blind)
[![Code Climate](https://codeclimate.com/github/skratchdot/color-blind.png)](https://codeclimate.com/github/skratchdot/color-blind)
[![Coverage Status](https://coveralls.io/repos/skratchdot/color-blind/badge.png)](https://coveralls.io/r/skratchdot/color-blind)
[![Dependency Status](https://david-dm.org/skratchdot/color-blind.svg)](https://david-dm.org/skratchdot/color-blind)
[![devDependency Status](https://david-dm.org/skratchdot/color-blind/dev-status.svg)](https://david-dm.org/skratchdot/color-blind#info=devDependencies)

[![NPM](https://nodei.co/npm/color-blind.png)](https://npmjs.org/package/color-blind)


## Description

Simulate color blindness by converting RGB hex codes.  This is a node.js port
of the daltonize code by [mudcu.be](http://mudcu.be/).
See [Links](https://github.com/skratchdot/color-blind#links) for more information.


## Getting Started

Install the module with: `npm install color-blind`

{% highlight javascript %}
var blinder = require('color-blind');
blinder.protanopia('#42dead'); // result: "#d1c4a0"
{% endhighlight %}


## Color Blindness Table

|                    Group                           |                                    |                             |                          |
|----------------------------------------------------|------------------------------------|-----------------------------|--------------------------|
| **Trichromat**<br/>*3 good cones*                  |Normal                              |                             |                          |
| **Anomalous Trichromat**<br/>*2 good cones, 1 bad* |Protanomaly<br/>*low red*           |Deuteranomaly<br/>*low green*|Tritanomaly<br/>*low blue*|
| **Dichromat**<br/>*2 good cones, 1 blind*          |Protanopia<br/>*no red*             |Deuteranopia<br/>*no green*  |Tritanopia <br/>*no blue* |
| **Monochromat**<br/>*1 good cone, 2 blind/bad*     |Achromatomaly<br />*almost no color*|Achromatopsia<br/>*no color* |                          |


## Documentation

All the exported functions accept 2 parameters:

- **colorString** - any valid CSS color string
- **returnRgb** *optional*
  - if true, then an object containing RGB values is returned
  - if false or not passed, then a hex string is returned


#### blinder.protanomaly(colorString, returnRgb)

Part of the "Anomalous Trichromat" family of color blindness. The viewer sees low amounts of red.

Examples:
{% highlight javascript %}
blinder.protanomaly("#42dead");
// result: "#9dcea5"
blinder.protanomaly("#42dead", false);
// result: "#9dcea5"
blinder.protanomaly("#42dead", true);
// result: {"R":156.81027381701807,"G":205.52274401697787,"B":164.8656701007824}
{% endhighlight %}

#### blinder.protanopia(colorString, returnRgb)

Part of the "Dichromat" family of color blindness. The viewer sees no red.

Examples:
{% highlight javascript %}
blinder.protanopia("#42dead");
// result: "#d1c4a0"
blinder.protanopia("#42dead", false);
// result: "#d1c4a0"
blinder.protanopia("#42dead", true);
// result: {"R":208.70185885531413,"G":196.10716916953663,"B":160.21748158694382}
{% endhighlight %}

#### blinder.deuteranomaly(colorString, returnRgb)

Part of the "Anomalous Trichromat" family of color blindness. The viewer sees low amounts of green.

Examples:
{% highlight javascript %}
blinder.deuteranomaly("#42dead");
// result: "#a5c9b3"
blinder.deuteranomaly("#42dead", false);
// result: "#a5c9b3"
blinder.deuteranomaly("#42dead", true);
// result: {"R":165.29136650372695,"G":201.41446893677266,"B":178.9125102904318}
{% endhighlight %}

#### blinder.deuteranopia(colorString, returnRgb)

Part of the "Dichromat" family of color blindness. The viewer sees no green.

Examples:
{% highlight javascript %}
blinder.deuteranopia("#42dead");
// result: "#debeb6"
blinder.deuteranopia("#42dead", false);
// result: "#debeb6"
blinder.deuteranopia("#42dead", true);
// result: {"R":222.02929022014237,"G":189.6513083292142,"B":182.29108759925}
{% endhighlight %}

#### blinder.tritanomaly(colorString, returnRgb)

Part of the "Anomalous Trichromat" family of color blindness. The viewer sees low amounts of blue.

Examples:
{% highlight javascript %}
blinder.tritanomaly("#42dead");
// result: "#56d8d1"
blinder.tritanomaly("#42dead", false);
// result: "#56d8d1"
blinder.tritanomaly("#42dead", true);
// result: {"R":86.14054005420464,"G":216.21898840123637,"B":209.23279525212993}
{% endhighlight %}

#### blinder.tritanopia(colorString, returnRgb)

Part of the "Dichromat" family of color blindness. The viewer sees no blue.

Examples:
{% highlight javascript %}
blinder.tritanopia("#42dead");
// result: "#62d5e6"
blinder.tritanopia("#42dead", false);
// result: "#62d5e6"
blinder.tritanopia("#42dead", true);
// result: {"R":97.64942008517872,"G":212.91555320194286,"B":229.93724968191844}
{% endhighlight %}

#### blinder.achromatomaly(colorString, returnRgb)

Part of the "Monochromat" family of color blindness. The viewer sees the absence of most color.

Examples:
{% highlight javascript %}
blinder.achromatomaly("#42dead");
// result: "#8ec7b5"
blinder.achromatomaly("#42dead", false);
// result: "#8ec7b5"
blinder.achromatomaly("#42dead", true);
// result: {"R":141.91089545454545,"G":198.63816818181814,"B":180.81998636363636}
{% endhighlight %}

#### blinder.achromatopsia(colorString, returnRgb)

Part of the "Monochromat" family of color blindness. The viewer sees no color at all.

Examples:
{% highlight javascript %}
blinder.achromatopsia("#42dead");
// result: "#b9b9b9"
blinder.achromatopsia("#42dead", false);
// result: "#b9b9b9"
blinder.achromatopsia("#42dead", true);
// result: {"R":185.28855,"G":185.28855,"B":185.28855}
{% endhighlight %}


## Links

- [Original Source](http://mudcu.be/sphere/js/Color.Blind.js)
- [Color Blind / Daltonize Bookmarklet](http://daltonize.appspot.com/)
- [Color Blind Bookmarklet](https://github.com/duhseekoh/Color-Blind)


## Release History

#### v0.1.0 - Released June 21, 2014

- initial release


## License
Copyright (c) 2014 skratchdot  
Licensed under the MIT license.
