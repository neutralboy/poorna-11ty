---
title: GDPR compliance with Cloudflare pages under 10 lines of code
date: 2024-01-10 20:38:17
keywords: Cloudflare, Cloudflare Pages, GDPR, Cookies
level: Medium
description: Achieve GDPR compliance using Cloudflare pages and under 10 lines of code
layout: post.html
---

Achieving GDPR compliance can be quite hard if you only want to show the GDPR banner to the people from the EU and UK. How do you go about figuring out where the traffic is from ?
The usual obvious answer is to use some third party analytics provider - but under GDPR that is prohibited without explicited consent. This article explores how to implements the true nature of GDPR using Cloudflare pages.

> [Cloudflare pages](https://pages.cloudflare.com/) is a hosting solution similar to Vercel or Netlify. Its extremely low code and integrates directly with Github. Additionally they take care of distrubuting your pages all over the globe at lighting fast speeds.

Before we start with our GDPR implementation here are a few basic rules that we need to follow:

1. Consent must be explicit - You can assume that just because they browse your site they have given you consent to track them
2. Cookies are okay - GDPR does not allow you to track the users with or without cookies.
3. We cant track the user before they accept the consent - this seems fairly obvious, but that means that you cannot use any third party providers that may finger print your request.

You can read more nuances here: [gdpr.eu/cookies](https://gdpr.eu/cookies/)

Serving the Consent Banner to only users from EU is ideal. However understanding where traffic is from without using a third party provider is hard, Cloudflare Pages solves that problem for you out of the box.

## Implementation

Lets start with the assumption that you have an existing project on Cloudflare pages. For this tutorial Im going to assume that you output static HTML files in a folder called build.

```bash
--- build/ # Contains all your static HTML files
--- src/ # Contains all your source code
```

Now lets go ahead and add a `function/` folder in the root. The folder should be in your root folder - NOT your build folder.

```bash
--- build/ # Contains all your static HTML files
--- functions/
--- src/ # Contains all your source code
```

Lets write a file called `gdpr.js` which handles our request. This file will help us differenciate where the user traffic is from.

```ts
export function onRequest(context) {
    const request = context.request;
    const resp = new Response(
        JSON.stringify({
            gdpr:
                request.cf.isEUCountry === "1" ||
                request.cf.country === "GB" ||
                false,
            country: request.cf.country,
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return resp;
}
```

The above bit of code gets the request from the Cloudflare context and understand where the traffic is from. Since Great Britian is no more part of EU but yet enforces the same rules as GDPR - we'll return `gdpr = true`.
This file will now be available to us at `<route>/gdpr`.

Now lets write some frontend code to make use of this. I will write my code in vanilla JS using browser fetch.

```ts
// Lets write a function that checks if user is in the EU when the page is first loaded
window.onload = async () => {
    const gdprResponse = await fetch("/gdpr", {
        method: "GET",
    });
    const gdprData = await gdprResponse.json();
    if (gdprData.gdpr) {
        // Display the consent banner
    } else {
        // You can track the user since they're not in the EU
    }
};
```
Full example is located at [github.com/neutralboy/poorna-11ty/tree/master/functions/gdpr-tester.js](https://github.com/neutralboy/poorna-11ty/tree/master/functions/gdpr-tester.js)
Now without tracking the user you know when they load your server where the users are located at.

> Since this site is also deployed on Cloudflare Pages you can head over to [poorna.dev/gdpr-tester](https://poorna.dev/gdpr-tester) to try it out right now.

### Few additional notes:

1. The Cloudflare Pages functions are very well documented and have a lot more features, you can check them out here: [https://developers.cloudflare.com/pages/functions/get-started/](https://developers.cloudflare.com/pages/functions/get-started/)
2. To test your build locally you can use **Cloudflare Pages Wrangler**. This turns out is slightly different from the **Cloudflare Workers Wrangler**. You can checkout this: [https://developers.cloudflare.com/pages/functions/local-development/
   ](https://developers.cloudflare.com/pages/functions/local-development/)
