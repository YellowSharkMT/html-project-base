# HTML Project Base

Requires [NodeJS](http://nodejs.org), [Bower](http://bower.io/), and [Grunt](http://gruntjs.com/) (supports [Live Reload](https://www.npmjs.org/package/livereload), but not required). Based on [Twitter Bootstrap](https://github.com/twitter/bootstrap.git), and includes [Bootstrap Social](http://lipis.github.io/bootstrap-social/), [Font Awesome](http://lipis.github.io/bootstrap-social/), [jQuery](http://jquery.com), and [Modernizr](http://modernizr.com/). If you wish to use the included fabfile, you'll need to have [Fabric](http://fabfile.org) installed on your system.

The `/public` folder is where HTML documents should go, and then serve that folder with your static webserver of choice.

Grunt collects all static assets from the various Bower components and local source folders, minifies CSS & JS, and populates the `/public/static` directory with the required assets.

The fabfile `deploy` task uses `rsync -ravz` to upload local webroot files (./public) to the remote webroot.


# Getting started
To install the required Bower components and Node modules:

    $ bower install && npm install

Remember, to build the static files, you'll need to run Grunt. It's set up to watch local files, so you basically just need to fire it up when you start coding, and leave it running while you develop.