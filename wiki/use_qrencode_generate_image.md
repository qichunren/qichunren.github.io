---
layout: single
title: "qrencode generator"
date: 2016-06-28 20:04
comments: false
footer: false
---

	sudo apt-get install qrencode
	qrencode '12345 -o code.png -s 10


```
SN_SOURCE = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

def self.generate_sn
	s = SN_SOURCE.sample(5).join
	while where(:sn => s).exists?
		s = SN_SOURCE.sample(5).join
	end
	return s
end
```	