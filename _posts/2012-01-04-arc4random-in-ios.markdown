---
layout: single
title: "iOS中的arc4random方法"
date: 2012-01-04 22:49
comments: true
categories: ios
---

通过arc4random() 获取0到x-1之间的整数的代码如下:
```
int value = arc4random() % x; 
```
 
获取1到x之间的整数的代码如下: 
```
int value = (arc4random() % x) + 1;
```
 
最后如果想生成一个浮点数，可以在项目中定义如下宏：
```
#define ARC4RANDOM_MAX      0x100000000 
```

然后就可以使用arc4random() 来获取0到100之间浮点数了（精度是rand（）的两倍），代码如下：
```
double val = floorf(((double)arc4random() / ARC4RANDOM_MAX) * 100.0f);
```