---
title: Error in converting sdl to metadata - Hasura
date: 2023-09-24 19:36:17
keywords: Hasura, Hasura Migrations, Hasura Metadata
level: Medium
description: This is a very simple guide on how to fix your migration issues in Hasura
layout: post.html
---

The idea of the article is to help you fix the simple error of Hasura Migrations. There are many Github issues that have solved this, but all the Google searches I performed to fix this did not result in any Github Issue links. Maybe its a comment of the decline in search quality of Google Search.
This problem existed in our deployment at Medblocks for a year before I figured it out.

## The problem
Hasura migration fails when using the CLI to migrate - this usually occurs in production. The same bunch of SQL files that work on local does not seem to be working in production. We used a Kubernetes Service job to run the migrations and it constantly kept failing with the following error:
```sh
error in converting sdl to metadata: fork/exec /root/.hasura/cli-ext/v2.32.1/cli-ext-886403857/cli-ext: no such file or directory:
```

The end of the error message says `no such file or directory` but after verifying I found that the migration files existed.
My migration command used to be 
```sh
hasura deploy --endpoint http://<my-deployment-url>
```
then I changed it to 
```sh
ls -a && hasura deploy --endpoint http://<my-deployment-url>
```
It logged all the files I knew were there, but still the error persisted.

## The solution
Then I built the container locally and SSH'd into it. Then tried to run the migrations from inside it and voila the same error popped up again.
```sh
error in converting sdl to metadata: fork/exec /root/.hasura/cli-ext/v2.32.1/cli-ext-886403857/cli-ext: no such file or directory:
```

So now we know it was because of the docker container I'm using. I was using docker `node:20-alpine` image, then I changed it to `node:20-slim` and the migrations worked.

> TLDR: Change your docker image from `alpine` to a non-alpine version. If youre on a serverless platform facing this error then try and get an env as close to Debian as possible

What is different is Alpine that caused this ? We know alpine is a stripped down version of an OS that supposed to be super light to run, and it is. [Alpine Linux site](https://www.alpinelinux.org/). Im not a systems engineer so I Google'd for this specifically and found the issue.

1. [https://github.com/hasura/graphql-engine/issues/8441](https://github.com/hasura/graphql-engine/issues/8441)
2. [https://github.com/hasura/graphql-engine/issues/6441](https://github.com/hasura/graphql-engine/issues/6441#issuecomment-764800772) - This one relates to running migrations on Heroku. Turns out even the Heroku build env strips out a few essential binaries.

A fast summary for people like me is that Hasura CLI is distributed as a binary, its written in Go. It depends on a few OS specific libraries which are absent in `alpine` version of Docker Images. The other 

Hope this helps your case! Thanks for reading!