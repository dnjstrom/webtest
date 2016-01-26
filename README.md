Docker/Express/MongoDB test stack
=================================

This project defines a sample docker project with an automatically reloading development environment and a stable production image. Also illustrates using docker compose to coordinate several images at once.



Development
-----------

Simply run:

    docker-compose up

and docker-compose will set up an Express webserver and a MongoDB database in separate microservices. Alternatively, you can run just the webserver with:

		docker run -ti -p=80:3000 -v=`pwd`:/docker -w=/docker node:5.5-slim npm start

The webserver application code will be dynamically mounted inside the container and the webserver automatically restarted on changes. Note that when running docker in a virtual machine (such as with boot2docker) filesystem file-change notifications are not forwarded between host and VM. This is why we're using plain polling for detecting changes to application files. This should work for smaller projects, though for larger you might want to look at [rsync](https://en.wikipedia.org/wiki/Rsync) or [docker-osx-dev](https://github.com/brikis98/docker-osx-dev).


Production
----------

(This section is currently in progress)

You can build a production-ready webserver image by running the following command:

		docker build -t DEMStack .

This will copy over the source files to the image creating a completely self-contained unit. Next you can run the image using something like:

		docker run -it DEMStack -l=asdf:adsf -p=8080:3000

