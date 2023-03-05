---
title: How to deploy your static site on AWS S3 + Cloudfront in 2021
date: 2021-02-06 16:27:07
keywords: AWS, S3, CloudFront, Headless CMS, Static Site, JAM Stack
description: Deploy your static site on AWS and use the complete advantage of cutting edge technology.
image: https://res.cloudinary.com/poorna/image/upload/c_scale,w_300/v1612633710/my-blog/undraw_Around_the_world_re_n353.png
level: Intermediate
layout: post.html
---
> This guide is for advanced users with intricate knowledge of AWS and its services. If you're new to static sites you can try out [Netlify](https://www.netlify.com/) they're a super simple way to deploy static sites. If you're asking why do it at all, its for bonus cool points. 

# How do we go about it ?
Here are the steps of how to deploy it:
1. Git your code
2. Using CodePipeline Trigger to add code to S3
3. Serve the contents of S3 over Cloudfront
-----
Feel free to skip ahead to anything you've already done.

# Git
You can use any of the following services to maintain your code
* [Bitbucket](https://bitbucket.org/product/)
* [Github](https://github.com/)
* [AWS CodeCommit](https://aws.amazon.com/codecommit/)

Once you have all your code commited and ready, move on to the next step.

----

# Using CodePipeline Trigger

> AWS CodePipeline is a tool that looks for commits and pulls made to a git repository and triggers an action on the code. Action may be postprocessing of data, building container images, exporting static files and so on.

1. ### Go to the CodePipeline section and use the `Create pipeline` button.
    ![Create Pipeline](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612627201/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools.png)
2. ### Name your pipeline and use the New Service Role, it should give you enough permissions to make it work.
    ![Name and create role](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612627422/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_2.png)
    Click on next
3. ### Now choose the source of code
    ![Source of code](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612627533/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_3.png)
    One you choose your source, AWS will ask you to connect your repo to the pipeline. Provide all necessary permissions.
    Click Next.
4. ### Skip the buid Stage 
    Button is located at the bottom of the page
    ![Skip the build stage](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612627764/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_4.png)
    > Skipping build stage implies that you already have deployable `index.html` in your git repo. If you do not consider using a build stage.
5. ### Choose AWS S3 as your deploy stage
    ![AWS S3 as deploy stage](https://res.cloudinary.com/poorna/image/upload/v1612627954/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_5.png)
    Choose any of your S3 buckets
    > Check the Extract file before deploy option
    ![Extract before deploy](https://res.cloudinary.com/poorna/image/upload/v1612628101/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_6.png)
6. ### Review and create your pipeline

    #### Now commit a change to your code and check if its being executed.
    Click on the pipeline you just created and view its history. If the trigger has been setup correctly, here's what you'll see.

    ![Successful Trigger](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612628312/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_7.png)
----
# Setting up CloudFront
> Cloudfront is AWS CDN service that can serve objects from globally cached edge nodes. It can be used to serve images, css, html, php and all static assets. Video Livestreaming is also possible.

1. ### Create a new distrubution
    Navigate to the AWS Cloudfront service and create a new distrubution. 
    ![Create a new distrubution](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612628717/my-blog/Screenshot_2021-02-06_AWS_CloudFront_Management_Console.png)
2. ### Choose the S3 bucket you want to serve from.
    ![Choose S3 bucket](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612631494/my-blog/Screenshot_2021-02-06_AWS_CloudFront_Management_Console_1.png)
    > Use the *Origin Path* option to make sure you serve the right files. Here's an example of what it looks like:
    ![Origin Path option](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612631494/my-blog/Screenshot_2021-02-06_AWS_CloudFront_Management_Console_1.png)
3. ### Configure a few more options
    Leave most options to their defaults, here are a few I recommend changing:
    * #### Compress Objects Automatically: YES
    * #### Alternate Domain Names: < custom domain >
        >If you want a custom domain, AWS automatically provisions a SSL certificate.
    * #### Custom SSL Certificate

----
## Click Deploy and you are done.
Now you must have a cloudfront domain deployed at your custom domain 

Here's how the Cloufront Distrubution looks once its done!
![Completed](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612632096/my-blog/Screenshot_2021-02-06_AWS_CloudFront_Management_Console_3.png)

----
![Celebration](https://res.cloudinary.com/poorna/image/upload/v1612632204/my-blog/tenor.gif)