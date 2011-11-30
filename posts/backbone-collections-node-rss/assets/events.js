posts.bind("reset", function() {
  // Iterate over all the Posts and set the context to the Collection
  posts.each(function(post) {
    // Add each post into the feed property on the Collection
    this.feed.item({
      title: post.get("title"),
      description: post.get("title"),
      date: post.get("posted"),
      url: "http://tbranyen.com/post/" + post.id
    });
  }, posts);
});
