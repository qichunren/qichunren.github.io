---
layout: post
title: 使用feedzirra分析提取Feed
date: 2011-05-04 19:12:12
comments: true
categories: [ruby, tool]
---

[feedzirra](https://github.com/pauldix/feedzirra) 是一个很好用的提取和分析feed的工具。用法如下：

{% highlight ruby %}
# encoding: utf-8
require "feedzirra"

def fetch_feed(feed_url)
  feed = Feedzirra::Feed.fetch_and_parse(feed_url)

  feed_entries = feed.entries
  feed_entries.each do |entry|
    puts entry.inspect
  end # end each
end

fetch_feed "http://tech.163.com/special/000944OI/kejitongxin.xml"
{% endhighlight %}

结果：

```
usermatoMacBook-Pro:gitcard qichunren$ ruby lib/blog_fetcher.rb
#<Feedzirra::Parser::RSSEntry:0x00000102137858 @title="外媒分析称微软是黑莓和必应合作最大赢家", @url="http://tech.163.com/11/0504/16/737NSCOS000915BE.html", @summary="【赛迪网讯】5月4日消息，据国外媒体报道，在BlackBerry World上RIM请到一位令人意外的客座讲师——微软CEO史蒂夫-鲍尔默（Steve Ballmer）。鲍尔默在会上公开了与RIM的合作关系，称日后微软的Bing将代替谷歌成为黑莓移动设备上的默认搜索引擎。微软明显将从合作关系中获利，但RIM能够得到什么利益？鲍尔默表示，微软将对黑 ......", @published="2011-05-04 16:55:22">
#<Feedzirra::Parser::RSSEntry:0x0000010212e140 @title="工信部4月上半月发放241款电信设备进网许可证", @url="http://tech.163.com/11/0504/09/736SR7MQ000915BE.html", @summary="飞象网讯（崔玉贤/文）飞象网得知工信部4月份上半月发放了241款电信设备进网许可证，其中包含10款进网试用批文。 据悉，4月份上半月工信部共发放了TD终端22款，TD-SCDMA/GSM双模数字移动电话机15款，TD-SCDMA/GSM双模无线数据终端2款，TD-SCDMA固定无线终端5款。其中，TD-SCDMA/GSM双模数字移动电话机有5款进网试用批文，夏 ......", @published="2011-05-04 09:02:53">
```


