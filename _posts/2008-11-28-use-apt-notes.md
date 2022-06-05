---
layout: single
title: "Ubuntu 下 apt 使用记录"
date: 2008-11-28 08:22
comments: true
categories: [Linux]
---

使用 Ubuntu 系统安装软件我基本上都是通过 apt 在线安装的方式完成的，很少是下来源代码编译安装，只有在安装源中没有 deb 包才手动安装。

我现在通过日常的操作流程和具体场景来说明我是如何使用 apt 的一系列命令的。

当我想安装一个工具软件或者 C 库的话，我使用 apt-cache search 加关键字来查找软件包名。

然后具体查阅一个软件包的详细信息时，我使用 apt-cache show 加上包名即可，或者 apt show 也可以。

安装软件包使用 sudo apt-get install 加上包名即可。

卸载软件包使用 sudo apt-get purege/remove
