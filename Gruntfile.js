
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        banner: '// <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %> \n// <%= pkg.homepage %>\n'
      },
      build: {
        src: 'dist/wrapper-<%= pkg.version %>.js',
        dest: 'dist/wrapper-<%= pkg.version %>.min.js'
      }
    },
    
    jshint: {
      options: {
        newcap: false,
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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['jshint','concat','uglify']);
  grunt.registerTask('default', ['jshint','watch']);

};

/* EOF */