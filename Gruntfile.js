'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'index.js', 'test/connect-dynamic-middleware.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    mochacli: {
      options: {
        require: ['chai'],
        reporter: 'spec',
        timeout: 10000
      },
      test: {
        options: {
          files: ['test/connect-dynamic-middleware.js']
        }
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'gjslint', 'mochacli:test']);
  grunt.registerTask('default', ['test']);


  grunt.registerTask('gjslint', 'run the closure linter', function() {
    var done = this.async();
    var args = [
      './util/gjslint.py',
      '--disable',
      '0110',
      '--nojsdoc',
      '-r',
      '.',
      '-e',
      'node_modules'
    ];

    var child = require('child_process').spawn('python', args);
    child.stdout.on('data', function(chunk) { grunt.log.write(chunk); });
    child.stderr.on('data', function(chunk) { grunt.log.error(chunk); });
    child.on('close', function(code) { done(code ? false : true); });
  });

};
