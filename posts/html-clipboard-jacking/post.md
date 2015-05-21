title: 'Clipboard Hijacking with HTML5'
tags: ['dom', 'clipboard', 'html5']
posted: new Date('5/20/2015')

Today I learned from [Guillermo
Rauch](https://twitter.com/rauchg/status/601187683529039872) that Google Chrome
43 is now shipping, on both desktop and mobile, with the ability to modify the
system clipboard.  This is awesome! And as evidenced by the over 200 retweets
he gained, developers are excited to be able to finally drop the dependence on
Flash for this feature.  You can read more about it here on
[HTML5Rocks](http://updates.html5rocks.com/2015/04/cut-and-copy-commands).

**I wish I could join in with the celebration, but since it was not implemented
to actively prevent clipboard hijacking, I'm disappointed instead.**

Clipboard hijacking is the intentional modification of the system clipboard
with content other than what the user expected.  If you've ever copied text
from a news article and pasted to a friend only to find an intrusive ad baked
in, you've experienced it first hand.

An example from a five year old Daring Fireball post, is shown below:

<blockquote>
Over the last few months I’ve noticed an annoying trend on various web sites, generally major newspaper and magazine sites, but also certain weblogs.
<br>
<br>
Read more: http://daringfireball.net/2010/05/tynt_copy_paste_jerks/#ixzz0oyLiD4Qh
</blockquote>

On the flip side, there was [another
post](http://davidwalsh.name/javascript-clipboard) that happened five years
ago, that illustrates developers perceiving clipboard hijacking as a positive
trend.

<blockquote>
One trend I've seen recently is that when the use copies content
from a given post, the copy function (Zero Clipboard, in this example) appends
the page title, a link, and a special message telling the recipient to view the
post.  Here's how to do it.
</blockquote>

**NO, NO, NO, NO!**

This is a larger problem than autoplaying video, sound, and popups. They are
annoying, but never destructive.  New amazing features are being added to the
web platform, such as: webcam & microphone access, location access, etc. that
are available to any web site, but require user permission to be used.

Q: So how did Chrome screw this up?  **A: They do not prompt for clipboard access!**

******

The demo I created below, was done in a few minutes with just a "hidden"
textarea trick and a `mouseup` event that is incredibly common.

<iframe width="100%" height="300px" src="//jsfiddle.net/azgugmjb/7/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

I tested this demo in: Chromium 42, Google Chrome 43, & Mobile Chrome 42.  In
all cases, the browser would allow me to select and then copied bogus nonsense
into my clipboard.  Even worse, is that in the desktop version of Chrome, the
use of `textarea.select()` actually deselects the text, making it impossible to
do a real operating system level copy command.

I've voiced my findings in a [Mozilla Dev Platform Google Group discussing the
intent to implement and ship this
feature](https://groups.google.com/d/msg/mozilla.dev.platform/oWhmLMvGAD0/fzKve_WNhfYJ)
and hope to sway them into doing the right thing for their users here.  I still
need to figure out how to let Google Chrome devs know my opinion, hopefully
this post will reach them somehow.
