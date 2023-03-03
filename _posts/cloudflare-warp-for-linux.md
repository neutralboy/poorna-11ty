---
title: Install Cloudflare WARP on linux
date: 2021-07-14 19:11:21
keywords: Cloudlfare, WARP, DNS, DNNSEC, DNS over TLS
description: Using the popular Cloudflare WARP on a linux machine to secure your network traffic.
level: Easy
layout: post.html
---

### [Cloudflare](https://blog.cloudflare.com/1111-warp-better-vpn/) calls this service "A VPN for People Who Don’t Know What V.P.N. Stands For"

![Cloudflare WARP](https://res.cloudinary.com/poorna/image/upload/c_scale,w_700/v1626270971/my-blog/Screenshot_2021-07-14_at_19-25-09_1_1_1_1_The_free_app_that_makes_your_Internet_faster.png)

Since cloudflare launched the WARP service for mobile on 11/11 called 1.1.1.1 . Linux users were waiting for a version of the client for Linux even as they released a version for Windows and MacOS. Even though the Linux client does not have a GUI there are a few open source alternatives you can use.

## Installing the CLI
```sh
# If you're on Ubuntu
sudo apt install cloudflare-warp
# If youre on CentOS
sudo yum install cloudflare-warp
```

## Making the connection: CLI way
```sh
# Register the client first
warp-cli register # Agree to the privacy document

# Connect to the client
warp-cli connect

# Lets test if it worked
curl https://www.cloudflare.com/cdn-cgi/trace/
# It should generate a a log called warp=on

```

## Optional: Installing the GUI


There is an open-source python file that renders WARP as a GUI on linux. 
The repos is located here: [https://github.com/mrmoein/warp-cloudflare-gui](https://github.com/mrmoein/warp-cloudflare-gui)

Here are simple instructions:
```sh
git clone https://github.com/mrmoein/warp-cloudflare-gui
cd warp-cloudflare-gui
# Install the program
python3 install.py
```
This should create a link in the desktop. Search for `Warp Cloudflare` in the desktop menu.

![WARP Client for Linux](https://raw.githubusercontent.com/mrmoein/warp-cloudflare-gui/main/Screenshot.png)

## Advanced: Switching modes
WARP CLI can also be used to toggle between modes. 
It has two available modes:
1. DOH - DNS over HTTPS
2. WARP+DOH - WARP mode and DNS over HTTPS

Changing modes:
```sh
# Switch to DOH Mode
warp-cli set-mode doh

# Switch to WARP=DOH
warp-cli set-mode warp+doh
```

