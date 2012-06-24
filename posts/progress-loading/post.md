title: 'How to indicate Backbone fetch progress'
tags: ['backbone', 'javascript']
posted: new Date('6/24/2012')

While developing GitHub Viewer, http://githubviewer.org/, I received a lot of 
feedback on how to make the application more user friendly.  One suggestion was
to add loading spinners while the application fetched data from the GitHub API.

This may seem relatively trivial, but I wanted to do this in a very evented way
to correspond with how the Views are already rendered.  My solution ended up
patching the `fetch` method on `Collection.prototype` to emit a `fetch` event.

The code could easily be expanded to work with `Models` as well and would look
something like this:

{{"fetch.js"|render}}

The code above will iterate over both the Model and Collection names and patch
the `fetch` method on both to trigger an event that signifies fetching has
started.  This is fantastic for our auto-updating Views.

A sample View that auto-updates might look something like this:

{{"view.js"|render}}

This makes it much easier to drive your Views with a loading indicator and then
have them rendered once the `Collection/Model` has been populated or changed.

The fetch event works great for when data is currently being loaded, if you
want to know when data has successfully been sync'd from the server, simply
use the `sync` event on the `Collection/Model`.

I would love to see this event made into Backbone core, so that I no longer
have to patch it directly.
