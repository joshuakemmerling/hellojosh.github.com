---
title: "Welcome to Web Components with Polymer"
posted-on: projekt202.com
external-url: https://projekt202.com/blog/2015/welcome-to-web-components-with-polymer/
---

The web tends to evolve in different ways over time. Right now it seems like most of the new developments in web technologies have to do with new frameworks or new versions of frameworks released almost weekly. This isn’t a problem until these frameworks overshadow upcoming technologies that deserve some recognition. Technologies that will end up changing the way we develop for the web. Let’s say hello to Web Components.

Web Components are a collection of a few technologies. Custom elements, HTML imports, templates, and shadow DOM. The specifications for these technologies are being created by Google and the W3C. That is why we are looking at Polymer. Polymer is created and managed by Google. It is a framework built on top of Web Components and designed to leverage these evolving technologies in modern browsers. Because Web Components are being spec’d to be natively supported by browsers, Polymer mostly consist of polyfills for Web Components.

## Custom Elements

Custom elements are simple and just as it sounds. Now you can create your own custom HTML elements, like `<projekt-202>`, with this new technology. Custom elements need to be registered using Polymer so that they act like natively supported HTML elements. This is really easy and only requires one line of code. The catch is that the custom name has to contain a dash in the name.

## HTML Imports

HTML imports are also very simple and gives you the ability to import HTML without needing to write specific JavaScript to call and process the HTML. It uses the `link` HTML tag with a `rel` attribute value of `import`. The best part is that you do not have to register anything using Polymer or run any special functions. It just works! Even the execution order is the exact same as native HTML. Things load in the order they are on the page.

## Templates

Templates can get a little complicated or can be really simple if you don’t need your templates to do much. Templates contain the same tags as any other HTML page. But Polymer adds powerful functionality to templates that make you HTML dynamic and makes it feel more like Angular or Knockout.js. A few useful things Polymer has added that developers will find helpful are data binding, event binding, repeaters and even an observe function. Templates can even contain other templates.

To use templates in Polymer, you have to create a `<template>` HTML tag with an id attribute, add your HTML inside, and a couple line of JavaScript and Polymer does the rest. Details of these features and more information on templates can be found on the [Polymer website](https://www.polymer-project.org/1.0/docs/devguide/templates.html).

## Shadow DOM

The Shadow DOM is a really amazing part of web components and Polymer. The Shadow DOM is essentially a DOM inside of a DOM. This is very powerful because when you add a `<style>` inside of a DOM, the styles only affect the elements inside of that DOM. The styles do not affect elements in any other DOM. Same things goes for JavaScript. Using Shadow DOM in Polymer is just as easy as creating a template. To use Shadow DOM, wrap your template code with a `<dom-module>` HTML tag and that’s it. Now any styles you add in the template tag will only affect that template.

## How does Polymer fit into the web right now?

As of right now, most UI software is built using some sort of UI framework like [React](https://facebook.github.io/react/) or [Angular](https://angularjs.org/). These UI frameworks come in all shapes and sizes and usually take on some form of MVC and provide functional programming to UI developers. Polymer would be the “V”, or View, of MVC. This means that there might be some missing functionality, like URL routing capabilities, you might be looking for in a framework for your next project.

Polymer and web components are amazing technologies that are evolving the web in a really great direction. When the technologies are supported by all browsers, UI developers will now need to bring in frameworks like Polymer to have access to these advanced features. The features will be built-in to the browser.

## Other web component frameworks

Polymer is a great framework that is bringing web components to all browsers. But it is not the only frameworks that is implementing web components. Other frameworks are, but not limited to:

[X-Tag](http://x-tags.org/): Small library created and supported by Mozilla.

[Bosonic](http://bosonic.github.io/): Another framework that brings web components to browsers. Even to IE9.

[Web Components](http://webcomponents.org/): The WebComponents.org keeps updated information related to web conponents, frameworks, and even has useful polyfills for all parts of web components.