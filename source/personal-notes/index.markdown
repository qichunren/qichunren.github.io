---
layout: page
title: "personal_notes"
date: 2012-11-16 13:18
comments: true
sharing: true
footer: true
---

[Install MySQL on Mountain Lion with Homebrew](http://madebyhoundstooth.com/blog/install-mysql-on-mountain-lion-with-homebrew/)
[brew install mysql 1](https://github.com/mxcl/homebrew/blob/93aecfadedfc2c21e30b6c2546aa44caa519c8a2/Library/Formula/mysql.rb)
[brew install mysql on mac os](http://stackoverflow.com/questions/4359131/brew-install-mysql-on-mac-os)

[git checkout remote branch](http://stackoverflow.com/questions/1783405/git-checkout-remote-branch)

[Open Source Web Conferencing:bigbluebutton](https://code.google.com/p/bigbluebutton/)

[Landing Page](https://kippt.com/ederdesign/landing-page)

[Oscar Del Ben](https://github.com/oscardelben) has many useful open source project, such as [rawler](https://github.com/oscardelben/rawler) , [DateCalculations](https://github.com/oscardelben/DateCalculations) , [Color-Picker-Pro](https://github.com/oscardelben/Color-Picker-Pro) [iPhoneCalculator](https://github.com/oscardelben/iPhoneCalculator) , [GithubBrowser](https://github.com/oscardelben/GithubBrowser)




---------
2012-11-17

[How to make Git ignore files that already exist in your project](http://justaddwater.dk/2009/12/07/how-to-make-git-ignore-files-that-already-exist-in-your-project/)
```
git update-index --assume-unchanged config/database.yml
```

----------
2012-11-18
[Using the Singleton Pattern in Objective-C](http://www.duckrowing.com/2010/05/21/using-the-singleton-pattern-in-objective-c/)
[A Single Class Logger in Objective C](http://objectuser.wordpress.com/2010/03/06/a-single-class-logger-in-objective-c/)

[Git Submodule](http://josephjiang.com/entry.php?id=342)

----------
2012-11-20
[Modernizr](http://modernizr.com/docs/) is a JavaScript library that detects HTML5 and CSS3 features in the user’s browser.

```
Modernizr.addTest('flash', function(){
  var hasFlash = (
        (typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") ||
        (window.ActiveXObject && (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) != false)
      );
  return (hasFlash === false || hasFlash === undefined) ? false : true;
});
```

[复制工具](https://github.com/jonrohan/ZeroClipboard)

[github/linguist](https://github.com/github/linguist) 是一个程序语言检测工具, github本身就是使用它的。

[emoji表情](http://www.emoji-cheat-sheet.com/)

[http://patterntap.com/](http://patterntap.com/) 有很多UI设计的case，可以找到灵感

昨天(11-20)是我的生日。没有什么特别的。国庆一起骑车的朋友晚上把他拍的一些照片发给我了，我看了，蛮激动的，有几点照片拍得很牛Ｘ。

------------
2012-11-21

[https://teamtreehouse.com/](https://teamtreehouse.com/) 是一个在线学习技术的网站，界页清爽，内容也蛮多的，推荐。
做一个移动版的名信片应用怎么样？

[https://github.com/danielamitay/iHasApp](https://github.com/danielamitay/iHasApp) 是一个不用apple私有api的探测用户安装的应用的框架。

Chrome浏览器的浏览历史文件位于/Users/qichunren/Library/Application Support/Google/Chrome/Default

[http://www.pin5i.com/](http://www.pin5i.com/)有很多学习资源

-----------
2012-11-23

[ACE]()是一个Ｃ++网络开发的框架。使用ACE框架，我们就可以把重心放在业务的处理上，而不用为底层的系统调用和错误处理费太多脑筋。

[Protocol Buffers ](http://code.google.com/p/protobuf/) 是google提供的一个开源序列化框架，类似于XML，JSON这样的数据表示语言，其最大的特点是基于二进制，因此比传统的XML表示高效短小得多。虽然是二进制数据格式，但并没有因此变得复杂，开发人员通过按照一定的语法定义结构化的消息格式，然后送给命令行工具，工具将自动生成相关的类，可以支持java、c++、python等语言环境。通过将这些类包含在项目中，可以很轻松的调用相关方法来完成业务消息的序列化与反序列化工作。

[Networking for Game Programmers](http://gafferongames.com/networking-for-game-programmers/)
[Game Networking Resources](http://gafferongames.com/2009/01/25/game-networking-resources/)

[multiplayer game synchronization](https://www.google.com/search?hl=zh-CN&newwindow=1&tbo=d&biw=1436&bih=739&q=multiplayer+game+synchronization&oq=multiplayer+game+syc&gs_l=serp.3.0.0i19j0i13i30i19j0i8i13i30i19l2.300180.302267.0.303825.9.9.0.0.0.0.757.2398.2j3j0j3j6-1.9.0...0.0...1c.1.Yd2Ul_N7zmY)

[How to communicate peer-to-peer through NAT (Network Address Translation) firewalls](http://www.mindcontrol.org/~hplus/nat-punch.html)





http://zuroc.42qu.com/po/blog/10763306
晚上总是会冒出很多不知所措的想法

记录一下

对一个写网站的程序员 , 可以针对下面项, 对其打分

1. 项目管理的能力 //给一个产品经理的构想文档 , 让他规划开发工期
2. 文字表达的能力 //看他的博客 , 或者, 让他写某项东西的文档
3. 快速学习的能力 //给一段没有文档, 只有example的代码库, 让他使用
4. 理解产品的能力 //让其观察一个产品,  让他列出存在的问题(和解决方案) , 以及可以去做的事情
5. 搜索答案的能力 //给他几分钟事情 , 可以搜索, 让他给出一个问题的解决思路
6. 吸取教训的能力 //指出不足 , 以及如何去改进 , 看是否会反复犯错
7. 组织社区的能力 //让他去某个社区 , 组织某个活动 ( 比如 , 翻译文章 )
8. 自我总结的能力 //是否会定期反思近期的工作 , 寻找其中的问题, 并谋求解决
9. 设计审美的能力 //让他去写设计简单页面 (比如 , 自己的个人履历页面)
10. 学以致用的能力 //学习新东西, 并应用到工作中(学以致用比单纯学习更重要, 实际工程不是学术研究)
11. 与时俱进的能力 //是否能够了解最近的技术进展 , 并能给出自己的理解, 分析优缺点
12. 沟通交流的能力 //观察他遇到问题的时候, 是否能主动的去在认识的人/网络社区中寻找帮助 , 并能清楚的向别人表达问题
13. 排查错误的能力 //遇到BUG, 观察他定位并修复BUG的思路
14. 高效开发的能力 //给出任务, 看他的完成速度 以及 完成质量
15. 复杂逻辑的能力 //给出一个逻辑复杂的场景 , 看他的代码是否正确 , 并且清晰
16. 知识传播的能力 //是否能传播新技能 , 帮助周围的人提高工作效率
17. 抽象问题的能力 //观察是否会抽象一些代码库, 创建一些开源的子项目 , 来提高开发效率


----------------------
12-03

Ruby gem [Highline](https://github.com/JEG2/highline)

----------------------
12-04

[Getting started with Chef tutorial](http://www.themomorohoax.com/2010/07/31/ruby-chef-tutorial)
[Hand-crafted frontend development:Middleman](https://github.com/middleman/middleman)
Capistrano plugins, recipes and templates. [capitate](http://capitate.rubyforge.org/)

[Show app](http://appyshka.com/appsline/)

[在线学习技术lynda.com](http://www.lynda.com/)

[SDL tutorials](http://lazyfoo.net/SDL_tutorials/lesson01/windows/codeblocks/index.php)


----------------------
12-05

[Fix Missing eth0 When Cloning Ubuntu VMware Virtual Machines](http://www.orzeszek.org/blog/2010/07/25/fix-missing-eth0-when-cloning-ubuntu-vmware-virtual-machines/)
`sudo rm /etc/udev/rules.d/70-persistent-net.rules`

[UI Design dribbble](http://dribbble.com/letsgorally)


-----------------------
12-6
[Creating a Game with CocosBuilder](http://code.zynga.com/2012/10/creating-a-game-with-cocosbuilder/)


-----------------------
git reset --hard origin/master 回到最初状态

12-17
-----------------------
[Susy:Responsive grids for Compass.](http://susy.oddbird.net/guides/getting-started/)
