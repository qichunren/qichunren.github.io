---
layout: single
title: 在 QT5 中使用国际化语言
date: 2015-4-13 18:42
comments: true
categories: Development
---

要在 QT 项目中使用国际化，以支持多种语言，需要如下步骤。

1. 在 pro 文件中声明 TRANSLATIONS 文件，如下面的例子，声明了两个 ts 文件，一个是 zh-CN，另一个 en 的。

TRANSLATIONS = translations/ntptu_zh-CN.ts translations/ntptu_en.ts

2. 在项目的主目录中的命令行中运行 lupdate -verbose ntptu.pro

   lupdate -verbose ntptu.pro
   lupdate warning: no TS files specified. Only diagnostics will be produced for 'D:/code/ntptu/ntptu.pro'.
   Updating 'src/translations/ntptu_zh-CN.ts'...
   Found 104 source text(s) (104 new and 0 already existing)
   Updating 'src/translations/ntptu_en.ts'...
   Found 104 source text(s) (104 new and 0 already existing)

3. 使用 linguist.exe 工具打开上一步生成的 ts 文件，进行翻译工作。将两个语言的文件都翻译好。

4. lrelease -verbose project_zh_CN.ts 生成.qm 文件

5. 将 qm 文件添加了资源中。

6.

QT 程序启动时加载 Translator

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
