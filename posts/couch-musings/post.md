title: 'Thoughts on development using CouchDB with Node.js'
tags: ['couchdb', 'node', 'javascript']
posted: new Date('5/16/2012')

I was recently on a client facing project for [Bocoup](http://bocoup.com/) and
needed to store millions of tweets that contained sentiment analysis of the
text.  From this sentiment gathered along with other various metadata, I was
tasked with creating a scalable API that could query/filter the data retrieved.

This post will discuss the *Why* and the *How* behind my first experience with
CouchDB and how I created a better development environment in order to deliver
a polished product.

#### Why CouchDB?

First and foremost, I have a "*background*" with MySQL, SQLite and SQL
Server from previous employment and college.  Nothing with NoSQL solutions.
The implications of finding a relational datastore hosting provider and
understanding the scaling procedures for that kind of data, would not be time
or cost effective for our client.  I have no doubts that it is entirely
possible and potentially even able to yield greater performance, but it would
not be an undertaking this project was willing to entertain.

I had very simple requirements:
**Easily put data into the store** && **easily get data out of the store.**

I made the decision for CouchDB after having conversations with peers and
feeling comfortable that I could complete this project with:

* The abundant support via the community
* The rich feature set for querying
* The local cluster hosting provider [Cloudant](http://cloudant.com/)


**Community**

The easiest sell for CouchDB, to me, was the community.  Unlike the trend of
smug and unhelpful support channels for other technologies, I found the CouchDB
community to be welcoming and supportive.  Specifically want to shout out to
[Russell Branca](https://github.com/chewbranca) and [Max
Ogden](https://github.com/maxogden) for giving me incredibly useful advice.

The community aspect is more than just support.  There is also a plethera of
libraries and utilities that make working with CouchDB more formalized.  The
two projects I found most helpful were:

* [nano](https://github.com/dscape/nano)
* [node.couchapp.js](https://github.com/mikeal/node.couchapp.js)

Through these two projects, I was able to communicate with CouchDB in Node and
keep my design documents easily up-to-date and version controlled.

**Querying**

The ability to use the quintessential transformation methods Map & Reduce on
every document, along with the ability to emit Arrays as keys, **made it
incredibly easy for me to craft a coherent API**.

For instance imagine one of the queries was to get the incoming tweet traffic
for a given hour.  This would be easily achieved through the mapping over
of every tweet document, incrementing the count by `1` and then reducing these
numbers to the hour `group_level`.  A `group_level` is a number that represents
how much of the emitted array to operate on.  

Take a look at the following example. The `group_level` concept will make more
sense in context:

{{'map_reduce.js'|render}}

A query to the database with this View and a `group_level` of `3` would
yield the total traffic per hour.  CouchDB provided the exact filtering
mechanisms necessary to achieve these kinds of tasks.

**Cloudant**

This was a Boston-based project for a Boston-based company specializing in
data visualization work, and not system/database administration.  The hand-off
needed to be smooth and reassuring, since I would not be available on the
project when it went live.  Therefore I needed to find a company that could
manage the scalability problem once it occured.
[Cloudant](http://cloudant.com/) was essential to the success of this project
and is definitely one of my primary motivations for selecting CouchDB.

Not being a database administrator coupled with the project's timespan, I would
be unable to secure and maintain the database instance.  The reliance on a
third-party was paramount.

The things I found particularly glowing about Cloudant were:

* **Employees.**  Being able to speak to the developers and maintainers and
  getting a point contact for scalability support is fantastic.
* **Location.**  They are right down the street from Bocoup and the client,
  which adds a bit of ease to their legitimacy and community.
* **Clustering.** Which allowed our client to easily scale based off clearly
  defined and priced service packages.
* **Admin panel.** This gave all the information I needed to know how many
  connections were coming in and how much space was allocated to the b-tree fs
  caching and phsyical database size.

#### Improving Development

While the [Node](http://nodejs.org/) and [nano](https://github.com/dscape/nano)
libraries made it incredibly easy for me to connect to CouchDB and serve the
API, I still needed more flexibility and power
to develop efficiently.

Three areas I was able to improve on were:

* Global configuration
* Design document synchronization
* Importing and parsing CouchDB Views


**Global configuration file**

In hindsight, I wish I integrated a global settings configuration file earlier
on in the project.  This file contains host, auth, etc. settings to connect to
servers.  Since these are now variables that can be changed at will, its
significantly easier to swap between staging, production, and local development
servers.

An interesting feature of Node's CommonJS `require` implementation is that
requiring a JSON file will automatically `JSON.parse` it into an object.  This
proved to be a perfect way to have a global configuration with zero effort.

A configuration file could look something like:

{{'config.js'|render}}

Consuming it in the application would be as simple as:

{{'consume_config.js'|render}}

While this may seem overly simplistic and obvious, I still think there is room
for improvement; for instance, automatic detection of the environment.  I'm
sure there is an NPM module out there someplace that does exactly this...

**Design document synchronization**

This was the biggest pain point for me.  As I mentioned before, I used the
excellent couchapp tool by [Mikael Rogers](https://github.com/mikeal), to
synchronize my design documents to CouchDB.

Unfortunately, his design decision was to only allow a single design document
to be uploaded.  This clashed horrendously with my idealistic mindset to
namespace my Views under their respective design_doc.  My solution was to
change the schema of how a design document is structured and to formalize a
pattern for all my documents.  Through this, I was able to very easily
synchronize any number of design documents at once.

My filesystem structure looked like this:

```
couch
├── design_docs
│   ├── sentiment.js
│   ├── traffic.js
│   └── tweets.js
├── index.js
└── package.json
```

A design document looked something like this:

{{'design_doc.js'|render}}

And then finally to iterate over all the documents and push to couch, I wrote
a basic script, that lived in `index.js` to utilize couchapp in this unconventional manner:

{{'index.js'|render}}

Now updating my design docs and adding new ones, was easy as modifying the
filesystem and file contents and then calling `node couch` (this executes the
index.js file inside of the couch directory).

**Importing and parsing CouchDB Views**

Once the design documents were created that contained all my CouchDB Views to
query on.  I needed to figure out a productive and elegant way to query
the datastore and filter locally if necessary.  Initially I was going to use
Backbone for its `Collection` class.  I ended up settling on the [Miso
Project's Dataset](http://misoproject.com/dataset/) library.  The reasons
for this was to experiment with treating data as a first class structure.  By
creating a custom importer and parser, I could easily reuse the exact same
application, but with a completely client side dummy storage, by using a
FileSystem importer instead.

Note: I could do all of this with custom code, Backbone code, etc.  the point
isn't how I achieved the end result, its *why* I chose the library.  I wanted
something formalized that could be easily reused without significant
code-rewriting.  The hand off to the client may be used again in their future
endeavors, maybe with MongoDB? MySQL? it really doesn't matter since all that
would be required is a custom importer.

{{'dataset.js'|render}}

My custom importer and parser are available on my GitHub account as Gists.

* [CouchDB Importer](https://gist.github.com/2713385)
* [CouchDB Parser](https://gist.github.com/2713395)
