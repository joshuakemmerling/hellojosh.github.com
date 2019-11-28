---
layout: post
title: "Number Formatting in JavaScript"
subtitle: "An easier and better way to format numbers is JavaScript."
category: JavaScript
---

![](/images/javascript-1.jpg)

Back in the day, formatting numbers was a little bit of a pain. And you only really formatted the number to the U.S. format. But since the updates to the Internationalization API it is a whole lot easier. And localization is built-in so you get more functionality than you did in the past. Below are some simple examples to get big results.

### Current Locale

Here is a basic example of how to use the current set locale. If the current browser `navigator.language` is set to `en-US` the output will look like:

```javascript
const value = 7256384123.756;

console.log(value.toLocaleString());
// Outputs: 7,256,384,123.756
```

### Manually Set the Locale

You can manually set the locale by passing in a valid [BCP 47 language tag](https://tools.ietf.org/html/rfc5646) and letting the browser do the rest of the work.

```javascript
const value = 7256384123.756;

console.log(value.toLocaleString('en-US'));
// Outputs: 7,256,384,123.756

console.log(value.toLocaleString('de-DE'));
// Outputs: 7.256.384.123,756

console.log(value.toLocaleString('ar-EG'));
// Outputs: ٧٬٢٥٦٬٣٨٤٬١٢٣٫٧٥٦

console.log(value.toLocaleString('zh-Hans-CN-u-nu-hanidec'));
// Outputs: 七,二五六,三八四,一二三.七五六
```

### Round to Zero Decimal Places

Formatting numbers using the browser's built-in functionality also lets you round to a specific number of decimal places. When passing options to `toLocaleString`, you are required to set the locale manually. But we can do that easy enough.

```javascript
const value = 7256384123.756;
const options = {
  maximumFractionDigits: 0
};

console.log(value.toLocaleString(navigator.language, options));
// Outputs: 7,256,384,124
```

### Round to Two Decimal Places

With a couple of minor changes you can format your number to two decimal places.

```javascript
const value = 7256384123.756;
const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
};

console.log(value.toLocaleString(navigator.language, options));
// Outputs: 7,256,384,123.76
```

I hope this was helpful. Experiment with the code and see how you can make it work for your solution.

### More

- [Browser support and documentation.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
- [BCP 47 Language Tags](https://tools.ietf.org/html/bcp47)
