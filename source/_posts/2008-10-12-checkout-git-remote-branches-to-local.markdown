---
layout: post
title: "在本地签出远程仓库上的分支"
date: 2008-10-12 14:27
comments: true
categories: [git]
---


从远程仓库克隆下来一个项目后，默认是在master分支。

```
caojinhua:git_test caojinhua$ git branch
*  master
```

查看仓库中的所有分支，使用git branch -a命令：

```
caojinhua:git_test caojinhua$ git branch -a
*  master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
  remotes/origin/remotebranch
```

可以看到远程仓库中有master和remotebranch两个分支。现在在本地项目中怎么样切换到remotebranch分支呢？很简单，使用git check命令，具体如下：

```
git checkout --track -b <local branch> <remote>/<tracked branch>
```

在我这里就是

```
git checkout --track -b remotebranch origin/remotebranch
```

对于这个命令，有一个简化的选项：

```
git checkout -t origin/remotebranch
```

### 参考资料

[checkout tracked remote branch](http://gitready.com/intermediate/2009/01/09/checkout-remote-tracked-branch.html)
