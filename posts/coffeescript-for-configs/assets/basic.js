// Create a new configuration function that Grunt
// can consume.
module.exports = function() {

  // Initialize the configuration.
  this.initConfig({
    // Specify source files to the JSHint task.
    jshint: {
      files: ["backbone.layoutmanager.js",
        "node/index.js"],

      // Allow certain options.
      options: {
        browser: true,
        boss: true,
      }
    }
  });

  // Load external Grunt task plugins.
  this.loadNpmTasks("grunt-contrib-jshint");

  // Default task.
  this.registerTask("default", ["jshint", "custom"]);

};
