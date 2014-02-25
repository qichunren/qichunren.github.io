---
layout: post
title: 在Mac上安装RVM
date: 2011-01-02 09:09:09
comments: true
categories: [ruby, tool]
---

[安装方法](http://beginrescueend.com/rvm/install/)

首先需要安装好git
然后，

```
bash < <(curl -s https://rvm.beginrescueend.com/install/rvm)
```

然后配置一下，

```
echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function' >> ~/.bash_profile
```

使配置文件生效，

```
source .bash_profile
```

rvm notes:

