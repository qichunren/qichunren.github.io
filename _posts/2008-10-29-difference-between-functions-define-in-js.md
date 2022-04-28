---
layout: single
title: "两种 javascript 定义 function 的区别"
date: 2008-10-29 18:26:46
comments: true
categories: [javascript]
---

Javascript 代码

```
function1(); // works fine
function2(); // causes an error

// This function is accessible before it's defined
function function1() {
    $("body").append("Test 1");
}

// This function is not accessible until after it's defined
var function2 = function() {
    $("body").append("Test 2");
}

```

 在以上的代码中，function1() 会工作正常，而 function2() 调用会出错，因为 JS 解译器发现此时 function2 还没有定义。