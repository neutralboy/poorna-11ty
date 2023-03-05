---
title: How to build your blog on Hexo
keywords: Hexo, JS, Static site, Headless CMS, Blogging
description: Hexo is a ridiculosly simple blogging framework for developers, build your site in Hexo.
image: https://res.cloudinary.com/poorna/image/upload/c_scale,w_300/v1612633600/my-blog/undraw_blogging_vpvv.png
level: Easy
layout: post.html
---

 > **What is Hexo?**
 Hexo is a static blog generator akin to jekyll, uses the latest JS standards. It outputs the site in the classic HTML, CSS and JS after post-processing, which means that you can deploy it on a CDN of your choice.


# Step 1: Install Hexo
Hexo is sourced from npm so make sure npm in [installed](https://docs.npmjs.com/cli/v6/configuring-npm/install) first.
Then install Hexo:
```
npm install -g hexo-cli
```
`-g` tag makes sure its installed globally on your system, hence also giving us access to the hexo commands from any directory.


# Step 2: Create your Hexo Project
```
hexo init hexo-project
```
Then,
```
cd hexo-project
npm install
git init
git add .
git commit -m "first commit"
```
`npm install` installs all the required modules in the `node_modules/` required for development.
`git init` initializes an empty git project.
Then add and commit all the files that have been created.

# Step 3: Install a theme
Now lets add some style to our new blog, I'm using the cuppertino theme, you can find it [here](https://github.com/MrWillCom/hexo-theme-cupertino) on Github.
In the root of your project add the theme as a submodule:
```
git submodule add https://github.com/MrWillCom/hexo-theme-cupertino.git themes/cuppertino
```
This should give you the theme files in the `themes/` directory.
Now edit the the `_config.yml` in the `themes/cuppertino` folder.
Here's what I changed:
```
...
# navigation config
nav:
  # the title displays in the upper left corner which won't change
  title: Poorna.
  # the items displays in the upper right corner
  items:
    # these items will display as a link
    # Archives: /archives
    # Friends: /friends
    Projects: /projects
    About: /about
    # these will be automatically be an icon
    # GitHub: https://github.com/MrWillCom
    # CodePen: https://codepen.io/mrwillcom
    # Patreon: https://www.patreon.com/MrWillCom
...
```
You can play around and figure out how to customize the nav, footer and everything else, its extremely simple.
Now change the global settings of the blog in the main `_config.yml`. Here's mine:
```
# Site
title: 'Poorna.'
subtitle: ''
description: The complete reboot of Cloud, Devops and Analytics.
keywords:
author: Poornachandra
language: en
timezone: ''
```

# Step 4: Create your first post
Lets go ahead and write our first post.
```
hexo new post hello-world
```
The above command should generate a file named `hello-world.md` under `source/_posts`.
Then run the hexo build command:
```
npm run build
```
Now lets start a live server to preview the changes we make to the file.
```
npm run server
```
This should spin up a server at `http://localhost:4000/`. Open it in the browser.
# Step 5: Add some content
Open the `hello-world.md`
Replace the contents to the following
```markdown
---
title: Hello World
---
Hello world. This is my first post on Hexo.

<blockquote class="imgur-embed-pub" lang="en" data-id="a/pDVdg" data-context="false" ><a href="//imgur.com/a/pDVdg">Significant amount of points away from next imgur rank. Here&#39;s my favorite cat gif for your caturday</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
```
Now lets commit the changes:
```
git add .
git commit -m "deploy post"
```


> Follow the next tutorial on [how to deploy the blog on AWS S3 + Cloudfront](/2021/02/06/deploy-static-site-on-aws/)