---
layout: post
title: 使用Rails ERD生成数据库实体关系图
date: 2011-04-25 21:12:12
comments: true
categories: [rails, tool]
---

[Rails ERD](http://rails-erd.rubyforge.org/) 可以生成数据库关系实体图，非常方便。

安装很方便，Rails ERD依赖Graphviz，所以首先需要安装Graphviz，在Mac下，直接

```
brew update
brew install cairo pango graphviz
```

然后在项目中的Gemfile中声明

{% highlight ruby %}
group :development do
  gem "rails-erd"
end
{% endhighlight %}

```
bundle install
rake erd
```

这样，在项目的根目录中，就会生成一个名为ERD.pdf 文件


