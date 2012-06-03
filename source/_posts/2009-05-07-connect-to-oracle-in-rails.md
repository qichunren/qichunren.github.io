---
layout: post
title: Rails中连接Oracle数据库
date: 2009-05-07 12:01
comments: true
categories: [ruby, rails, database, oracle]
---

### 步骤 
* 在Oracle官方网站下载sdk-10.2.0.5.0-linux-x64.zip和basic-10.2.0.5.0-linux-x64.zip这两个文件。将这两个文件放在同一个地方，然后分别执行：
    
    unzip sdk-10.2.0.5.0-linux-x64.zip
    unzip basic-10.2.0.5.0-linux-x64.zip   
    
这样执行后，会在当前目录下有一个instantclient_10_2目录，刚才解压的zip文件的内容就在其中。  
* 安装Ruby-OCI2:
在安装Ruby-OCI2之前必须要先配置LD_LIBRARY_PATH变量
        export LD_LIBRARY_PATH=/opt/instantclient_10_2/ 
* 然后
        gem install ruby-oci8     
    
* 安装adapter for rails:
        gem install activerecord-oracle_enhanced-adapter   


### Resources
+ [OracleInstantClient下载](http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html)
+ [oracle-enhanced adapter](http://github.com/rsim/oracle-enhanced)