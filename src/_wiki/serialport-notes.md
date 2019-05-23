---
layout: single
position: Developer
---

## 设置串口波特率

    stty -F /dev/ttyO1 speed 4800 raw

## 向串口发送16进制数据

    echo -en '\xa5\x01\x81\x0d\x00\x03\x00\x2b\x00\x01\xe7\xc4\x5a' > /dev/ttyO1

## 两个串口设置互联,实现从一个串口发送数据,从另一个串口接收数据

    socat FILE:/dev/ttyO2,b4800,raw,echo=0 FILE:/dev/ttyO1,b4800,raw,echo=0