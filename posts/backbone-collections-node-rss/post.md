title: 'Generating RSS feeds from a Backbone.js Collection in Node.js'
tags: ['backbone', 'node.js', 'javascript', 'rss']
posted: new Date('11/30/2011')

**The awesome Anja Skrba has generously translated this post into
Serbo-Croatian and made it available
[here](http://science.webhostinggeeks.com/rss-povratne-informacije) for
viewing.**

When designing and developing this site, I wasn't entirely sold on using
Backbone structures on the server-side. The benefits weren't immediately
clear.  Although after creating the blog using `Models`, `Collections` and 
`Events`, I'm very glad I chose Backbone.  Events are very helpful for
re-rendering the RSS feeds as you will see.

No magic is being written here, nor the solving of any new issues, just
elegant code organization and implementation.

__These are required dependencies:__

* **[Node.js 0.6.3](http://nodejs.org)** _(now bundles NPM, the package manager)_
* **[Backbone](http://backbonejs.org)** _(npm install backbone)_
* **[RSS](https://github.com/dylang/node-rss)** _(npm install rss)_
* **[Express](http://expressjs.com/)** _(npm install express)_

__How to structure the server:__

Since this post is specifically about generating RSS, I'll show the shell
of what my server looks like to make it easier to envision implementing in
your own application.  I will break down the `Model` and `Collection` code after
showing the server.

{{"server.js"|render}}

__Checking out the Model:__

The `Post` model is responsible for dealing with the _slugification_, which is
used when constructing unique URLs for each `Post`.  The `idAttribute` is very
handy here later on when you need to find the `Post` that corresponds to the
`id` parameter that is available in the `Post` entry route that you can see
above in my server.

{{"model.js"|render}}

__Setting up the Collection:__

When the `Posts` collection is initialized, a new RSS feed object is created
and attached as a reusable property.  The `sync` method was intentially ommitted
since that is a lot of code not pertinent to this post.  Just be aware that I
override `sync` in order to actually fill the collection from files on the
filesystem.

{{"collection.js"|render}}

__Adding items to the Feed:__

RSS feed regeneration only needs to happen when the `Posts` collection is
updated.  Since the only mutation I do is `reset`, that event is
sufficient to add items to the feed.

{{"events.js"|render}}

__Triggering the reset event:__

The `reset` event is triggered under-the-hood by Backbone, whenever the
`Posts` collection contents are replaced completely.  Since I'm never going to
incrementally add new `Post` models, this event will be called correctly
whenever I trigger the `fetch` method.  Internally Backbone will reset
the new fetched data into the collection.

This updating is done with an interval that runs once an hour, outside
of this code I have another place that I can manually trigger in the
server to do the same thing (useful for when I push a new `Post`, like this!)

{{"update.js"|render}}

__Delivering the RSS:__

Coming back to that RSS route, this is how the actual delivery function
looks now.  I simply have to set the correct `Content-Type` and call the `xml`
method on the `feed` object.

{{"delivery.js"|render}}

As seen above the structure is really quite nice, and doesn't turn into callback
hell since I'm using events.  __What do you think?__
