---
layout: single
title: 使用 Unicorn
date: 2011-05-12 23:12:12
comments: true
categories: [rails, deploy]
---
### Install

```
gem install unicorn
```

Then add gem 'unicorn' to Gemfile.
bundle exec unicorn_rails to start rails app at 8080 port.

```
caojinhua:qichunren.github.com caojinhua$ unicorn_rails --help
Usage: unicorn_rails [ruby options] [unicorn_rails options] [rackup config file]
Ruby options:
  -e, --eval LINE          evaluate a LINE of code
  -d, --debug              set debugging flags (set $DEBUG to true)
  -w, --warn               turn warnings on for your script
  -I, --include PATH       specify $LOAD_PATH (may be used more than once)
  -r, --require LIBRARY    require the library, before executing your script
unicorn_rails options:
  -o, --host HOST          listen on HOST (default: 0.0.0.0)
  -p, --port PORT          use PORT (default: 8080)
  -E, --env RAILS_ENV      use RAILS_ENV for defaults (default: development)
  -D, --daemonize          run daemonized in the background
  -l {HOST:PORT|PATH},     listen on HOST:PORT or PATH
      --listen             this may be specified multiple times
                           (default: 0.0.0.0:8080)
  -c, --config-file FILE   Unicorn-specific config file

      --path PATH          Runs Rails app mounted at a specific path.
                           (default: /)
Common options:
  -h, --help               Show this message
  -v, --version            Show version
```

This is a smaple unicorn config file:

```
worker_processes 2
working_directory "/www/temp/ntmenu2/current"
listen 3000, :tcp_nopush => true
timeout 30
pid "/www/temp/ntmenu2/current/tmp/pids/unicorn.pid"
stderr_path "/www/temp/unicorn.stderr.log"
stdout_path "/www/temp/unicorn.stdout.log"
```


