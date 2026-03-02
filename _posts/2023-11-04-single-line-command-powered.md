---
layout: single
title: "One-Liner Magic: Powerful Tasks in a Single Command"
date: 2023-11-04 22:53:00 +0800
comments: true
categories: Development
---

Many everyday tasks can be completed with a single command. These concise one‑liners simplify routine work and boost developer efficiency. Below are practical examples worth keeping handy.

## Quick HTTP Server Setup

Start a local HTTP server on port 8000 in Python 3.x:

    python3 -m http.server 8000

In Ruby, quickly set up an HTTP server on port 8000:

    ruby -run -e httpd . -p 8000

## Process Management

Kill a process occupying a specific port (e.g., 8000):

    kill -9 $(lsof -t -i:8000)

Find and terminate a process by name:

    ps aux | grep "process_name" | grep -v "grep" | awk '{print $2}' | xargs kill -9

## File Searching and Deletion

Find and delete all log files larger than 100MB in the current directory (excluding subdirectories). Use with care:

    find . -maxdepth 1 -name "*.log" -size +100M -exec rm -rf {} \;

## Docker Magic

Docker simplifies application setup and accelerates development. Here are some one-liners:

### Start a Redis Service

Quickly launch a ready‑to‑use Redis service on port 6379:

    docker run --rm --name redis -p 6379:6379 redis:4-alpine

### Start a PostgreSQL Service (for Development)

Run a background PostgreSQL service with auto‑restart, suitable for development (port 5432, user "postgres" with "trust" authentication):
    
    docker run -d --restart=always -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_HOST_AUTH_METHOD=trust --name=postgres-dev postgres

### Start a MySQL Service (for Development)

Run a background MySQL service with auto‑restart, suitable for development (port 3306, root password "devpass", database "app_dev"):

    docker run -d --restart=always -p 3306:3306 -e MYSQL_ROOT_PASSWORD=devpass -e MYSQL_DATABASE=app_dev --name=mysql-dev mysql:8.0

These one‑liners streamline common tasks, simplify the development process, and save time. Whether setting up an HTTP server or running containerized services, a single command can be both efficient and convenient in daily workflows.
