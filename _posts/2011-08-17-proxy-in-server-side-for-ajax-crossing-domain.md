---
layout: post
title: Set proxy in server side to get crossing domain ajax request
date: 2011-08-17 23:12:12
categories: [rails]
comments: true
---

```
class ProxyController < ApplicationController

  # GET /proxy/:url
  def get_handle
    require 'open-uri'
    file = open(params[:url])
    contents = file.read
    render :text => contents
  end

end
```


```
    get "/proxy" => "proxy#get_handle"
```

    ```
    $.get("/proxy?url=" + remote_url, function(data){
    ```