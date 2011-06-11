---
layout: post
title: 使用Unicorn
tags: Deploy
---         

gem install unicorn

Then add gem 'unicorn' to Gemfile.
bundle exec unicorn_rails to start rails app at 8080 port.

        usermatoMacBook-Pro:v2 qichunren$ bundle exec unicorn_rails
        I, [2011-05-12T10:45:20.791629 #1162]  INFO -- : listening on addr=0.0.0.0:8080 fd=3
        I, [2011-05-12T10:45:20.792133 #1162]  INFO -- : worker=0 spawning...
        I, [2011-05-12T10:45:20.793803 #1162]  INFO -- : master process ready
        I, [2011-05-12T10:45:20.795600 #1163]  INFO -- : worker=0 spawned pid=1163
        I, [2011-05-12T10:45:20.796102 #1163]  INFO -- : Refreshing Gem list
        worker=0 ready

                     
