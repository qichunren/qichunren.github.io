---
layout: post
title: "开始使用vagrant"
date: 2013-09-22 20:43
comments: true
categories: Tool
---

# Vagrant

[Vagrant](http://www.vagrantup.com/) 是一个虚拟机配置管理工具。

简单来说，Vagrant 可以让你用一个文本文件 Vagrantfile 描述一个虚拟机环境，然后根据你的描述启动这样的一台虚拟机，同时将 Vagrantfile 所在的目录的所有内容，和虚拟机中的 /vagrant 这个目录自动实时同步。入门文档在[这里](http://docs.vagrantup.com/v2/getting-started/index.html)。

## Get started

1. 下载vagrant, 从[http://downloads.vagrantup.com/](http://downloads.vagrantup.com/)页面中，根据自己的操作系统平台选择相应的版本下载，我在写这个文档的时候它的最新版本是*v1.3.1*
2. 安装完成后，在命令行终端中会有一个vagrant命令。
3. 进行自己平时的工作目录，执行

```
git clone git@github.com:qichunren/luna-vagrant.git
cd luna-vagrant
vagrant box add precise64 http://files.vagrantup.com/precise64.box # 下载box，它是一个VirtualBox虚拟机导出的文件，版本是Ubuntu 12.04 LTS 64位
vagrant up
```

自己的工作目录（就是luna-vagrant项目的上一层项目）是实时与虚拟机中的/code目录保持同步。
luna-vagrant目录是实时与虚拟机中的/vagrant目录保持同步。

## 常用命令

```
vagrant up  # 启动虚拟机
vagrant ssh # ssh登录机器
vagrant halt # 关闭虚拟机
vagrant destory # 删除虚拟机
vagrant status # 显示虚拟机状态
```

## FAQ

1. 怎么样添加box?
  vagrant box add precise64 http://files.vagrantup.com/precise64.box




