site.get("/rss.xml", function(req, res) {
  res.contentType("rss");
  res.send(posts.feed.xml());
});
