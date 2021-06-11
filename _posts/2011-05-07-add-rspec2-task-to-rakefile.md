---
layout: single
title: 将Rspec的测试任务添加到Rakefile中
tags: Rspec
---

写好Rspec测试好，一般是通过rspec spec/xxx_spec.rb这样来进行测试，这样不能批量进行多个spec文件的测试，解决方法是将rspec的测试任务添加了项目根目录中的Rakefile文件中去，以后直接执行rake或者rake spec就直接测试所有用例了。

{% highlight ruby %}
require "rubygems"
require 'rake'
require 'rspec/core/rake_task'

task :default => :spec

RSpec::Core::RakeTask.new(:spec) do |t|
  t.pattern = Dir.glob('spec/**/*_spec.rb')
  t.rspec_opts = '--format progress -c'
end
{% endhighlight %}

### Resources

+ [RSpec Rake Task](http://lukaszwrobel.pl/blog/rspec-rake-task) 已过期，它是Rspec 1
+ [rspec/core/rake_task.rb](https://github.com/rspec/rspec-core/blob/master/lib/rspec/core/rake_task.rb)
+ [rake test in rails project](https://github.com/rspec/rspec-rails/blob/master/lib/rspec/rails/tasks/rspec.rake)