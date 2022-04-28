---
layout: single
title: Rails 中连接 Oracle 数据库
date: 2009-05-07 12:01
comments: true
categories: [ruby, rails, database, oracle]
---

### 步骤
 
* 在 Oracle 官方网站下载 sdk-10.2.0.5.0-linux-x64.zip 和 basic-10.2.0.5.0-linux-x64.zip 这两个文件。将这两个文件放在同一个地方，然后分别执行：

```    
    unzip sdk-10.2.0.5.0-linux-x64.zip
    unzip basic-10.2.0.5.0-linux-x64.zip   
```
    
这样执行后，会在当前目录下有一个 instantclient_10_2 目录，刚才解压的 zip 文件的内容就在其中。 
 
* 安装 Ruby-OCI2:
在安装 Ruby-OCI2 之前必须要先配置 LD_LIBRARY_PATH 变量
        export LD_LIBRARY_PATH=/opt/instantclient_10_2/ 
* 然后
        gem install ruby-oci8     
    
* 安装 adapter for rails:
        gem install activerecord-oracle_enhanced-adapter   


### Resources
+ [OracleInstantClient 下载](http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html)
+ [oracle-enhanced adapter](http://github.com/rsim/oracle-enhanced)