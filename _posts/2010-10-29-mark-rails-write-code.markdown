---
layout: single
title: 写Rails程序容易出现的几个不好的地方
date: 2010-10-29 21:20:33
categories: [ruby, rails]
comments: true
---

这几个地方不知道大家有注意到没有，我今天发现的一个地方就是

{% highlight ruby %}
class EcGood < ActiveRecord::Bas
  #商品分类
  GoodCategory = Category.find(:all).map{|category|[category.cn_n, category.id] }
  #商品品牌
  GoodBrand = EcBrand.find(:all).map{|brand|[brand.brand_name, brand.id] }
end
{% endhighlight %}

在ActiveRecord中有这样的代码，实在不应该啊。

初次一看没有什么问题，可是Ruby代码是自上而下来执行的，这样会给数据库带来无关的查询。解决办法就是将这个封装到方法中去，另外也说明全局变量要少用。

有时间再更新一下这篇文章来反思一下自己。
