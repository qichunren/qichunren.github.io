---
layout: single
title: "使用 SSH 代理来访访问远程 mysql 机器"
date: 2012-06-04 17:31
comments: true
categories: [linux]
---

默认安装的 mysql 的 Linux 机器基于安全的原因，一般不支持 mysql 的远程连接访问。有几种方法可以修改配置来让 mysql 服务器支持远程连接。但是通过 ssh 的代理功能，可以不用修改服务器配置，来支持从远程连接 mysql 服务器。

在本地通过 ssh 连接远程的 mysql 所在的服务器

```
ssh -L 1036:localhost:3306 root@xxx.xx.xx.xxx
```

这样就将远程的 mysql 主机代理到本地了，端口是 1036。 [SSH](http://zh.wikipedia.org/zh/SSH)太强大了
