---
layout: single
title: Show more detail info on will_paginate bar
tags:
- Rails
---

Just create an extension in lib directory:
{% highlight ruby %}
class PaginationDetailLinkRenderer < WillPaginate::LinkRenderer

  # useage: <%=will_paginate @auctions, :renderer => PaginationDetailLinkRenderer %>

  def to_html
    links = @options[:page_links] ? windowed_links : []
    links.unshift page_link_or_span(@collection.previous_page, 'disabled prev_page', @options[:previous_label])
    links.push    page_link_or_span(@collection.next_page,     'disabled next_page', @options[:next_label])
    html = links.join(@options[:separator])
    html = "每页显示<b>#{@collection.per_page}</b>条数据,共有<b>#{total_pages}</b>页,  共有<b>#{@collection.total_entries}</b>条数据" + html
    @options[:container] ? @template.content_tag(:div, html, html_attributes) : html
  end

end
{% endhighlight %}

And the result is like this:
![will_paginate bar](/images/posts/2010-08-08-paginate-bar.jpg "will_paginate bar")