---
layout: post
title: Get started with autotools
date: 2016-08-15 15:20
comments: true
categories: Development
---

Follow this [tutorial](https://www.gnu.org/software/automake/manual/html_node/Hello-World.html#Hello-World) to get started with autotools.

### configure.ac文件
使用*autoconf*工具生成configure.scan文件，将它重命名为configure.ac，默认的文件内容如下：

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

Create files:

    src/main.c
    README
    configure.ac
    Makefile.am
    src/Makefile.am

Command `autoreconf --install` parse configure.ac into configure file.
Command `./configure` generate Makefie and src/Makefile from *.am files.

[An Introduction to the Autotools](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html#Autotools-Introduction)


## Resources

* [Automake homepage](https://www.gnu.org/software/automake/)
* [Autotools: a practitioner's guide to Autoconf, Automake and Libtool](http://freesoftwaremagazine.com/books/autotools_a_guide_to_autoconf_automake_libtool/)
* [Step-By-Step Example Of Autotools For Beginner](http://www.aireadfun.com/blog/2012/12/03/study-automake/)
