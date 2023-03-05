---
title: AWS Lightsail Wordpress for Absolute Beginners in 2021
date: 2021-02-21 17:38:59
keywords: AWS, AWS Lightsail, Wordpress, Setup, Beginners
level: Easy
description: Utilize the power of AWS Lightsail to deploy WP sites for less than $3.5/month!!
layout: post.html
---

### Why use Lightsail for Wordpress hosting ?
Most standard hosting sites will offer you hosting as cheap as 3$/month for Wordpress instances. They usually come with limits such as 2GB storage, 100GB data download and so on.
AWS Lightsail combines Bitnami's hosting offered through AWS with all the standard AWS features. Unlimited data transfer (they are charged) and the ability to scale your storage to 100s of GBs in minutes! All of this and the ability to leverage AWS advanced infrastructure all starting at the cost of 3.5$/month.
> But AWS already has EC2 instances

Although AWS already offers the all capable EC2 compute instances, Lightsail is AWS way of competing with DigitalOcean and other competitors which offer **One Click** app installations.

# Login to your AWS account and click on the Services button in the Navbar
Click on the Lightsail link as shown below
    <img class="cssbox_thumb" tabindex=1 src="https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1613910024/my-blog/Screenshot_2021-02-21_17-48-37.png" /><span class="cssbox_full">
        <img src="https://res.cloudinary.com/poorna/image/upload/v1613910024/my-blog/Screenshot_2021-02-21_17-48-37.png" />
    </span>


# Create the Wordpress Instance in the Lightsail Dashboard
1. Click on the Create Instance Button in the Lightsail Dashboard
    <img alt="Create Instance" class="cssbox_thumb" tabindex=1 src="https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1613912560/my-blog/Screenshot_2021-02-21_Lightsail.png" /><span class="cssbox_full"><img src="https://res.cloudinary.com/poorna/image/upload/v1613912560/my-blog/Screenshot_2021-02-21_Lightsail.png" />
    </span>
2. Choose the OS and the App image to be installed
    <img alt="app image" class="cssbox_thumb" tabindex=1 src="https://res.cloudinary.com/poorna/image/upload/v1613912762/my-blog/Screenshot_2021-02-21_Create_an_instance_Lightsail.png" /><span class="cssbox_full"><img src="https://res.cloudinary.com/poorna/image/upload/v1613912762/my-blog/Screenshot_2021-02-21_Create_an_instance_Lightsail.png" />
    </span>
3. Choose the pricing plan. The default plan is $3.5/month
    <img alt="pricing" class="cssbox_thumb" tabindex=1 src="https://res.cloudinary.com/poorna/image/upload/v1613912919/my-blog/Screenshot_2021-02-21_Create_an_instance_Lightsail_1.png" /><span class="cssbox_full"><img src="https://res.cloudinary.com/poorna/image/upload/v1613912919/my-blog/Screenshot_2021-02-21_Create_an_instance_Lightsail_1.png" />
    </span>
4. Now enable Automatic Backups - choose the time at which you expect the least activity to occur on your instance
    <img alt="backups" class="cssbox_thumb" tabindex=1 src="https://res.cloudinary.com/poorna/image/upload/v1613913010/my-blog/Screenshot_2021-02-21_Create_an_instance_Lightsail_2.png" /><span class="cssbox_full"><img src="https://res.cloudinary.com/poorna/image/upload/v1613913010/my-blog/Screenshot_2021-02-21_Create_an_instance_Lightsail_2.png" />
    </span>
5. Add a unique name to your instance - with the ease of creation of instances you will often forget which is which
    <img alt="name" class="cssbox_thumb" tabindex=1 src="https://res.cloudinary.com/poorna/image/upload/v1613913200/my-blog/Screenshot_2021-02-21_Create_an_instance_Lightsail_3.png" /><span class="cssbox_full"><img src="https://res.cloudinary.com/poorna/image/upload/v1613913200/my-blog/Screenshot_2021-02-21_Create_an_instance_Lightsail_3.png" />
    </span>
6. Click on create instance button


### Your instance is now being created

## It should appear like this once its been created.
 <img alt="Created Instance" class="cssbox_thumb" tabindex=1 src="https://res.cloudinary.com/poorna/image/upload/v1613913444/my-blog/Screenshot_2021-02-21_Lightsail_1.png" /><span class="cssbox_full"><img src="https://res.cloudinary.com/poorna/image/upload/v1613913444/my-blog/Screenshot_2021-02-21_Lightsail_1.png" />

## Lets add a static IP to the instance
Adding static IP makes sure that your instance will always have the same IP atttached to it. This can be very useful for DNS
1.  Click on the Instance and go to the Networking tab\
2. Click on the Create Static IP button
    <img alt="Created static IP" class="cssbox_thumb" tabindex=1 src="https://res.cloudinary.com/poorna/image/upload/v1613913715/my-blog/Screenshot_2021-02-21_Demo-wp-instance_Networking_Lightsail.png" /><span class="cssbox_full"><img src="https://res.cloudinary.com/poorna/image/upload/v1613913715/my-blog/Screenshot_2021-02-21_Demo-wp-instance_Networking_Lightsail.png" />
3. Enter a unique name to identify your static IP
    <img alt="Static IP naming" class="cssbox_thumb" tabindex=1 src="https://res.cloudinary.com/poorna/image/upload/v1613914108/my-blog/Screenshot_2021-02-21_Create_a_static_IP_address_Lightsail.png" /><span class="cssbox_full"><img src="https://res.cloudinary.com/poorna/image/upload/v1613914108/my-blog/Screenshot_2021-02-21_Create_a_static_IP_address_Lightsail.png" />
4. Create the IP
5. You can verify its creation in the Networking tab of the instance.
    ![Verify the Static IP creation](https://res.cloudinary.com/poorna/image/upload/v1613914212/my-blog/Screenshot_2021-02-21_Demo-wp-instance_Networking_Lightsail_1.png)

