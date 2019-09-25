---
layout: single
title: 解决Ruby Gem 扩展的交叉编译
date: 2019-09-25 10:20
comments: true
categories: Development
---

Fixed ruby gem package cross compile on ARM / i.MX6 with Buildroot tool. 

[Ariaboard core board](../images/ariaboard-coreboard.jpg)

在 ARM 或者 i.MX6 平台上使用 Ruby 不是一件容易的事情，原因在于 [Buildroot](https://buildroot.org/) 的 [Ruby 包](https://github.com/maximeh/buildroot/blob/master/package/ruby/ruby.mk) 中不支持在目标平台上编译带有 C/C++ 扩展的 GEM　包，像一些常用 GEM 包，如 [Eventmachine](https://github.com/eventmachine/eventmachine)、串口操作的 [ruby-serialport](https://github.com/hparra/ruby-serialport) 等都没有办法在目标平台上使用，只能安装使用纯 Ruby 代码编写的 GEM 包。

![Ruby Buildroot package problem](./images/ruby-buildroot-package-problem.png)

在解决问题的过程中，我查找了不少资料，包括 Buildroot的，包括 gcc 编译相关的，最终都无果。

后来我突发奇想，Ruby 源代码中的 ext 目录的 C 扩展的标准库都可以编译出来，如 socket 、readline 等，那我将 GEM 包的源代码放进 ext 目录中是不是也可以直接作为标准库的一部分给自动编译出来呢？答案是可以的，不过有一些问题需要注意。

观察 [ext 目录](https://github.com/ruby/ruby/tree/master/ext) 中的 C 扩展接口，发现每个 C 扩展目录中带有一个 *extconf.rb* 文件，C 代码直接位于目录中，然后其中的 lib 目录中是 Ruby 的代码。所以我将 GEM 包的 ext 目录中的内容复制到扩展目录中，然后将 GEM 包的 lib 目录也复制到扩展目录，然后正常 configure / make / make install 的步骤就可以了。

下面先在 x86 平台上来验证我的想法:

    wget https://cache.ruby-lang.org/pub/ruby/2.6/ruby-2.6.4.tar.gz
    tar zxf ruby-2.6.4.tar.gz
    wget https://github.com/hparra/ruby-serialport/archive/master.zip 
    unzip master.zip
    cd ruby-2.6.4
    mkdir ext/serialport
    cp -r ../ruby-serialport/ext/* ext/serialport/
    cp -r ../ruby-serialport/lib ext/serialport/
    ./configure --prefix=/usr/local/ruby-2.6.4 --disable-install-doc
    make
    sudo make install
    cd /usr/local/ruby-2.6.4/bin
    ./irb
    irb(main):002:0> require 'serialport'
    => true

成功了，serialport 已经作为标准库的一部分，可以直接使用了。对于在 Buildroot中[编译](https://github.com/maximeh/buildroot/blob/master/package/ruby/ruby.mk)，可以使用 patch 的方法，将 GEM 包加到 ext 中，从而直接解决了交叉编译的难题。

后记：在编译 [Eventmachine](https://github.com/eventmachine/eventmachine) 包的时候，不知道为什么需要手动在 project.h 和 em.h 文件中手动加入 #include "extconf.h" ，可能是 CPP 写的扩展包导致 extconf.h 头文件在 Makefile 中没有生效还是什么原因，待解决。
