---
layout: post
title: Windows is slow after adding more memory
categories:
  - Windows 7
  - Ubuntu
tags:
  - Windows
  - Ubuntu
  - Dual Boot
  - RAM
  - Memory
  - Upgrade
  - BIOS
  - Dell
  - Memtest
---

I dual boot my [Dell Precision m6500](http://www.dell.com/us/business/p/precision-m6500/pd) with
Windows 7 and Ubuntu 12.04. I recently upgraded the memory from 8gb (4x2gb) to 32gb (4x8gb). Ridiculous
I know. This is my work laptop and the extra RAM is useful.

Anyways, after replacing the RAM, Windows slowed down dramatically. The startup screen was
taking over 10 minutes to load. I tried disabling the
[page file \(and virtual memory\)](http://windows.microsoft.com/en-us/windows7/Change-the-size-of-virtual-memory),
then rebooted. Windows was still taking forever to start.

Once it finally loaded, everything was super slow. The CPU wasn't really spiking, and the disk
usage didn't look crazy, but any action took forever. Even the mouse cursor was slow and jumpy.

When I would boot into Ubuntu, things were fine. I couldn't figure out what was wrong with Windows.

I tried running [Memtest](http://www.memtest.org/), and the tests were passing.

Finally, someone suggested trying to update the BIOS. That turned out to be the smoking gun. I upgraded
the BIOS from A04 to A08, and rebooted Windows. Everything started working at full speed again. I'm
not sure if it was the upgrade, or the simply resetting/flashing the BIOS, but things started working.
