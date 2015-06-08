---
layout:     post
title:      "Integrating AWS Lambda into a static site"
subtitle:   "A high level view into integrating AWS Lambda into a static site"
date:       2015-06-09 12:00:00
author:     "Chad Baudoin"
headImage: '![lady looking at lamb](/img/blog/2015-06-09/lamb-header.jpg "lambs & lambda, you get it")'
---

I took some time this last weekend to dig into AWS Lambda. Simply put, Lambda is a way to run code in the AWS cloud without knowing/caring about a server. Lambda is responsive to events in the AWS ecosystem (S3 uploads, SQS messages, ad-hoc execution, etc.). I focused looking at the ad-hoc execution to add a backend to a static webpage.

[My demo application](http://twilio-instagram-lambda.s3-website-us-east-1.amazonaws.com/) was sending random Instagram images to a phone. It’s a single web page being hosted on S3 that calls a Lambda function which calls Instagram API, get a couple of photos and send those via the Twilio API to a phone. On the surface, there is nothing terribly interesting about this contrived example. The interesting part was that I never had to deploy a server and my webpage is being hosted on S3. Why are those interesting? Great question, I’ll break it down.

### No servers to think about
This is fantastic because it removes a large layer of complexity when deploying basic websites. There are whole companies (Heroku, AppFog, EngineYard) dedicated to removing the complexity of deploying servers. We never had to install express (node framework), never had to figure out user permissions, never had to spend a second on load balancers or auto-scaling. I had to write a single piece of code, test it and deploy it to Lambda. Simply said, it saves time and ongoing maintenance.

### S3 is sooooo cheap and fast
Hosting your website on S3, if you can get away with it, is the most scalable thing on the web. It’s static file hosting, not complex. When you leave S3 for a more traditional web server route is when your app gets the tiniest bit complex and need some server side logic. If you could build the server side functionality into Lambda functions, keep your website on S3, your site is using server side functionality, incredibly scalable and inexpensive to run.

### Hosting costs (almost) go away
The cost is probably worth noting also. If you wanted a few of the smallest servers AWS had to offer and a load balancer, you’re looking at ~$50 a month to build a small cluster. For that same cost you can serve ~500,000 web pages from S3 and the Lambda charges would be free at that scale. There are cheaper ways to do it, but that’s pretty darn cheap.

It would be difficult to build anything too complex with this architecture as it stands today. It's not built to be a full REST replacement. That being said, it could allow you to do some really interesting and innovative single function apps without a lot of overhead.

If you are so inclined you can [checkout the code on github](https://github.com/chadbaudoin/lambda-twilio). I'll also be writing a walkthrough of this code in a later post.