---
title: Best way to run a Minecraft Server on AWS
author: Poornachandra
tags: []
categories: []
level: Easy
description: Minecraft server deployment can be a pain, but Wilfred can make it easy with docker deployment
date: 2021-03-12 00:10:00
layout: post.html
---
> Minecraft Servers are difficult to deploy and manage on any public cloud service. Self deploying your own server with access management such as Spigot or Bukkit is hard. The documentation for deployment and customization is often incomplete or inadequate. Here's a tutorial that will run through all the steps to deploy a MC Server with Docker!

[Wilfred project](https://wilfredproject.org) is an [open-sourced](https://github.com/wilfred-dev/wilfred) CLI tool to manage game servers on the cloud, and its revolutionary! The pain of deploying and figuring out all the moving parts reduced thanks to Project Wilfred.

# Step 1: Spin up an EC2 instance and connect to it
Spin up the t2.micro instance with [**Amazon Linux 2**](https://aws.amazon.com/amazon-linux-2/) on AWS. The advantage that Amazon-Linux offers is that its super secure, maintained by AWS (used in their infrastructure) and super light weight. Its best suited for running docker.

**Keep Port 25565 open for TCP and UDP**


# Step 2: Install Docker and Docker Compose on the EC2 instance
Here's how you do it.
```bash
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Make sure docker starts on system start
sudo chkconfig docker on
```

Now install docker-compose:
```bash
# Download the binary - auto downloads the latest version
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

# Add permissions
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose version
```
Now logout of your console and restart a new console session. This should restart all necessary permissions

# Step 3: Install Wilfred
Wilfred is used to manage the dockerized Minecraft server.
> pip does not come pre-installed on Amazon Linux 2

```bash
# Installing pip
sudo yum -y install python-pip

# Install wilfred
pip install wilfred --upgrade

# Check that its installed
wilfred --version

# Configure Wilfred
wilfred setup
```

# Step 4: Install and Configure Minecraft Server

```bash
wilfred create

> Server name: minecraft
> Image UID: minecraft-vanilla
> Port: 25565
> Memory: 1024
> Minecraft version: Latest
```

![Configure](https://res.cloudinary.com/poorna/image/upload/v1617205281/my-blog/mc-server/Screenshot_from_2021-03-31_21-10-10.png)


# Step 5: Connect to Minecraft Server in the game

Use the *IP Address* of the EC2 Instance with Port 25565 in your Minecraft client.
![Direct Connect](https://res.cloudinary.com/poorna/image/upload/v1617206478/my-blog/mc-server/Screenshot_from_2021-03-31_21-30-42.png)


![Celebrate](https://media.giphy.com/media/Sk5uipPXyBjfW/source.gif)
