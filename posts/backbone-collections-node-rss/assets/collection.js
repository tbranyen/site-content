var Posts = Backbone.Collection.extend({
  model: Post,

  // Sort by most recent posted date
  comparator: function(post) {
    return -1 * new Date(post.get("posted"));
  },

  // Fetches posts from Git folder
  sync: function(method, model, options) { /* ... */ },

  // Create a new RSS feed and assign it as a property on the Collection
  initialize: function() {
    this.feed = new RSS({
      title: "Tim Branyen @tbranyen",
      description: "JavaScript and web technology updates.",
      feed_url: "http://tbranyen.com/rss.xml",
      site_url: "http://tbranyen.com",
      image_url: "",
      author: "Tim Branyen @tbranyen"
    });
  }
});

// Initialize a global reference to all Posts
var posts = new Posts();
