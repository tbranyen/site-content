title: 'AMD/RequireJS Shim Plugin for Loading Incompatible JavaScript'
tags: ['amd', 'require.js', 'javascript']
posted: new Date('1/13/2012')

When Jeremy Ashkenas decided to remove AMD compatibility complete from the
DocumentCloud projects, Underscore & Backbone I wasn't quite sure what to
think.  On one hand it would have been great for the community to have
decided on an open standard to deploy modules with.  On the other hand, it
seemed like a dark path for a library to head down if it wasn't completely
on board.

This got me thinking about
[Backbone Boilerplate](http://github.com/tbranyen/backbone-boilerplate) and
what I could do to help provide the desired RequireJS/AMD interoperability.
Creating a boilerplate that patches the source files of the libraries has been
done to death which only puts a bandaid on the problem instead of solving it.
On a more personal opinion, I'm never in favor of patching third-party
JavaScript by hand, unless its an extreme circumstance.

I thought about all the reasons why I wasn't currently using RequireJS
in any of my projects, a few of the immediate reasons:

* Documentation seemed thorough, but I could not understand if I was using
it correctly.
* Using any kind of third-party JavaScript that was not designed to work with
AMD, fell flat on its face.  You need to somehow patch support in.
* The build process never worked correctly for me, no matter what I tried.

So clearly I was a noob at the whole AMD/RequireJS experience
and because of my constant failures, I felt angry towards it as if it wasn't
written well and was causing more problems than just using no library at all.

The major pain point, after figuring out the build process and getting through
the documentation, was dealing with the non AMD-compatible code to load in.

Backbone and Underscore are interesting subjects in the following example, 
because Underscore has no dependencies and Backbone has two.

{{"existing-shim.js"|render}}

You typically end up with a file or your main script file full of these shims.
One shim per file so they can remain anonymous modules (good practice), or
in a single file where you name them (poor practice).

My solution is slightly different in that I not only didn't want to have to
create any files, I also didn't want to create any defines either.  I figured
AMD is smart and flexible enough to do this programmatically.  So I can up with
this schema that gets passed to the configuration loader in addition to normal
AMD options.

{{"my-example.js"|render}}

This allows you to specify exactly what the file path is and provide the
list of dependencies.  I've shown two examples here, Backbone which is
using the list of dependencies and a function as the attach (Note: this could
have just as easily used attach: "Backbone"), underscore simply needs an
`attach` property.

You can see the plugin being used as well inside the Backbone dependencies.
Simply call the module with the plugin syntax `use!module_name` and it will
look to the `use` property inside your configuration to resolve.

The code is on GitHub [as a Gist](https://gist.github.com/1604128) please
check it out and let me know what you think.

I have also integrated this plugin into the Backbone Boilerplate in a special
(amd) branch:

[amd branch](https://github.com/tbranyen/backbone-boilerplate/tree/amd)

I'm hoping this integration will help solve the rest of the problems I outlined
before for new users.  This build process is preconfigured to work
cross platform out-of-the-box.
