---
layout: post
title: Oracle解锁 
date: 2010-10-29 12:12:12
comments: true
categories: [datebase, oracle]
---

今天在Plsql中，给Oracle数据库中一个表添加字段的时候，出错了错误，提示：

Oracle资源正忙,要求指定NOWAIT

在网上一查，是表给锁住了，用如下的方法来解决。

{% codeblock lang:sql %}
select t2.username,t2.sid,t2.serial#,t2.logon_time
from v$locked_object t1,v$session t2
where t1.session_id=t2.sid order by t2.logon_time; 

{% endcodeblock %}     

      USERNAME                              SID    SERIAL# LOGON_TIME
      ——————————————— -———- -———- -————
      QICHUNREN                                   37       9731 2010-4-10 1  

{% codeblock lang:sql %}    
   alter system kill session '37,9731';
{% endcodeblock %}  
System altered  

{% codeblock lang:sql %}     
   select * from v$session where sid=?; 
{% endcodeblock %}    

### 相关的博客：

+ [OraclePLSQL中不能for update的解决办法](http://bot.javaeye.com/blog/429478)
+ [Oracle资源正忙,要求指定NOWAIT——Oracle解锁问题](http://hi.baidu.com/shuyangwhj/blog/item/c321aa133812f4846538dbc5.html)