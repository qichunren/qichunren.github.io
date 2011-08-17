---
layout: post
title: Set proxy in server side to get crossing domain ajax request
tags:
- ajax
---

{% highlight ruby %}
class ProxyController < ApplicationController

  # GET /proxy/:url
  def get_handle
    require 'open-uri'
    file = open(params[:url])
    contents = file.read
    render :text => contents
  end

end

# in config/routes.rb
get "/proxy" => "proxy#get_handle"

{% endhighlight %}

{% highlight js %}
$.get("/proxy?url=" + remote_url, function(data){
{% endhighlight %}