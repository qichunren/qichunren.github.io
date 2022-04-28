---
layout: single
title: Linux 里 GUI 程序自启动
date: 2016-06-16 15:27
comments: true
categories: Development
---

将 .desktop 文件复制到 /home/${user}/.config/autostart/目录下即可。

另外很多时候程序需要用 root 权限启动，需要修改.desktop 文件，在执行命令前加 sudo


	[Desktop Entry]
	  Version=1.0
	  Type=Application
	  Terminal=false
	  Name=NTPIS1
	  Exec=sudo /usr/bin/nt-web-app
	  Comment=Shanghai NT PIS 25t
	  Icon=/usr/share/pixmaps/nt-web-icon.png
	  StartupNotify=false
	  Encoding=UTF-8
	  Categories=Development;


为了让自启动程序不用如入 sudo 的密码，还需要修改 /etc/sudoers 文件

	sudo visudo

	add line

		%sudo   ALL=(ALL) NOPASSWD: /usr/bin/nt-web-app
	
	after
		%sudo   ALL=(ALL:ALL) ALL