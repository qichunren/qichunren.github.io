---
layout: post
title: Get started with autotools
date: 2016-08-15 15:20
comments: true
categories: Development
---

Follow this [tutorial](https://www.gnu.org/software/automake/manual/html_node/Hello-World.html#Hello-World) to get started with autotools.

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
