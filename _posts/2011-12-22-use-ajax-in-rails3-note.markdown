---
layout: single
title: "在 Rails3 中使用 ajax"
date: 2011-12-22 16:36
comments: true
categories: rails
---

今天写代码的时候突然发现 我之前在 Rails3 中使用 ajax 的方式是不太正确的，我走了弯路。

我之前在 Rails3 项目中使用 ajax 是这样的：

如果是直接发送一个 ajax 请求，我就给标签加上:remote => true。如果我在此基础上还要做其它的操作，如 ajax 表单提交前要对表单字段验证，我之前以为那样 UJS 就不能搞定了，需要我自己写代码来处理。然后我就使用 jquery 中的相关 ajax 操作来处理。

今天我才了解到 UJS 的 AJAX 操作已经为我们提供了 6 个自定义事件方法：

```
ajax:before – right before ajax call
ajax:loading – before ajax call, but after XmlHttpRequest object is created)
ajax:success – successful ajax call
ajax:failure – failed ajax call
ajax:complete – completion of ajax call (after ajax:success and ajax:failure)
ajax:after – after ajax call is sent (note: not after it returns)
```

所以对于上面我说的那个事例，如果要对一个 ajax 表单在提交前作表单验证或者其它的一些检查，只需要写提交前的检查代码，然后通过事件绑定的方式，将余下的表单 ajax 提交让 UJS 来完成，这是多么地简单啊，我以前真是做了好多无用功。

```
$(document).ready(function() {
  return $("#new_post_comment").bind("ajax:before", function() {
    if($("#post_comment_body").val()==""){
      return false;
    }
  });
});
```

### 参考资料
[Using Unobtrusive JavaScript and AJAX with Rails 3](http://net.tutsplus.com/tutorials/javascript-ajax/using-unobtrusive-javascript-and-ajax-with-rails-3/)
[Rails 3 Remote Links and Forms Part 2: Data-type (with jQuery)](http://www.alfajango.com/blog/rails-3-remote-links-and-forms-data-type-with-jquery/)