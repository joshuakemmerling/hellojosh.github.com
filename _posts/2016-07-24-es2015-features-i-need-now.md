---
title: "ES2015 Features I Need Now"
posted-on: projekt202.com
external-url: https://projekt202.com/blog/2016/es2015-features-i-need-now/
---

![ES2015](/img/es2015.png)

ES2015, also known as [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) 2015, was released in June 2015 with a bunch of new features that developers have been waiting a long time to get their hands on, but just because the new spec was released doesn’t mean we can start using these features now. The new spec will need to be added to all JavaScript engines before we can start using these amazing additions. Now, to be fair, we _could_ start using these features now, but we will need to use a JavaScript compiler like [Babel](https://babeljs.io/) to help us out, but I want to use the features without help from another framework. I’m not going to go through all of the new features. I am just going to showcase a few features and how they could help us improve what we do now.

## Arrows

Arrows are a way of writing functions in shorthand using `=>` syntax. There are a number of ways to use arrows. Here is how I like to use them to make my code lighter and more readable:

```javascript
var evensPlusOne = [ 2, 4, 6, 8, 10 ].map((v, i) => v + i);

console.log(evensPlusOne); // outputs: [ 2, 5, 8, 11, 14 ]
```

Before ES2015:

```javascript
var evensPlusOne = [ 2, 4, 6, 8, 10 ].map(function (v, i) {
	return v + i;
});

console.log(evensPlusOne); // outputs: [ 2, 5, 8, 11, 14 ]
```

This is awesome! These are the type of updates I have been waiting on.

## String Functions

These new string prototype functions are made as a convenience because of the string searches we developers always use. Most of these new string functions aren't less code, but makes your code more readable and gives better context into what is going on.

### String.includes

A new way to see if a string includes another string. With ES2015:

```javascript
var exist = 'Welcome to projekt202!'.includes('projekt202');

console.log(exist); // outputs: true
```

Before ES2015:

```javascript
var exist = 'Welcome to projekt202!'.indexOf('projekt202') > -1;

console.log(exist); // outputs: true
```

### String.startsWith

A better way to determine if a string starts with another string. With ES2015:

```javascript
var atTheFront = 'Welcome to projekt202!'.startsWith('Welcome');

console.log(atTheFront); // outputs: true
```

Before ES2015:

```javascript
var atTheFront = 'Welcome to projekt202!'.indexOf('Welcome') == 0;

console.log(atTheFront); // outputs: true
```

### String.endsWith

A very nice way to determine if a string ends with another string. With ES2015:

```javascript
var atTheEnd = 'Welcome to projekt202!'.endsWith('projekt202!');

console.log(atTheEnd); // outputs: true
```

Before ES2015:

```javascript
var atTheEnd = 'Welcome to projekt202!'.split('').reverse().join('').indexOf('projekt202!'.split('').reverse().join('')) == 0;

console.log(atTheEnd); // outputs: true
```

## Destructuring

Destructuring is a way of setting values to variables. Destructuring is fun to use because it keeps the amount of code you write down. Like, way down. Here is a basic example of how to use destructuring:

```javascript
var [ a, c, b ] = [ 1, 2, 3 ];

console.log('a', a); // outputs: 1
console.log('b', b); // outputs: 2
console.log('c', c); // outputs: 3
```

As you can see, destructuring will take the values on the right-hand side and set them to the respective values on the left-hand side. Then, JavaScript makes the new variables global. Without ES2015, the above would look like:

```javascript
var values = [ 1, 2, 3 ];
var a = values[0];
var b = values[1];
var c = values[2];

console.log(a); // outputs: 1
console.log(b); // outputs: 2
console.log(c); // outputs: 3
```

Not a huge difference, but definitely more convenient. Let's look at a more advanced example using Regex:

```javascript
var [ date, month, day, year ] = /(\d\d)-(\d\d)-(\d\d)/gi.exec('11-29-83');

console.log(date); // outputs: 11-29-83
console.log(month); // outputs: 11
console.log(day); // outputs: 29
console.log(year); // outputs: 83
```

Before ES2015:

```javascript
var dateParts = /(\d\d)-(\d\d)-(\d\d)/gi.exec('11-29-83');
var date = dateParts[0];
var month = dateParts[1];
var day = dateParts[2];
var year = dateParts[3];

console.log(date); // outputs: 11-29-83
console.log(month); // outputs: 11
console.log(day); // outputs: 29
console.log(year); // outputs: 83
```

I think features like these are great. It's going to become easier for developers to write cleaner, more readable code, and the code will naturally be faster because we won't have to bring in huge frameworks just to use a couple of minor features.

## Browser Support

These new features are just a small example of the awesome features in ES2015\. Most of these functions are only supported in Chrome and Firefox, and, because of the new design with features like Arrows and Destructuring, we cannot even use a polyfill framework. We have to use a JavaScript precompiler, but the String.functions can be used right now with a polyfill framework. However, we still need to wait for browsers like IE and Safari to catch up. Look for more articles in the future talking about ES2015.


