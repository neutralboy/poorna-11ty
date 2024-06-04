---
title: Fix Pop OS not recognizing USB or USB timeout in Pop OS / Ubuntu
date: 2024-06-04 23:13:17
keywords: PopOS, Ubuntu, USB not reconizing
level: Easy
description: What to do if Pop OS stops detecting your USB drive
layout: post.html
---
Recently my PopOS machine stopped detecting my attached USB keyboard and USB mouse. Here are the steps I took to debug it and here's how I finally debugged it.

First thing I noticed that the touchpad and keyboard on my HP Zbook worked just fine. Thats interesting! 
Then the RGB lights on my mouse and keyboard were still on, meaning that its not some sort of a loose connection.
Then in a terminal I ran ` lsusb ` to understand if the mouse and keyboard were recognized the OS. Turns out it was still working.

![Output of lsusb](/public/lsusb.png)

```sh
Bus 003 Device 009: ID 1ea7:0907 SHARKOON Technologies GmbH Keyboard # My keyboard is here
Bus 003 Device 006: ID 30fa:1330  USB GAMING MOUSE # My gaming mouse is here
```

Then on further research I realised that Ubuntu and similar distros have a feature where they disable power to USB ports to save power after sometime. Here's how to know if thats true for your system:
```sh
cat /sys/module/usbcore/parameters/autosuspend 
# -1 means its disabled
# 2 means it is enabled
```
Then you can use a `kernelstub` command to fix that.
```
kernelstub -a "usbcore.autosuspend=-1"
```

I hope that solved your problems!