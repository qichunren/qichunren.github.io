---
layout: single
title: "使用SSH代理来访访问远程mysql机器"
date: 2012-06-04 17:31
comments: true
categories: [linux]
---

默认安装的mysql的Linux机器基于安全的原因，一般不支持mysql的远程连接访问。有几种方法可以修改配置来让mysql服务器支持远程连接。但是通过ssh的代理功能，可以不用修改服务器配置，来支持从远程连接mysql服务器。

在本地通过ssh连接远程的mysql所在的服务器

```
ssh -L 1036:localhost:3306 root@xxx.xx.xx.xxx
```

这样就将远程的mysql主机代理到本地了，端口是1036。 [SSH](http://zh.wikipedia.org/zh/SSH)太强大了
