---
layout: post
title: ESX Wave Organizer - Version 0.1.4 Released
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

- You can now view if a sample has been time sliced or not.

- You can now view and set the Play Level for each samples.

- BUG FIX == Before, if the focus was on Mono Sample 001, and you clicked on a "greyed" Stereo Sample 001,
  the focus would still be on Mono Sample 001. This has been fixed. No matter what sample you click on,
  it will always become the focus...

- BUG FIX == Before I accept an .esx file into the workspace, I do a few checks on the file. It must
  contain the values "KORG" in 2 places; it must contain the value 0x71 in two places; and it must contain
  the value "ESX" in one place. Previously, I was also making sure that it had the value "BPS" in one place.
  This was not needed, and it was not true for all .esx files. I found this out because someone emailed me
  saying that the program was not accepting their .esx file. Where I thought that the value "BPS" was needed,
  it wasn't. The .esx file in question, had the value "BPA" where I thought the value had to be "BPS". If
  anyone else has a problem loading an .esx file into the workspace, email me... It is probably because one of
  the other checks I do is unnecessary.
