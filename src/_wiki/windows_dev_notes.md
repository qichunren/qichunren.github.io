---
layout: single
position: Developer
---

## Windows平台应用程序开发

采用 msys2 工具将 Linux 平台上开发的软件移植到 Windows 平台上

    pacman -Sy mingw32/mingw-w64-i686-make
    pacman -Ss make i686
    pacman -Sy git gdb g++
    
    pacman -Sy autoconf automake libtool
    
### Synchronizing package databases 

    pacman -Syu

### Common packages

* uuid: libutil-linux-devel

      qichunren@DESKTOP-CGH8J7I MINGW32 ~/code/pudgeptu
      $ echo $PKG_CONFIG_PATH
      /mingw32/lib/pkgconfig:/mingw32/share/pkgconfig

      qichunren@DESKTOP-CGH8J7I MINGW32 ~/code/pudgeptu
      $ export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/lib/pkgconfig

* json-c:  mingw-w64-i686-json-c




