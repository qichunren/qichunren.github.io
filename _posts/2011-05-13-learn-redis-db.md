---
layout: single
title: 学习和了解 Redis
date: 2011-05-13 23:12:12
comments: true
categories: [database, nosql, redis]
---

## Try redis in docker (Updated 2022)

安装了 docker 的话，可以直接体验 redis-server 的使用：

`docker run --rm -p 6379:6379 -it --name redis-test redis`

### Related links

* [Redis](http://redis.io/)
* [redis-rb](https://github.com/ezmobius/redis-rb) gem install redis   
* [redis-objects](https://github.com/nateware/redis-objects)是基于 redis-rb 的一个 ruby 对象与 redis 对象映射的 gem
* [rails/kredis](https://github.com/rails/kredis) Higher-level data structures built on Redis