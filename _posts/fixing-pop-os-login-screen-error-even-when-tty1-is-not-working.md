---
title: Fixing Pop OS login screen error even when tty1 is not working
date: 2022-04-02 10:28:14
keywords: Pop_OS!, Linux, Login screen error, tty1, Recovery Mode
level: Medium
description: Sometimes after a failed update or a partial update Pop OS can sometimes fail to login to your user account and instead login to gnome-initial-setup, heres a guide to fixing that
image: https://res.cloudinary.com/poorna/image/upload/v1648875657/my-blog/Screenshot_from_2022-04-02_09-44-54.png
layout: post.html
---

I wrote this article after methods in the Pop_OS! article did not directly seem to work for me. Link to the article [https://support.system76.com/articles/bootloader](https://support.system76.com/articles/bootloader/)

## How to spot the error

If you boot your system after an update and Pop_OS auto logins automatically into some default account where all other functions are disabled. You must not be able to open terminal with `Super + T` and going into TTY1 mode with `Ctrl + Alt + F2/F3/F4/F5` also does not work

## Next steps

### Boot into recovery mode

Press `Esc` during the boot of your laptop to show the Pop_OS! selector. You must see 4 options there:

1. Pop_OS! new kernel
2. Pop_OS! old kernel
3. Pop_OS! Recovery mode
4. Boot into Firmware

Choose the `Recovery mode` option and let it start up.

### Exit the installation option

Once the recovery mode has started you must see an option to reinstall the Operating system and start over.

Click on the option of `Continue in Demo mode`. This should close the installation window.

### Mount the OS drive

Now mount the pre-installed and broken OS drive so that commands can be executed in it

Lets see what drives exist

```sh
lsblk
```

The above command should output the following when:
![Image of lsblk output](https://res.cloudinary.com/poorna/image/upload/v1648875657/my-blog/Screenshot_from_2022-04-02_09-44-54.png)

Most often your OS is installed in    `nvme0n1` . Now lets mount it to `/mnt` location of the recovery OS

```bash
sudo mount /dev/nvme0n1p3 /mnt
```

Then lets add the execution files of the broken OS and create links in order to execute the commands

```bash
for i in dev dev/pts proc sys run; do sudo mount -B /$i /mnt/$i; done
sudo cp -n /etc/resolv.conf /mnt/etc
```

Now lets get into the old OS terminal to execute the commands

```bash
sudo chroot /mnt
```

![Output of above commands](https://res.cloudinary.com/poorna/image/upload/v1648875652/my-blog/WhatsApp_Image_2022-04-02_at_10.20.06.jpg)

### Execute the commands to fix the broken installation

Here are the commands to clean up and broken installations

```bash
sudo apt clean
sudo apt update -m
sudo dpkg --configure -a
sudo apt install -f
sudo apt full-upgrade
sudo apt autoremove --purge
```

Now lets fix the UI incase its broken

```bash
sudo apt install --reinstall plymouth gdm3 gnome-shell pop-desktop linux-generic linux-headers-generic
update-initramfs -c -k all
```

### Close the terminal and reboot

That's it. It should now have fixed your UI and the login screen should work fine!
