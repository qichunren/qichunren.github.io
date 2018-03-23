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

搜索代码
grep --include \*.c "memcpy" -R .


## pkg-config

*.pc 文件一般位于 /usr/lib/x86_64-linux-gnu/pkgconfig 目录

* pkg-config --list-all 列出当前所有包名
* pkg-config --cflags gio-2.0
    
    -pthread -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include

* pkg-config --libs gio-2.0

    -lgio-2.0 -lgobject-2.0 -lglib-2.0

## autotools

## 常用库

* libcurl

    deb: libcurl4-openssl-dev

* glib
* gstreamer
* gtk
   
    gtk+-3.0 => deb: libgtk-3-dev

* qt5
* zlib
* readline

    deb: libreadline6-dev
