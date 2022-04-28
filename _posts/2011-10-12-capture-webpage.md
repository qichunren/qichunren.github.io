---
layout: single
title: 网页截屏的方法
date: 2011-10-12 22:09:09
comments: true
categories: [tool]
---

曾经很想有这样一个 app，它可以将微博上用户的微博用图片的形式自动保存起来，留此存照。前几个月的那段时间，微博上很
网页截屏的基本原理就是通过取得 webkit 渲染（render）的数据来生成图片的，我经过一段时间研究，找到了两个方法来解决这个问题。

一个工具叫[phantomjs](http://www.phantomjs.org/)，另一个工具叫[cutycapt](http://cutycapt.sourceforge.net/)

两个工具都不错，个人比较喜欢使用 cutycapt 这个工具，它是直接提供一个命令行来生成网页截图的，而前者是通过 javascript 来调用底层 webkit 接品 (page.render 方法) 来实现的，两者的侧重点不一样。
并且 cutycapt 是将整个网截下来，phantomjs 是将浏览器当前视区的一屏截下来。

Cutycapt 的用法如下
```
qichunren@qichunren-desktop:~/github/cutycapt/CutyCapt$ ./CutyCapt 
 -----------------------------------------------------------------------------
 Usage: CutyCapt --url=http://www.example.org/ --out=localfile.png            
 -----------------------------------------------------------------------------
  --help                         Print this help page and exit                
  --url=<url>                    The URL to capture (http:...|file:...|...)   
  --out=<path>                   The target file (.png|pdf|ps|svg|jpeg|...)   
  --out-format=<f>               Like extension in --out, overrides heuristic 
  --min-width=<int>              Minimal width for the image (default: 800)   
  --min-height=<int>             Minimal height for the image (default: 600)  
  --max-wait=<ms>                Don't wait more than (default: 90000, inf: 0)
  --delay=<ms>                   After successful load, wait (default: 0)     
  --user-style-path=<path>       Location of user style sheet file, if any    
  --user-style-string=<css>      User style rules specified as text           
  --header=<name>:<value>        request header; repeatable; some can't be set
  --method=<get|post|put>        Specifies the request method (default: get)  
  --body-string=<string>         Unencoded request body (default: none)       
  --body-base64=<base64>         Base64-encoded request body (default: none)  
  --app-name=<name>              appName used in User-Agent; default is none  
  --app-version=<version>        appVers used in User-Agent; default is none  
  --user-agent=<string>          Override the User-Agent header Qt would set  
  --javascript=<on|off>          JavaScript execution (default: on)           
  --java=<on|off>                Java execution (default: unknown)            
  --plugins=<on|off>             Plugin execution (default: unknown)          
  --private-browsing=<on|off>    Private browsing (default: unknown)          
  --auto-load-images=<on|off>    Automatic image loading (default: on)        
  --js-can-open-windows=<on|off> Script can open windows? (default: unknown)  
  --js-can-access-clipboard=<on|off> Script clipboard privs (default: unknown)
  --print-backgrounds=<on|off>   Backgrounds in PDF/PS output (default: off)  
  --zoom-factor=<float>          Page zoom factor (default: no zooming)       
  --zoom-text-only=<on|off>      Whether to zoom only the text (default: off) 
  --http-proxy=<url>             Address for HTTP proxy server (default: none)
 -----------------------------------------------------------------------------
  <f> is svg,ps,pdf,itext,html,rtree,png,jpeg,mng,tiff,gif,bmp,ppm,xbm,xpm    
 -----------------------------------------------------------------------------
 http://cutycapt.sf.net - (c) 2003-2010 Bjoern Hoehrmann - bjoern@hoehrmann.de
qichunren@qichunren-desktop:~/github/cutycapt/CutyCapt$
```

phantomjs 截屏的用法如下：
```
qichunren@qichunren-desktop:~/github$ cd phantomjs/
qichunren@qichunren-desktop:~/github/phantomjs$ ls
bin         ChangeLog  ff.png     iteye.png    Makefile       python     src
capture.js  examples   hello.png  LICENSE.BSD  phantomjs.pro  README.md           
qichunren@qichunren-desktop:~/github/phantomjs$ ./bin/phantomjs examples/rasterize.js 
Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat]
  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"
qichunren@qichunren-desktop:~/github/phantomjs$ ./bin/phantomjs examples/rasterize.js http://www.iteye.com iteye.png
qichunren@qichunren-desktop:~/github/phantomjs$
```
