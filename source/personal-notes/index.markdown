---
layout: page
title: "personal_notes"
date: 2012-11-16 13:18
comments: true
sharing: true
footer: true
---

[Install MySQL on Mountain Lion with Homebrew](http://madebyhoundstooth.com/blog/install-mysql-on-mountain-lion-with-homebrew/)
[brew install mysql 1](https://github.com/mxcl/homebrew/blob/93aecfadedfc2c21e30b6c2546aa44caa519c8a2/Library/Formula/mysql.rb)
[brew install mysql on mac os](http://stackoverflow.com/questions/4359131/brew-install-mysql-on-mac-os)

[git checkout remote branch](http://stackoverflow.com/questions/1783405/git-checkout-remote-branch)

[Open Source Web Conferencing:bigbluebutton](https://code.google.com/p/bigbluebutton/)

[Landing Page](https://kippt.com/ederdesign/landing-page)

[Oscar Del Ben](https://github.com/oscardelben) has many useful open source project, such as [rawler](https://github.com/oscardelben/rawler) , [DateCalculations](https://github.com/oscardelben/DateCalculations) , [Color-Picker-Pro](https://github.com/oscardelben/Color-Picker-Pro) [iPhoneCalculator](https://github.com/oscardelben/iPhoneCalculator) , [GithubBrowser](https://github.com/oscardelben/GithubBrowser)




---------
2012-11-17

[How to make Git ignore files that already exist in your project](http://justaddwater.dk/2009/12/07/how-to-make-git-ignore-files-that-already-exist-in-your-project/)
```
git update-index --assume-unchanged config/database.yml
```

----------
2012-11-18
[Using the Singleton Pattern in Objective-C](http://www.duckrowing.com/2010/05/21/using-the-singleton-pattern-in-objective-c/)
[A Single Class Logger in Objective C](http://objectuser.wordpress.com/2010/03/06/a-single-class-logger-in-objective-c/)

[Git Submodule](http://josephjiang.com/entry.php?id=342)

----------
2012-11-20
[Modernizr](http://modernizr.com/docs/) is a JavaScript library that detects HTML5 and CSS3 features in the user’s browser.

```
Modernizr.addTest('flash', function(){
  var hasFlash = (
        (typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") ||
        (window.ActiveXObject && (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) != false)
      );
  return (hasFlash === false || hasFlash === undefined) ? false : true;
});
```

[复制工具](https://github.com/jonrohan/ZeroClipboard)

[github/linguist](https://github.com/github/linguist) 是一个程序语言检测工具, github本身就是使用它的。

[emoji表情](http://www.emoji-cheat-sheet.com/)

[http://patterntap.com/](http://patterntap.com/) 有很多UI设计的case，可以找到灵感