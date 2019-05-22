#!/bin/sh

PATH=/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/sbin:/usr/local/bin:$PATH

trap process_user_sig SIGUSR1

process_user_sig()
{
    echo "ntpis1-watchdog is still alive!"
}

echo 'Waiting for NTPIS1 startup....'
sleep 30
echo 'Watchdog starting....'
DROP_CACHE_COUNT=0

while :
do
    LEVEL=`runlevel | cut -f2 -d ' '`
    if [ "$LEVEL" = "6" -o "$LEVEL" = "0" -o "$LEVEL" = "1" ] ; then
        break
    fi

    NTPIS1_PID=`pidof -s ntpis1`
    RESTARTED="0"

    if [ -z "$NTPIS1_PID" ] ; then
        echo 'ntpis1 is dead, restarting....'
        killall -9 ntpis1
        killall -9 Xorg
        xinit -- -nocursor &
        RESTARTED="1"
    fi

    if [ "$RESTARTED" = "1" ] ; then
        sleep 30
        continue
    fi
done