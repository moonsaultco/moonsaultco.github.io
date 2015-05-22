---
layout:     post
title:      "Leveraging Mongo to distribute socket.io"
subtitle:   "Using Mongo as a queue for load balanced Node/socket.io enviroment"
date:       2015-05-10 12:00:00
author:     "Chad Baudoin"

---

Clustering socket.io can be a bit of a mess. Each server (and in node's case each process on the server) has it's own pool of socket.io connections that are connected to clients.  Keeping two processes in sync to keep everything real-time can be a bit of a scaling headache.  This is a small prototype using mongo's capped collection as a event bus across many processes.  This seems like a reasonable solution because the bottleneck is Mongo which is known to scale well.

*Working example can be found at [https://github.com/chadbaudoin/mongo-as-load-ballenced-queue](https://github.com/chadbaudoin/mongo-as-load-ballenced-queue)*

### The stack

* Using [mongoose](https://github.com/learnboost/mongoose/) as mongo drive
* Using [express](https://github.com/strongloop/expressjs.com) for simple server
* Using [socket.io](https://github.com/Automattic/socket.io/) for the streaming library
* Using [pm2](https://github.com/Unitech/pm2) to create a simple load balanced enviorment

In mongoose create a schema for a collection that defines itself as capped.

#### mongoose schema
{% highlight javascript %}
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageQueue = new Schema({
	channel     : String,
  	message		: Schema.Types.Mixed
},
{
	capped:{
		size: 1024,
		max: 1000,
		autoIndexId: true
	}
});

module.exports = MessageQueue;
{% endhighlight %}


#### server code

Create a socket connection that writes to that queue and listens to that queue…

{% highlight javascript %}
// create a tailable query
var messageStream = MessageQueue.find().tailable(true).stream();

// console out any errors
messageStream.on('error', function (err) {
	console.error(err)
});

// listen to the mongo capped collection and
// emit everything to the chat namespace on
// socket.io
messageStream.on('data', function(doc){
	if( socket ) io.emit('chat', doc);
});

io.on('connection', function (sock) {
	socket = sock;
	socket.on('chat', function (data) {
		var msg = new MessageQueue({channel:'chat', message:data});
		msg.save()
	});
});
{% endhighlight %}

#### client code
{% highlight javascript %}
var socket = io('http://localhost');
$('.message-form').on('submit', function writeToSocket (e) {
	e.preventDefault();
	socket.emit('chat', { message: e.target.message.value });
	$('[name=message]').val('').focus();
});
socket.on('chat', function (data) {
	var box = $(".socket-write");
	box.val(box.val() + data.message.message + '\n');
	box.scrollTop(box[0].scrollHeight);
});
{% endhighlight %}
