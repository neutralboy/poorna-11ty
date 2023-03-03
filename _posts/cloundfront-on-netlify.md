---
title: Deploying Next.js on Cloudfront
date: 2021-02-13 14:24:59
tags: Cloudfront, AWS, Next.js, CMS, Devops, Cloud Deployment
level: Hard
description: Leverage the powerful infrastructure of AWS to deploy your next Next.js site
layout: post.html
---

# Why deploy Next.js on Cloudfront ?
You can use services such as Netlify or Vercel to generate and deploy you static site. These services leverage AWS architecture or equivalents such as GCP or Azure to deploy your site on the CDN. 


**Netlify Free tier**: Netlify provides 300 free build minutes per month.


**AWS CloudBuild Free tier**: AWS CodeBuild provides 100 free build minutes. So, 300 minutes will cost you 300-100(free minutes) = 200. 200 min × $0.005/min = $1
    Other things to factor in 
        1. S3: 0.025$/GB - One static site will typically be around 100MB
        2. DNS: 0.5$ per domain (Avoidable if you buy your domain on GoDaddy and use their built in DNS service.)
        3. CodePipeline: 0.5$ per code pipeline
        4. Free tier of AWS CloudFront. (Free tier for a year, after which it adds upto less than 5$ a month.)
    To deploy site per month it costs - $2.025

The bet on AWS pays off if you have high loads and greater than 1 concurrent builds.
Netlify allows 3 concurrent builds on the $19 plan. On AWS the same costs around $2.025 + 2 more Code pipelines at 0.5$ each. Total at 3.025$

The only disadvantage of using AWS is the need for intricate techinical knowledge on how to deploy your code. Netlify uses your `package.json` data commands to build and configure your site.

----

# Moving Parts
1. Git
2. AWS CodePipeline - to configure triggers
3. AWS CodeBuild - to build and package our code
4. AWS S3 - to store the build artifacts
5. AWS Cloudfront - to distrubute our site

----

## Git
Setup your code on git and commit all of it.
Use any of Github, Butbucket or Gitlab to maintain your code.

----

## Setup CodePipeline

> AWS CodePipeline is a tool that looks for commits and pulls made to a git repository and triggers an action on the code. Action may be postprocessing of data, building container images, exporting static files and so on.

1. ### Add build command to your NextJS project
    Add the build command to `package.json` file of your NextJS project. This command will help us build and export the project. `next export` generates a pre-rendered HTML export into a folder named `out`.
    ```
    ...
    build: next build && next export
    ...
    ```
1. ### Go to the CodePipeline section and use the `Create pipeline` button.
    ![Create Pipeline](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612627201/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools.png)
2. ### Name your pipeline and use the New Service Role, it should give you enough permissions to make it work.
    ![Name and create role](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612627422/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_2.png)
    Click on next
3. ### Now choose the source of code
    ![Source of code](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612627533/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_3.png)
    One you choose your source, AWS will ask you to connect your repo to the pipeline. Provide all necessary permissions.
    Click Next.
4. ### Configuring the build stage
    Use the Create Project button
    ![Create CodeBuild Project](https://res.cloudinary.com/poorna/image/upload/v1613212748/my-blog/Screenshot_2021-02-13_CodePipeline_-_AWS_Developer_Tools.png)
5. ### Configuring AWS CodeBuild Environment
    > Image registry: Other registry
    > Custom Docker image registry URL: registry.hub.docker.com/library/node:alpine
    > Previleged: True
    ![Configure AWS Codebuild Environment](https://res.cloudinary.com/poorna/image/upload/v1613212593/my-blog/Screenshot_2021-02-13_CodeBuild_-_AWS_Developer_Tools.png)
6. ### Configure AWS Codebuild Command
    Choose the Insert custom build command option and enter the `npm run build` .
    ![Configure AWS Codebuild Environment](https://res.cloudinary.com/poorna/image/upload/v1613213066/my-blog/Screenshot_2021-02-13_CodeBuild_-_AWS_Developer_Tools_1.png)
5. ### Choose AWS S3 as your deploy stage
    ![AWS S3 as deploy stage](https://res.cloudinary.com/poorna/image/upload/v1612627954/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_5.png)
    Choose any of your S3 buckets
    > Check the Extract file before deploy option
    ![Extract before deploy](https://res.cloudinary.com/poorna/image/upload/v1612628101/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_6.png)
6. ### Review and create your pipeline

    #### Now commit a change to your code and check if its being executed.
    Click on the pipeline you just created and view its history. If the trigger has been setup correctly, here's what you'll see.

    ![Successful Trigger](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1612628312/my-blog/Screenshot_2021-02-06_CodePipeline_-_AWS_Developer_Tools_7.png)