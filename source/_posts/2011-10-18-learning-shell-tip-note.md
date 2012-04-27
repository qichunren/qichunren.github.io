---
layout: post
title: Shell学习小记录
tags:
- note
---

最近为了一些自动化的任务，要写一些脚本。可以使用Ruby脚本、Ruby的rake\thor等等，我为了简洁和性能，我了解了一下Shell，发现用Shell来做这个事情更合适。性能，命令行，管道，丰富的现有工具，基于Linux本身，Shell真是一个好东西。以前认为用Ruby来做这个事情是一个不错的选择，现在知道了，那是因为相比起Shell来，更熟悉Ruby，程序员总是喜欢自己熟悉的领域，而排斥自己不熟悉的领域。其实多了解一下其它方面的，更利用自己工作的开展，提高工作效率。

我随便总结一下几个知识点

#### 字符串

声明一个字符串变量后，使用的时候，在变量名前面加一个$符号才能将其值取出来

```
DATA_FILE=data.tar.gz
echo $DATA_FILE
```

字符串拼接
```
DATA_DIR=/Users/caojinhua/code/
DATA_FILE=data.tar.gz
DATA_PATH=$DATA_DIR""$DATA_FILE
```

将命令执行的结果保存在变量中
```
sha1=`ls -al`
```

#### if语句结构

if语句条件测试命令：
```
[ -d DIR ]	如果DIR存在并且是一个目录则为真
[ -f FILE ]	如果FILE存在且是一个普通文件则为真
[ -z STRING ]	如果STRING的长度为零则为真
[ -n STRING ]	如果STRING的长度非零则为真
[ STRING1 = STRING2 ]	如果两个字符串相同则为真
[ STRING1 != STRING2 ]	如果字符串不相同则为真
[ ARG1 OP ARG2 ]
```

ARG1和ARG2应该是整数或者取值为整数的变量，OP是-eq（等于）-ne（不等于）-lt（小于）-le（小于等于）-gt（大于）-ge（大于等于）之中的一个

之前弄错好几次，中括号前后的空格不能少。

if语句的结构

```
if [ xxx ]
then
fi

if [ xxx ]; then

else

fi

if [ xxx ]; then

elif [ ! xxx ]; then

fi
```

#### 时间格式化

```
date  +%Y%m%d

a=`date +%Y%m%d`
echo $a
```

#### 参考资料
[Shell脚本语法](http://learn.akae.cn/media/ch31s05.html)

