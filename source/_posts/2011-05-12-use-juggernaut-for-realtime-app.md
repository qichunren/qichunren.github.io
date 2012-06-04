---
layout: post
title: 使用Juggernaut
date: 2011-05-12 09:12:12
comments: true
categories: [rails, web]
---           

[Juggernaut](https://github.com/maccman/juggernaut)是基于[Node.js](http://nodejs.org/)的一个实时(Realtime)Web的解决方案。使用起来很方便。

### 安装方法

1. 安装Node.js: brew install node
2. 安装[Redis](http://code.google.com/p/redis): brew install redis
3. 安装[NPM](http://npmjs.org/): curl http://npmjs.org/install.sh | sh
4. 安装Juggernaut: 这个会把Juggernaut安装到当前目录，所以我应该先进行项目的/vendor/third目录，然后执行 npm install juggernaut 

```
    usermatoMacBook-Pro:third qichunren$ npm install juggernaut
    redis@0.5.11 ./node_modules/juggernaut/node_modules/redis
    node-static-maccman@0.5.3 ./node_modules/juggernaut/node_modules/node-static-maccman
    socket.io@0.6.17 ./node_modules/juggernaut/node_modules/socket.io
    juggernaut@2.0.4 ./node_modules/juggernaut
    usermatoMacBook-Pro:third qichunren$  
```

5. 安装Juggernaut gem:
 
```
gem install juggernaut
```

### 使用方法                              

我们在自己的项目中只需要引入http://localhost:8080/application.js 这个js文件即可。
然后在页面中可以这样接收服务器端的消息： 
  
{% codeblock lang:html %}
<script type="text/javascript" charset="utf-8">
  var jug = new Juggernaut;
  jug.subscribe("channel1", function(data){
    console.log("Got data: " + data);
  });
</script>         
{% endcodeblock %}

服务器端直接发消息：  

{% codeblock lang:ruby %}
require "juggernaut"
Juggernaut.publish("channel1", "Some data")  
{% endcodeblock %}  

另外在启动了Juggernaut后，它默认在8080端口上有一个Helloword的应用，可以了解一下。

