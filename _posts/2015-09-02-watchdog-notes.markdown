---
layout: single
title: Wacthdog notes
date: 2015-08-18 20:30
comments: true
categories: Development
---

第一种方法，通过一个 Shell 脚本守护进程检查目标进程是否存在。

第二种方法，通过一个守护进程与目标进程进行本地 Socket 通信。

```
#!/bin/sh

PATH=/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/sbin:/usr/local/bin:$PATH

trap process_user_sig SIGUSR1

process_user_sig()
{
    echo "ntpis-watchdog is still alive!"
}

echo 'Waiting for ntpis startup....'
sleep 30
echo 'Watchdog starting....'
DROP_CACHE_COUNT=0

while :
do
    LEVEL=`runlevel | cut -f2 -d ' '`
    if [ "$LEVEL" = "6" -o "$LEVEL" = "0" -o "$LEVEL" = "1" ] ; then
        break
    fi

    PAIGOQT_PID=`pidof -s ntpis`
    RESTARTED="0"

    if [ -z "$PAIGOQT_PID" ] ; then
        echo `date`" # ntpis is dead, restarting...." >> /var/log/ntpis/info.log
        killall -9 ntpis
        /usr/bin/ntpis -d -platform linuxfb
        RESTARTED="1"
    fi

    if [ "$RESTARTED" = "1" ] ; then
        sleep 30
        continue
    fi
done

```

第二种方法详情见代码。
