# Create a new configuration function that Grunt can
# consume.
module.exports = ->

  # Initialize the configuration.
  @initConfig

    # Specify source files to the JSHint task.
    jshint:
      files: ["backbone.layoutmanager.js",
        "node/index.js"]

      # Allow certain options.
      options:
        browser: true
        boss: true

  # Load external Grunt task plugins.
  @loadNpmTasks "grunt-contrib-jshint"

  # Running CasperJS behavioral tests.
  @registerTask "casper", "Execute CasperJS tests.", ->
    done = @async()

    grunt.util.spawn
      cmd: "casperjs"
      args: ["--ignore-ssl-errors=yes", "test", "test/casperjs"]
    , (error, result, code) ->
      if error
        grunt.log.write error.stdout
        done()
        process.exit code

      grunt.log.write result
      done()
      process.exit 0

  # Default task.
  @registerTask "default", ["jshint", "casper"]
