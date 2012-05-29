---
layout: post
title: 去掉textmate源代码中的隐形空格
tags: textmate
category: Tool
---           

有这个需要，主要是因为不想在git提交后的diff中无看到不有意思的diff显示。使用textmate的同学可以用[这个工具](https://github.com/glennr/uber-glory-tmbundle)来解决这个小问题。

### 安装方法

{% codeblock install step lang:bash %}
cd ~/Library/Application\ Support/TextMate/Bundles/
git clone git://github.com/glennr/uber-glory-tmbundle.git Uber\ Glory.tmbundle
cd Uber\ Glory.tmbundle
git submodule update --init
osascript -e 'tell app "TextMate" to reload bundles'

{% endcodeblock %}