---
title: How to run Roblox Player on Ubuntu Linux. Solving the Roblox no longer supports Windows XP or Vista.
date: 2022-01-24 21:31:49
tags: Roblox, Roblox on Linux, Ubuntu, Linux, Wrapper, Roblox Studio
description: Using just WineHQ above 6.0 to Roblox Player results in an error. Here's a guide on solving that.
level: Easy
image: https://res.cloudinary.com/poorna/image/upload/v1643042253/my-blog/Screenshot_2022-01-24_22-05-05.png
layout: post.html
---

### On running the Roblox official exe file on Wine results in the following error.
![Please note that for security reasons, Roblox no longer supports Windows XP or Vista. To keep playing Roblox, please upgrade to Windows 7 or above](https://res.cloudinary.com/poorna/image/upload/v1643042252/my-blog/Screenshot_2022-01-24_22-06-21.png)
Please note that for security reasons, Roblox no longer supports Windows XP or Vista. To keep playing Roblox, please upgrade to Windows 7 or above

![Total Wine error](https://res.cloudinary.com/poorna/image/upload/c_scale,w_800/v1643042253/my-blog/Screenshot_2022-01-24_22-05-05.png)

---

The most common fix that is prescribed is to use [GrapeJuice](https://brinkervii.gitlab.io/grapejuice/). Although Grapejuice works great for setting up Roblox Studio on linux, it does not work with Roblox Player. The same error mentioned above returns with Grapejuice version as well. This article is written in Jaunary 2022 so things might change by the time this article is read.

---

## Using the Roblox Linux Wrapper
[![Roblox Linux Wrapper Github Page](https://res.cloudinary.com/poorna/image/upload/c_scale,w_600/v1643042419/my-blog/roblox-linux-wrapper.png)](https://github.com/roblox-linux-wrapper/roblox-linux-wrapper)

Roblox Linux Wrapper is a bunch of Shell scripts that make running Roblox Player a breeze.
### How to set it up
1. Install WineHQ. Recommended is Wine Staging, but I tested in on Wine Stable and it worked just fine. You can get the details [here](https://wiki.winehq.org/Ubuntu)
2. Get the source code of the wrapper
    ```bash
        git clone https://github.com/roblox-linux-wrapper/roblox-linux-wrapper.git
    ```
3. Navigate into the folder and the execute script named **rlw**
    ```bash
        ./rlw
    ```
    This should setup all the necessary files required for Roblox to run
4. Now you can just start Roblox as usual
    ![Roblox Play game](https://res.cloudinary.com/poorna/image/upload/c_scale,w_600/v1643042332/my-blog/Screenshot_2022-01-24_at_22-08-41_Plane_Crazy.png)

<i>Sometimes Roblox web UI wont recognize the Wine Roblox you have installed. After clicking the play button and granting the necessary permissions wait for a few seconds for Roblox player to start up</i>


Thats it. Simple solution to get Roblox working on any Linux distro of your choice. This solution was tested on Wine 7.0, Pop-OS with NVidea 2GB VRAM, and it works without any issues. Any additional fixes and features can be found on their Github page - [https://github.com/roblox-linux-wrapper/roblox-linux-wrapper](https://github.com/roblox-linux-wrapper/roblox-linux-wrapper)