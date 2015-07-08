#!/bin/bash
cd dist
rm -r bower_components/
rm -r cdnjs.cloudflare.com/
cd ..
\cp -r dist/* /usr/share/nginx/html/app/