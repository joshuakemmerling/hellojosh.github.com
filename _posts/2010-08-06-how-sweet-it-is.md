---
title: "How Sweet It Is"
posted-on: springbox.com
---

We recently launched the Sweet Leaf Sweet Spot contest — and a few interesting technologies went with it. We wanted users to enter the contest through Twitter or a form on the website, and vote for their favorite entries using either tweets or likes to determine the prize winner.

We used the Twitter API to both find new entries and count votes. [OAuth](http://oauth.net/) allowed us to securely communicate with Twitter and tweet to users to let them know their entry was received. Pretty quickly, we ran into a small problem: hitting the limit that Twitter has for calls to the API. To solve this we white-listed our application with Twitter so we could make as many calls per hour as we needed.

Twitter [@Anywhere](http://dev.twitter.com/anywhere) was used to allow users to tweet a vote directly from the contest website. The @Anywhere feature allowed us to work smoothly with both the Twitter API and OAuth to increase voting functionality and usability.

Finally, we used Facebook Like functionality so users could vote by liking an entry in Facebook. The [Open Graph API](http://developers.facebook.com/docs/opengraph/) allowed us to retrieve the number of likes each respective entry received and count them as part of that entry’s overall score.

All in all, a little extra effort for us adds up to many easy ways for users to participate.