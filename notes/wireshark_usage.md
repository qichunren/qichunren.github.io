---
layout: single
position: Developer
title: Wireshark notes
---

Wireshark is a powerful network protocol analyzer that can help you understand how data is moving over your network. In this article, we will go over some Wireshark commands that can help you filter and analyze packets.


Show UDP packets from src port 8086:

	udp.srcport==8086

Show UDP packets from src port 8086 or dst port 8086:

	udp.port==8086	

Only show UDP packets from host 192.168.15.198 on port 4096:

	udp.dstport==4096 && ip.host==192.168.15.198