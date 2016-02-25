title: 'A proposal for Virtual DOM and Transitions standards'
tags: ['virtual dom', 'react', 'custom elements', 'transitions']
posted: new Date('2/25/2016')

While developing a web application, a client side framework is typically
selected as well as tooling that works best with that framework *or library*.
What typically aren't considered are modern browser standards. This is due to
low browser support, inconsistent specifications, slow polyfills, and lack of
useful features that match up with modern frameworks. Some of these missing
features are:

* State management (like Redux)
* Virtual DOM rendering (like React)
* Routing control (like react-router, redux-router, Backbone, Ember, angular,
  stateman, etc)
* Eventing (like clickoutside and delegation)
* Transitions (reacting to when elements and attributes enter, leave, or change in the DOM)

Google took an initial stab at what components could look like with a
specification and tried to get developers excited with this:

{{"polymer-element-0.5.html"|render "html"}}

While the new [version 1.0 of Polymer](https://www.polymer-project.org/1.0/)
uses Custom Elements, this early presentation (version 0.5) was very
offputting as it disregarded how literally everyone wrote and packaged
applications. Questions came up like:

* How do I package HTML efficiently?
* Is this portable? If this is a standard, what is **[Polymer and all the
  proprietary features it
  brings?](https://www.reddit.com/r/javascript/comments/2988gu/demo_from_google_io_showing_polymer_paper/ciii04y?context=3)**

Sure, I got downvoted to hell in the Reddit thread linked above, but I think my
point was made clear with Polymer 1.0 changing their position and leaning more
towards ES2015 (ES6) features. And now, retrospectively, I'm glad that I ([and
spec
authors](http://lists.w3.org/Archives/Public/public-webapps/2013JulSep/0287.html))
did not buy into that first implementation.

The browser will most likely never satisfy everyones personal preference,
especially for things like state management and routing control. This is mainly
due to the necessity of abstractions for things like isomorphic/universal
JavaScript applications.

Specifically a tool that can provide intelligent diff/patch operations on the
DOM would align with positive trends seen with React, Ember, virtual-dom,
morphdom, and other virtual dom implementations.

The remainder of the article will be broken down by the features of diffHTML
into separate sections. Where applicable I'll describe existing standards that
tie into diffHTML seamlessly. Future posts will go into specific integrations and 

#### Virtual DOM

The "Virtual DOM" term is rather loaded, due to various implementations and
philosophies. For the purposes of this post I'm referring to a lightweight
representation of the DOM structure, along with APIs to diff and patch
structural changes to the real DOM.  This approach simply attempts to reuse as
much existing DOM state as possible and only mutate the required (fewest)
changes.

Tools like React and Ember have embraced this concept, which contrasts how
frameworks like Backbone and Polymer have implemented views using innerHTML.
This means elements are often unnecessarily created and destroyed, resulting in
flickering as well as losing focus. I find Virtual DOM diffing & patching to be
a brilliant solution to those issues and many more I've encountered.

So why not bring it to the browser? This was a thought myself and others have
had. In fact, Ben & Dion (of Ajaxian fame) recently touched on this in a Medium
post [What can we learn from how jQuery symbiotically pushed the Web Platform forward?](https://medium.com/ben-and-dion/what-can-we-learn-from-how-jquery-symbiotically-pushed-the-web-platform-forward-ce6b20cd4e98#.iqclwmmbo).

This isn't [a new
realization](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27310).

##### is Attribute

The `is` attribute is a standard for extending existing element tagNames.
Contrast this to 

#### Custom Elements

Custom Elements are a novel idea and implemented already by several vendors,
but at the moment still find themselves with low support on the overall
evergreen spectrum. The existing APIs are also not entirely useful
out-of-the-box, since the lifecycle callbacks trigger whenever elements enter
or leave the DOM, and if your app is using templates, this further complicates
things by constantly creating and destroying elements.

#### Transitions API


