---
layout: post
title: "在Rails3中使用ajax"
date: 2011-12-22 16:36
comments: true
categories: rails
---

今天写代码的时候突然发现 我之前在Rails3中使用ajax的方式是不太正确的，我走了弯路。

我之前在Rails3项目中使用ajax是这样的：

如果是直接发送一个ajax请求，我就给标签加上:remote => true。如果我在此基础上还要做其它的操作，如ajax表单提交前要对表单字段验证，我之前以为那样UJS就不能搞定了，需要我自己写代码来处理。然后我就使用jquery中的相关ajax操作来处理。

今天我才了解到UJS的AJAX操作已经为我们提供了6个自定义事件方法：

```
ajax:before – right before ajax call
ajax:loading – before ajax call, but after XmlHttpRequest object is created)
ajax:success – successful ajax call
ajax:failure – failed ajax call
ajax:complete – completion of ajax call (after ajax:success and ajax:failure)
ajax:after – after ajax call is sent (note: not after it returns)
```

所以对于上面我说的那个事例，如果要对一个ajax表单在提交前作表单验证或者其它的一些检查，只需要写提交前的检查代码，然后通过事件绑定的方式，将余下的表单ajax提交让UJS来完成，这是多么地简单啊，我以前真是做了好多无用功。

{% codeblock sample code lang:js %}
$(document).ready(function() {
  return $("#new_post_comment").bind("ajax:before", function() {
    if($("#post_comment_body").val()==""){
      return false;
    }
  });
});
{% endcodeblock %}

### 参考资料
[Using Unobtrusive JavaScript and AJAX with Rails 3](http://net.tutsplus.com/tutorials/javascript-ajax/using-unobtrusive-javascript-and-ajax-with-rails-3/)
[Rails 3 Remote Links and Forms Part 2: Data-type (with jQuery)](http://www.alfajango.com/blog/rails-3-remote-links-and-forms-data-type-with-jquery/)