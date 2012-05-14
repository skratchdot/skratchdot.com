--- 
layout: post
title: ESX Wave Organizer - Version 0.1.7 Released
categories:
- Electribe
tags: 
- Electribe
- ESX-1
- Korg
- Projects
- Update
type: post
status: publish
---
- Added a "first loading slot" feature.  Previously, all samples would try to load into slot #000.
  If that was already in use, it would find the next available slot.  Now, you can set the first slot 
  number to try.  It will then find the next available slot (looping around when it gets to the end).

- Changed the "About Box".  Now you can click on my email address to open your default email client 
  to email me, or click on the program's webpage url to open your default webbrowser and visit the homepage.

- Removed the "Push Up" and "Push Down" buttons (which weren't implemented), and replaced them with 
  the "NEVER LOOP" and "LOOP WHOLE" buttons.

- The "NEVER LOOP" button sets the sample's "Loop Start" value equal to the sample's "End" value.
  This means that the sample will never loop when played as a keyboard part.

- The "LOOP WHOLE" button sets the sample's "Loop Start" value equal to the sample's "Start" value.
  This means that the sample will loop completely when played as a keyboard part.

- The "LOOP" button will only work for MONO samples that have a "Loop Start" value.  If a sample 
  doesn't have a "Loop start" value (and you want to hear it loop), you can press the "LOOP WHOLE"
  button.  Now you can press the "LOOP" button.

- Changed the "Extract All Waves" feature.  Before it would rename files with the sample name last.
  Now it renames them with the sample name first.  So:
  
  - BEFORE:  "ESXextracted-MONO-140-M1PickBs.wav"

  - NOW:  "M1PickBs-MONO-140-ESXextracted.wav"

- Changed the button name "Remove The Selected Wave" to "Remove The Selected Sample".

- Changed the button name "Edit The Selected Wave" to "Edit The Selected Sample".

- Added a "Convert Selected Sample (MONO/ST)" button.  This will convert a Mono Sample 
  to a Stereo Sample, or a Stereo Sample to a Mono Sample (depending on what is selected,
  and how much free space there is).

- BUGFIX:  Before I was only accepting files with the extensions (.esx, .wav, and .aif).
  I was ignoring all other files (including .aiff).  Now I am accepting .aiff as well as
  .aif, so: (.esx, .wav, .aif, and .aiff are all the acceptable formats).  Thanks to Jayzilla for reporting this.

- Added a "Pattern List" Column in the Sample Organizers, which let you see what Patterns a 
  Sample is used in.

- Added a "Remove All Samples Not Used In A Pattern" function.  This lets you free up space by
  removing any samples that aren't being used.

- Added a "Mono Organizer" function.  This opens up a new dialog window, which will let you select 
  multiple samples, and move them around (by dragging them).  Hold down the shift button to select 
  multiple samples.  You can rename multiple samples, and change their stretch step values.  If you 
  check the "Add Number" box, then you can rename multiple samples, and a unique number will be added 
  to the end of the sample name (for instance: if you type "bass", your samples will be renamed "bass0", 
  "bass1", "bass2", etc.).
