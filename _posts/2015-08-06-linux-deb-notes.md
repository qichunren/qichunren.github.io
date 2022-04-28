---
layout: single
title: Linux Deb package notes
date: 2015-08-06 20:30
comments: true
categories: Development
---

使用 dh_make 命令可以在项目中生成默认的 debian 目录，此 debian 目录中包含了默认的 deb 打包规范的一系列文件。

    dh_make --createorig --single -e whyruby@gmail.com -c gpl
    
需要注意的是在项目目录中执行 dh_make 命令的时候，会提示项目目录必须要是 project-name-1.0 类似的形式。

在 dh_make 命令执行后，继续运行

    dpkg-buildpackage -uc -us
    
会在当前项目目录的上一层生成 deb 文件。

deb 包的构建规范中规定了一系列的规则，最常用的有安装时的文件路经对应，此文件位于 debian/install 中，如将编译文件的可执行文件将安装的/usr/bin 目录，将程序执行图标文件放在/usr/share/applications 目录。install 文件中类似这样：

    bin/new-pis usr/bin
    new-pis.desktop /usr/share/applications
    new-pis-icon.png /usr/share/pixmaps
    db/data.db /var/lib/new-pis
    
debian 目录中其它的文件如提供 cron job 的文件，日志文件分割等以后深究。



### References

 * [Basics of the Debian package management system ](https://www.debian.org/doc/manuals/debian-faq/ch-pkg_basics.en.html)
 * [Guide for Debian Maintainers](https://www.debian.org/doc/manuals/debmake-doc/index.en.html)
 * [Debian Binary Package Building HOWTO](http://www.tldp.org/HOWTO/Debian-Binary-Package-Building-HOWTO/index.html)