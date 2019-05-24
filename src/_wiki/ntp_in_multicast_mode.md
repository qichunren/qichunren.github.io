---
layout: single
title: "ntp with multicast mode"
date: 2016-04-30 12:04
comments: false
footer: false
---

# NTP

## Install NTP


	sudo apt-get update
	sudo apt-get install ntp


## Config NTP Server

Edit /etc/ntp.conf file, below is a real sample:


	# /etc/ntp.conf, configuration for ntpd; see ntp.conf(5) for help

	driftfile /var/lib/ntp/ntp.drift
	logfile /var/log/ntp.log


	# Enable this if you want statistics to be logged.
	#statsdir /var/log/ntpstats/

	statistics loopstats peerstats clockstats
	filegen loopstats file loopstats type day enable
	filegen peerstats file peerstats type day enable
	filegen clockstats file clockstats type day enable

	# Specify one or more NTP servers.

	# Use servers from the NTP Pool Project. Approved by Ubuntu Techni                                                         cal Board
	# on 2011-02-08 (LP: #104525). See http://www.pool.ntp.org/join.ht                                                         ml for
	# more information.
	#server 0.ubuntu.pool.ntp.org
	#server 1.ubuntu.pool.ntp.org
	#server 2.ubuntu.pool.ntp.org
	#server 3.ubuntu.pool.ntp.org

	broadcast 224.0.1.1 minpoll 3, maxpoll 4

	# Use Ubuntu's ntp server as a fallback.
	#server ntp.ubuntu.com
	server 127.127.1.1
	fudge  127.127.1.1 stratum 10
	# Access control configuration; see /usr/share/doc/ntp-doc/html/ac                                                         copt.html for
	# details.  The web page <http://support.ntp.org/bin/view/Support/                                                         AccessRestrictions>
	# might also be helpful.
	#
	# Note that "restrict" applies to both servers and clients, so a c                                                         onfiguration
	# that might be intended to block requests from certain clients co                                                         uld also end
	# up blocking replies from your own upstream servers.

	# By default, exchange time with everybody, but don't allow config                                                         uration.
	restrict -4 default kod notrap nomodify
	restrict -6 default kod notrap nomodify

	# Local users may interrogate the ntp server more closely.
	restrict 127.0.0.1
	restrict ::1

	# Clients from this (example!) subnet have unlimited access, but o                                                         nly if
	# cryptographically authenticated.
	restrict 192.168.0.0 mask 255.255.0.0 trust

	# If you want to provide time to your local subnet, change the nex                                                         t line.
	# (Again, the address is an example only.)
	# broadcast 255.255.255.255

	# If you want to listen to time broadcasts on your local subnet, d                                                         e-comment the
	# next lines.  Please do this only if you trust everybody on the n                                                         etwork!
	disable auth
	#broadcastclient


Edit /etc/ntp.conf

Start/Stop/Restart NTP daemon
/etc/init.d/ntp start/stop/restart

```/sbin/route add -net 224.0.0.0 netmask 240.0.0.0 eth0```

## Config NTP Client

Edit /etc/ntp.conf file, below is a real sample:


	#server 0.pool.ntp.org iburst
	#server 1.pool.ntp.org iburst

	tinker panic 0
	interface listen eth0

	restrict default kod nomodify notrap
	restrict -6 default kod nomodify notrap

	restrict 127.0.0.1
	restrict -6 ::1
	multicastclient 224.0.1.1
	disable auth
	logfile /var/log/ntp.log


View NTP server list


	root@arm:~# ntpq -p
	     remote           refid      st t when poll reach   delay   offset  jitter
	==============================================================================
	*192.168.11.240  LOCAL(1)        11 m    4    8  376   41.552   -3.044   0.289
	+192.168.101.11  LOCAL(1)        11 m    4    8  376   58.331    5.223   0.296

* [NTP with GPSD](/wiki/ntp_with_gpsd)