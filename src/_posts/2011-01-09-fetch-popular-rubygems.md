---
layout: single
title: 分析rubygems.org上受欢迎的gem包
date: 2011-01-09 12:12:12
comments: true
categories: [ruby, tool]
---

用下载量来作为一个gem包的爱欢迎度的标准。

{% highlight ruby %}
# encoding: utf-8
require 'rubygems'

require 'nokogiri'
require 'open-uri'

GEM_LIST_URL = "http://rubygems.org/gems"
MIN_DOWNLOAD_COUNT = 30_0000

('A'..'Z').to_a.each do |letter|
  document = Nokogiri::HTML(open(GEM_LIST_URL + "?letter=#{letter}"))
  last_page_number =  document.css("div.pagination a")[-2].inner_text.to_i
  puts "There are " + document.css("p.entries b")[1].inner_text + " gems start with #{letter}, #{last_page_number} pages."


  1.step(last_page_number) do |page|
    every_page = Nokogiri::HTML(open(GEM_LIST_URL + "?letter=#{letter}&page=#{page}"))

    every_page.css("div.gems ol li").each do |li|
      downloads_count = li.css("div.downloads strong").inner_text.to_i
      gem_info        = li.css("a").inner_text
      if downloads_count >= MIN_DOWNLOAD_COUNT
        puts gem_info
      end
    end
  end

end
{% endhighlight %}