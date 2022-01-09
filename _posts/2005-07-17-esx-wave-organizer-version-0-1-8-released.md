---
layout: post
title: ESX Wave Organizer - Version 0.1.8 Released
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

- BUGFIX: Fixed a bug that was ignoring certain .aif/.aiff files.

- BUGFIX: Fixed a CPU Memory Leak that occured when using the "Remove All Samples"
  Fuction. Previously, I was only freeing CPU memory when using the
  "Remove Currently Selected Sample" or "Remove All Samples Not Used In A Pattern"
  Fuctions. This could slow down your system (only while the program was running)
  if you repeatedly used the "Remove All Samples" Fuction in a session.

- BUGFIX: Fixed a bug that was not displaying the STEREO Sample Names in the Pattern Organizer.

- BUGFIX: Fixed another bug that was not always storing "SLICE" samples correctly.
  Search the forums for more info about this bug.

- Changed the name of the "Pattern Organizer" to "Pattern Editor".

- Changed the name of the "Song Organizer" to "Song Editor".

- The Song Editor works now.

- Added Minimize/Maximize Buttons to the Pattern Editor and the Song Editor.
