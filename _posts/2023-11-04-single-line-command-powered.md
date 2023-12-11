---
layout: single
title: "One-Liner Magic: Powerful Tasks in a Single Command"
date: 2023-11-04 22:53:00 +0800
comments: true
categories: Development
---

In the vast realm of technology, there exists a treasure trove of tasks that can be accomplished with a single line of command. These commands, both convenient and practical, simplify complex processes and elevate developer efficiency. Here are some noteworthy examples worth documenting.

## Quick HTTP Server Setup

Start a local HTTP server on port 8000 in Python 3.x:

    python3 -m http.server 8000

In Ruby, quickly set up an HTTP server with port 8000:

    ruby -run -e httpd . -p 8000  

## Process Management

Kill a process occupying a specific port (e.g., 8000):

    kill -9 $(lsof -t -i:8000)

Find and terminate a process by its name:

    ps aux | grep "process_name" | grep -v "grep" | awk '{print $2}' | xargs kill -9

## File Searching and Deletion

Find and delete all log files larger than 100MB in the current directory (excluding subdirectories):

    find . -maxdepth 1 -name "*.log" -size +100M -exec rm -rf {} \;

## Docker Magic

Docker simplifies application setup and accelerates development. Here are some one-liners:

### Start a Redis Service

Quickly launch a ready-to-use Redis service (port mapping 6379:6379):

    docker run --rm --name redis -p 6379:6379 redis:4-alpine

### Start a PostgreSQL Service (for Development)

Run a background PostgreSQL service with auto-restart, suitable for development (port mapping 5432:5432, user "postgres" with "trust" authentication):
    
    docker run -d --restart=always -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_HOST_AUTH_METHOD=trust --name=postgres-dev postgres


These one-liners streamline common tasks, significantly simplify the development process, and save valuable time for engineers. Whether setting up an HTTP server or running containerized applications, accomplishing these tasks with a single command enhances efficiency and convenience in the development workflow.