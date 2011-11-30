var Post = Backbone.Model.extend({
  // This is a great way to reference the post later, since its unique
  idAttribute: "slug",

  // When initialized from collection fetch generate the slug
  initialize: function() {
    this.set({ slug: this.slugify() });
  },

  // Convert the title attribute into a URL friendly slug
  slugify: function(title) {
    return this.get("title").toLowerCase().replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
});
