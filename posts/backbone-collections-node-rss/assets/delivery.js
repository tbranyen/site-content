site.get("/rss.xml", function(req, res) {
  res.writeHead(200, { "Content-Type": "application/rss+xml" });
  res.end(posts.feed.xml());
});
