---
layout: post
title: Creating Virtual MIDI Ports On OSX for WebMidi
published: true
categories:
- Javascript
- MIDI
tags:
- Javascript
- Audio
- MIDI
- Web
- Tutorial
---

## Introduction

[WebMidi](http://webaudio.github.io/web-midi-api/) is a technology that has been
emerging for a few years now, and it's finally supported in Chrome by default.
Even browsers that don't support it can use the
[WebMIDIAPIShim](https://github.com/cwilso/WebMIDIAPIShim)
by [Chris Wilson](https://github.com/cwilso/) to add support. For a list of
current support, check out [caniuse.com](http://caniuse.com/#feat=midi).

If you are not a musician or audio hobbyist, you might not have any midi
devices setup, and will not be able to get the full experience on websites that
are starting to enable midi features.

Fear not, you can setup virtual midi devices that can be used on these websites.
There are ways to do this on all operating systems.  This tutorial is focused
on OSX, but Window users can check out tools like
[Midi Yoke](http://www.midiox.com/myoke.htm),
[LoopBe1](http://www.nerds.de/en/loopbe1.html),
[Sony Virtual MIDI Router](http://www.sonycreativesoftware.com/dl/dl.aspx?dwnid=77),
or [loopMIDI](http://www.tobias-erichsen.de/software/loopmidi.html)
and Linux users can try
[ALSA](http://www.alsa-project.org/main/index.php/Main_Page)
or [QJackCtl](http://qjackctl.sourceforge.net/).


## Creating Virtual MIDI Ports On OSX

#### Step 1: Open **Audio MIDI Setup**

You can open **Audio MIDI Setup** by searching Spotlight, by looking in
**/Applications/Utilities/**, or by using Launchpad:

![Launchpad](https://www.skratchdot.com/images/posts/2016/01/27/launchpad.png)

#### Step 2: Show **MIDI Studio**

Once **Audio MIDI Setup** is open, you can open the **Midi Studio** window:

![Midi Studio](https://www.skratchdot.com/images/posts/2016/01/27/midi-studio.png)

#### Step 3: Open **IAC Driver**

Now you can open **IAC Driver (Inter Application Communications Driver)** by
double clicking on the icon:

![IAC Driver](https://www.skratchdot.com/images/posts/2016/01/27/iac-driver.png)

Which opens this window:

![IAC Driver Window](https://www.skratchdot.com/images/posts/2016/01/27/iac-driver-window.png)

#### Step 4: Add Virtual Port

- Click the "Add and Remove Ports Button"
- A new port called "IAC Bus 2" will be added.
- Rename the port to "WebMidi" by clicking on the port you want to rename
- **IMPORTANT:** Make sure to check the "Device is online" box at the top.

After making the following changes you should see:

![IAC Driver Finished](https://www.skratchdot.com/images/posts/2016/01/27/iac-driver-finished.png)

Now that you have your virtual driver / port setup, you can install / use a
virtual MIDI keyboard on your favorite WebMidi enabled website.  For
instructions on installing a Virtual MIDI Keyboard, continue reading below.


## Install / Use a Virtual MIDI Keyboard

A few options:

- [Virtual MIDI Piano Keyboard](http://vmpk.sourceforge.net/)
- [Midi Keys](http://www.manyetas.com/creed/midikeys.html)

Since I use [homebrew](http://brew.sh/) with [cask](http://caskroom.io/),
I'm going to install midikeys. You can do this by opening your command line,
and running:

{% highlight bash %}
brew cask install midikeys
{% endhighlight %}

![MidiKeys - Install](https://www.skratchdot.com/images/posts/2016/01/27/midikeys-install.png)

Now that MidiKeys is installed, you can open it via Launchpad:

![MidiKeys - Launchpad](https://www.skratchdot.com/images/posts/2016/01/27/midikeys-launchpad.png)

Once the program is opened, make sure to choose "IAC Drive: WebMidi" from the
"Destination" dropdown:

![MidiKeys - Usage](https://www.skratchdot.com/images/posts/2016/01/27/midikeys-usage.png)

You can now click on keys from that virtual keyboard to send MIDI events to the
WebMidi virtual port you created earlier.

There are other options for virtual keyboards / software, but this is a quick way
to get up and running.  More advanced users can try out programs like
[Pure Data](https://puredata.info/) by running

{% highlight bash %}
brew cask install pd
{% endhighlight %}

and creating their own virtual midi keyboard / instrument for usage with WebMidi.

Better yet, create your own WebMidi instrument that sends output to other
WebMidi enabled devices!
