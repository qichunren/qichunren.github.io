---
layout: single
title: Work with binary data
date: 2016-06-22 11:25
comments: true
categories: Development
---

最近在做一些网络编程方面的东西，之前大多数情况接触的都是文本协议，现在接触的是二进制协议。在此补一下相关知识，下面基本上是以Ruby语言来描述用法。

在Ruby中字面常量二近制数据以 0b 开头:

    $ irb
    1.9.3-p194 :001 > 0b1010
     => 10 
    1.9.3-p194 :002 > 0b10
     => 2 
    1.9.3-p194 :003 > 0b11
     => 3 
    1.9.3-p194 :004 > 0b100
     => 4
     
     
### Fixnum#to_s(base = 10) 

Fixnum#to_s(base = 10) 方法用于各种进制之间的转换。
     
    ### 二进制转换成十进制
    
    $ irb
    1.9.3-p194 :001 > 0b10.to_s(10)
     => "2" 
    1.9.3-p194 :002 > 0b11.to_s(10)
     => "3" 
    1.9.3-p194 :003 > 0b100.to_s(10)
     => "4"
     
     
    ### 十进制转换成二进制

    $ irb
    1.9.3-p194 :001 > 10.to_s(2)
     => "1010" 
    1.9.3-p194 :002 > 4.to_s(2)
     => "100" 
    1.9.3-p194 :003 > 2.to_s(2)
     => "10"
    
    ### 十六进制转换成十进制
    
    0xFF.to_s(10) # "255" 
    0xFF.to_s # "255" 
    "FF".hex # 255 
    
    ### 十六进制转换成二进制
    
    0xFF.to_s(2) # "11111111"
         
### String#to_i(base = 10)

String#to_i(base = 10) 方法用于将各种进制的字符串转换成十进制数。  

    $ irb
    1.9.3-p194 :001 > "0b100".to_i(2)
     => 4 
    1.9.3-p194 :002 > "0100".to_i(10)
     => 100 
    1.9.3-p194 :003 > "0xFF".to_i(16)
     => 255   
     
注意：String#to_i方法的参数一定要和字符串本身的进制一致，否则将得不到预期的结果。      

### Packing and unpacking

 String#unpack 和 Array#pack在网络程序中处理二进制时用得比较多。
 
     $ irb
     1.9.3-p194 :045 > "\xff\x00\x2a".unpack('C*')
      => [255, 0, 42]
     1.9.3-p194 :042 > [192,168,1,1].pack('C*')
      => "\xC0\xA8\x01\x01" 
     1.9.3-p194 :043 > [255,255,255,255].pack('C*')
      => "\xFF\xFF\xFF\xFF"
     
下面是一个UDP广播二进制数据的例子

    require 'socket'

    udp_socket = UDPSocket.new 
    udp_socket.bind("0.0.0.0", 8086)
    udp_socket.setsockopt(Socket::SOL_SOCKET, Socket::SO_BROADCAST, true) 
    100.times do |i| 
	    puts "Broadcast message ..."
	    udp_socket.send([0x01, 0x10, 0x00, 0x03, 0x00, 0x04, 0x00, 0x00, 0x96, 0x96, 0xc1, 0x0c].pack('C*'), 0, "255.255.255.255", 1112) 
	    sleep 3
    end     
         
         
### 位操作

```
& bitwise AND
| bitwise OR
^ bitwise XOR
~ bitwise NOT
>> right shift
<< left shift         
```
一个字节是8位，每个位上是0或者1。判断字节中某一个是否是1，使用 & 操作判断结果是否大于0：

```
a_byte = 0b10100001
a_byte & (1 << 0) # 1
a_byte & (1 << 1) # 0
a_byte & (1 << 5) # 32
```

### 整数数据类型

在 Ruby 中 Integer 没有像 大多数语言有区别 整数的数据类型 uint8, uint16, uint32

将一个 Integer 转换成 int8： a_int & 0xff

#### Resources

* [Ruby pack unpack](http://blog.bigbinary.com/2011/07/20/ruby-pack-unpack.html)
* [Ruby's bitwise operators](https://calleerlandsson.com/2014/02/06/rubys-bitwise-operators/)
* [Ruby bindata gem](https://github.com/dmendel/bindata)
