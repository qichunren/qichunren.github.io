---
layout: post
title: "解决NTFS格式移动硬盘在MAC系统上不能读的问题"
date: 2014-05-04 16:44
comments: true
categories: Tool
---


插上移动硬盘后，在命令行终端里输入命令

diskutil info /Volumes/${硬盘名}
然后记下输出结果中的Device Node值，如/dev/disk1s2

弹出移动硬盘

在命令行执行命令　sudo mkdir /Volumes/MyHD

然后mount：
sudo mount_ntfs -o rw,nobrowse /dev/disk1s2 /Volumes/MyHD

好了，现在就可以向移动硬盘/Volumes/MyHD中写入内容了。

在Finder中不能看到移动硬盘目录，可以做一个链接
sudo ln -s /Volumes/MyHD ~/MyHD

搞定。