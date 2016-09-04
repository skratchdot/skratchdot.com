---
layout: "page"
title: "RIFF Wav for Java"
---
RIFF WAV for Java
==================================

### SUMMARY: ###

This EMF based project was created to allow the reading and writing of .wav files in Java.  
  
It attempts to read in well-known RIFF chunks, and provide an API for reading/manipulating those chunks.  
  
Most of the information about various RIFF chunks were found on The Sonic Spot website 
and from links in the Wikipedia article on wave files. (For more info, see the links section).  


### USAGE: ###

Loading a wave file (preferred method using EMF):  

{% highlight java %}
File file = new File("C:\\my_sample.wav");
RIFFWave riffWave = WavFactory.eINSTANCE.createRIFFWave(file);
{% endhighlight %}

Loading a wave file (method 2):  

{% highlight java %}
File file = new File("C:\\my_sample.wav");
RIFFWave riffWave = new RIFFWaveImpl(file);
{% endhighlight %}

Saving a wave file:  

{% highlight java %}
// riffWave object was created elsewhere
File file = new File("C:\\my_sample.wav");
riffWave.write(file);
{% endhighlight %}

### Links: ###

- [Javadocs](https://www.skratchdot.com/projects/riff-wav-for-java/javadocs/)

- [Wikipedia: WAV](http://en.wikipedia.org/wiki/WAV)  

- [Wave File Format: The Sonic Spot](http://www.sonicspot.com/guide/wavefiles.html)  

- [Wave File Format: MMSP Lab, ECE, McGill University](http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html)

- [Example Wave Files: MMSP Lab, ECE, McGill University](http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/Samples.html)

- [Eclipse Modeling Framework](http://www.eclipse.org/modeling/emf/)  


