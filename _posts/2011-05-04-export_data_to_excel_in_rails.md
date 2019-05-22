---
layout: single
title: 在Rails项目中导出Excel
tags:
- Excel
- Rails
---

[excel_rails](https://github.com/asanghi/excel_rails) 这个工具可以实现导出Excel数据的功能。它本身是基于[ruby-spreadsheet ](https://github.com/jacobat/ruby-spreadsheet)

### 使用方法

1. 安装
在Gemfile中

{% highlight ruby %}
    # Excel
    gem 'excel_rails'
    # excel_rails need this
    gem 'spreadsheet'
{% endhighlight %}

```
bundle install
```

2. 使用
在控制器中
{% highlight ruby %}

# encoding: utf-8
class RemitNotificationsController < ApplicationController
  def index
    @search = RemitNotification.valid.order("id DESC").search(params[:search])
    @remit_notifications = @search.paginate :per_page => 20, :page => params[:page]
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @remit_notifications }
      format.xls
    end
  end

end
{% endhighlight %}

在视图中
{% highlight ruby %}
# encoding: utf-8
excel_document(:filename => "all_lines.xls") do |workbook|
  sheet = workbook.create_worksheet
  sheet.name = "What's in a name"

  sheet.row(0).concat %w{汇款告知}

  # sheet[1,0] = 'Japan'
  # row = sheet.row(1)
  # row.push 'Creator of Ruby'
  # row.push 'Creator of rails'
  # row.unshift 'Yukihiro Matsumoto'
  # sheet.row(5).unshift 'HaHa'
  # sheet.row(3).push 'Charles Lowe', 'Author of the ruby-ole Library'
  # sheet.row(3).insert 1, 'Unknown'
  # sheet.update_row 4, 'Hannes Wyss', 'Switzerland', 'Author'

  sheet.row(1).replace [ '流水号', '客户名称','客户号','金额','通过认证时间','不通过时间','创建时间' ]

  sheet.row(0).height = 18
  sheet.row(0).height = 18

  format = Spreadsheet::Format.new :color => :blue,:weight => :bold,:size => 18

  sheet.row(0).default_format = format

  # 设置表格的标题栏为粗体
  bold = Spreadsheet::Format.new :weight => :bold,:horizontal_align => :center
  7.times do |x| sheet.row(1).set_format(x, bold) end

  @remit_notifications.each_with_index do |remite,index|
    sheet.row(index + 2).push remite.id,remite.user_name,remite.user_id,remite.money,date_format(remite.verified_at),date_format(remite.refused_at),date_format(remite.created_at)
  end
end

{% endhighlight %}

### 相关资源

+ [10to1/spreadsheet_on_rails ](https://github.com/10to1/spreadsheet_on_rails)
+ [Exporting data to CSV and Excel in your Rails apps](http://blog.plataformatec.com.br/2009/09/exporting-data-to-csv-and-excel-in-your-rails-app/)
+ [FasterCSV](http://fastercsv.rubyforge.org/)
