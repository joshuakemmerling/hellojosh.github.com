---
title: "Application Authentication with JSON Web Tokens"
posted-on: projekt202.com
external-url: https://projekt202.com/blog/2016/application-authentication-with-json-web-tokens/
---

![](/images/application-authentication-with-json-web-tokens.png)

JSON web tokens are a great way to add simple security to your applications to satisfy most security needs. I previously wrote an article titled [*User Authentication with JSON Web Tokens*](https://projekt202.com/blog/2016/user-authentication-with-json-web-tokens) where I introduced JSON web tokens. If you aren't familiar with JSON web tokens, I would start by reading that article. It won't take that long. In that article, I describe how we at projekt202 use JSON web tokens to authenticate API requests after a user has logged in. Here, I want to talk about how we can use JSON web tokens to authenticate API requests of other applications that have previously received permissions. And, for anyone that is familiar with [OAuth 2.0](http://oauth.net/2/), this is sort of a simple version of OAuth.

## Our Application Setup

Our situation is going to be pretty simple. We have a central API server, api.example.com, that contains a database and a number of endpoints for serving data. We also have other web servers - stores.example.com and admin.example.com - that will need access to api.example.com to retrieve needed information. Here is a simple diagram of the setup:

![Application Diagram](/images/application-diagram.png)

## How Are We Going to Secure Them?

Instead of making an application login on behalf of someone, each server will have free access to all API endpoints to retrieve as much data as needed and we are going to utilize RSA certificates to achieve this. By using [RSA certificates](https://en.wikipedia.org/wiki/RSA_(cryptosystem), one server will create a JSON web token using the private RSA certificate and make an API request. The API server will verify the token using the public RSA certificate. Since we are using RSA certificates, this requires us to create a public and private certificate for stores.example.com and admin.example.com. We will then need to upload the respective private certificate to each server and upload all of the public certificates to api.example.com. This article will not show how to create the RSA certificates, but we found a couple of good practices to keep in mind when the RSA certificates are created.

1. Each application should have its own unique application ID.
2. The certificates should be part of a build process, so that any user isn't able to have access to any of the certificates.
3. You should use the application ID to name the generated certificates.
4. These certificates should not be accessible from a URL.

## Create a Token

Let's start with creating a JSON web token on *stores.example.com* and make a simple API request.

```javascript
var fs = require('fs');
var request = require('request');
var jwt = require('jsonwebtoken');
var appId = 'kjh2-vt23-s23t-poq2-xsw8-p09o-qw12';
var certificate = fs.readFileSync(appId + '_private.pem');
var token = jwt.sign({ appId: appId }, certificate, { algorithm: 'RS512', expiresIn: 300 });

request.get({ url: 'https://api.example.com/users', headers: { 'x-token': token } }, function (users) {
	console.log(users);
});
```

A few things to note in the above code:

* Use the RS512 encryption to easily increase the encryption level.
* Always set an expiration time so that the token cannot live forever.
* Pass the application ID in the JSON web token so it can be used to verify the request.

## Handle the Request

The server receiving the request, api.example.com, needs to verify the request before responding with any data. The API server will use the provided application ID to find the corresponding public key to use to verify the JSON web token.

```javascript
var fs = require('fs');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();

app.use(function (req, res, next) {
	try {
		var token = req.get('x-token');
		var appId = jwt.decode(token).appId;
		var certificate = fs.readFileSync(appId + '_public.pem');

		jwt.verify(req.get('x-token'), certificate, { algorithms: [ 'RS512' ] });
	} catch (e) {
		res.send(401);

		return false;
	}

	next();
});

app.get('/users', function (req, res) {
	res.send([]);
});

app.listen(3000, function () { console.log('Example app listening on port 3000!'); });
```

A few things to note in the above code:

* Public certificates can be seen by anyone. It's the private certificates you need to keep secure.
* Set a specific acceptable algorithm(s) in the verify options so that you don't allow hackers to pick the algorithm.

## Seriously Simple Security

That's all it takes to add a simple layer of security to authenticate applications. I encourage you to read more about JSON web tokens and find ways it will work for you. To learn more, [jwt.io](http://jwt.io) is a good place to start. Now, keep in mind that this isn't going to take care of all of your security needs, but it's a good starting place.

## Extra Security

* Always use SSL.
* Make sure you have a deployment process set up just to regenerate tokens.
* You can also use JSON web tokens to give certain applications access to certain endpoints.
* Make sure you look into rate limiting.
