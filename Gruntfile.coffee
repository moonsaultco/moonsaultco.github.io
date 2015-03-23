# babelify = require('babelify');

module.exports = (grunt)->

  grunt.loadNpmTasks 'grunt-contrib-less'
	# grunt.loadNpmTasks 'grunt-browserify'
  #
  config =
    less:
      development:
        options:
          paths: ["./less"]
        files:
          "./css/foo.css": "./less/agency.less"

  grunt.initConfig(config)
  grunt.registerTask('default', ['less:development']);
