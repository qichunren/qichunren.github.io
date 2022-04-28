---
layout: single
title: 使用 Rails ERD 生成数据库实体关系图
date: 2011-04-25 21:12:12
comments: true
categories: [rails, tool]
---

[Rails ERD](http://rails-erd.rubyforge.org/) 可以生成数据库关系实体图，非常方便。

安装很方便，Rails ERD 依赖 Graphviz，所以首先需要安装 Graphviz，在 Mac 下，直接

```
brew update
brew install cairo pango graphviz
```

然后在项目中的 Gemfile 中声明

{% highlight ruby %}
group :development do
  gem "rails-erd"
end
{% endhighlight %}

```
bundle install
rake erd
```

这样，在项目的根目录中，就会生成一个名为 ERD.pdf 文件


