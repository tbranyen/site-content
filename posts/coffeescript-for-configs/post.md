title: 'CoffeeScript has the ideal syntax for configurations'
tags: ['coffeescript', 'javascript']
posted: new Date('12/25/2012')

*Disclaimer:*
Having a background in C-like languages like Java, JavaScript, PHP, and C# has
caused a problem for me to embrace languages like Python, Ruby, and
CoffeeScript.

I'd consider myself more of a laggard than a trend-setter when it comes to new
technologies and languages.  I've often questioned *why?* even when the answer
is clear.  This attitude has made me biased against CoffeeScript, even though
it provides useful benefits and features that provide justification to why a
developer would maintain a codebase with it.

#### Configuration use case ####

While I may not be a fan of coding with CoffeeScript, I'm absolutely hating
writing configurations with JavaScript.  There is so much unnecessary noise,
the syntax and verbosity, that serves to distract from the purpose of a
configuration which, in my opinion, should be bare bones and minimalistic.

I have a few reasons as to why I'm switching my project configurations to
CoffeeScript syntax:

* Significantly more dynamic than YAML.
* Doesn't look like code and is highly readable.
* Easier to maintain lists and properties.
* Deconstruction and comprehensions.
* Can embed JavaScript, which is useful for dynamic code.
* Works seamlessly with Grunt...

#### Grunt.js integration ####

Using CoffeeScript for configurations in various tools may be frustrating.  Its
certainly not a ubiquitous language and doesn't directly integrate with
projects that have a build tool lacking an available parser.  Like many others,
however, I've adopted Grunt as my primary build tool.  Grunt is super
convenient for this, since it has seamless CoffeeScript integration.

Simply name your Grunt configuration file: `Gruntfile.coffee` and proceed to
write out your configuration the exact same way, only with CoffeeScript
syntax instead of JavaScript.

#### Basic Grunt example ####

Here's a super basic example of what a configuration file could look like to
lint a project file:

{{'basic.coffee'|render}}

Let's compare to its JavaScript equivalent:

{{'basic.js'|render}}

##### Comparison breakdown #####

My initial reaction is that the first example looks more typical of what I'd
expect in a configuration file.  This opinion is influenced by my previous
usage of YAML, ini, Makefile, etc.  configuration formats.

* The CoffeeScript file has unique symbols: `@` | `->` that make little sense
  to a JavaScript developer.
  + *We can redefine the semantics inside the configuration.  In this case
    `@` represents Grunt and `->` starts the configuration.*
* The JavaScript file has unique symbols to C-style coding: `;` | `{}` | `()`.
  + *I find these to be distracting and unnecessary, especially since ideally
    we're not parsing complex logic.*

#### Complex Grunt example ####

* Show `registerTask` function in CoffeeScript as well as embedded JavaScript.
* How list comprehensions and deconstructions are useful.

#### Decide for yourself ####

Which do you think is easier to read and update? Let me know in the comments if
you see any flaws in my approach and thought process.
