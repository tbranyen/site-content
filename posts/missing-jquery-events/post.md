title: 'Missing jQuery events while rendering'
tags: ['jquery', 'javascript']
posted: new Date('2/1/2012')

While fixing some bugs within my Backbone.LayoutManager plugin, I found an odd
behavior in the way I encouraged users to attach a rendered layout into the
DOM.  Since you can reuse a layout and it's simply a <code>DIV</code> node
created by Backbone, I figured it was sufficient to simply have a user call
jQuery's <code>html</code> method to inject it into the correct container.

An example of what that code looks like: {{ "example.js"|render }}

This code looks completely valid and not likely to cause any immediate
problems, however this is not the case.  The issue is that *all* events would
be removed upon a second render.  So the first call to
<code>$("body").html(el)</code> would work exactly as expected with all events
functioning, but the second call to <code>$("body").html(el)</code> would
result in no events firing.

I brought this issue to the attention of jQuery committer Dave Methvin who
insisted that this was not a bug and that inserting a DOM element into the DOM
using the jQuery <code>html</code> function was not a supported signature in
the API.

This was confusing to me as I have always seen and used the <code>html</code>
function in this way.  After learning from Dave that I should be using
<code>$("body").empty().append(el)</code>, I went back to my code and
implemented swapping using <code>empty</code>.

**Unfortunately, no dice.**

The events were still disappearing, so I made a reduced test case that looked
something like this:

{{ "test-case.js"|render }}

Since the following code yields missing events, this proved to me that
something was happening inside the <code>empty</code> method.  Sure enough
digging into that function yields the following code:

{{ "empty.js"|render }}

The call to <code>jQuery.cleanData</code> removes all events from the element,
in this case the "body" element.  Since this is a shared reference to the exact
same DOM node, that means when you re-attach to the DOM a second time it's not
going to get it's events back.

**Problem detected and understood, but how to fix?**

Luckily the fix is really simple and is now implemented inside of the
LayoutManager plugin.  Since the call to <code>empty</code> or
<code>html</code> only remove events from elements inside the DOM we can easily
"detach" using the jQuery <code>detach</code> method in between renders.  The
updated working code from the reduced test case looks like this:

{{ "fixed.js"|render }}

This may be a very obvious problem and solution to many developers, but it bit
me and I've talked to many other developers lately who have been having this
same issue while using Backbone.js. It may be that many client side developers
do not reuse the same DOM node, avoiding this issue.
