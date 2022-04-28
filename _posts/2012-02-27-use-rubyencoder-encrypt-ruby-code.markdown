---
layout: single
title: "Use Rubyencoder encrypt ruby code"
date: 2012-02-27 13:10
comments: true
categories: ruby
---

前些时候研究了一下 ruby encoder 的加密技术应用，在这里记录一下它的使用过程。

[Ruby Encoder](http://rubyencoder.com/)将 ruby 代码加密成不易阅读的格式，然后通过它提供的加载类型来载入 ruby 代码，从而达到加密的目的。它是一个付费软件，一个许可证要 159 美金，提供试用版，可以试用一个星期，支持 Linux \ FreeBSD \ Mac OS X \ Windows 系统。

首先在 Ruby Encoder 上注册一个帐号，登录进去后，我这里选择下载 Mac OS X 版的，RubyEncoder Trial for Mac OS X（RubyEncoder_1.3_Trial.dmg），下载后，将 dmg 中的程序拖到 applications 目录，就算安装好了。
```
qichunren:~ qichunren$ cd /Applications/RubyEncoder/
qichunren:RubyEncoder qichunren$ ls
Icon?				RubyEncoder_User_Manual.pdf	bin/
README				Start RubyEncoder.app*		rgloader/
```
第一次使用的话，需要它的官方网站给你提供一个许可证文件 (文件名为 encode.lic),进行 Ruby Encoder 的 bin 目录，执行其中的 rubyencoder 文件，它会输出一些它的软件声明信息，一直回车后几次后，阅读完许可声明，它还要求你输入'I AGREE'后，然后输出一个注册码（Reg Key）,要求你登录到它的网站中，在个人帐户里，在页面最下面的 Available Licenses 中填入注册码，然后下载它提供的 encode.lic 文件，放在 Ruby Encoder 的 bin 目录中，现在就可以使用 Ruby Encoder 了。

直接执行一下 rubyencoder 命令，可以先了解一下它的用法。
```
qichunren:bin qichunren$ ./rubyencoder 
RubyEncoder 1.3 Evaluation (built: Aug 31 2010 11:55:25)
Copyright (c) 2008-2010 rubyencoder.com
Supports encoding for Ruby versions: 1.8.6,1.8.7,1.9.0,1.9.1,1.9.2

Usage,    single file: rubyencoder [options] file.rb
       multiple files: rubyencoder [options] file1.rb file2.rb file3.rb
            file mask: rubyencoder [options] "*.rb"
            file list: rubyencoder [options] @filelist

  --ruby <version x.y>              Encode for Ruby ver (1.8 default and/or 1.9)
* --expire <dd/mm/yyyy>             Set script expiration date
* --days <nn>                       Set script expiration days (from today)
* --domain <domain>                 Bind script to domain name
* --domain-encrypt <domain>         Bind and encrypt to domain name (one only)
* --ip <x.x.x.x[/y.y.y.y]>          Bind script to ip/mask
* --ip-encrypt <x.x.x.x[/y.y.y.y]>  Bind and encrypt to ip/mask (one only)
* --mac <x:x:x:x:x:x>               Bind script to mac address
* --external <filename>             Script will require license file to run
* --projid <value>                  Set project id (required for ext license)
* --projkey <value>                 Set project key (required for ext license)
* --time-server <server,server,...> Set time server (for expiration date check)
* script locking options are disabled for evaluation version

  --const name=value                Set custom defined constant
  --catch err=function              Set custom error handler

  -p "code"|@file  Prepend header code
  -j "code"|@file  Change default loader error code
  -b <ext>         Set file extension for backup files (bak is default)
  -b-              Disable backup of source files (be careful!)
  -r               Recurse subdirectories (use quotes for file masks)
  -x "mask"|@list  Exclude files from encoding
  -f "mask"|@list  Encode only these files
  -o <output_dir>  Specify output directory for encoded scripts
  -w               Wait for key press before exit
  -q               Display settings and request confirmation
  -v               Display version number
  -l               Display license information
  -h               Display this help
```

像我给公司做的一个小项目，我只需要加密 rails 目录中的 app 目录就足够了，官方也建议只加密 app 目录就行了，可能是为了避免一些加密问题？
```
qichunren:bin qichunren$ ./rubyencoder --ruby 1.9 /Users/qichunren/code/menu/app/**/*.rb
```
这样就完成了 app 目录中的 rb 代码加密，同时它还备份了原来的 rb 文件，是同名的后缀为 bak 的文件，在部署中应该将.bak 文件都删除掉。还有一件事情要做，需要把 Ruby Encoder 的相当于解密的加载器文件复制到 app 目录中，也就是加密代码的上一级目录里面来，这样项目可以正常执行了。
```
qichunren:RubyEncoder qichunren$ pwd
/Applications/RubyEncoder
qichunren:RubyEncoder qichunren$ cp -r rgloader/ /Users/qichunren/code/menu/app/
```

下面是我咨询的关于 Ruby Encoder 的许可证相关的几个问题的官方回复邮件。
```
Hi,

Thank you for your interest in RubyEncoder. Please find answers below.

> 0. After I paid $159 for RubyEncoder, do I have license to run rubyencoder on different machines for different systems(mac or linux). I have serval machines for development and deployment.
RubyEncoder is licensed per-machine. One license lets you install and
use the encoder to one physical or virtual machine. If you use multiple
machines for development you may purchase additional licenses for $99
each. Note, loaders that are required to run protected files are free.

> 1. I developed on Mac OSX system usually, then deploy my rails application on Linux (Ubuntu 11). This goes well currently. I want to know after encode my rails 3 application on mac, then will it goes well on my deployed Linux machine?
Yes, you encode on your Mac and then install encoded files to your Linux
machine as usual. To run protected files on Linux you need to install
(copy a folder) RubyEncoder loaders for Linux to your rails root folder.
With version 1.3 you can encode your application controllers, helpers
and model rails files. Do not encode any other standard or configuration
rails files. For non-rails Ruby files you may encode any code. Ruby
verisons 1.8.6,1.8.7.1.9.0-1.9.3 are supported.

> 2. After I paid $159 for RubyEncoder, do I have to paid again for your update version? Can I get free follow-on support service and software update?
Once you pay you get 1 year of free support and updates.

> 3. How long is a paid license?
>
A license is time unlimited. Support is included for 1 year since the
date of purchase. We do email support.


Feel free to contact me if you have any further questions.
```