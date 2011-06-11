---
layout: post
title: Static site using rails    
tags:
- Rails
---


原文地址：[Static site using rails](http://railstech.com/?p=89).


As we know rails is mainly used for dynamic website.we can also display static web pages or we can deploy full static website using rails.
The following code can help us to display static pages.

+ Step 1:-Create Rails project

{% highlight ruby %}
rails static_site
{% endhighlight %}

+ Step 2:-Generate StaticPage Controller

{% highlight ruby %}
ruby script/generate controller static_pages page
{% endhighlight %}

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

{% highlight ruby %}
map.page "page/:filename.:format", :controller => 'static_pages', :action => 'page'
{% endhighlight %}

+ Step 5:- Now add following line into static_pages controller

{% highlight ruby %}
def page
 send_file
 "#{Rails.root}/app/views/static_pages/#{params[:filename]}.#{params[:format]}",:disposition =>'inline',:type => StaticPage::Formats[params[:format]]
 end
{% endhighlight %}

+ Step 6:- All the static pages place in RAILS_ROOT/app/views/static_pages/ folder

Step 7 :- Start server and Type url as shown below.

{% highlight bash %}
ruby script/server
{% endhighlight %}

