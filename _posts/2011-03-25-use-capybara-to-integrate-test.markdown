---
layout: single
title: 使用 capybara 来自动化测试业务流程
date: 2011-03-25 21:12:12
comments: true
categories: [rails, test]
---

[capybara](https://github.com/jnicklas/capybara) 是一个基于 [webrat](https://github.com/brynary/webrat)

修改的浏览器测试工具，我最近使用它来为我做的后台系统自动化一些工作，而不用我每次重复了无意义的步骤。
  使用 capybara 可以良好地访问有 javascript 脚本的页面，但是有一个问题就是如果你页面中有 confirm 这个的等待用户点击“确定”的对话框时 capybaray 就无能为力了，我在 stackoverfollow 上找到了解决办法，就是直接让 confirm 方法返回 true:
```
   page.evaluate_script('window.confirm = function() { return true; }')
```

   下面这个例子来自我项目中 [真实的代码](https://gist.github.com/884682) 可以测试一个用户的认证操作，以 test 开头的方法都会执行。

