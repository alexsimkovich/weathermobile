module.exports = function(grunt) {

  // Loading all grunt modules base on package.json
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    clean: {
      build: ["build"]
    },
    less: {
      main: {
        files: {
          "assets/css/main.css": "assets/css/main.less"
        }
      }
    },
    watch: {
        css: {
            files: 'assets/css/**/*.less',
            tasks: ['less'],
            options: {
                nospawn: true
            }
        }
    },
    browserSync: {
        dev: {
            bsFiles: {
                src: [
                    "assets/css/*.css",
                    "*.html"
                ]
            },
            options: {
                server: {
                    baseDir: "./"
                },
                watchTask: true // < VERY important
            }
        }
    },
    concat: {
      dist: {
        src: [
          'assets/js/lib/jquery-1.10.2.min.js', // All JS in the libs folder
        ],
        dest: 'build/js/production.js'
      }
    },
    uglify: {
      build: {
        src: 'build/js/production.js',
        dest: 'build/js/production.min.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/images/'
        }]
      }
    },
    autoprefixer: {
      // prefix the specified file
      single_file: {
        options: {
          // Target-specific options go here.
        },
        src: 'assets/css/main.css',
        dest: 'build/css/main.css'
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'build/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/',
        ext: '.min.css'
      }
    }
  });

  // Dev tasks
  //grunt.registerTask('default', ['less']);
    grunt.registerTask('default', ['less']);
    grunt.registerTask('sync', ['browserSync','watch:css']);

  // Prod tasks
  grunt.registerTask('production', ['concat','uglify','imagemin','autoprefixer','cssmin']);

  // Cleaning build
  grunt.registerTask('clean-build', ['clean:build']);

};
