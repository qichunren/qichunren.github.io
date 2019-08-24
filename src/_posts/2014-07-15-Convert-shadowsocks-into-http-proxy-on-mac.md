---
layout: single
title: 将Shadownsocks代理转换成http proxy类型
date: 2014-07-15 17:04
comments: true
categories: Tool
---
　
将Shadownsocks代理转换成http proxy类型， 主要就是安装 *polipo* 工具

```
brew install polipo
```

然后就是启动polipo程序开机自动启动。

首先要修改自动启动的配置文件 _/usr/local/opt/polipo/homebrew.mxcl.polipo.plist_，需要给 polipo 命令加上命令行参数 **socksParentProxy=localhost:1080**

<pre>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>homebrew.mxcl.polipo</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/opt/polipo/bin/polipo</string>
      <string>socksParentProxy=localhost:1080</string>
    </array>
  </dict>
</plist>
</pre>

然后执行以下命令，搞定收工。

```
ln -sfv /usr/local/opt/polipo/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.polipo.plist
```

polipo 进程默认监听8123端口，在命令行使用 `export http_proxy=http://localhost:8123` 就可以使用代理了。

```
export https_proxy=http://localhost:8123
export ftp_proxy=http://localhost:8123
```
