---
layout: post
title: 当心ActiveRecord::RecordNotSaved异常
tags:
- ActiveRecord
---
             
昨天晚上遇到记录不能保存成功，一直遭遇ActiveRecord::RecordNotSaved异常，弄了半小时，找到了原因。

 我发现了我在model中的before_create中是这样写的       
{% highlight ruby %}
before_create :set_default_value # 创建站内信时，设置记录的默认值 

def set_default_value
  self.is_trash = false 
end
{% endhighlight %}
 
 这个callback方法是返回false，导致记录不能保存成功，抛出ActiveRecord::RecordNotSaved异常。
 
 我之前以为出现 ActiveRecord::RecordNotSaved异常，是由于model的验证不通过导致的。我把model中的验证全都去掉了，还是不成功。 解决方法是让这个方法返回true 
{% highlight ruby %}
before_create :set_default_value # 创建站内信时，设置记录的默认值 
def set_default_value
  self.is_trash = false
  true
end 
{% endhighlight %} 
