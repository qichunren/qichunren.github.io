---
title: Configure 接口 API 的常用模式
layout: single_dev_tips
---

一般一个软件包都会提供一个配置接口，以满足用户进行一个个性化的定制需求。我阅读了许多 Ruby 项目后，我发现下面的用法是一个常用的模式。

```rb
YourModule.configure do |config|
  config.site_title = 'Bala bala'
  config.allow_register = true
end
```

它的实现如下：

```rb
module YourModule

  class << self

    def configure
      yield configuration
    end

    # Accessor for YourModule::Configuration
    def configuration
      @configuration ||= Configuration.new
    end
    alias config configuration

  end

end
```

而 `Configuration` 类则是一个普通的类即可，如下面这样就可以了。

```rb
module YourModule
  class Configuration
    attr_accessor :site_title
    attr_accessor :allow_register
    # ...
  end
end
```

这样的写法可以作为一个通用的固定模式。
