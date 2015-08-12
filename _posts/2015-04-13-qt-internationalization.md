---
layout: post
title: 在QT5中使用国际化语言
date: 2015-4-13 18:42
comments: true
categories: Development
---

QT程序启动时加载Translator

    QTranslator translator;
    translator.load("ntptu_" + QLocale::system().name(),
                          ":/translations");
    a.installTranslator(&translator);
    
    
    QString message(tr("voices directory did not exist in data directory %1!"));
    message.arg(dir.absolutePath());
    

lupdate工具是解析程序代码中使用tr方法和ui文件中的字符串，生成ts文件

    lupdate -verbose project.pro
    

linguist这个工具可以直接在程序界面上翻译代码和ui文件中的字符串。

    linguist project_zh_CN.ts

lrelease是将ts文件生成pm文件

    lrelease -verbose project_zh_CN.ts
    
    
    
    
设置环境变量进行测试

	qichunren@qichunren-desktop:~/code/new-pis$ locale
	LANG=zh_CN.UTF-8
	LANGUAGE=en_US
	LC_CTYPE="zh_CN.UTF-8"
	LC_NUMERIC="zh_CN.UTF-8"
	LC_TIME="zh_CN.UTF-8"
	LC_COLLATE="zh_CN.UTF-8"
	LC_MONETARY="zh_CN.UTF-8"
	LC_MESSAGES="zh_CN.UTF-8"
	LC_PAPER="zh_CN.UTF-8"
	LC_NAME="zh_CN.UTF-8"
	LC_ADDRESS="zh_CN.UTF-8"
	LC_TELEPHONE="zh_CN.UTF-8"
	LC_MEASUREMENT="zh_CN.UTF-8"
	LC_IDENTIFICATION="zh_CN.UTF-8"
	LC_ALL=zh_CN.UTF-8
	qichunren@qichunren-desktop:~/code/new-pis$ export LANGUAGE=zh_CN
