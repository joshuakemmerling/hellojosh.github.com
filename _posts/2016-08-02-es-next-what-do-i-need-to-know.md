---
title: "ES Next: What Do I Need to Know?"
posted-on: projekt202.com
external-url: https://projekt202.com/blog/2016/es-next-what-do-i-need-to-know/
---

![The Future!](/img/back-to-the-future-hoverboard.gif)

## What is ES Next?

ES Next is a term used to refer to future versions of [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) that have not been released. Most of the features have been proposed but are not very close to being approved. Developers usually don’t try to learn any new features until they make it to Stage 3\. When a feature makes it to Stage 3, it will eventually be approved and put into a future version of ECMAScript. You can find out more about ECMAScript stages [here](https://github.com/tc39/ecma262). After features are accepted and officially added to a new version of ECMAScript, these features can begin to be added to JavaScript engines, which is when developers can get hold of them with an extra framework.

## Who is Using ES Next?

There are a lot of projects currently taking advantage of these new features. Some of these are projects that you are probably already using and didn’t realize it. Some of the projects are, but are not limited to, [Angular](https://angular.io/), [React](https://facebook.github.io/react/), [Ember](http://emberjs.com/) and [Node](https://nodejs.org/).

## How to Start Using ES Next

Because ES Next features have not been officially added to JavaScript engines, the only way to start utilizing these features are to use a transpiler to convert your ES Next code to a supported format that browsers accept. There are a bunch of transpilers out there, but I am only going to talk about a few different ones. All of these transpilers can easily be brought into your current workflow by using something like [Grunt](http://gruntjs.com/), [Gulp](http://gulpjs.com/) or [Webpack](https://webpack.github.io/) to have them generate your JavaScript.

### Babel

[Babel](https://babeljs.io/) is a great compiler to get started with. It supports ES2015, ES2016, and features that are in Stage 1, Stage 2 and Stage 3\. Babel even has an interactive shell that let’s you see what your ES Next code will compile to. Babel is my recommendation for people getting started with future features of JavaScript.

### Traceur

[Traceur](https://github.com/google/traceur-compiler) keeps good documentation on the Github repository, has a huge following, and was created and is maintained by a team at Google. You know who Google is, right?

### esnext

[esnext](https://esnext.github.io/esnext/) is easy to use when getting started and the website provides an editor to try out some test code, but it is mainly used as a compliment for Babel.

## Should We Be Using ES Next Now?

I know it won’t be the popular opinion, but I don’t think we should start using ES Next quite yet. The reasons are pretty simple. Using a transpiler adds another step to the development process without any true benefit. I say that there isn’t any true benefit because these transpilers convert your code to the most recently-supported version of JavaScript. Plus, not all transpilers support the same ES Next features, meaning if you want to switch transpilers, you will most likely have to rewrite some of your ES Next code.