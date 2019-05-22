---
layout: single
title: "NTP with GPSD"
date: 2016-04-30 16:08
comments: false
footer: false
---

Reference page: [http://www.catb.org/gpsd/gpsd-time-service-howto.html](http://www.catb.org/gpsd/gpsd-time-service-howto.html)

`cp /etc/ntp.conf /etc/ntp.conf.origin`


	pool us.pool.ntp.org iburst

	driftfile /var/lib/ntp/ntp.drift
	logfile /var/log/ntp.log

	restrict default kod nomodify notrap nopeer noquery
	restrict -6 default kod nomodify notrap nopeer noquery
	restrict 127.0.0.1 mask 255.255.255.0
	restrict -6 ::1

	# GPS Serial data reference
	server 127.127.28.0
	fudge 127.127.28.0 time1 0.9999 refid GPS

	# GPS PPS reference
	server 127.127.28.1 prefer
	fudge 127.127.28.1 refid PPS


`ntpq -p`


	     remote           refid      st t when poll reach   delay   offset  jitter
	==============================================================================
	*SHM(0)          .GPS.            0 l    6   64    7    0.000   -2.353   1.951
	 SHM(1)          .PPS.            0 l    -   64    0    0.000    0.000   0.000
