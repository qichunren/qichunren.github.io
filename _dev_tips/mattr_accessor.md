---
title: ActiveSupport 中 Module 里的 mattr_accessor 方法
layout: single
---

```ruby
module HairColors
  mattr_accessor :hair_colors
end

class Person
  include HairColors
end

HairColors.hair_colors = [:brown, :black, :blonde, :red]
HairColors.hair_colors # => [:brown, :black, :blonde, :red]
Person.new.hair_colors # => [:brown, :black, :blonde, :red]
Person.hair_colors # undefined method `hair_colors' for Person:Class (NoMethodError)
```

mattr_accessor 方法可以指定一个默认值，例如：

```ruby
module Propshaft
  mattr_accessor :logger, default: Logger.new(STDOUT)
end
```

[See doc](https://api.rubyonrails.org/classes/Module.html#method-i-mattr_accessor)