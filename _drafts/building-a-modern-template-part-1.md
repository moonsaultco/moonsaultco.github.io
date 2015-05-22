---
layout:     post
title:      "Building a modern web template"
subtitle:   ""
date:       2015-02-16 12:00:00
author:     "Chad Baudoin"
header-img: "img/headerphotos/2014-12-29.jpg"
---

The core of the app. Serving up static pages with nodejs.  Easily expand routes.

I'd like the core of this application to be able to be an extenable node app usign express under the hood.

http://expressjs.com/

First is to kick off the whole project…

{% highlight bash %}
npm init
{% endhighlight %}
		
That gives me a basic package.json file to work from.  Next install a basic express server

{% highlight bash %}
# install supervisor to reload node server on changes
npm install -g supervisor
# install express
npm install express --save
# entry point for the application
touch app.js
mkdir routes views bin

# create the most basic routes we have
touch routes/baseRoutes.js

{% endhighlight %}

Article son application structure
http://stackoverflow.com/questions/18789864/node-js-express-global-modules-best-practices-for-application-structure

http://www.terlici.com/2014/08/25/best-practices-express-structure.html


One now that we have a route.  The first big decision to be made is what templating language to use. Jade

Make a 500 page
Make a 404 page


----
All of my routes will follow a certain pattern:

{% highlight javascript %}
module.export = function(app, opts){
	opts = opts || {};
}
{% endhighlight %}

“app” is the express application
“opts” is the remainder of the optional parametere

I want this application to be as current as possible so I'll be using ES6 features. Notice I'm using an ES6 default paramater.  To make that work I'll need to do something.  I can either use io.js or bable.js or node.js harmony flags.

BableJS
Seems like a nice way to keep consistent between front and back end. I'll have to use bable for all of the front-end code.  It has it's own CLI alternative to just run {% highlight bash %}bablejs app.js{% endhighlight %}. I don't like the idea of using a third party app in such a critical piece fo the stack.

IOJS
This seems like a legit condendor. They are embracing ES6 in a way that nodejs hasn't. It's a little strange to big the upstart technology, but they claim to be the fastest moving (community-wise) javascript server languange.  They have a set of ES6 feature already built into the language without having to turn on certain flags

NodeJS
These guys have been around for a while.  They are stable, but slow.  You have to flip harmony mode to turn on certain ES6 flags. This coupled with Bable may be the way to go.

Neither IOJS or NodeJS are supporting default parameters yet, so, I guess the thing I'll have to do is transpile using bable to a “build/” directory.  I don't LOVE this, but it will get the project using ES6 features.  The grunt task will be to watch the nodejs source and transpile it into a build directory.  There will be another grunt task that will watch teh build directory and refresh when somethign new goes in there.  That seems like a lot of work.  I think I'll just use the most modern runtime and work within those bounds.  It seems like over kill to try and add bablejs in this portion of the stack.  Good news. I'm using IOJS as the runtime.

# ES6 features I can use
https://iojs.org/en/es6.html
https://kangax.github.io/compat-table/es6/


Next is getting my feedback loop nice and tight.  When I want to make a change to the server I want that change to be reflected immediately.  Since I'm using iojs the tooling is somewhat limited at the time of writing.  The options are pm2, nodemon. PM2 looks like a good mult-core launcher, but nodemon looks like it's geared specifically for our problem set.

{% highlight bash %}
npm install -g nodemon
touch nodemon.json
{% endhighlight %}

fill in the nodemon.json file tell it to use iojs
{% highlight json %}
{
  "execMap": {
    "js": "iojs"
  }
}
{% endhighlight %}

Install my middleware
{% highlight javascript %}
npm install --save method-override body-parser
{% endhighlight %}

After those are added and we stub them into the app and add a route to the baseRoutes.js file, we have a functioning app.
{% highlight javascript %}
app.get('/', function( req, res, next ){
	res.send(200, 'OK!');
});
{% endhighlight %}


The final step to get a pretty well functioning application is picking a template engine.  The goal of this template is to use more modern technologies and on of the most unicorn ideas is isomorphic Javascript.  So I'm going to rely on React as much as possible to use client and server side rendering. I knew I wanted full html, not Jade or HAML, those are great, but I want total control.  I want somethign jinja-like, the two options are swig and nunjucks.  Both have 1723 “stars” on github.  I'll use swig, I've used it extensively and I know it works without much todo in an express app.

The base template will be somethign rarely used, except to render the shell of the page where React compoenets will be rendered into.  I tried https://github.com/reactjs/express-react-views to make the views isomorphic using them on both server and client side.  it doesn't look like that is a viable solution right now, which is a real bummer.

I stumbled upon this from scotch.io and it's a really clear template how to get templates working on teh server and client.
# this is a really good doc on how to get isomorphic js working
https://scotch.io/tutorials/build-a-real-time-twitter-stream-with-node-and-react-js


The swig template is a really simple template that consumes markup and the page state.  That's it.
{% highlight html %}
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<section id="react-app">
		\{\% autoescape false \%\}{{ markup }}\{\% endautoescape \%\}
	</div>
	<script id="initial-state" type="application/json">
		var cb = cb || {};
		cb.data = \{\{state|json_encode\}\}
	</script>
</body>
</html>
{% endhighlight %}

add a couple of nice things, 404 and 500 pages. Now we have a very basic backend using React.