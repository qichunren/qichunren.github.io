# 日常Linux（Ubuntu）下的开发工具链记录

## 包管理工具

查找头文件的信息，包括包名、文件具体路径
dpkg -S opencv.hpp

查看包安装好的所有文件和目录
dpkg -L libopencv-core-dev

查看包信息
apt-cache show libopencv-core-dev

查看包是否安装
dpkg -l | grep libopencv-core-dev

搜索包名
apt-cache search keyword1 keyword2


## pkg-config

## autotools

## 常用库

* libcurl
* glib
* gstreamer
* gtk
* qt5
* zlib