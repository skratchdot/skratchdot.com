---
layout: post
title: Ubuntu Dual Boot - Change Default OS
categories:
  - Ubuntu
tags:
  - Windows
  - Ubuntu
  - Dual Boot
  - Grub
  - Grub2
---

On one of my laptops, I'm dual booting Windows 7 and Ubuntu 12.04 with Grub2 as the bootloader.

I always forget what steps to take to "remember my last OS" when booting.

First, you need to modify **/etc/default/grub**:

```bash
sudo vi /etc/default/grub
```

By adding the following 2 lines:

```text
  GRUB_DEFAULT=saved
  GRUB_SAVEDEFAULT=true
```

After modifying this file, you need to update GRUB's configuration by executing the following 2 commands:

```bash
sudo grub-mkconfig
sudo update-grub
```

### Links

See the [Ubuntu Grub2 Help Page](https://help.ubuntu.com/community/Grub2#Saved)
or this [Stack Overflow Answer](http://superuser.com/questions/95828/making-default-saved-work-with-grub2/205360#205360)
