title: 'Improving the DOM with diffHTML experiments'
tags: ['virtual dom', 'react', 'custom elements', 'transitions']
posted: new Date('2/29/2016')

<style>
  img.kiwi {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    margin: 0;
    width: 64px;
    float: left;
    margin-right: 25px !important;
  }
</style>

<script src="/post/improving-the-dom-with-diffhtml-experiments/assets/diffhtml.js"></script>
<script>diff.enableProllyfill();</script>

When starting a new web application project, you'll typically pick a client
side framework as well as tooling that works best with it. I think most would
agree that structuring a project around easily Google-able technology is a good
idea over a completely custom in-house solution. Technology choices are made to
assemble a stack that won't get in your, or the future maintainer's way now or
in the future. A stack that shows strong developer community support is an
obvious qualifier for consideration over fringe side projects or well written,
but not maintained codebases. 

What are typically not considered, are modern browser standards. This is
probably due to [low browser
support](http://caniuse.com/#search=web%20components), inconsistent or
[outdated](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/content)
specification resources, [slow
polyfills](https://www.polymer-project.org/1.0/articles/shadydom.html#shadow-dom-is-awesome-why-is-there-a-shady-dom),
and lack of useful features that match up with modern frameworks.  Some of the
missing *standard* features that I noticed in the last application I wrote are:

* **State management**&nbsp;&nbsp;
  *Redux*
* **Reactive rendering**&nbsp;&nbsp;
  *React*
* **Routing control**&nbsp;&nbsp;
  *React Router, Redux Router, Backbone, and Ember*
<hr>
* **Eventing**&nbsp;&nbsp;
  *Delegation and click outside*
* **Transitions**&nbsp;&nbsp;
  *Reacting to elements and attributes entering, leaving, or mutating in the DOM*

While many of these issues may never be accounted for in the browser standard
API, vendors have taken notice of developer trends and are helping shape the
future of the web, such as [Web
Components](https://github.com/w3c/webcomponents/). Google took an
initial stab at what this could look like with the [Polymer
project](https://www.polymer-project.org/1.0/), which attempted to get
developers to structure reusable components like this:

{{"polymer-element-0.5.html"|render "html"}}

The problem with this component definition is that it's described with markup;
this does not work with existing JavaScript module tooling. There are many
short-sighted issues, such as: how to apply code coverage or bundle into a
pre-HTTP 2.0 optimized file? The browser equivalent of this solution
[apparently off the standards
track](http://lists.w3.org/Archives/Public/public-webapps/2013JulSep/0287.html)
which looked awkward and unnecessary in my opinion.

Those problems can be avoiding by using the [Web Components
polyfills](http://webcomponents.org/polyfills/), but I found them to not work
particularly well, they need to modify too much of your environment to work
properly. They also only provide the minimal features Web Components are
scheduled to include. So you end up needing Polymer or something like it
anyways.

While Polymer does have other methods of defining components like Custom
Elements, you'll need to venture off the [standards path to use any of the
additional features Polymer
provides](https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#element-constructor).
These features do not include a Virtual DOM (thanks React) or a rich transition
system. Nor any project from what I can tell, so I set out to build one. One
that embraced web standards, while also providing features you don't want to
live without.

The tool I've written aims to provide solutions to some of the missing features
that I listed earlier, with intentions of being pushed as extensions to the Web
Components specification.

#### Introducing <a href="https://github.com/tbranyen/diffhtml">diffHTML...</a>

<img class="kiwi" src="/post/improving-the-dom-with-diffhtml-experiments/assets/kiwi.png">

...as a passion-project I've been pushing code to since the initial commit on
April 15, 2015. I've gotten it to a stable point where I'd like to invite
others to check it out and experiment with what it can do. I built a medium
sized application at Netflix with it to manage our global content ratings.
This allowed re-rendering the entire application DOM on every single Redux
state change. I was able to trivially add in debouncing, but the performance was
so negligible that I just left every state trigger a full re-render.

The *magic* line in that application to apply the template output to the DOM
is:

{{"magic-line.js"|render "javascript"}}

Hopefully the API is clear enough to guess that the root of the entire page,
the HTML tag, is diffed on every render with the new markup and having the
changes applied to the page. I have Custom Elements and Transitions, explained
later, tied into this single render point. Since both of these features react
to markup changes, this functions beautifully as *progressive enhancement*.

#### Exploring Custom Elements

The Web Components umbrella standard offers a way of creating new HTML elements
in JavaScript, using ES2015 (ES6) classes, called Custom Elements. The power of
these new elements is that you can hook into the complete lifecycle and can
react to changes. You can even extend existing elements by using the
`is="custom-element"` HTML attribute.  This is already implemented by Google
Chrome and Firefox and polyfilled by diffHTML. It looks something like this:

{{"custom-element.js"|render "javascript"}}

They could then be consumed in your markup like so:

{{"custom-element.html"| render "html"}}

Full JSFiddle here:

<iframe width="100%" height="333" src="//jsfiddle.net/tbranyen/swpx6qdo/2/embedded/js,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

While the above serves as a nice "Hello World" introductory example, it quickly
breaks down with any real-world sized application that is composed of elements
and bound to the invisible "state". These custom components should be able to
describe their state and have the page update to accommodate the changes.
Reusing the same elements and attributes where possible, and applying mutations
directly and minimally.

Lets imagine an example where you wanted to 

##### Getting serious with the Virtual DOM

##### Make something fun with transitions

<!--

While these tools are well intentioned for teams and applications, I find a few
problems with buying into the proprietary tooling for portable components. It
is, however, a very solid choice for authoring an application. To back up that
claim, my next major application project at Netflix will be authored with
React.

commitment to well designed reusable components. At Netflix we enjoy "Freedom &
Responsibility" to choose whatever technology is best for the job to be
completed. That means some teams use React, some teams use Ember, some use Web
Components, and some use nothing at all. As we saw with [You Might Not Need
jQuery](http://youmightnotneedjquery.com/), could we one day see *You Might Not
Need React* as well? Obviously not, applications 

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


-->
