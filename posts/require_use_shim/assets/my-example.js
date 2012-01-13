// Set the RequireJS configuration
require.config({
  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: function() {
        return window.Backbone.noConflict();
      }
    },

    underscore: {
      attach: "_"
    }
  }
});
