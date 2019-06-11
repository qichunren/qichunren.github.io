---
layout: single
position: Developer
title: Get started with Docker
---

Check docker process:

    $ ps -ef | grep docker
    /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock

Check docker version:

    $ docker --version
    Docker version 18.09.6, build 481bc77

Check docker info:

    $ docker info
    Containers: 5
    Running: 0
    Paused: 0
    Stopped: 5
    Images: 2
    Server Version: 18.09.6
    Storage Driver: overlay2
    ...

List all docker images download:

    $ docker image ls    
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    ubuntu              latest              d131e0fa2585        3 weeks ago         102MB
    hello-world         latest              fce289e99eb9        4 months ago        1.84kB    

List all containers:

    $ docker container ls --all
    
    CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
    d7bfaa6f1ce4        ubuntu              "bash"              2 weeks ago         Exited (0) 2 weeks ago                         dazzling_stonebraker
    e0b42e308fbf        ubuntu              "bash"              2 weeks ago         Exited (127) 2 weeks ago                       kind_cori
    6134ba0a79ea        ubuntu              "bash"              2 weeks ago         Exited (0) 2 weeks ago                         mystifying_gauss
    e05c8a7f913c        hello-world         "/hello"            2 weeks ago         Exited (0) 2 weeks ago                         festive_feynman
    69bbeba04e34        hello-world         "/hello"            2 weeks ago         Exited (0) 2 weeks ago                         eloquent_newton

Stop running container:

    $ docker stop [CONTAINER ID]

## Build a docker image

Create a `Dockerfile` file in your project root path. There is a sample for ruby project:

    FROM ruby:2.6.3
    # throw errors if Gemfile has been modified since Gemfile.lock
    RUN gem install bundler
    RUN bundle config --global frozen 1
    WORKDIR /usr/src/app
    COPY . .
    RUN bundle install
    CMD ["./dev-start.sh"]

Build run command to build a image from docker image ruby:2.6.3

    $ docker build -t you_app_img .  # Create image using this directory's Dockerfile

Then run it:

    $ docker run you_app_img



## References

* https://docs.docker.com/get-started/