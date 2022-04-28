---
layout: single
title: 去掉 textmate 源代码中的隐形空格
date: 2011-05-16 17:20:33
categories: [tool]
comments: true
---

有这个需要，主要是因为不想在 git 提交后的 diff 中无看到不有意思的 diff 显示。使用 textmate 的同学可以用[这个工具](https://github.com/glennr/uber-glory-tmbundle)来解决这个小问题。

### 安装方法

```
cd ~/Library/Application\ Support/TextMate/Bundles/
git clone git://github.com/glennr/uber-glory-tmbundle.git Uber\ Glory.tmbundle
cd Uber\ Glory.tmbundle
git submodule update --init
osascript -e 'tell app "TextMate" to reload bundles'
```