// Set the RequireJS configuration
require.config({
  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: function() {
        // If you plan on loading any plugins for Backbone, do not use this
        // approach of removing it from the global scope.  They will be
        // unable to find Backbone.
        return window.Backbone.noConflict();
      }
    },

    underscore: {
      attach: "_"
    }
  }
});
