---
layout: post
title: ESX Wave Organizer - Version 0.1.2 Released
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

A bug was fixed that would let you add a stereo sample when you shouldn't be
able to. This would cause the available memory to be negative, which should never
happen. Since stereo samples take up twice the memory that mono samples do, I was
letting you add a stereo sample, without checking if twice it's size would fit. For
example, if your memory left was: 4000, and the stereo sample's memory size was 6000,
it would still be added, because 3000 is less than 4000. Your memory left would be
-2000 after adding it. All this has been fixed, and hopefully no one ran into the problem...
