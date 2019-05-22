---
layout: single
title: Fix problem annotate is broken with rails 3.1.1
date: 2011-06-03 22:01
comments: true
categories: rails
---

今天在做一个小工具，使用最新的Rails版本3.1.1, 在使用annotate(2.4.0)这个gem的时候出错了：


```
caojinhua:tts_cacher caojinhua$ annotate
/Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/activerecord-3.1.1/lib/active_record/railties/databases.rake:3:in `<top (required)>': undefined method `namespace' for main:Object (NoMethodError)
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/activerecord-3.1.1/lib/active_record/railtie.rb:26:in `load'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/activerecord-3.1.1/lib/active_record/railtie.rb:26:in `block in <class:Railtie>'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/railtie.rb:183:in `call'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/railtie.rb:183:in `block in load_tasks'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/railtie.rb:183:in `each'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/railtie.rb:183:in `load_tasks'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/engine.rb:396:in `block in load_tasks'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/application/railties.rb:8:in `each'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/application/railties.rb:8:in `all'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/engine.rb:396:in `load_tasks'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/application.rb:103:in `load_tasks'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/railtie/configurable.rb:30:in `method_missing'
	from Rakefile:7:in `<top (required)>'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/annotate-2.4.0/lib/annotate.rb:17:in `load'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/annotate-2.4.0/lib/annotate.rb:17:in `load_tasks'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/annotate-2.4.0/bin/annotate:66:in `<top (required)>'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/bin/annotate:19:in `load'
	from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/bin/annotate:19:in `<main>'
```


然后在stackoverflow上找到了解决方法，就是使用最新的annotate.


```
	gem 'annotate', :git => 'git://github.com/ctran/annotate_models.git'
```


### Resources:

[annotate-gem-and-rails-3-1](http://stackoverflow.com/questions/7295505/annotate-gem-and-rails-3-1)