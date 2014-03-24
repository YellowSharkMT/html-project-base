HTML Project Base

Requires NodeJS, Bower, and Grunt (supports Live Reload, but not required). Based on Twitter Bootstrap, and includes Bootstrap Social, Font Awesome, jQuery, and Modernizr. If you wish to use the included fabfile, you'll need to have Fabric installed on your system.

The /public folder is where HTML documents should go, and then serve that folder with your static webserver of choice.

Grunt collects all static assets from the various Bower components and local source folders, minifies CSS & JS, and populates the /public/static directory with the required assets.

The fabfile deploy task uses `rsync -ravz` to upload local webroot files (./public) to the remote webroot.


# Getting started
To install the required Bower components and Node modules:

    $ bower install && npm install

Remember, to build the static files, you'll need to run Grunt. It's set up to watch local files, so you basically just need to fire it up whe3n ou start coding, and lave it running while you develop.