---
layout:     post
title:      "Feedback Loops"
subtitle:   ""
date:       2015-01-13 12:00:00
author:     "Chad Baudoin"
header-img: "img/headerphotos/2014-12-29.jpg"
---

Our integration tests took WAY too long to run.  They ran in 15-20 minutes and in that time I would go browse reddit and then find it hard to get back on task after they were done.  We needed to shorten the time it took to run them.

Our initial approach to shorten our tests was a reasonable approach of making the tests themselves run faster.  Over a few months, we optimized them as much as we could and that shaved about ~10% off of the test time.

One day I stumbled across parallel_test (https://github.com/grosser/parallel_tests) and thought I would give it a rip.  It took a few days of configuration to get our test suite working with it, but the payoffs have been great.  Running our tests in parallel have taken about ~80% of the time off of the tests.  Now, I wasn’t browsing reddit and was more productive.

Below are a few things I learned when creating a test suite that could run in parallel…

1. Running tests in parallel will probably not run correctly the first time. For your own sanity, re-run any failed tests.

1. Don’t manipulate data, copy it and test the copy.  Immutable data.

1. You end up quasi load-testing your app in the process.  When we ran 8 concurrent users running a quickly as they could, we found performance issues and we were able to fix them



------

If you can test your app or site with one dataset, going parallel is pretty straightforward.  If you are like the rest of us, you have a heavily data-dependent app.

If you have a stateless app, this is an easier win than if you have an app that holds state, with accounts and users.  When we moved to testing in parallel we were in the latter situation, an app that relied on varying datasets and re-used one test user over and over.

If you have an app that needs to 

Immutability in your test data.  Create a test account and make many copies from it.
for example. everytime I log in with chadbaud@gmail.com it creates an alias chadbaud+abc123@gmail.com that is a complete copy of the chadbaud@gmail.com account.  If your first action is to copy the account then any following tests are autonomous from the account you copied from.  Then you can achieve parallelism.

We were coming from a situation where the tests ran like this…

Flash database to good data
Run Test
Assert Result
Flash database to good data
Run Test
Assert Result

That’s all good in well in a linear environment, but in parallel that same scenario will go off the rails by running like this…

Flash database to good data
Run Te…Flash databas…Run Te…Assert Result
Assert Result
All Tests fail because supporting data is always changing out from underneath them

Cucumber parallel test

Copy data structure.

We have let’s say we have an account with many users…


