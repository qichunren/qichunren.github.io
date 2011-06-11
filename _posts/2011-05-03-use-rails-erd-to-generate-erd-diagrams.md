---
layout: post
title: 使用Rails ERD生成数据库实体关系图
tags:
- Tool
--- 

[Rails ERD](http://rails-erd.rubyforge.org/) 可以生成数据库关系实体图，非常方便。

安装很方便，Rails ERD依赖Graphviz，所以首先需要安装Graphviz，在Mac下，直接
{% highlight bash －%}
brew update
brew install cairo pango graphviz
{% endhighlight %}   

然后在项目中的Gemfile中声明
{% highlight ruby %}
group :development do
  gem "rails-erd"
end    
{% endhighlight %}
                 
{% highlight bash %}
bundle install        
rake erd    
{% endhighlight %}  

这样，在项目的根目录中，就会生成一个名为ERD.pdf 文件


