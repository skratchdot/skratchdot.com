---
layout: post
title: ESX Wave Organizer - Version 0.1.3 Released
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

It's been awhile, but I finally got around to updating the program. Here's a feature list:

- Added AIFF support. The program will recognize 8 or 16 bit, mono or stereo, .aif files.
- Added Minimize and Maximize Buttons.
- The Play and Loop buttons work for every sample now. If you press the Loop button on a
  sample that is not a loop, it will play the whole sample repeatedly.
- Rearranged the main dialog. Now the Mono and Stereo lists are side by side (displaying more samples at once).
- Got rid of the "quick save" buttons, and added regular "Windows style" open and save dialogs.
- Added a "Remove All Samples" feature, which deletes all the samples from the workspace, but leaves
  the pattern and song data that is loaded.
- Got rid of the file "esxwaveorganizer.data". Now you only need the .exe file for the program to work.
- Fixed the "Clear Pattern &amp; Song Data". Previously, when you cleared all pattern data, each
  part's sample would be set to Mono Sample #000. Now, when you clear all pattern data, and load an
  .esx file into your sampler, each parts' sample will be set to NONE (not Mono Sample #000).
- Added a Menu with the options:

  - File:

    - Open/Add Files To Workspace

    - Save As ESX File

    - Extract All Waves

    - Exit

  - Functions:

    - Clear All Pattern And Song Data

    - Pattern Organizer

    - Song Organizer

    - Remove All Samples

  - Help:

    - About ESX Organizer

    - Visit Website
