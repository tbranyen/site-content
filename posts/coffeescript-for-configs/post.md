title: 'CoffeeScript has the ideal syntax for configurations'
tags: ['coffeescript', 'javascript']
posted: new Date('1/21/2013')

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
* * *

While I may not be a fan of coding with CoffeeScript, I'm absolutely hating
writing configurations with JavaScript.  There is so much unnecessary noise,
the syntax and verbosity, that serves to distract from the purpose of a
configuration which, in my opinion, should be bare bones and minimalist.

I have a few reasons as to why I'm switching my project configurations to
CoffeeScript syntax:

* Significantly more dynamic than YAML.
* Doesn't look like code and is highly readable.
* Easier to maintain lists and properties.
* Can embed JavaScript, which is useful for non-CoffeeScripters.
* Works seamlessly with Grunt...

#### Grunt.js integration ####
* * *

Using CoffeeScript for configurations in various tools may be frustrating.
It's certainly not a ubiquitous language and doesn't directly integrate with
projects whose build tool does not have an available parser.  Like many others,
however, I've adopted Grunt as my primary build tool.  Grunt is super
convenient for this, since it has seamless CoffeeScript support.

Simply name your Grunt configuration file: `Gruntfile.coffee` and proceed to
write out your configuration the exact same way, except with CoffeeScript
syntax instead of JavaScript.

#### Basic Grunt example ####
* * *

Here's a basic example of what a configuration file could look like to lint a
project file.

<div class="inline_code_block">
  <h5>CoffeeScript</h5>
  <hr>
  {{'basic.coffee'|render}}
</div>

<div class="inline_code_block">
  <h5>JavaScript</h5>
  <hr>
  {{'basic.js'|render}}
</div>

##### Comparison breakdown #####
* * *

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

It's worth noting that in both these cases the symbols could be minimized.  I'm
also opting for trailing commas since the Node.js runtime supports them.

#### Advanced Grunt example ####
* * *

One of the reasons for choosing CoffeeScript over YAML is that it's dynamic and
compiles down to JavaScript.  This means you can write functions inside of your
configurations.

<div class="inline_code_block">
  <h5>CoffeeScript</h5>
  <hr>
  {{'advanced.coffee'|render}}
</div>

<div class="inline_code_block">
  <h5>JavaScript</h5>
  <hr>
  {{'advanced.js'|render}}
</div>

##### Inline JavaScript #####
* * *

I personally do not like writing my functions in CoffeeScript, others may
disagree, but luckily for others like me you can directly embed JavaScript
inline.

An example of rewriting the above.

{{'with-js.coffee'|render}}

#### Alternative (YAML) Grunt example ####
* * *

While working on the Grunt examples and having [Ben
Alman](http://benalman.com/) review the post, he mentioned that I could use
YAML and require that in for the declarative portions of the Grunt
configuration.

<div class="inline_code_block">
  <h5>YAML / <code>config.yaml</code></h5>
  <hr>
  {{'config.yaml'|render}}
</div>

<div class="inline_code_block">
  <h5>Grunt / <code>Gruntfile.js</code></h5>
  <hr>
  {{'yaml.Gruntfile.js'|render}}
</div>

#### Example without Grunt ####
* * *

If you are using your own build system that is only expecting an object, the
configuration will look **even better**!

<div class="inline_code_block">
  <h5>CoffeeScript</h5>
  <hr>
  {{'object.coffee'|render}}
</div>

<div class="inline_code_block">
  <h5>JavaScript</h5>
  <hr>
  {{'object.js'|render}}
</div>

#### Decide for yourself ####
* * *

Which do you think is easier to read and update? Let me know in the comments if
you see any flaws in my approach and thought process.  My stance is to use
CoffeeScript wherever possible over JavaScript for configurations, and to inline
JavaScript when writing functions.
