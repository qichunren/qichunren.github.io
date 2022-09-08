---
title: 必免使用多态关联
layout: single_dev_tips
---

Rails 里总是有一些看起来很酷的功能，比如说 [Polymorphic Associations](https://guides.rubyonrails.org/association_basics.html#polymorphic-associations)。

```
class Picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true
end

class Employee < ApplicationRecord
  has_many :pictures, as: :imageable
end

class Product < ApplicationRecord
  has_many :pictures, as: :imageable
end
```

但是我在几个项目中用来下，我发现在处理业务领域的问题时应该尽量必免使用多态关联，在大多数时候这个特性不会带来好处。

1.表面上看少创建了多个表 xxx_pictures，但是在 pictures 表多加了两个字段（imageable_id，imageable_type），如果数据量大的话，带来了不必须的空间浪费。另外在创建索引时，也要小心处理。

2.如果后期的针对 Product 的 Picture 业务需求有变动的话，需要增加字段的话，就给带来字段冗余的问题。

3.多种类型的数据混在一张表中，有可能为给数据聚合查询引入了复杂度。

其实说到根本问题就是在面向业务的代码时，尽量少玩一点花样，让系统的业务更能从容的面对变化。
