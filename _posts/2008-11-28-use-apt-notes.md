---
layout: single
title: "Ubuntu下apt使用记录"
date: 2008-11-28 08:22
comments: true
categories: [Linux]
---

使用Ubuntu系统安装软件我基本上都是通过apt在线安装的方式完成的，很少是下来源代码编译安装，只有在安装源中没有deb包才手动安装。

我现在通过日常的操作流程和具体场景来说明我是如何使用apt的一系列命令的。

当我想安装一个工具软件或者C库的话，我使用apt-cache search加关键字来查找软件包名。

然后具体查阅一个软件包的详细信息时，我使用apt-cache show加上包名即可，或者apt show也可以。

安装软件包使用sudo apt-get install加上包名即可。

卸载软件包使用sudo apt-get purege/remove

    
