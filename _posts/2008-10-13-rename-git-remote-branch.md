---
layout: single
title: "重命名远程仓库中的分支"
date: 2008-10-13 14:22
comments: true
categories: [git]
---

在某些情况，有可能要修改远程仓库中的分支名称。对于这个需要怎么操作呢？我查了相关资料，没有直接的 git 命令可以直接实现。

要修改远程仓库的分支名称，只能是基于现在的分支，向远程仓库中推送一个新分支，然后将原来的分支从远程仓库中删除掉。

比如我向远程仓库中推送了一个名为 feature 的分支，现在要改名为 preview。

```
git checkout feature
git checkout -b preview
git push origin preview
git push origin :feature
git branch -d feature
```
