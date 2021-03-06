/*global module*/
module.exports = function (grunt) {
    "use strict";
    var public_static = 'public/static/',
        bower = 'bower_components/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
         * Tasks are listed in their run order. Logic behind run order:
         * 1. [less] Compile local LESS to CSS.
         * 2. [concat] Concatenates Bower & local assets, saves to local
         *      - CSS: requires LESS to be compiled. Combine Bower CSS with local CSS.
         *      - JS: Combine Bower JS with local JS
         * 3. [cssmin] Minify CSS (saves to public)
         * 4. [uglify] Minify JS (saves to public)
         * 5. [copy] Copies fonts & images from Bower & local (saves to public)
         * 6. [jade] Compiles local jade templates to public/.
         * 7. [clean] Cleans up files form the build process.
         */
        less: {
            local: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/less',
                        src: ['**/*.less', '**/_*.less'],
                        dest: public_static + 'css',
                        ext: '.build.css'
                    }
                ]
            }
        },
        concat: {
            css: {
                src: [
                    bower + 'bootstrap/dist/css/bootstrap.min.css',
                    bower + 'bootstrap-social/bootstrap-social.css',
                    bower + 'font-awesome/css/font-awesome.min.css',
                    public_static + 'css/**.build.css'
                ],
                dest: public_static + 'css/production.css'
            },
            js: {
                src: [
                    bower + 'jquery/dist/jquery.min.js',
                    bower + 'modernizr/modernizr.js',
                    // Twitter Bootstrap: include the whole thing...
                    bower + 'bootstrap/dist/js/bootstrap.js',
                    // ... OR, just include the bits you want...
                    //bower + 'bootstrap/js/transition.js',
                    //bower + 'bootstrap/js/carousel.js',
                    'src/js/**/*.js'
                ],
                dest: public_static + 'js/production.js'
            }
        },
        cssmin: {
            production: {
                files: {
                    'public/static/css/production.min.css': [public_static + 'css/production.css']
                }
            }
        },
        uglify: {
            production: {
                files: [
                    {
                        expand: true,
                        cwd: public_static + 'js',
                        src: 'production.js',
                        dest: public_static + 'js',
                        ext: '.min.js',
                        flatten: true
                    }
                ]

            }
        },
        copy: {
            local: {
                files: [
                    {expand: true, cwd: 'src/images/', src: '**', dest: public_static + 'images/'}
                ]
            },
            bower: {
                files: [
                    {expand: true, cwd: bower + 'font-awesome/fonts', src: '**', dest: public_static + 'fonts/'},
                    {expand: true, cwd: bower + 'bootstrap/fonts', src: '**', dest: public_static + 'fonts/'}
                ]
            }
        },
        jade: {
            release: {
                options: {
                    pretty: true,
                    data: grunt.file.readJSON('src/html/_locals.json')
                },
                files: [
                    {
                        cwd: 'src/html',
                        src: ['**/*.jade', '!**/_*.jade'],
                        dest: 'public',
                        expand: true,
                        ext: '.html'
                    }
                ]
            }
        },
        clean: {
            devcss: [public_static + 'css/*.build.css']
        },
        watch: {
            options: {
                livereload: true
            },
            gruntfile: { files: 'Gruntfile.js', tasks: ['_default'] },
            templates: {
                files: ['src/html/**/*.jade', 'src/html/**/*.json'],
                tasks: ['html']
            },
            less: {
                files: 'src/less/**/*.less',
                tasks: ['css'],
                options: {
                    livereload: false
                }
            },
            css: {
                files: public_static + 'css/**.css',
                tasks: []
            },
            js: {
                files: 'src/js/**/*.js',
                tasks: ['js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('default', ['_default', 'watch']);
    grunt.registerTask('_default', ['css', 'js', 'html', 'copy:bower']);
    grunt.registerTask('css', ['less', 'concat:css', 'cssmin', 'clean:devcss']);
    grunt.registerTask('js', ['concat:js', 'uglify']);
    grunt.registerTask('html', ['copy:local', 'jade']);
};