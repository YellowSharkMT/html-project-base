# HTML Project Base

## Dependencies

- [NodeJS](http://nodejs.org)
- [Bower](http://bower.io/)
- [Grunt](http://gruntjs.com/)

## Frontend Libraries this provides:

- [Twitter Bootstrap](https://github.com/twitter/bootstrap.git) - [Documentation](//getbootstrap.com/)
- [Bootstrap Social](http://lipis.github.io/bootstrap-social/)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/) - [Examples](http://fortawesome.github.io/Font-Awesome/examples/)
- [jQuery](http://jquery.com)
- [jQuery Mobile](http://jquerymobile.com/) Touch library
- [Modernizr](http://modernizr.com/)

## Other tools:

- **Grunt**: collects all static assets from the various Bower components and local source folders, minifies CSS & JS, and populates the `/public/static` directory with the compiled assets. For a more-detailed breakdown, see the individual `readme.txt` files inside of each of the subdirectories of the `src/` folder. The default task does everything, and ends with watch/livereload, so you basically just need to fire it up when you start coding, and leave it running while you develop.
- **Fabric**: there's a simple `deploy` task available, it uses `rsync -ravz` to upload file from the local webroot (`public/`) to the remote webroot (configured in the fabfile). There's also a `test` task you can use to verify that your credentials to the remote server are correct.

## Getting started

First: install the required Bower components and Node modules:

    $(project_dir) bower install && npm install

Second: serve the `public/` folder:

    $(project_dir) cd public/ && php -S 0.0.0.0:4545 # (just one example, see the public/readme.txt file for more info)

Third: run the Gruntfile & enable LiveReload in your browser.

    $(project_dir) grunt

## Project Layout

All sources are located in the `src/` folder.

- `src/html/`: contains Jade templates; gets published to `public/`.
- `src/images/`: all contents get copied to `public/images/` when the Gruntfile's `html` task.
- `src/js/`: contains all Javascript source files; gets concatenated & published `public/static/js/`, then minified in that same folder.
- `src/less`: contains all LESS source files; gets concatenated & published to `public/static/css/`, then minified in that same folder.

Note that in the `src/html`, `src/js`, and `src/less` directories, files beginning with an underscore character are NOT compiled. Typically you would use this for local files/libs you don't want/need to have compiled, like a `_mixin.less` file, or `_base.jade` file.
