/*global module*/
module.exports = function (grunt) {
    "use strict";
    var debug_scripts = false;

    var public_static = 'public/static/',
        local_static = 'static/',
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
         */
        less: {
            local: {
                files: [
                    {expand: true, cwd: local_static + 'less', src: '**/*.less', dest: local_static + 'css', ext: '.css'}
                ]
            }
        },
        concat: {
            css: {
                src: [
                    bower + 'twitter/dist/css/bootstrap.min.css',
                    bower + 'bootstrap-social/bootstrap-social.css',
                    // Bootstrap social depends on font-awesome
                    bower + 'font-awesome/css/font-awesome.min.css',
                    local_static + 'css/style.css'
                ],
                dest: local_static + 'css/production.css'
            },
            js: {
                src: [
                    bower + 'jquery/dist/jquery.min.js',
                    bower + 'modernizr/modernizr.js',
                    // Carousel requires Transition
                    bower + 'bootstrap/js/transition.js',
                    bower + 'bootstrap/js/carousel.js',
                    // Custom build from the JQ Mobile website
                    local_static + 'js/jquery-mobile-touch.min.js',
                    local_static + 'js/source/*.js'
                ],
                dest: local_static + 'js/production.js'
            }
        },
        cssmin: {
            production: {
                files:{
                    'public/static/css/production.min.css': [local_static + 'css/production.css']
                }
            }
        },
        uglify: {
            production: {
                files: [
                    {expand: true, cwd: local_static + 'js', src: 'production.js', dest: public_static + 'js', ext: '.min.js', flatten:true}
                ]
            }
        },
        copy: {
            local: {
                files: [
                    {expand: true, cwd: local_static + 'images/', src: '**', dest: public_static + 'images/'}
                ]
            },
            bower: {
                files: [
                    {expand: true, cwd: bower + 'font-awesome/fonts', src: '**', dest: public_static + 'fonts/'},
                    {expand: true, cwd: bower + 'twitter/fonts', src: '**', dest: public_static + 'fonts/'}
                ]
            }
        },
        watch: {
            templates: {
                files: 'public/**/*.html',
                tasks: [],
                options: {
                    livereload: true
                }
            },
            less: {
                files: local_static + 'less/**/*.less',
                tasks: ['less', 'concat'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: local_static + 'js/source/**/*.js',
                tasks: ['uglify', 'concat'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['less', 'concat', 'cssmin', 'uglify', 'copy', 'watch']);
};