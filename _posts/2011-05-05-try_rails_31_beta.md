---
layout: single
title: 初试 Rails 3.1 Beta
tags: Rails3
---
看到[消息](http://weblog.rubyonrails.org/2011/5/5/rails-3-1-beta-1-released) 说 Rails3.1 Beta 出来了，我立刻就想试试，先从大体上了解一下看做了哪些改变。
```
usermatoMacBook-Pro:code qichunren$ rvm use 1.9.2
Using /Users/qichunren/.rvm/gems/ruby-1.9.2-p0
usermatoMacBook-Pro:jjsc_web_backend qichunren$ gem install rails --pre
Successfully installed multi_json-1.0.1
Successfully installed activesupport-3.1.0.beta1
Successfully installed i18n-0.6.0beta1
Successfully installed activemodel-3.1.0.beta1
Successfully installed rack-1.3.0.beta
Successfully installed rack-cache-1.0.1
Successfully installed rack-test-0.6.0
Successfully installed rack-mount-0.7.2
Successfully installed hike-1.0.0
Successfully installed sprockets-2.0.0.beta.2
Successfully installed tzinfo-0.3.27
Successfully installed erubis-2.7.0
Successfully installed actionpack-3.1.0.beta1
Successfully installed arel-2.1.0
Successfully installed activerecord-3.1.0.beta1
Successfully installed activeresource-3.1.0.beta1
Successfully installed mail-2.3.0
Successfully installed actionmailer-3.1.0.beta1
Successfully installed rack-ssl-1.3.2
Successfully installed railties-3.1.0.beta1
Successfully installed rails-3.1.0.beta1
21 gems installed
Installing ri documentation for multi_json-1.0.1...
Building YARD (yri) index for multi_json-1.0.1...
Installing ri documentation for activesupport-3.1.0.beta1...
Building YARD (yri) index for activesupport-3.1.0.beta1...
Installing ri documentation for i18n-0.6.0beta1...
Building YARD (yri) index for i18n-0.6.0beta1...
Installing ri documentation for activemodel-3.1.0.beta1...
Building YARD (yri) index for activemodel-3.1.0.beta1...
Installing ri documentation for rack-1.3.0.beta...
Building YARD (yri) index for rack-1.3.0.beta...
Installing ri documentation for rack-cache-1.0.1...
Building YARD (yri) index for rack-cache-1.0.1...
Installing ri documentation for rack-test-0.6.0...
Building YARD (yri) index for rack-test-0.6.0...
Installing ri documentation for rack-mount-0.7.2...
Building YARD (yri) index for rack-mount-0.7.2...
Installing ri documentation for hike-1.0.0...
Building YARD (yri) index for hike-1.0.0...
Installing ri documentation for sprockets-2.0.0.beta.2...
Building YARD (yri) index for sprockets-2.0.0.beta.2...
Installing ri documentation for tzinfo-0.3.27...
Building YARD (yri) index for tzinfo-0.3.27...
Installing ri documentation for erubis-2.7.0...
Building YARD (yri) index for erubis-2.7.0...
Installing ri documentation for actionpack-3.1.0.beta1...
Building YARD (yri) index for actionpack-3.1.0.beta1...
Building YARD (yri) index for arel-2.1.0...
Installing ri documentation for activerecord-3.1.0.beta1...
Building YARD (yri) index for activerecord-3.1.0.beta1...
Installing ri documentation for activeresource-3.1.0.beta1...
Building YARD (yri) index for activeresource-3.1.0.beta1...
Installing ri documentation for mail-2.3.0...
Building YARD (yri) index for mail-2.3.0...
Installing ri documentation for actionmailer-3.1.0.beta1...
Building YARD (yri) index for actionmailer-3.1.0.beta1...
Installing ri documentation for rack-ssl-1.3.2...
Building YARD (yri) index for rack-ssl-1.3.2...
Installing ri documentation for railties-3.1.0.beta1...
Building YARD (yri) index for railties-3.1.0.beta1...
Installing ri documentation for rails-3.1.0.beta1...
file 'lib' not found
Building YARD (yri) index for rails-3.1.0.beta1...
Installing RDoc documentation for multi_json-1.0.1...
Installing RDoc documentation for activesupport-3.1.0.beta1...
Installing RDoc documentation for i18n-0.6.0beta1...
Installing RDoc documentation for activemodel-3.1.0.beta1...
Installing RDoc documentation for rack-1.3.0.beta...
Installing RDoc documentation for rack-cache-1.0.1...
Installing RDoc documentation for rack-test-0.6.0...
Installing RDoc documentation for rack-mount-0.7.2...
Installing RDoc documentation for hike-1.0.0...
Installing RDoc documentation for sprockets-2.0.0.beta.2...
Installing RDoc documentation for tzinfo-0.3.27...
Installing RDoc documentation for erubis-2.7.0...
Installing RDoc documentation for actionpack-3.1.0.beta1...
Installing RDoc documentation for activerecord-3.1.0.beta1...
Installing RDoc documentation for activeresource-3.1.0.beta1...
Installing RDoc documentation for mail-2.3.0...
Installing RDoc documentation for actionmailer-3.1.0.beta1...
Installing RDoc documentation for rack-ssl-1.3.2...
Installing RDoc documentation for railties-3.1.0.beta1...
Installing RDoc documentation for rails-3.1.0.beta1...
file 'lib' not found
usermatoMacBook-Pro:code qichunren$ rails -v
Rails 3.1.0.beta1
```

看看 rails 命令有没有一些改动：
```
usermatoMacBook-Pro:code qichunren$ rails --help
Usage:
  rails new APP_PATH [options]

Options:
  -r, [--ruby=PATH]              # Path to the Ruby binary of your choice
                                 # Default: /Users/qichunren/.rvm/rubies/ruby-1.9.2-p0/bin/ruby
  -b, [--builder=BUILDER]        # Path to a application builder (can be a filesystem path or URL)
  -m, [--template=TEMPLATE]      # Path to an application template (can be a filesystem path or URL)
      [--skip-gemfile]           # Don't create a Gemfile
  -G, [--skip-git]               # Skip Git ignores and keeps
  -O, [--skip-active-record]     # Skip Active Record files
  -d, [--database=DATABASE]      # Preconfigure for selected database (options: mysql/oracle/postgresql/sqlite3/frontbase/ibm_db/jdbcmysql/jdbcsqlite3/jdbcpostgresql)
                                 # Default: sqlite3
  -j, [--javascript=JAVASCRIPT]  # Preconfigure for selected JavaScript library
                                 # Default: jquery
  -J, [--skip-javascript]        # Skip JavaScript files
      [--dev]                    # Setup the application with Gemfile pointing to your Rails checkout
      [--edge]                   # Setup the application with Gemfile pointing to Rails repository
  -T, [--skip-test-unit]         # Skip Test::Unit files
      [--old-style-hash]         # Force using old style hash (:foo => 'bar') on Ruby >= 1.9

Runtime options:
  -f, [--force]    # Overwrite files that already exist
  -p, [--pretend]  # Run but do not make any changes
  -q, [--quiet]    # Supress status output
  -s, [--skip]     # Skip files that already exist

Rails options:
  -h, [--help]     # Show this help message and quit
  -v, [--version]  # Show Rails version number and quit

Description:
    The 'rails new' command creates a new Rails application with a default
    directory structure and configuration at the path you specify.

Example:
    rails new ~/Code/Ruby/weblog

    This generates a skeletal Rails installation in ~/Code/Ruby/weblog.
    See the README in the newly created application to get going.
usermatoMacBook-Pro:code qichunren$
```

继续建立一个新项目
```
usermatoMacBook-Pro:code qichunren$ rails new rails3
      create
      create  README
      create  Rakefile
      create  config.ru
      create  .gitignore
      create  Gemfile
      create  app
      create  app/assets/images/rails.png
      create  app/assets/javascripts/application.js
      create  app/assets/stylesheets/application.css
      create  app/controllers/application_controller.rb
      create  app/helpers/application_helper.rb
      create  app/mailers
      create  app/models
      create  app/views/layouts/application.html.erb
      create  app/mailers/.gitkeep
      create  app/models/.gitkeep
      create  config
      create  config/routes.rb
      create  config/application.rb
      create  config/environment.rb
      create  config/environments
      create  config/environments/development.rb
      create  config/environments/production.rb
      create  config/environments/test.rb
      create  config/initializers
      create  config/initializers/backtrace_silencers.rb
      create  config/initializers/inflections.rb
      create  config/initializers/mime_types.rb
      create  config/initializers/secret_token.rb
      create  config/initializers/session_store.rb
      create  config/initializers/wrap_parameters.rb
      create  config/locales
      create  config/locales/en.yml
      create  config/boot.rb
      create  config/database.yml
      create  db
      create  db/seeds.rb
      create  doc
      create  doc/README_FOR_APP
      create  lib
      create  lib/tasks
      create  lib/tasks/.gitkeep
      create  log
      create  log/.gitkeep
      create  public
      create  public/404.html
      create  public/422.html
      create  public/500.html
      create  public/favicon.ico
      create  public/index.html
      create  public/robots.txt
      create  script
      create  script/rails
      create  test/fixtures
      create  test/fixtures/.gitkeep
      create  test/functional
      create  test/functional/.gitkeep
      create  test/integration
      create  test/integration/.gitkeep
      create  test/unit
      create  test/unit/.gitkeep
      create  test/performance/browsing_test.rb
      create  test/test_helper.rb
      create  tmp/cache
      create  tmp/cache/.gitkeep
      create  vendor/assets/stylesheets
      create  vendor/assets/stylesheets/.gitkeep
      create  vendor/plugins
      create  vendor/plugins/.gitkeep
usermatoMacBook-Pro:code qichunren$
```

创建一个 scaffold user 后，发现在页面里/assets/application.js 中包括了 jQuery 1.6，还有 rails.js for jquery 这个。再也不需要之前的那个手工引入 jQuery 了，或者使用 jquery-rails 这个 gem.
另外还生成有一个/assets/user.js.coffee 文件，得要花时间学一下这个[coffee-script](https://github.com/jashkenas/coffee-script)了。

还发现一个有趣的现象，rails 团队似乎偏爱 json，在 scaffold 生成的代码中没有了以前的 xml format
{% highlight ruby %}
def index
  @users = User.all

  respond_to do |format|
    format.html # index.html.erb
    format.json { render json: @users }
  end
end
{% endhighlight %}

另外多了一个 assets 的 generator:
```
Example:
    `rails generate assets posts`

    Posts assets.
        Javascript:     app/assets/javascripts/posts.js
        Stylesheet:     app/assets/stylesheets/posts.css
```

总体上看，变化不大，将 jQuery，coffee_script,scss 加入默认了。一切都继续演进。

