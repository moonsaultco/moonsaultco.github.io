---
layout:     post
title:      "Backing a static webpage with AWS Lambda"
subtitle:   "working code, in action"
date:       2015-06-23 12:00:00
author:     "Chad Baudoin"
headImage: '![lol, lots of lambs](/img/blog/2015-06-23/many-lambs.jpg "lambs & lambda, you get it")'
---

I wanted to illustrate how to use AWS Lambda on a single page “app” with no backend server. To illustrate this point I came up with a contrived example that would [send instagram photos to a phone number](http://twilio-instagram-lambda.s3-website-us-east-1.amazonaws.com/).

[Demo](http://twilio-instagram-lambda.s3-website-us-east-1.amazonaws.com/)  
[Code](https://github.com/chadbaudoin/lambda-twilio/blob/master/index.html)

###the idea
* Single page with form
* Enter a tag and a phone number
* Have lambda function that searched recent photos on instagram then sent them to that phone number
* Laugh uncontrollably!!!

I know. It's dumb.

### What we'll need.
* AWS Lambda function
* Front end hosted on S3
* Amazon Cognito so we're not throwing our keys into the world
* Twilio account (that might get deactivated)

The biggest hurdle I had was making sure that all of the moving parts could talk to one another through IAM. The rest of it is just write a function and click some buttons. This solution is theoretically scaleable up whatever aws can handle because the page is hosted on S3 and the Lambda function scales as needed.

## Cognito

I didn't know anything about Cognito before I started this demo. Cognito is AWS attempt at making user login easy.  It's built for game developers to save user data attached to social accounts.  But has other purposes also.

Since we're writing a single page app we could be potentially exposing some aws keys (access key & secret access key) that we don’t want to. That’s where cognito comes in. Cognito allows us to create credentials per-user and it will anonymize the users so they don’t need to login. Let's do that in the AWS console…

* Click on Cognito from the dashboard
* Click “Create new identity pool”
* Write in your app name
* Enable access to unauthenticated identities
* FÍN with Cognito, for now

Now, you have created the mechanism that will allow us to hide our credentials in user details. We’ll cover this later, but I just wanted to get it out of the way.

## Lambda Part

This is the meat of the application and it’s really simple.  We’re going to create a lambda function that we can then invoke in our single page app that will be hosted on S3.

* Click Lambda from the dashboard
* Click “Create a Lambda function”
* Choose “Basic Execution Role” and we’ll change this in a little bit
* Name it and add a description and click “Create Lambda function”
* Play around with the function a little, it’s fun.
* Eventually you'll write something more complex and you'll want to either upload your function and supporting libs through the API or via zip file.

## IAM Part (Tying it together)

AWS IAM (Security & Access Management) has always perplexed me and it always seems to be the part people skim over in these types of tutorials. I’m going to try to dig into it a little.  Two things need to happen, we need to allow the unauthenticated Cognito user (the single page app) the ability to execute our piece of lambda code.

* Go To IAM
* Click Policies
* Click Create Policy and then “Create Your Own Policy”
* Name the policy something meaningful and paste this in…

{% highlight json %}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1433365260000",
            "Effect": "Allow",
            "Action": [
                "lambda:InvokeFunction"
            ],
            "Resource": [
                "<!! FILL THIS IN WITH YOUR RESOURCE ID>"
            ]
        }
    ]
}
{% endhighlight %}

Before you save this make sure you fill in the Resource id, which can be found by going to your Lambda function list and click on your function.  It will say ARN and look like this…arn:aws:lambda:us-east-1:330367632134:function:my-function-name

Save it. That’s the policy saying that whoever has this policy, can execute our new function.

* In IAM click on Roles and then on `Cognito_<what you named your Cognito app>Unauth_Role`
* Click Attach Policy and add the policy you just created
* Now, that allows an unauthorized Cognito user to execute your function. Eff yeah.

When you created your Lambda function you also created a Role. So, we’re going to edit that Role so our function knowns what it can execute.

* Click on Roles
* Click on the Role that was created (it tells you in your Lambda config page). Mine was lambda_basic_execution.
* Click Edit Policy on your inline policy and paste the below. It’s telling us that our function can be invoked directly.  Other ways it can be invoked are through events (S3 uploads, SQS Messages, etc.)

{% highlight json %}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:*"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "lambda:invokefunction"
            ],
            "Resource": "arn:aws:lambda:*:*:*"
        }
    ]
}
{% endhighlight %}

We’ve created the user that will execute the code (via Cognito) and we’ve created the code to be executed (via Lambda). Now we need to be able to let them execute. All this is done via IAM.

## The Client

The client is pretty dumb. You download the [AWS SDK for Javascript](http://aws.amazon.com/sdk-for-browser/). Include that and the [cognito authentication module](https://github.com/aws/amazon-cognito-js).

I won't paste the client code in here you can [find it at my github page](https://github.com/chadbaudoin/lambda-twilio/blob/master/index.html). The breakdown of it is that you replace the keys for Cognito authentication then invoke the lambda function.

This is pretty thrown together and if you have any questions or I can clarify any parts, don't hesistate to email me at [chad@moonault.co](mailto:chad@moonault.co).

51 lines of “server” code  
42 lines of client code  
We're sending texts out to the world
