---
layout: single
title: 当心 ActiveRecord::RecordNotSaved 异常
date: 2011-02-27 22:01
comments: true
categories: [rails]
---

昨天晚上遇到记录不能保存成功，一直遭遇 ActiveRecord::RecordNotSaved 异常，弄了半小时，找到了原因。

 我发现了我在 model 中的 before_create 中是这样写的
{% highlight ruby %}
before_create :set_default_value # 创建站内信时，设置记录的默认值

def set_default_value
  self.is_trash = false
end
{% endhighlight %}

 这个 callback 方法是返回 false，导致记录不能保存成功，抛出 ActiveRecord::RecordNotSaved 异常。

 我之前以为出现 ActiveRecord::RecordNotSaved 异常，是由于 model 的验证不通过导致的。我把 model 中的验证全都去掉了，还是不成功。 解决方法是让这个方法返回 true
{% highlight ruby %}
before_create :set_default_value # 创建站内信时，设置记录的默认值
def set_default_value
  self.is_trash = false
  true
end
{% endhighlight %}
