---
layout: post
title: 网页截屏的方法
tags:
- tool
---

曾经很想有这样一个app, 它可以将微博上用户的微博用图片的形式自动保存起来，留此存照。前几个月的那段时间，微博上很
网页截屏的基本原理就是通过取得webkit渲染（render）的数据来生成图片的，我经过一段时间研究，找到了两个方法来解决这个问题。

一个工具叫[phantomjs](http://www.phantomjs.org/)，另一个工具叫[cutycapt](http://cutycapt.sourceforge.net/)

两个工具都不错，个人比较喜欢使用cutycapt这个工具，它是直接提供一个命令行来生成网页截图的，而前者是通过javascript来调用底层webkit接品(page.render方法)来实现的，两者的侧重点不一样。