---
layout: single
title: What can be done with a single line command
date: 2023-11-04 22:53:00 +0800
comments: true
categories: Development
---

技术世界中存在许多可以在一行命令中完成的任务，这些命令既方便又实用。以下是一些值得记录的例子。

## 快速搭建 HTTP 服务器

在Python 3.x中，可以使用以下命令启动一个本地的HTTP服务器（端口号8000）：

    python3 -m http.server 8000

而在Ruby中，下面的命令能够快速搭建HTTP服务器并指定端口号为8000：

    ruby -run -e httpd . -p 8000  

## 查杀进程

查找占用指定端口（8000）的进程，并强制终止该进程：

    kill -9 $(lsof -t -i:8000)

根据进程名查找并终止进程：

    ps aux | grep "process_name" | grep -v "grep" | awk '{print $2}' | xargs kill -9

## 查找文件

查找当前目录下（不包括子目录）所有大小为100M以上的日志文件，并删除

    find . -maxdepth 1 -name "*.log" -size +100M -exec rm -rf {} \;

## Docker 应用

Docker是快速搭建应用、加速开发的绝佳工具，以下是一些命令示例：

### 启动 Redis 服务

下面的命令能够快速启动一个即开即用的Redis服务（端口映射为6379:6379）：

    docker run --rm --name redis -p 6379:6379 redis:4-alpine

### 启动 PostgreSQL 服务（适用于开发环境）

下述命令可在后台运行一个开机自启的PostgreSQL服务，并适用于开发环境（端口映射为5432:5432）。这个实例的用户名被设置为"postgres"，并且采用了"trust"的认证方式。
    
    docker run -d --restart=always -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_HOST_AUTH_METHOD=trust --name=postgres-dev postgres


这些命令能够快速完成常见任务，极大地简化了开发流程，提高了效率。无论是搭建HTTP服务器还是运行容器化应用，通过一行命令完成这些任务，为工程师们节省了宝贵的时间，使得开发过程更加高效、便捷。