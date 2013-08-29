
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '// <%= pkg.name %> v<%= pkg.version %> \n// <%= pkg.homepage %>\n'
      },
      build: {
        src: 'dist/wrapper-<%= pkg.version %>.js',
        dest: 'dist/wrapper-<%= pkg.version %>.min.js'
      }
    },
    jshint: {
      options: {
        browser: true
      },
      files: {
        src: [
          'Gruntfile.js',
          'src/**/*.js'
        ]
      }
    },
    concat: {
      options: {
      },
      dist: {
        src: [
          'src/wrapper.js'
        ],
        dest: 'dist/wrapper-<%= pkg.version %>.js'
      }
    },
    watch: {
      scripts: {
        files: [
          'Gruntfile.js',
          'src/**/*.js'
        ],
        tasks: ['jshint','concat']
      }
    },
    mocha: {
      index: ['test/runner/index.html'],
      options: {
        bail: true,
        log: false
      },
      reporter: 'Spec'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('build', ['jshint','test','concat','uglify']);
  grunt.registerTask('default', ['jshint','test','watch']);

};

/* EOF */