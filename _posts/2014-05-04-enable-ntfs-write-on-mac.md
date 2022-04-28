---
layout: single
title: "解决 NTFS 格式移动硬盘在 MAC 系统上不能读的问题"
date: 2014-05-04 16:44
comments: true
categories: Tool
---


插上移动硬盘后，在命令行终端里输入命令

diskutil info /Volumes/${硬盘名}
然后记下输出结果中的 Device Node 值，如/dev/disk1s2

弹出移动硬盘

在命令行执行命令 sudo mkdir /Volumes/MyHD

然后 mount：
sudo mount_ntfs -o rw,nobrowse /dev/disk1s2 /Volumes/MyHD

好了，现在就可以向移动硬盘/Volumes/MyHD 中写入内容了。

在 Finder 中不能看到移动硬盘目录，可以做一个链接
sudo ln -s /Volumes/MyHD ~/MyHD

搞定。