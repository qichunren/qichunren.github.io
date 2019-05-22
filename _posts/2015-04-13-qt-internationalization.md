---
layout: single
title: 在QT5中使用国际化语言
date: 2015-4-13 18:42
comments: true
categories: Development
---

要在QT项目中使用国际化，以支持多种语言，需要如下步骤。

1. 在pro文件中声明TRANSLATIONS文件，如下面的例子，声明了两个ts文件，一个是zh-CN，另一个en的。

    TRANSLATIONS = translations/ntptu_zh-CN.ts translations/ntptu_en.ts

2. 在项目的主目录中的命令行中运行 lupdate -verbose ntptu.pro


	lupdate -verbose ntptu.pro
	lupdate warning: no TS files specified. Only diagnostics will be produced for 'D:/code/ntptu/ntptu.pro'.
	Updating 'src/translations/ntptu_zh-CN.ts'...
	    Found 104 source text(s) (104 new and 0 already existing)
	Updating 'src/translations/ntptu_en.ts'...
	    Found 104 source text(s) (104 new and 0 already existing)
	    
3. 使用linguist.exe工具打开上一步生成的ts文件，进行翻译工作。将两个语言的文件都翻译好。

4. lrelease -verbose project_zh_CN.ts生成.qm文件

4. 将qm文件添加了资源中。

5.

QT程序启动时加载Translator

    QTranslator translator;
    translator.load("ntptu_" + QLocale::system().name(),
                          ":/translations");
    a.installTranslator(&translator);
    
    
    QString message(tr("voices directory did not exist in data directory %1!"));
    message.arg(dir.absolutePath());
    

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
