---
layout:     post
title:      "Using AWS Rekognition to Search Instagram Posts by Photo"
date:       2018-02-05 12:00:00
author:     "Chad Baudoin"
headImage: '![using faces to search your Instagram posts](/img/blog/2018-02-05/faces.jpg "face search")'
---

**Goal**: To search my Instagram feed by my (beautiful) face.

**Technology used**: *[AWS Rekognition](https://aws.amazon.com/rekognition/), [AWS SNS](https://aws.amazon.com/sns/), [AWS Lambda](https://aws.amazon.com/lambda/), [Serverless](https://serverless.com/), [Express](https://expressjs.com/), [Heroku](https://heroku.com)*

**Questions**: If you have any, [chad@moonsault.co](mailto:chad@moonsault.co)

You can search your Instagram account by your (beautiful) face at [faces.moonsault.co](https://faces.moonsault.co). Check out the [code on github](https://github.com/moonsaultco/instagram-face-search)

----

The problem is pretty straight forward, connect our app with an Instagram account via oAuth, crawl through the Instagram feed and index faces. After that, we search the app using `getUserMedia` in the browser or upload an photo.

This app is broken into two major pieces. First is the [indexing](#indexing) of faces which is done the first time a user has authenticated with Instagram. The second is the [searching](#recall) for those faces and displaying the results.

## Good to know
When indexing faces AWS Rekognition you must first create a collection. A collection is just a logical bucket to store faces. In our case, each Instagram user who logs in get a new collection created for them.

AWS Rekognition doesn't store the media you are indexing, that's up to you. When you index a piece of media you can pass Rekognition an `ExternalID`, which is a reference on how to find your media. In our case, the `ExternalID` will refer to the Instagram media id, so we can recall it from Instagram.

One misconception I had going into this exercise is that I could say `Me = This Face` and I could just search for `Me`. That's not how Rekognition works. If you want that functionality you have to roll it yourself for right now. How it actually works is each face is indexed on each photo and assigned a `FaceID`. That `FaceID` can be searched against your collection with a certain percentage of certainty.

## <a name="indexing"></a>Indexing Faces

The code to simply index a face is as follows…

```javascript
// instantiate a new AWS.Rekognition from the node module aws-sdk 
var rekognition = new AWS.Rekognition({
  apiVersion: '2016-06-27'
});

// create collection this has to be done before the first photo you index. This should be asynchronous
var collectionParams = {
  CollectionId: 'some unique id'
};
rekognition.createCollection(collectionParams, done);


// index face below
var indexParams = {
  CollectionId: user.id,
  DetectionAttributes: [],
  ExternalImageId: mediaObj.id, // reference to Instagram Id
  Image: {
    Bytes: imageBuffer // media as Base64 encoded buffer
  }
};

rekognition.indexFaces(indexParams, function(err, data){
  if(err) return done(err);
  console.log(data);
  done();
});

```

Indexing faces using Rekognition is a pretty straight forward call.

You pass it either a reference to an S3 Object where you’ve uploaded the image or the base64 encoded image as well as an `ExternalID`. For our demo, the `ExternalID` is the id of the Instagram post. Indexing a few hundred or few thousand photos, quickly is a different animal.

To index the entirety of an Instagram account quickly involves using AWS Lambda and SNS Queues to crawl the entire account and then index each photo in each post. From my tests it take between 1-2 seconds to index 100 photos.

### The basic indexing process

1. First we authenticate with the Instagram API.
1. If this is the first time we’ve logged on we kick off a message to an SNS backed by a lambda function deployed with serverless.
1. That lambda function iterates over your entire history and puts a message on an SNS queue for each individual post you’ve made.
1. The second lambda receives a message about a post and indexes each photo in that post (note, there can be multiple if it’s a carousel post).

You can see in the diagram below leveraging Lambda allows us to index as many photos simultaneously as we need to. That gets our user exploring photos faster.

![diagram to index instagram feed quickly](/img/blog/2018-02-05/diagram-of-indexing-setup.png "an architecture diagram")

After that piece is done, it's on to recall and facial search.

## <a name="recall"></a> Searching By Face

In Rekognition there are two ways  to search for a face. You can search by a `FaceID` or by photo. A `FaceID`  is assigned to a face on each individual photo.

### Browsing

The way I implemented browsing faces is by searching for a max of 1000 faces in a user's collection and calling `rekognition.listFaces(params, callback)`. Then from there choosing a random 50 faces to display the user.

Any face is clickable,  because each indexed face gets a `FaceId`. You can take a `FaceId` and feed it to `rekognition.searchFaces(params, callbac)` to find similar faces.

### Photo Search

The photo search uses the `getUserMedia` feature in browsers (also in iOS 11, who knew) to take a photo with the front-facing camera. Then we turn around and base64 encode that image and send it to the server. The server takes the base64 encoded image and does a `rekognition.searchFacesByImage(params, callback)` call which finds similar faces. There is also a photo upload path that works the exact same way.


## Conclusion

I can see a lot of useful ways to use Rekognition. One that I will probably work on soon is being able to organize photos by users (e.g. find all photos of Mom). It would take a little more lifting, but not a ton. 

If you have any questions about the code, or just want to talk about ping-pong. Hit me up…

* [chad@moonsault.co](mailto:chad@moonsault.co)
* [LinkedIn](https://www.linkedin.com/in/chadbaudoin/)