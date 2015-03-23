// Generated by CoffeeScript 1.9.1
(function() {
  var config;

  module.exports = function(grunt) {
    return grunt.loadNpmTasks('grunt-contrib-less');
  };

  config = {
    less: {
      development: {
        options: {
          paths: ["./less"]
        },
        files: {
          "./css/foo.css": "./less/agency.less"
        }
      }
    }
  };

  grunt.initConfig(config);

  grunt.registerTask('default', ['less:development']);

}).call(this);
