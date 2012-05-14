--- 
layout: post
title: ESX Wave Organizer - Version 0.1 Released
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

I decided to release it a little early to start getting some feedback.  As of right now, 
the "Push Down" and "Push Up" Buttons have no effect.  Also, the "Play", "Loop", and "Stop" 
buttons only work for .wav files that were dragged onto the workspace.  You cannot preview 
files that came from a .esx file unless you "extract" it first, then drag the resulting .wav 
file onto the workspace.  
  

Also, you cannot set the start, end, or loop start times.  You cannot set the "time slice", 
"auto sampling", or "playback level" parameters.  In the future, I hope to implement these 
features.  It depends on how much feedback I get, and how much spare time I have.  
  
  
There is also a minor bug in Version 0.1 that occurs when switching between the mono and stereo 
lists.  If you click on a "greyed" selection, the "focus" of the main window will not change.  
To test this, open "ESX Wave Organizer".  Now click on Mono Sample 003.  The "focus" of the main 
window is Mono Sample 003.  Now click on Stereo Sample 005.  The "focus" of the main window is 
Stereo Sample 005.  Now click on the "greyed" Mono Sample 003 again.  The "focus" of the main 
window is still Stereo Sample 005.  This is not a very big deal, just make sure you check the 
"focus" of the window when changing from mono to stereo, or refrain from clicking on the "greyed" 
selections.

