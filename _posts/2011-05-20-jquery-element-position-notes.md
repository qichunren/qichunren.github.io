---
layout: single
title: Juqery中元素位置的几个方法笔记
date: 2011-05-09 11:30
comments: true
categories: [web, html5]
--- 

Juqery中元素位置的几个方法笔记

最近在研究页面滚动时，研究了Jquery中几个方法。记录一下。

### offset function

offset()方法返回一个元素在整个document中的位置，返回结果是一个对象, 类似 Object { top: 2593.199951171875, left: 452.5 }

### 屏幕和窗口尺寸

$(window).width()和$(window).height()返回当前网页窗口的可视部分的宽度和高度，窗口放大和缩小后会相应变化。

$(document).width()和$(document).height()是返回浏览器渲染的页面尺寸。


### window的scrollTop function

$(window).scrollTop()返回滚动条相对于其顶部的偏移。


通过下面一个操作示例可以理解以上说明的关系：

打开一个网页，滚动条位于顶部：

$(window).scrollTop(); # return 0
$(window).height();    # return 1080
$(document).height();  # return 3376

然后将网页果冻到最底部：
$(window).scrollTop(); # return 2296

你会发现 3376-1080=2296

### 滚动窗口到某个元素的位置

$('html, body').animate({scrollTop: $("#page").offset().top}, 2000);