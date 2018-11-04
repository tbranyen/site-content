title: 'Web Components v2 Wish List'
tags: ['web components', 'html', 'javascript', 'react']
posted: new Date('11/04/2018')

Web Components v1 are a landmark achievement that render identically in stable
versions of Firefox, Safari, and Chrome. Now that the dust has settled, it
seems like the ideal time to ask standards authors and browser vendors for
more!

My feedback is provided in the form of **wishes**: problems I hope get fixed,
but not necessarily in the way I envision. I am not a specification author, so
I fully acknowledge my suggested solutions may not make sense to the standards
community. My hope is that they will take the problems and use cases into
consideration, seeing the suggestions as exercises.

To the relevant spec authors and browser vendors out there, I have three wishes
for you:

<p>&nbsp;</p>

- [Improve Shadow DOM](#-129310-wish-1-decouple-dom-from-style-encapsulation)
- [Extend the HTML grammar](#-wish-2-extend-the-html-grammar-to-support-property-setting)
- [Make Templates happen](#-wish-3-expose-html-templates-as-reactive-functions)

<p>&nbsp;</p>

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

Quick, what is common between every modern view rendering engine? If you
guessed custom logic for handling the setting of properties vs attributes, then
you are a mind reader, and probably think about this stuff too much. This
feature is critically required and can take direct influence from highly
popular existing frameworks/standards such as: JSX, lit-html, and Vue.

Asking developers to gain a reference to a DOM node to imperatively set
properties is a non-starter, and should never have been brought up as a
solution in the first place. Whenever developers criticize Custom Elements,
it's because of hand-waving over the best parts of JSX/Vue/HyperScript/Ember
Handlebars/etc.

There will be issues, such as `attributes` and `Attr` having existing
incompatible behavior, but instead of firmly rooting HTML in the past, can we
extend it to support the future? 

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

## &#129310; Wish #3: Expose HTML Templates as reactive functions

HTML Templates are currently one of the most useless features of Web
Components. They are an artifact from a bygone development era, and need either
a caffiene injection or a swift kick in the butt out of the way. Given the
features requested above, I believe this opens the door to greatly improving
the `<template>` tag.

### &#9758; My Suggestion

Expose a `render` method on `<template>` tags which binds the markup and
interpolated properties to a passed DOM node. Keep them in sync whenever the
render function is called with new values, which are provided as the `context`
of the template.

{{'template.js'|render}}

This `render` method should emulate what a Virtual DOM accomplishes, where only
updated nodes and attributes are changed. This would make it highly suitable
for pairing with a Custom Element that is reactive.

## &#129310; Wish #3.5: Expose an `html` tagged template helper

This tagged template helper would remove the tedious task of creating a
`<template>` node, setting the `innerHTML`, provide a mapping for interpolated
values, and then coming up with a new name to differentiate between the string
template contents, and template instance.

### &#9758; My Suggestion

Introduce a tagged template helper to help create a template tag with contents
from JavaScript with a few extra bells and whistles.

{{'tagged-template.js'|render}}

## Putting it all together

With these changes in place, porting a React Grid component to Web Components
becomes significantly easier and much more powerful. Significantly less
plumbing occurs with this solution as well. Below you will find a full example
using these changes to render a trivial Grid component.

{{'together.html'|render}}
