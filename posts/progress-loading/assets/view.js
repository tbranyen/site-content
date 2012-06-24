Repos.Views.List = Backbone.View.extend({
  initialize: function() {
    // Display a loading indication whenever the Collection is fetching.
    this.collection.on("fetch", function() {
      this.html("<img src='/assets/img/spinner.gif'>");
    }, this);

    // Automatically re-render whenever the Collection is populated.
    this.collection.on("reset", this.render, this);
  }
});
