---
layout: single
title: "propshaft 源码研究"
date: 2022-03-04 19:45
comments: true
categories: Development
---

首先页面中使用了 Rails 提供的方法

```
<%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
<%= javascript_include_tag "application", "data-turbo-track": "reload", defer: true %>
```

生成的 HTML 标签如下：

```
<link rel="stylesheet" href="/assets/application-f00b069f5cd8e28f9b699ca70bb2b5cdb20b8698.css" data-turbo-track="reload" />
<script src="/assets/application-6ebdcbdb87df2810d072c43df65ad72771c6133b.js" data-turbo-track="reload" defer="defer"></script>
```


那么这样的文件 URL 路径是怎么构建出来的呢？Propshaft 中的 helper.rb 中的方法覆盖了 Rails 中的方法

```
def compute_asset_path(path, options = {})
  Rails.application.assets.resolver.resolve(path) || raise(MissingAssetError.new(path))
end
```

此方法将对文件名进下如下的转换：

```
application.css -> /assets/application-f00b069f5cd8e28f9b699ca70bb2b5cdb20b8698.css
logo.png -> /assets/logo-5ac8bf8b1c5f89160e89e9c9b5e4e76824de113e.png
```

Rails 中的相关代码如下：

```
# Maps asset types to public directory.
ASSET_PUBLIC_DIRECTORIES = {
	audio:      "/audios",
	font:       "/fonts",
	image:      "/images",
	javascript: "/javascripts",
	stylesheet: "/stylesheets",
	video:      "/videos"
}

# Computes asset path to public directory. Plugins and
# extensions can override this method to point to custom assets
# or generate digested paths or query strings.
def compute_asset_path(source, options = {})
	dir = ASSET_PUBLIC_DIRECTORIES[options[:type]] || ""
	File.join(dir, source)
end
alias :public_compute_asset_path :compute_asset_path
```

Rails 中生成的 HTML 代码如下，基本上没有什么用，一般都是通过插件重写此方法。

```
<link rel="stylesheet" href="/stylesheets/application.css" data-turbo-track="reload" />
<script src="/javascripts/application.js" data-turbo-track="reload" defer="defer"></script>
```

好了，前面解释明白了相关的 assert helper 用法，以及它们生成的 HTML 代码。那 Rails 框架实际上是怎么响应这些 assets 的请求呢？

在 propshaft/railtie.rb 中看到 /assets/ 前缀的 URL 请求都由 propshaft/server.rb 处理，它是一个简单的 rack middleware

检查是否存在 public/assets/.manifest.json
Yes: Propshaft::Resolver::Static
No: Propshaft::Resolver::Dynamic