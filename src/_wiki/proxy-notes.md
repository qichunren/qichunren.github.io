---
layout: single
position: Developer
---

# Proxy Notes


## socat作端口转发

使用场景:

A 访问 B很慢，C访问B很快，现在可以将C作为中间跳板，使A通过访问C达到加速访问B的目的

在C的机器上执行以下命令
    
    socat TCP-LISTEN:8913,fork TCP:108.61.161.174:22