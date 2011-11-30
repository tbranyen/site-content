// Require server dependencies
var Backbone = require("backbone");
var express = require("express");
var RSS = require("rss");

/* Post Model and Posts Collection exist here outside the route, which is
 * possible since Node.js is the server and script coupled, and exists
 * entirely in memory.
 */

// Route to specific post
site.get("/post/:id", function(req, res) { /* ... */ });

// Currently does nothing, will show soon how to serve this
site.get("/rss.xml", function(req, res) { /* ... */ });

// Render out home page with list of posts
site.get("/", function(req, res) { /* ... */ });
