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