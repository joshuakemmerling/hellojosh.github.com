---
title: "Where are the Mobile Emails?"
posted-on: springbox.com
---

Usage of mobile devices has increased dramatically over the years. Smartphones have become the accessory you never leave home without. Which is why it's no surprise web-based email is on the decline and mobile email is up by 36 percent in 2010, according to [comScore](http://www.comscore.com/Press_Events/Press_Releases/2011/1/Web-based_Email_Shows_Signs_of_Decline_in_the_U.S._While_Mobile_Email_Usage_on_the_Rise). With more and more sites formatted for mobile devices and smartphone adoption on the rise, where are the mobile emails?

I started looking into this to determine what it would take to create mobile emails. I quickly found that it isn't as easy as we would hope. The problem is that you do not know if the user is going to be on a mobile device when they view the email. So I started playing around with using [media queries](http://www.alistapart.com/articles/responsive-web-design/), the new technology that allows us to format web pages for mobile browsers without rebuilding the entire site.

During my research I found that it is a useable solution, but only on the iPhone. By default we know that email clients ignore any styles that are not inline style. But the iPhone does not. This means we can take a normal email and add some CSS magic to it to make it more readable and usable on an iPhone.

Here's an example of a Springbox email in Outlook:

*[missing image]*

Here's the email after adding some CSS directly targeting iPhones:

*[missing image]*

We can also use this technique to load empty images into the background to track if the user is opening the email on an iPhone or iPad. I think the more we use this technology, the sooner all mobile devices will come around and add support for it.