title: 'Web Components v2 Wish List'
tags: ['web components', 'html', 'javascript', 'react']
posted: new Date('11/07/2018')

Web Components v1 are a landmark achievement that render identically in stable
versions of Firefox, Safari, and Chrome. While they are fantastic in concept,
they are clunky to use raw, and do not integrate well with React components.

When I look at proposals created by the **w3c** community to help move this
specification forward, I'm confused as to who the target audience is. Browser
vendors or application developers?

I specifically want to call out two proposals:

- [Shadow DOM Cascade Order](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Shadow-DOM-Cascade-Order-in-v1.md)
- [Template Instantiation](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Template-Instantiation.md)

Who are these for? When I read [Pro Web Component / Anti React posts like
this](https://dev.to/ben/why-the-react-community-is-missing-the-point-about-web-components-1ic3),
it would seem that Web Components are a powerful specification that solve the
same problems and are a suitable substitute for React, but that doesn't line up
with my experience. I lean closer to the [camp that wants the web to
learn from React](https://twitter.com/mjackson/status/1050600496992374785).

My feedback is provided in the form of **wishes**: problems I hope get fixed,
but not necessarily in the way I envision. These are problems from the
perspective of a developer who has written a Web Component VDOM library, works
on a React -> WC bridge, and wants to create a design system as Web Components.

As I am not a specification author, I fully acknowledge my suggested solutions
may not make sense to this community, as their proposals do not make sense to
me. My hope is that they will take the problems and use cases into
consideration, seeing the suggestions as only exercises. Also understanding
that React developers could easily integrate and benefit from Custom Elements
if they weren't limited in the respective ways outlined below.

To these spec authors and browser vendors out there, I have three wishes for
you:

- [Improve Shadow DOM](#-129310-wish-1-decouple-dom-from-style-encapsulation)
- [Extend the HTML grammar](#-wish-2-extend-the-html-grammar-to-support-property-setting)
- [Make Templates happen](#-wish-3-expose-html-templates-as-reactive-functions)

## &#129310; Wish #1: Decouple DOM from Style Encapsulation

The Shadow DOM is very useful for seamlessly protecting a region of child DOM
nodes. Unlike `<iframe>`, which can also protect nodes in a separate document,
the Shadow DOM approach allows the nodes to appear as though they are part of
the main document. A long time ago, specification authors attempted to land a
`seamless` attribute for `<iframe>`, which did a very similar thing, but this
has since been abandoned.

An issue with the current Shadow DOM implementation, is that it couples this
notion of DOM encapsulation in with style encapsulation. This means protecting
a region of Nodes from modification, excludes them completely from host
document styles. If we look into what we can configure when attaching a Shadow
DOM, we can use the `mode=open|closed` option to control whether or the DOM is
completely encapsulated or not, but no such toggle exists for style.

While it is possible to selectively allow styles to cascade into the Shadow
DOM, this feature is exclusively designed for when you have complete knowledge
and access of the rules. Most likely not useful unless you're making
third-party components, advertisements, or native browser elements.

### &#9758; A Suggestion

Implement a `style` option to the `attachShadow` configuration object. Similar
in design and concept to `mode`, this new option would accept one of the
following values:

- `isolate` - Previous, and the default behavior, disables arbitrary CSS cascade
- `cascade` - A new behavior, allows host styles to cascade

{{'attach-shadow.js'|render}}

### &#129304; Use case: React owns the DOM

On the surface, rendering a React component as a Web Component seems fairly
straight-forward. When the mounted, render the backing Component into the
Custom Element (which is a DOM Node). The problem here is that this would put
all React-rendered Nodes into the host document tree. This makes them available
for any other scripts to unintentionally modify.

This is a problem, because React snapshots the state of the DOM after rendering
and expects that exact state to remain unchanged. If it does change, React will
refuse to render is a non-ideal way.

{{'react.html'|render}}

What we can do instead, is attach a closed Shadow DOM and instruct React to
render into this. This protects the DOM Tree from being modified from code that
isn't React.

{{'react-shadow-dom.html'|render}}

This solves the above concern. But, what if your component uses a Stylesheet to
theme itself? Or what if it uses Styled Components, which generates and
extracts class names into a host-level `<style>` tag? **They break :(**

### &#129304; Use case: Slots without style encapsulation

Changing the presentation of children through the parent element is desirable
when using design system components. You want to use the Grid component to
layout your design, and the Text component to ensure typography consistency.

This feature was coined _transclusion_ by the Angular team, _outlets_ by the
Ember team, and _children interpolation_ with React. _Slots_ are the respective
feature in the Shadow DOM to do the same thing. You nest elements inside your
Web Component, project them through the Shadow DOM, and perform whatever
decoration you want without cluttering the host tree.

Imagine you were writing a blog post and laid out your design using the
hypothetical `Grid` and `Text` components. You wanted to set a common color,
contrived example, for a specific section. You wouldn't be able to do this, the
nested component Text is in the Shadow DOM and the cascade you know and _love_
is gone.

{{'grid.html'|render}}

## &#129310; Wish #2: Extend the HTML grammar to support property setting

A very common implementation detail that every framework that renders HTML needs
to address is setting properties vs attributes. This feature is critically
required and can take direct influence from highly popular existing
frameworks/standards such as: JSX, lit-html, and Vue. I have heard there is
some movement around unifying the `observedAttributes` to properties, but I am
dubious if this can truly replace distinct property vs attribute handling.

The current approach to handling properties with a vanilla Web Component is
to gain a reference to the DOM node and imperatively set properties. This is a
non-starter for a React developer used to a declarative approach.

There will be issues, such as `attributes` and `Attr` having existing
incompatible behavior, but instead of firmly rooting HTML in the past, can we
extend it to support the future of Custom Elements? 

### &#9758; My Suggestion

Extend the HTML grammar to support a prefixed `@` attribute to denote property
vs attribute. By default, HTML attributes are lower-cased, but whenever a prop
attribute is encountered, they will remain case-sensitive.

{{'prop.html'|render}}

Frameworks and libraries should not need to invent new ways to get around the
limitation HTML has imposed. The specification can change to support the
future.

## &#129310; Wish #2.5: Extend the HTML grammar to support interpolation

In addition to property setting, a natural progression is the ability to
interpolate JavaScript expressions from within HTML. Before you scream **no**
directly into my ear, hear me out. Developer experience when working with
components should mirror what they are used to with existing popular
frameworks.

Developers should be able to grab-and-go with a Web Component without needing
to fetch a reference to the DOM Node to configure its properties. This dance is
tiring and unproductive:

{{'dance.html'|render}}

Web Components will realistically expect more than just String and Boolean
input, which is all HTML is currently able to describe as attribute values. If
the grammar were extended to support property setting, then it would make sense
to support a way to assign JavaScript values.

### &#9758; My Suggestion

Extend the HTML grammar to allow for JavaScript value interpolation for:
properties, attributes, and children. This would evaluate anything between the
`{` outer brackets `}` , and assign as-is to properties, or coerce to string
for attributes and children.

{{'interpolation.html'|render}}

## &#129310; Wish #2.75: Extend the HTML grammar to support self closing Custom Elements

Once properties can be set, and JavaScript values interpolated, we are nearly
at foundational parity with React and JSX. Why not sprinkle a little of that DX
secret-sauce in, by reducing the amount we need to type?

### &#9758; My Suggestion

Extend the HTML grammar to allow all Custom Elements to self-close if they do
not have nested children.

{{'self-closing.html'|render}}

## &#129310; Wish #3: Make HTML Templates more powerful

HTML Templates are currently one of the most useless features of the Web
Components stack. They are an artifact from a bygone development era, and
require either a caffeine injection or a swift kick in the butt out of the
spec. This wish is very related to the [Template
Instantiation](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Template-Instantiation.md)
proposal, linked at the top, but I think is closer aligned to what web 
developers will expect.

With the other requested features in this post, I believe the `<template>`
tag can become truly powerful.

### &#9758; My Suggestions

Introduce a `template` property to DOM Node's that mimics the behavior of the
`style` property. You set a template literal to this property and it will
create a backing `HTMLTemplate` element instance and assign it to this
property. When class properties land, this will be the ideal way to
declaratively set a template. This will automatically become the contents of
the component instance. If the user wants to transclude, they can interpolate
the `innerHTML` of the instance. If a Shadow Root exists, that will be used
instead.

Expose a `render` method on the `<template>` elements, which binds the markup
and interpolated properties to a passed DOM node. Keep them in sync whenever
the render function is called with new values, which are provided as the
`context` of the template.

{{'template.js'|render}}

This `render` method should emulate what a Virtual DOM accomplishes, where only
updated nodes and attributes are changed. This would make it highly suitable
for pairing with a Custom Element that is reactive.

## Putting it all together

With these changes in place, porting React components to Web Components becomes
significantly easier and writing raw Web Components starts to match the
declarative and reactive beauty of React. Significantly less plumbing occurs
with this solution as well. Below you will find a full example using these
changes to render a trivial Grid component.

{{'together.html'|render}}
