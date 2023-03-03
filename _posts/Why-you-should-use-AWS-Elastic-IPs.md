---
layout: post.html
title: Why you should use AWS Elastic IPs
date: 2021-04-01 19:37:51
level: Intermediate
tags: AWS, Elastic IPs, DevOps, EC2
description: Elastic IPs have several advantages from uniform experience to risk mitigation
---

> **What are Elastic IPs?**
    Elastic IPs are public IPs that are allocated by AWS. These IPs can be attached to any of your compute resources. Hence provide one constant end point that your services can communicate to.

Elastic IPs are the best way to avoid single node failure in a conventional server deployment setup.
Here's how Elastic IPs can help you mitigate risk in your EC2 Instances:

# Your instance is down with an Elastic IP pointing to it
![Case 1: Your instance is down with an Elastic IP pointing to it](https://res.cloudinary.com/poorna/image/upload/v1617373695/my-blog/elastic-ip/Untitled_drawing_2.png)

# Provision a new instance with an Elastic IP pointing towards it
![Provision a new instance with an Elastic IP pointing towards it](https://res.cloudinary.com/poorna/image/upload/v1617374759/my-blog/elastic-ip/Untitled_drawing_4.png)

This setup has several advantages:
 * **Very low down time** As you can instantly route your traffic to a new instance.
 * **No need to change DNS records** because your DNS records still points to the original Elastic IP
 * **The Old Instance stays around** so that you can easily investigate what went wrong
 * **Very low resource costs** as you only run one instance at once.