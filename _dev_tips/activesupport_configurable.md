---
title: ActiveSupport 中的 Configurable
layout: single
---

ActiveSupport::Configurable 为类提供一个 config 的方法，通过它可以进行各种配置。

```ruby
class YourClass
  include ActiveSupport::Configurable
end

YourClass.config.a_option = 'value'

YourClass.config.a_option
=> "value"
```

它还提供了一个更实用的 configure 方法

```ruby
class YourClass
  include ActiveSupport::Configurable
end

YourClass.configure do |config|
  config.a_option = 'value'
end

YourClass.config.a_option
=> "value"
```

它还提供了一个类方法 config_accessor ，它可以指定默认值。

```ruby
class YourClass
  include ActiveSupport::Configurable

  config_accessor :a_option do
    'value'
  end
end

YourClass.config.a_option
=> "value"
YourClass.a_option
=> "value"
YourClass.a_option = "new_value"
=> "new_value"
```

如果不想使用 ActiveSupport，自己写一个类似的接口也是很方便的 [https://qichunren.github.io/dev_tips/configure_api_pattern.html](https://qichunren.github.io/dev_tips/configure_api_pattern.html)

[See doc](https://api.rubyonrails.org/classes/ActiveSupport/Configurable.html)
