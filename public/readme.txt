Notes for serving the project
=============================

You can serve the project any way you like, you could even view it on your local filesystem. Typically though, you'd want to do something like the following:

- Use PHP to spin up a server on a local port:

    $ /usr/bin/php -S 127.0.0.1:4545

- Use Python to spin up a server on a local port:

    $ /usr/bin/python -m SimpleHTTPServer 4545

- Or set it up as a virtual host in something like Apache or Nginx. Be sure that you set the document root to the `public/` directory, and NOT to the root directory.