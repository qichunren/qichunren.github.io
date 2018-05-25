---
layout: post
title: Get started with autotools
date: 2016-08-15 15:20
comments: true
categories: Development
---

Follow this [tutorial](https://www.gnu.org/software/automake/manual/html_node/Hello-World.html#Hello-World) to get started with autotools.

### configure.ac文件

使用 *autoscan* 工具生成 configure.scan 文件，将它重命名为 configure.ac ，默认的文件内容如下：

    #                                               -*- Autoconf -*-
    # Process this file with autoconf to produce a configure script.

    AC_PREREQ([2.69])
    AC_INIT([FULL-PACKAGE-NAME], [VERSION], [BUG-REPORT-ADDRESS])

    # Checks for programs.

    # Checks for libraries.

    # Checks for header files.

    # Checks for typedefs, structures, and compiler characteristics.

    # Checks for library functions.

    AC_OUTPUT

然后创建如下的项目目录结构:

    src/main.c
    README
    configure.ac
    Makefile.am
    src/Makefile.am

Command `autoreconf --install` parse configure.ac into configure file.
Command `automake` generate Makefile.in files.
Command `./configure` generate Makefie and src/Makefile from Makefile.in files.

我这里有一个基础的使用autotools工具的[项目](https://github.com/qichunren/glib-guide/tree/aa04d7151926ee197b7a16c57ddbff4db8673dc7)，展示了其中最基本的用法。

[An Introduction to the Autotools](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html#Autotools-Introduction)


## Resources

* [Automake homepage](https://www.gnu.org/software/automake/)
* [Autotools: a practitioner's guide to Autoconf, Automake and Libtool](http://freesoftwaremagazine.com/books/autotools_a_guide_to_autoconf_automake_libtool/)
* [Step-By-Step Example Of Autotools For Beginner](http://www.aireadfun.com/blog/2012/12/03/study-automake/)
* [Autotools Mythbuster](https://autotools.io/index.html)
* [Writing GNOME Applications](http://openbooks.sourceforge.net/books/wga/creating-configuration.html)
* [Autotools Mythbuster](https://autotools.io/index.html)
