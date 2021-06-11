---
layout: single
title: "How to update a forked repository from original repository at github?"
date: 2012-01-09 12:39
comments: true
categories: git
---

If you use github, you can follow this.

I use [huachlee/ruby-china](https://github.com/huacnlee/ruby-china) repository for example.

At huacnlee/ruby-china repository homepage, clicked "Fork" button, then after serval minutes, you will have you own forked repository copy.Then you clone to local.

```
git clone git@github.com:qichunren/ruby-china.git
```

Then you commit your changes, and push to it.When you found the original repository has some updated feature,you can do as follow:

```
cd ruby-china
git remote add upstream git://github.com/huacnlee/ruby-china.git
caojinhua:ruby-china caojinhua$ git fetch upstream
remote: Counting objects: 345, done.
remote: Compressing objects: 100% (164/164), done.
remote: Total 266 (delta 196), reused 156 (delta 98)
Receiving objects: 100% (266/266), 31.92 KiB | 25 KiB/s, done.
Resolving deltas: 100% (196/196), completed with 67 local objects.
From git://github.com/huacnlee/ruby-china
 * [new branch]      github_autocomplete -> upstream/github_autocomplete
 * [new branch]      markdown   -> upstream/markdown
 * [new branch]      master     -> upstream/master
 * [new branch]      post       -> upstream/post
caojinhua:ruby-china caojinhua$ git merge upstream/master
```

That is it.

## Resources:
* [Fork A Repo](http://help.github.com/fork-a-repo/)
* [Update a Github Fork from the Original Repo](http://bradlyfeeley.com/2008/09/03/update-a-github-fork-from-the-original-repo/)
