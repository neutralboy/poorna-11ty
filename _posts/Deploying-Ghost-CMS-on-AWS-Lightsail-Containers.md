---
title: Deploying Ghost CMS on AWS Lightsail Containers
level: Intermediate
date: 2021-03-04 23:22:50
keywords: Ghost, Headless CMS, AWS, AWS Lightsail, Docker, Containerization
description: Deploy Ghost CMS on AWS LightSail containers for highly performant blogging experience.
layout: post.html
image: https://res.cloudinary.com/poorna/image/upload/v1614882067/my-blog/ghost-on-lightsail-container/Screenshot_2021-03-04_Create_a_container_service_Lightsail_4.png
---

> ## **Why deploy Ghost on Lightsail Container Service ?**
Dockerization of any software comes with one huge advantage, lesser management overheads. The software is packed with minimal moving parts that are absolutely essential to run the software. Hence reducing the risk of failure.
    Imagine not having to update any software at all, now scale that up with a software architecture with 10s of different individual software components. The advantage containerization offers over complex software development is insane.

Let's get started:
# Login to AWS and head to the AWS Lighsail container service page
Click on the **Create Container Service** button
![Lightsail Container Page](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1614882069/my-blog/ghost-on-lightsail-container/Screenshot_2021-03-04_Lightsail.png)

# Choose your Pricing Plan
We'll just use the cheapest plan available at $7 per month.
![Choose Pricing Plan](https://res.cloudinary.com/poorna/image/upload/v1614882069/my-blog/ghost-on-lightsail-container/Screenshot_2021-03-04_Create_a_container_service_Lightsail.png)

# Write the custom deployment configuration
If you've ever worked with `docker-compose.yml` or `kub.yml` files, this must be quite familiar to you.
```
CONTAINER_NAME: ghost-cms # Name of container
IMAGE: registry.hub.docker.com/library/ghost # URL of ghost image
```
![Configuration](https://res.cloudinary.com/poorna/image/upload/v1614882069/my-blog/ghost-on-lightsail-container/Screenshot_2021-03-04_Create_a_container_service_Lightsail_1.png)

# Add Environment and Port configuration
```
url: http://your-site.com
port: 2368 # Choose HTTP
```
AWS will generate and serve a unique URL through HTTPS
![Config2](https://res.cloudinary.com/poorna/image/upload/v1614882068/my-blog/ghost-on-lightsail-container/Screenshot_2021-03-04_Create_a_container_service_Lightsail_2.png)

# Choose your Public Endpoint
Don't forget to choose your public endpoint, this determines which container will be exposed to the public (Doesn't matter for us since we're running only 1 container)
![Public Endpoint](https://res.cloudinary.com/poorna/image/upload/v1614882067/my-blog/ghost-on-lightsail-container/Screenshot_2021-03-04_Create_a_container_service_Lightsail_3.png)

# Give your service a cool name!
The name you give the service determines the uniqe URL generated
![Unique Name](https://res.cloudinary.com/poorna/image/upload/v1614882067/my-blog/ghost-on-lightsail-container/Screenshot_2021-03-04_Create_a_container_service_Lightsail_4.png)

# Create the Service

----

# After a few minutes of waiting, your service must be ready/
Here's how the dashboard looks
![Container Dashboard](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1614882068/my-blog/ghost-on-lightsail-container/Screenshot_2021-03-04_Lightsail_1.png)

# Click on the URL and you'll see your site running. :)
![Functioning Site](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1614882068/my-blog/ghost-on-lightsail-container/Screenshot_2021-03-04_Ghost.png)


To login to the admin panel and setup your site, you can login to the url `your-site.com/ghost/`

![Celebrate](https://media.giphy.com/media/Sk5uipPXyBjfW/source.gif)

