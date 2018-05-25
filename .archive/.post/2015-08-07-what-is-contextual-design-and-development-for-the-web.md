---
title: "What is Contextual Design and Development for the Web?"
posted-on: projekt202.com
external-url: https://projekt202.com/blog/2015/what-is-contextual-design-and-development-for-the-web/
---

What is contextual design and development for the web and why should I care? I hope to answer those questions here.

I recently attended Future Insights Live 2015 and was able to see a lot of amazing talks. A talk on this topic was given by Matthew Carver. And during this talk, gears started turning in my head. I automatically had questions and thoughts related to development, design, and research. Contextual design and development isn’t anything new but I don’t think it gets used that often on the web.

## Examples

Let’s start with a basic example of what I am referring to here and then we can talk options and implementation. For this example you are a restaurant, and on the homepage of your website you want to show the users specials that are happening at the moment and you want them to be relative to the time of day. The time of day can be our context. If it is before 1pm, you can show the visitor information about your brunch menu. If it is between 1pm and 5pm, the visitor will see information on happy hour and if it is after 5pm, you can show the visitor drink specials. All of the information on the homepage would be relative to the time of day the potential customer visits the site. I know this was a simple example, but it gives you an idea of what I am talking about.

## Contexts

There are four main contexts that we would use on the web: user, environment, task, and technology. These are self-explanatory but let’s go through them anyway. The user context could be the currently logged in user or the user you are currently searching. The environment context could be a desktop browser or a mobile app. The task context could be as simple as a sign-up form or clicking on a category link. And the technology context could refer to native app or web app.

So let’s talk about some of the ways that we could use context to present information to users. One of the simplest and most used ways to use context in the web is whether a user is logged in or logged out. Github automatically changes the homepage view if a user is logged in to present their repos to them. A little more advanced example could be that you track a user’s clicks and find that this particular user clicks the men’s link in the menu a lot. You could start presenting information related to men’s products on the homepage when revisit your online store. A more advanced example is that you could detect how much light is around the user and if it is dark out, then present information in a dark theme so it doesn’t seem so bright, and vice versa if it is bright out. Mobile phones already do this in their OS but [we can detect light on the web](https://developer.mozilla.org/en-US/docs/Web/API/DeviceLightEvent/Using_light_events) as well.

## Sensors

We refer to the different ways to detect information or events as sensors. And there are almost an infinite amount of sensors that can be used. If you think about the different actions or tasks just in a desktop browser, there are even more in a mobile browser. We have access to things like the accelerometer, geolocation, size of screen or browser (media queries), and even [information about a device’s battery](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/battery).

## Research

So when and how do you use these? That is where research and design come into play. We need to start by thinking about what type of site or app you are building and how your users are using the solution. We have to figure out your overall goals and the problems you are trying to solve. All of these requirements get worked out and a solution is created.

How do these different sensors get tracked and triggered? This depends on the environment, the technology, the overall needs, and the proposed solution. And if you dig around different technology related blogs and sites, you can run into things that you didn’t think existed. Combing through the [Web API Interfaces](https://developer.mozilla.org/en-US/docs/Web/API) on Mozilla’s site, it’s easy to find things that you didn’t realize you could do on the web. Maybe it is something that you will never use and maybe it is a solution to a problem you have been trying to solve for a while. Dig around and see what you can find.

## Future

How do we use this for human context? Can we suggest the best restaurants to visit based on outside temperature? Can we remind users to drink water by knowing how far and fast they have run? It is amazing to think what we could do using context on the web. But this is just the beginning. There will be more articles to come related to this vast topic.