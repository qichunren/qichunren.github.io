---
layout: single
title: Ruby Array 使用笔记
date: 2008-10-09 12:01:11
comments: true
categories: [ruby]
---

在 Ruby 中，Array 是一个有序的数据集合，它不像其它的大多数语言中那样只能存放相同类型的数据，你可以在其中存放任何类型的数据。

## 数组初始化

```
irb> a = [1, 2, 's']
irb> b = Array.new # Size is 0
irb> c = Array.new(3) # Size is 3
=> [nil, nil, nil]
irb> d = Array.new(3, "a") # Init an array with default element filled
=> ["a", "a", "a"]
```

另外 Array.new 还可以接受 block 参数，block 中的参数是它的当前位置。

```
irb> e = Array.new(4) {|x| x * 3}
=> [0, 3, 6, 9]

irb> f = Array.new(4) { 1 }
=> [1, 1, 1, 1]

```

## 访问数组元素

Ruby 数组的元素位置是从 0 开始的，这和其它的大部分编程语言是一样的。也可以从数组末尾开始访问元素，-1 表示数组中最后一个元素。

主要方法是 [] 和 at 方法，它们可以获取数组中的单个元素。下面是用法示例。

```
irb> g = [1, 2, 3, "a", "b", "c"]
irb> g[1]
=> 2
irb> g[10]
=> nil
irb> g.at(2)
=> 3
irb> g.at(-1)
=> "c"
irb> g.at(-2)
=> "b"
```

另外 [] 方法还可以获取数组中的连续的子集合。

```
irb> g = [1, 2, 3, "a", "b", "c"]
irb> g[0, 3] # Start from index 0, and get 3 elements
=> [1, 2, 3]
irb> g[0..2] # Start from index 0 to 2
=> [1, 2, 3]
irb> g[0...2] # Start from index 0 to 2, but not include index 2
=> [1, 2]
```

### 参考资料

- [Array doc](http://www.ruby-doc.org/core-1.9.3/Array.html)
