---
layout: single
title: "两种javascript定义function的区别"
date: 2008-10-29 18:26:46
comments: true
categories: [javascript]
---

Javascript代码

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

 在以上的代码中，function1()会工作正常，而function2()调用会出错，因为JS解译器发现此时function2还没有定义。