---
layout: post
title: "Static site using rails"
date: "2010-04-06 09:12:12"
comments: true
categories: rails
---


原文地址：[Static site using rails](http://railstech.com/?p=89).


As we know rails is mainly used for dynamic website.we can also display static web pages or we can deploy full static website using rails.
The following code can help us to display static pages.

+ Step 1:-Create Rails project

	rails static_site


+ Step 2:-Generate StaticPage Controller


	ruby script/generate controller static_pages page


+ Step 3:- Create StaticPage Class in Model

{% highlight ruby %}
class StaticPage
  Formats = {
      "html" => "text/html",
      "png" => "image/png",
      "jpg" => "image/jpg"
    }
end

{% endhighlight %}

+ Step 4:- Add following line in routes.rb


	map.page "page/:filename.:format", :controller => 'static_pages', :action => 'page'


+ Step 5:- Now add following line into static_pages controller

{% highlight ruby %}
def page
 send_file
 "#{Rails.root}/app/views/static_pages/#{params[:filename]}.#{params[:format]}",:disposition =>'inline',:type => StaticPage::Formats[params[:format]]
 end
{% endhighlight %}

+ Step 6:- All the static pages place in RAILS_ROOT/app/views/static_pages/ folder

Step 7 :- Start server and Type url as shown below.


	ruby script/server


