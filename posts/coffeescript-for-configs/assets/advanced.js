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

  # Running CasperJS behavioral tests.
  this.registerTask("casper", "Execute CasperJS tests.", function() {
    var done = this.async();

    grunt.util.spawn({
      cmd: "casperjs",
      args: ["--ignore-ssl-errors=yes", "test", "test/casperjs"]
    }, function(error, result, code) {
      if (error) {
        grunt.log.write(error.stdout);

        done();
        process.exit(code);
      }

      grunt.log.write(result);

      done();
      process.exit(0);
    });
  });

  // Default task.
  this.registerTask("default", ["jshint", "casper"]);

};

