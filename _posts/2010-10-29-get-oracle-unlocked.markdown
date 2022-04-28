---
layout: single
title: Oracle 解锁
date: 2010-10-29 12:12:12
comments: true
categories: [datebase, oracle]
---

今天在 Plsql 中，给 Oracle 数据库中一个表添加字段的时候，出错了错误，提示：

Oracle 资源正忙，要求指定 NOWAIT

在网上一查，是表给锁住了，用如下的方法来解决。

```
select t2.username,t2.sid,t2.serial#,t2.logon_time
from v$locked_object t1,v$session t2
where t1.session_id=t2.sid order by t2.logon_time;
```

      USERNAME                              SID    SERIAL# LOGON_TIME
      ——————————————— -———- -———- -————
      QICHUNREN                                   37       9731 2010-4-10 1

```
   alter system kill session '37,9731';
```
System altered

```
   select * from v$session where sid=?;
```

### 相关的博客：

+ [OraclePLSQL 中不能 for update 的解决办法](http://bot.javaeye.com/blog/429478)
+ [Oracle 资源正忙，要求指定 NOWAIT——Oracle 解锁问题](http://hi.baidu.com/shuyangwhj/blog/item/c321aa133812f4846538dbc5.html)