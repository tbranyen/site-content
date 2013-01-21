// Create a new configuration function that Grunt
// can consume.
module.exports = function() {

  // Read in the configuration and parse it into an
  // Object.
  var config = this.file.readYAML("config.yaml");
  
  // Initialize the configuration.
  this.initConfig(config);

  // Load external Grunt task plugins.
  this.loadNpmTasks("grunt-contrib-jshint");

  // Default task.
  this.registerTask("default", ["jshint"]);

};
