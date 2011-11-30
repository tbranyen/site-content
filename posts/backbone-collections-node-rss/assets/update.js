setInterval(function() {
  posts.reset([]);
  posts.fetch();

// Refresh Posts Collection once an hour
}, 3600000);

// Always fetch immediately
posts.fetch();
