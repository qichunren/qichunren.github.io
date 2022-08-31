---
layout: single
title: "利用 Turbo 的 Lazy-loaded frame 优化页面加载性能"
date: 2022-07-20 00:05
comments: true
categories: Development
---

我最近做了一个产品的 Landing page，随着需求一步一步的沟通，页面中的元素越来越多，严重影响了页面的首次加载性能。

在禁用了浏览器的缓存后，模拟新用户首次浏览页面 https://photonicat.com/pre，开发者工具显示如下的总的加载时间和流量。耗费了10秒钟！

![slow_page_load.png](/images/slow_page_load.png)

看来必须优化了。因为 起步页 (Landing page) 都是多屏内容组合而成的。在初始载入页面时，除了页面上方的第一屏内容显示在浏览器视图中，第一屏以下的页面元素并没有展现给用户。所以我可以延迟加载相应的局部页面，以提高页面加载性能。

在研究的过程中，发现现代的浏览器中有 [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) ，通过这个 API，可以实现当用户浏览网页时，滚动页面时，在合适的时机加载局部页面。

但是我不想写 Javascript 啊，因为 Rails 的 Turbo 中已经有了 [Lazy-loaded frame](https://turbo.hotwired.dev/reference/frames#lazy-loaded-frame) 功能了。当局部页面显示在视野中，异步加载局部页面，并更新到相应的 turbo-frame 中。

```
<turbo-frame id="messages" src="/messages" loading="lazy">
  Content will be replaced when the frame becomes visible and /messages has been loaded.
</turbo-frame>
```

## 改造过程

原来的页面代码大概是这个样子，每一个 partial 都是一个块页面。

```
<%=render "/blocks/heros/hero" -%>
<%=render "/blocks/sections/web_is_yours" -%>
<%=render "/blocks/sections/structure" -%>
<%=render "/blocks/sections/tinkering_ready" -%>
<%=render "/blocks/sections/take_it_home" -%>
<%=render "/blocks/sections/take_it_with_u" -%>
<%=render "/blocks/sections/tech_spec" -%>
<%=render "/blocks/sections/pre_order" -%>
```

现在我把它改成这个样子：

```
<%=render "/blocks/heros/hero" -%>
<%=render "/blocks/sections/web_is_yours" -%>
<%=render "/blocks/sections/structure" -%>
<turbo-frame id="tinkering_ready" src="/blocks/sections/tinkering_ready_lazyload" loading="lazy">Loading ...</turbo-frame>
<turbo-frame id="take_it_home" src="/blocks/sections/take_it_home_lazyload" loading="lazy">Loading ...</turbo-frame>
<turbo-frame id="take_it_with_u" src="/blocks/sections/take_it_with_u_lazyload" loading="lazy">Loading ...</turbo-frame>
<turbo-frame id="tech_specs" src="/blocks/sections/tech_spec_lazyload" loading="lazy">Loading ...</turbo-frame>
<turbo-frame id="pre_order" src="/blocks/sections/pre_order_lazyload" loading="lazy">Loading ...</turbo-frame>
```

config/routes.rb 中加入一条新 URL 规则：

```
get "blocks/sections/:name", to: "welcome#lazyload_turbo_frame"
```

控制器中的 action 方法：

```
  def lazyload_turbo_frame
    name = params[:name].to_s
    file = Rails.root.join("app/views/blocks/sections/_#{name}.html.erb")
    if file.exist?
      render partial: "/blocks/sections/#{name}", layout: false
    else
      render :file => "#{Rails.root}/public/404.html",  :status => 404, layout: false
    end
  end
```

最后就是将相应的 partial 页面用 turbo-frame 包含一下就可以了：

```
<turbo-frame id="pre_order">
<%=render "/blocks/sections/pre_order" -%>
</turbo-frame>
```

现在看一下新的页面加载情况，https://photonicat.com/pre_fast, 从原来的 10 秒变成 3 秒了。

![lazyload_turbo_frame.png](/images/lazyload_turbo_frame.png)

改造过程中没有写一句 Javascript 代码。
