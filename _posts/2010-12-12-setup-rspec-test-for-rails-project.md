---
layout: single
title: 建立 rspec 测试的环境
tags:
- rspec
---

我个人感觉 rspec 的风格比 rails 自带项目的 test 好用一些，更符合我的口味。在这里记录一下 rspec 的搭建方法，说是搭建，其实没有那么烦琐，就是一些工具的组合起来，这样测试更方便，效率更高。

{% highlight ruby %}
# in Gemfile
group :test, :development do
  gem "rspec-rails", "~> 2.5.0"
  gem 'shoulda-matchers', "1.0.0.beta1"
  gem 'factory_girl_rails', "1.0.1"
end
{% endhighlight %}

然后 bundle install,
然后 rails g rspec:install
然后你可以将默认的 test 目录删除掉。

然后，rails g controller pages test 来试试，现在生成的测试代码再也不是原来的 unit test 代码了，是用了新的 rspec 了。

rspec2 将 rails 项目中的测试分为几块：
controllers
models
helpers
lib
views
requests
routing

划分得蛮细的，每一部分测试相对应的代码。
