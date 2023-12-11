---
layout: single
title: "怎么样从 git 提交历史里永久删除一个文件？"
date: 2012-05-17 15:04
comments: true
categories: git
---

Git 提交历史中永久删除文件是一个常见的需求，可能由于敏感信息或者不再需要的文件。以下是一步一步的方法：


## 确保备份：

在进行任何操作之前，请确保你的工作目录中没有未提交的更改。最好的做法是创建一个分支或者备份当前的工作目录，以防万一。

# 使用 filter-branch 命令：

Git 提供了 filter-branch 命令，它可以用于修改历史记录。以下是删除文件的基本命令：

```
git filter-branch --tree-filter 'rm -f path/to/file' HEAD
```

这将在每个提交上运行 rm -f path/to/file 命令，从而删除该文件。请替换 path/to/file 为你想要删除的文件路径。

## 强制推送：

由于历史已经被修改，你需要强制推送到远程仓库。请注意，强制推送可能会影响其他人的工作副本，因此请确保你有权这样做，并在执行之前通知其他合作者。

```
git push origin backup_branch --force
```

## 清理本地仓库：

删除本地的备份分支：

```
git branch -D backup_branch
```

现在，你的远程仓库和本地仓库都不再包含指定文件的历史记录。

请注意，这是一项潜在有风险的操作，仔细检查并确保你了解其影响。如果你正在与团队协作，请协调好操作时间，以免影响他人工作。希望这个指南能够帮助你成功删除 Git 提交历史中的文件！

## 参考资料
+ [Remove sensitive data](http://help.github.com/remove-sensitive-data/)
+ [How do I remove sensitive files from git's history](http://stackoverflow.com/questions/872565/how-do-i-remove-sensitive-files-from-gits-history)
+ [git: forever remove files or folders from history](http://dound.com/2009/04/git-forever-remove-files-or-folders-from-history/)