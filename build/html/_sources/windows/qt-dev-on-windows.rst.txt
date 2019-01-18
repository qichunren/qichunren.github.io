Qt5 Windows 平台开发
==========================================

使用 Qt 库开发开发运行在 Windows 平台上的软件， 通过 `msys2 <https://www.msys2.org/>`_ 工具集是一个快捷的方法。


=====================
第三方依赖库管理
=====================

msys2 使用 pacman 命令作为包管理工具，类似在 UBuntu 发行版中的 apt 命令。

安装软件包::

    $ pacman -S package_name1 package_name2 ...

删除软件包::

    $ pacman -R package_name

查找软件包::

    $ pacman -Ss string1 string2 ...    

查询文件所属的包名::

    $ pacman -Qo file

例如我查询 qmake 命令所属的包名::    

    $ which qmake
      /mingw32/bin/qmake
    $ pacman -Qo /mingw32/bin/qmake.exe
      /mingw32/bin/qmake.exe is owned by mingw-w64-i686-qt5 5.10.1-2
    

升级软件包

通过下面的命令升级本地安装的所有包，这将花费一些时间::

    $ pacman -Syu    

=====================
安装 Qt 开发环境
=====================

安装 Qt5 编译工具和 Qt Creator IDE::

     pacman -S mingw-w64-i686-qt5  mingw-w64-i686-qt-creator

然后在命令行输入 qtcreator 命令即可运行 Qt Creator 了。     

=====================
项目编译
=====================

在 Qt 项目的主目录中执行 qmake 命令后，然后执行 mingw32-make.exe 即可开始编译项目，项目编译完成后，可以直接在命令行运行项目了。

::

    $ qmake -config release # In development mode, just type 'qmake'
    $ mingw32-make.exe

此时如果直接在文件管理器中找到编译好的二进制文件，双击运行是不能正常运行的，会提示缺少相关的 dll 文件，这个就涉及到下面 Qt 程序打包的内容了。  

=====================
Qt 程序打包  
=====================