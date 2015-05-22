---
layout:     post
title:      "Testing with Cucumber and PhantomJS"
subtitle:   "Getting started running integration tests with Cucumber and Phantomjs"
date:       2015-05-22 12:00:00
author:     "Chad Baudoin"
---

If you do automated testing “right” it’s a game to make the test go from green to red in as few steps as possible.  If you do automated testing “wrong”, then you aren’t doing it at all.  If you are doing automated testing like me, your doing a little TDD, a little testing after the fact and letting a few things slide.

We have a good amount of unit tests testing but what I consider the truth in our testing rig is are our cucumber tests. Cucumber tests are there to simulate user interaction and really test-drive the app from soup to nuts.

***The following assumes you have***

* ruby 2.1+
* bundler

### Our testing stack:

* [Cucumber](http://cukes.info/)
* [Capybara](https://github.com/jnicklas/capybara)
* [Poltergeist](https://github.com/teampoltergeist/poltergeist)
* [Phantomjs](http://phantomjs.org/)

*Working example can be found at [https://github.com/chadbaudoin/cuke-capy-polter-phantom](https://github.com/chadbaudoin/cuke-capy-polter-phantom)*

### Three basic components to this

* env.rb = setup and config stuff
* steps.rb = the code behind our cucumber tests
* homepage*.feature = the human-readable tests that tell what the tests are doing

First, let’s start from a Gemfile to define our dependencies.  Nothing too tricky here, just capybara, cucumber, poltergeist and phantomjs to start with. Copy the [Gemfile](https://github.com/chadbaudoin/cuke-capy-polter-phantom/blob/master/Gemfile) in your directory and simply run `bundle install`.  Now run `bundle exec cucumber` and you should get…

	No such file or directory - features. Please create a features directory to get started. (Errno::ENOENT)`. Now we’re headed somewhere

So, like the error said, let’s create a features directory.  The features directory will grow with your application.  It should house a bunch a *.feature files which are your tests written in plain english in the Given/When/Then format.
Now, when you run that same command `bundle exec cucumber` you will see…

{% highlight bash %}
0 scenarios
0 steps
0m0.000s
{% endhighlight %}

Which tells us that nothing was found, but it conformed to the correct pattern.  Progress!

Now. Let’s create our first test.  Let’s assume our webapp is reddit and we want to make sure that the “jobs” link is working and that it has at least 1 post up every time we load it.  With that being said our test would look something like this…

{% highlight gherkin %}
Given I go to "http://www.reddit.com/"
When I click "jobs"
Then the page should contain "Want to work at reddit? Of course you do! This subreddit lists all the current positions available at the company."
And have at least 1 posts
{% endhighlight %}

Let’s add that to a feature file and run it.  In the “features” directory create a file called jobs.feature

Now let’s run our command again `bundle exec cucumber`…
You should be seeing a lot of yellow telling you that steps aren’t implemented.  This is progress, it means cucumber is digesting our file and trying to find code to run those steps.

![Unimplementd Step Defs](/img/blog/2015-05-22/unimplemented-step-defs.png)

So, we have cucumber running our feature, now we need the code to back our feature.  There are lots of ways to organize the code, but the simplest way for this tutorial is one big file called steps.rb.  In the features directory create another directory called support “mkdir -p features/support” and create a file steps.rb `touch features/support/steps.rb`

Above cucumber spit out a bunch of code to help us get started, copy it and paste it into our steps.rb file.  Let’s run our trusty command `bundle exec cucumber` and now we see that our of our steps is pending and the rest have been skipped.  This means we have the plain Given/When/Then tests being backed by code that is getting executed.

![Unimplementd Step Defs](/img/blog/2015-05-22/pending-steps.png)

Now, let’s implement those “pending” tests.  The code inside of those tests will be capybara syntax, which will in turn run our phantomjs headless browser.  First we need to tell cucumber that we are using capybara. We do this via that features/support/env.rb file `touch features/support/env.rb`. The env.rb file is a reserved file for setup of your cucumber test suit.  Here is an example of our env.rb file.

The env.rb file here is telling us that
We are using the poltergiest driver and that if we have a failing scenario take a screenshot

Finally we fill out the scenarios with capybara syntax

![Unimplementd Step Defs](/img/blog/2015-05-22/filled-out-steps.png)

Run our command `bundle exec cucumber` and we have passing tests

![Unimplementd Step Defs](/img/blog/2015-05-22/cuke-success.png)

BAM!  We have an automated test that can be run a MILLION times to make sure our app is always working.

This is the most basic of examples, mostly to get a rig up and running.  Good testing.
