---
layout: post
title: Buildroot简单使用
date: 2016-06-21 18:12
comments: true
categories: Development
---

使用 [Buildroot](https://buildroot.org/) 可以方便的灵活的构建一个定制的用于嵌入式平台的Linux系统。

公司里有自己开发的类beaglebone的核心板。我之前调试QT程序都时需要在板子里编译程序，很花费时间，也不方便。

最近学会了使用Buildroot来跨平台编译程序，感觉我之前的做法太LOW了，现在在自己的开发机器中可以模拟出ARM平台的编译环境，编译好了的程序在目标机器中可以直接运行。

Buildroot的用法很简单，在这里简单记录一下。

1. [下载Buildroot](https://buildroot.org/download.html)压缩包到本地，解压。

2. 在主目录里创建Config.in文件。在configs目录中有许多不同类型的文件已经创建好了，我们公司的ARM板是和beaglebone差不多，所以Config.in来自beaglebone_defconfig文件。

3. 执行`make menuconfig`调出编译配置界面，在这里可以对目标系统进行各种定制化，包括Kernel, Bootloader, 各种常用的软件包，系统配置等。
设置完成后退成。实际上UI的各种操作是对Config.in文件的操作。

4. 执行`make`，编译完成后，在output目录下有编译好的文件。

### 怎么样将自己写的程序集成到Buildroot的packages中？

在这里我以我写的一个名为hardware_report程序作为例子，我这个程序是用qt5写的，buildroot需要通过git clone的方式下载代码编译。

* 修改package目录中的Config.in文件，加入

```
menu "Shanghai nt projects"
  source "package/hardware_report/Config.in"
endmenu
```

* 创将package/hardware_report目录，在其中创建Config.in和hardware_report.mk文件
Config.in文件中的内容如下：

```
config BR2_PACKAGE_HARDWARE_REPORT
  bool "hardware_report"
  help
          this is comment that explains what hardware_report is.
          https://git.xxxxxx.com
```
              

hardware_report.mk文件中的内容如下：

    ################################################################################
    #
    # hardware-report
    #
    ################################################################################

    HARDWARE_REPORT_VERSION = master
    HARDWARE_REPORT_SITE = git@git.xxxxxx.com:qichunren/hardware_report.git
    HARDWARE_REPORT_SITE_METHOD = git
    HARDWARE_REPORT_INSTALL_STAGING = YES
    HARDWARE_REPORT_DEPENDENCIES = qt5base

    define HARDWARE_REPORT_CONFIGURE_CMDS
            (cd $(@D); $(TARGET_MAKE_ENV) $(HOST_DIR)/usr/bin/qmake)
    endef

    define HARDWARE_REPORT_BUILD_CMDS
            $(TARGET_MAKE_ENV) $(MAKE) -C $(@D)
    endef

    define HARDWARE_REPORT_INSTALL_STAGING_CMDS
            $(TARGET_MAKE_ENV) $(MAKE) -C $(@D) install
    endef

    #ifeq ($(BR2_PACKAGE_QT5DECLARATIVE),y)
    #define PUDGE_GUI_INSTALL_QML
    #$        cp -dpfr $(@D)/luna-pudge-ui $(TARGET_DIR)/usr/bin
    #endef
    #endif

    define HARDWARE_REPORT_INSTALL_TARGET_CMDS
            cp -dpfr $(@D)/bin/hardware_report $(TARGET_DIR)/usr/bin
    endef
            #$(QT5WEBKIT_EXAMPLES_INSTALL_QML)

    $(eval $(generic-package))

* 单独编译hardware_report项目可以执行`make hardware_report`, 重新编译执行 `make hardware_report-dirclean`
目前重新编译hardware_report需要删除hardware_report的下载包 `rm dl/hardware_report-master.tar.gz`

* 设置程序的自动启动，Buildroot制作的Linux系统自动启动很简单，直接在/etc/init.d/目录中写好启动脚本即可。首先需要开启overlay功能，然后创建overlay目录，在其中创建etc/init.d目录，在其中的init.d目录中添加S92hardware_report文件, 文件名必须以S开始，后面的数字表示启动顺序。

```
#!/bin/sh
#
# System-V init script for the hardware_report
#

DESC="Shanghai nt hardware report tool"
NAME="hardware_report"

case "$1" in
  start)
        echo -n "Starting $DESC: $NAME"
	/usr/bin/hardware_report
        echo "."
        ;;
  stop) echo -n "Stopping $DESC: $NAME"
	killall -9 hardware_report
        echo "."
        ;;
  restart) echo "Restarting $DESC: $NAME"
        $0 stop
        sleep 1
        $0 start
        ;;
  *) echo "Usage: $0 {start|stop|restart|reload|force-reload}" >&2
        exit 1
        ;;
esac

exit 0
```
             
              
              
[Buildroot文档](https://buildroot.org/downloads/manual/manual.html)
