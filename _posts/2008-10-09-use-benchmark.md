---
layout: single
title: Benchmark 用法
date: 2008-10-09 12:01:11
comments: true
categories: [ruby, test]
---

[Benchmark](http://rubybenchmark.com/) 可以用来测试某个函数或者任何代码的执行时间。

用法很简单：

```
require 'benchmark'
n = 1500
Benchmark.bmbm do |x|
  x.report("+ method") { n.times {string1 = "ddd" + "11111" + "Helodd" } }
  x.report("<< method") { n.times {string2 = "ddd" << "11111" << "Helodd"} }
end
```

结果如下：

```
usermatoMacBook-Pro:test qichunren$ ruby test.rb
Rehearsal ---------------------------------------------
+ method    0.000000   0.000000   0.000000 (  0.001722)
<< method   0.000000   0.000000   0.000000 (  0.001073)
------------------------------------ total: 0.000000sec

                user     system      total        real
+ method    0.000000   0.000000   0.000000 (  0.001040)
<< method   0.000000   0.000000   0.000000 (  0.000719)
```

### 参考资料

- [Benchmark Rdoc](http://ruby-doc.org/stdlib/libdoc/benchmark/rdoc/index.html)
- [Ruby 参考手册](http://www.kuqin.com/rubycndocument/man/addlib/benchmark.html)
- [ruby-benchmark-suite](https://github.com/acangiano/ruby-benchmark-suite)
