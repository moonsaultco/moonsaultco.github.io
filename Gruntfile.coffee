# babelify = require('babelify');

module.exports = (grunt)->

  require('jit-grunt')(grunt)

  config =
    less:
      development:
        options:
          paths: ["./less"]
        files:
          "./css/plain.css": "./less/plain.less"
    watch:
      styles:
        files: ['less/**/*.less']
        tasks: ['less']
        options:
          nospawn: true

  grunt.initConfig(config)
  grunt.registerTask('default', ['less', 'watch']);
