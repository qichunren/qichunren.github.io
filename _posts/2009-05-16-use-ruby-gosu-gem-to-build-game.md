---
layout: single
title: "Ruby游戏开发利器Gosu"
date: 2009-05-16 17:45
comments: true
categories: [ruby, game-dev]
---

在2009年的Railsconf大会上，Hongli Lai和Ninh Bui of Phusion（开发Passenger的家伙）为了展示Ruby语言的强大，能运行3D游戏，他们构建了一个Wolfenstein游戏的山寨版，用的是[Gosu](http://www.libgosu.org/) 游戏开发库。 

![Gosu Logo](http://www.libgosu.org/website_header.png)

Zed Shaw 在游戏中扮演BOSS   

体验方法： 
项目地址：[http://github.com/FooBarWidget/rubystein/tree/master](http://github.com/FooBarWidget/rubystein/tree/master)
Git拖下来：

```
git clone git://github.com/FooBarWidget/rubystein.git （没有Git也可以直接在项目主页中下载） 
```

在运行游戏之前在安装gosu gem 

```
gem install gosu 
```

我是在ubuntu下测试的，为了安装gosu,还要先安装依赖的库： 

```
sudo apt-get install g++ libgl1-mesa-dev libpango1.0-dev libboost-dev libsdl-mixer1.2-dev 
```

在安装好了gosu gem后，直接运行游戏目录中的wolf3d.rb文件： 

```
ruby wolf3d.rb 
```

如图： 
![game preview](http://qichunren.iteye.com/upload/picture/pic/36923/13a5698c-ac4e-3ab5-910a-db865d5648fb.jpg)
 

 
空格键开枪 

很强大吧。 

游戏程序代码的大体结构如下，很简单，很明了： 

```
require 'rubygems'  
require 'gosu'  
  
class GameWindow < Gosu::Window  
  def initialize  
    super(640, 480, false)  
    self.caption = "Gosu Tutorial Game"  
  end  
  
  def update  
   # 更新游戏画面的方法  
  end  
  
  def draw  
    # 游戏画面的绘画方法  
  end  
end  
  
window = GameWindow.new  
window.show  
```


我在gosu的网站又找到了几个case,都很不错，用gosu开发游戏很不错，代码结构很清析和容易理解。 


1.Space Jumper(和雷电类似的游戏) ： 
[下载地址](http://andre.semler-service.de/games/SpaceJumper.zip)


![Space Jumper preview](http://andre.semler-service.de/SJ.png)


2.Space shooter ，这个游戏和上面也差不多 
[项目地址](http://github.com/belen-albeza/space-shooter)


![Space shooter preview](http://farm4.static.flickr.com/3658/3503765473_95c1b36ea4_m.jpg) 


强烈推荐想要用Ruby玩玩游戏开发的同学们用这个[gosu](https://github.com/jlnr/gosu)库。另外好像有一个叫rubygame的开发库，不知道怎么样，有时间也研究一下。

_[我在javaeye上的原文链接](http://www.iteye.com/topic/389181)_

