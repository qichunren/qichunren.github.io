---
layout: post
title: 使用ffaker来产生随机数据 
tags:
- ffaker
- Test
---                        

[ffaker](https://github.com/EmmanuelOga/ffaker)是一个用来产生随机name\email之类的工具，可以用在开发时先产生一些有意义的随机数据，将数据写在db/seeds.rb中，这样你就不用每次急燥地添加一些asasddfdsf这样的数据。一个好的工作开发环境，可以让心情舒畅，效率加倍。

在db/seeds.rb中，如果要产生100个用户名，直接这样做：

{% highlight ruby %}
require 'ffaker'
 
 100.times do 
   user = User.new 
   user.name = Faker::Name.name => "David Cao"
   user.email = Faker::Internet.email => "qichunren@cqror.com"
   user.save
 end

{% endhighlight %}
    
我前一段时间，提交了[一点代码](https://github.com/EmmanuelOga/ffaker/pull/9) ，可以产生天朝的姓名：
{% highlight ruby %}
require 'ffaker'

Faker::NameCN.first_name # => 鑫洋
Faker::NameCN.last_name # => 禹
Faker::NameCN.name # => 俊伶漫
{% endhighlight %}    

ffaker目前最新的版本是1.2，可以产生中文的姓名。