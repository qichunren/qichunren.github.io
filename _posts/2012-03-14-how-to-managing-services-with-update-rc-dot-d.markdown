---
layout: single
title: "通过 update-rc.d 来管理 Ubuntu 系统的自动启动程序"
date: 2012-03-14 11:30
comments: true
categories: linux
---
转载，并记下我的使用心得。


Linux services can be started, stopped and reloaded with the use of scripts stocked in /etc/init.d/.
However, during start up or when changing runlevel, those scripts are searched in /etc/rcX.d/ where X is the runlevel number.
This tutorial will explain how one can activate, deactivate or modify a service start up.
When installing a new service under debian, the default is to enable it. So for instance, if you just installed apache2 package, after you installed it, apache service will be started and so will it be upon the next reboots.
If you do not use apache all the time, you might want to disable this service from starting up upon boot up and simply start it manually when you actually need it by running this command:
```
/etc/init.d/apache2 start
```

You could either disable this service on boot up by removing any symbolic links in ***/etc/rcX.d/SYYapache2*** or by using __update-rc.d__.
The advantage of using update-rc.d is that it will take care of removing/adding any required links to /etc/init.d automatically.
Taking apache2 as an example, let's examine how /etc/rcX.d is looking like:

```
# ls -l /etc/rc?.d/*apache2
lrwxrwxrwx 1 root root 17 2007-07-05 22:51 /etc/rc0.d/K91apache2 -> ../init.d/apache2
lrwxrwxrwx 1 root root 17 2007-07-05 22:51 /etc/rc1.d/K91apache2 -> ../init.d/apache2
lrwxrwxrwx 1 root root 17 2007-07-05 22:51 /etc/rc2.d/S91apache2 -> ../init.d/apache2
lrwxrwxrwx 1 root root 17 2007-07-05 22:51 /etc/rc3.d/S91apache2 -> ../init.d/apache2
lrwxrwxrwx 1 root root 17 2007-07-05 22:51 /etc/rc4.d/S91apache2 -> ../init.d/apache2
lrwxrwxrwx 1 root root 17 2007-07-05 22:51 /etc/rc5.d/S91apache2 -> ../init.d/apache2
lrwxrwxrwx 1 root root 17 2007-07-05 22:51 /etc/rc6.d/K91apache2 -> ../init.d/apache2
```

As you can see, for runlevels 0, 1 and 6 there is a K at the beginning of the link, for runlevels 2, 3, 4 and 5, there is a S. Those two letters stands for Kill and Start.
On Debian and Ubuntu, runlevels 2, 3, 4 and 5 are multi-users runlevels.
Runlevel 0 is Halt.
Runlevel 1 is single user mode
Runlevel 6 is reboot

### 1. Removing A Service

If you want to totally disable apache2 service by hand, you would need to delete every single link in /etc/rcX.d/. Using __update-rc.d__ it is as simple as:
```
update-rc.d -f apache2 remove
```
The use of ***-f*** is to force the removal of the symlinks even if there is still /etc/init.d/apache2.

        Note: This command will only disable the service until next time the service is upgraded. If you want to make sure the service won't be re-enabled upon upgrade, you should also type the following:
        # update-rc.d apache2 stop 80 0 1 2 3 4 5 6 .

### 2. Adding A Service

#### 2.1. Default Priorities

Now, if you want to re-add this service to be started on boot up, you can simply use:

```
# update-rc.d apache2 defaults
Adding system startup for /etc/init.d/apache2 ...
/etc/rc0.d/K20apache2 -> ../init.d/apache2
/etc/rc1.d/K20apache2 -> ../init.d/apache2
/etc/rc6.d/K20apache2 -> ../init.d/apache2
/etc/rc2.d/S20apache2 -> ../init.d/apache2
/etc/rc3.d/S20apache2 -> ../init.d/apache2
/etc/rc4.d/S20apache2 -> ../init.d/apache2
/etc/rc5.d/S20apache2 -> ../init.d/apache2
```

#### 2.2. Custom Priorities

But as you can see, the default value is 20 which is pretty different than 91 ... a S20 link is started before a S91 and and K91 is kill before K20.
To force apache2 to be started with priorities 91 for both Start and Kill, we need to use the following command:
```
# update-rc.d apache2 defaults 91
Adding system startup for /etc/init.d/apache2 ...
/etc/rc0.d/K91apache2 -> ../init.d/apache2
/etc/rc1.d/K91apache2 -> ../init.d/apache2
/etc/rc6.d/K91apache2 -> ../init.d/apache2
/etc/rc2.d/S91apache2 -> ../init.d/apache2
/etc/rc3.d/S91apache2 -> ../init.d/apache2
/etc/rc4.d/S91apache2 -> ../init.d/apache2
/etc/rc5.d/S91apache2 -> ../init.d/apache2
```

### 2.3. Different Priorities For Start And Kill

 Alternatively, if you want to set different priorities for Start than for Kill, let say Start with 20 and Kill with 80, you will need to run:

```
# update-rc.d apache2 defaults 20 80
Adding system startup for /etc/init.d/apache2 ...
/etc/rc0.d/K80apache2 -> ../init.d/apache2
/etc/rc1.d/K80apache2 -> ../init.d/apache2
/etc/rc6.d/K80apache2 -> ../init.d/apache2
/etc/rc2.d/S20apache2 -> ../init.d/apache2
/etc/rc3.d/S20apache2 -> ../init.d/apache2
/etc/rc4.d/S20apache2 -> ../init.d/apache2
/etc/rc5.d/S20apache2 -> ../init.d/apache2
```

## 3. Specifying Custom Runlevels

Finally, if you only want to Start and Kill on specific runlevels, like for instance starting apache with priority 20 on runlevels 2, 3, 4 and 5 and Kill with priority 80 on runlevels 0, 1 and 6:

```
# update-rc.d apache2 start 20 2 3 4 5 . stop 80 0 1 6 .
Adding system startup for /etc/init.d/apache2 ...
/etc/rc0.d/K80apache2 -> ../init.d/apache2
/etc/rc1.d/K80apache2 -> ../init.d/apache2
/etc/rc6.d/K80apache2 -> ../init.d/apache2
/etc/rc2.d/S20apache2 -> ../init.d/apache2
/etc/rc3.d/S20apache2 -> ../init.d/apache2
/etc/rc4.d/S20apache2 -> ../init.d/apache2
/etc/rc5.d/S20apache2 -> ../init.d/apache2
```

Or, to start with priority 20 for runlevel 2, 3 and 4 and priority 30 for runlevel 5 and kill with priority 80 for runlevel 0, 1 and 6:

```
# update-rc.d apache2 start 20 2 3 4 . start 30 5 . stop 80 0 1 6 .
Adding system startup for /etc/init.d/apache2 ...
/etc/rc0.d/K80apache2 -> ../init.d/apache2
/etc/rc1.d/K80apache2 -> ../init.d/apache2
/etc/rc6.d/K80apache2 -> ../init.d/apache2
/etc/rc2.d/S20apache2 -> ../init.d/apache2
/etc/rc3.d/S20apache2 -> ../init.d/apache2
/etc/rc4.d/S20apache2 -> ../init.d/apache2
/etc/rc5.d/S30apache2 -> ../init.d/apache2
```

## 我的总结

通过 update-rc.d 来管理 Linux 下开机自动运行，的确很方便，但是我在实际部署实践中，还是遇到了一些问题，导致开机后没有正常自动启动，但是手工通过 service xxx start 可以启动。我经过排查发现，原因是在 Linux 系统启动中，在执行/etc/init.d/中的脚本时，此时系统有可能没有加载好系统中的 PATH 变量，所以需要在 init.d 脚本中手工指定，对于使用 Ruby 脚本写的程序，需要 GEM_HOME\GEM_PATH 等环境变量，我这里是用 RVM 来管理 Ruby 的，这是我使用的：
```
PATH="/usr/local/rvm/gems/ruby-1.9.2-p290/bin:/usr/local/rvm/rubies/ruby-1.9.2-p290/bin:/usr/local/rvm/bin:/opt/node/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games"
RUBY_VERSION="ruby-1.9.2-p290"
GEM_HOME="/usr/local/rvm/gems/ruby-1.9.2-p290"
GEM_PATH="/usr/local/rvm/gems/ruby-1.9.2-p290:/usr/local/rvm/gems/ruby-1.9.2-p290@global"
export PATH=$PATH
export RUBY_VERSION=$RUBY_VERSION
export GEM_HOME=$GEM_HOME
export GEM_PATH=$GEM_PATH
```

 另外还有一些其它的变量（如果你的启动程序需要），也需要手工指定，如在 Ruby 1.9 中，就有可能需要指定，比如说 unicorn 启动脚本：
```
export LANG='en_US.UTF-8'
```

最后附上一个常用的 init.d 启动脚本的样本：
```
#!/bin/sh
### BEGIN INIT INFO
# Provides:          gps
# Required-Start:    $syslog $remote_fs $network
# Required-Stop:     $syslog $remote_fs $network
# Should-Start:      fam
# Should-Stop:       fam
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start the gps.
### END INIT INFO


PATH=/usr/local/rvm/gems/ruby-1.9.2-p290/bin:/usr/local/rvm/gems/ruby-1.9.2-p290@global/bin:/usr/local/rvm/rubies/ruby-1.9.2-p290/bin:/usr/local/rvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games
DAEMON=/www/georgia/current/lib/gps/gps.rb
NAME=ntgps
DESC="ntgps daemon"
PIDFILE=/var/run/$NAME.pid
SCRIPTNAME=/etc/init.d/$NAME

DAEMON_OPTS=""

set -e
. /lib/lsb/init-functions
export LANG='en_US.UTF-8'
export PATH=$PATH
export GEM_HOME=/usr/local/rvm/gems/ruby-1.9.2-p290
export GEM_PATH=/usr/local/rvm/gems/ruby-1.9.2-p290:/usr/local/rvm/gems/ruby-1.9.2-p290@global

case "$1" in
    start)
        log_daemon_msg "Starting $DESC" $NAME
        if ! start-stop-daemon --start -m --background --oknodo --quiet --pidfile $PIDFILE --exec /usr/local/rvm/rubies/ruby-1.9.2-p290/bin/ruby $DAEMON -- $DAEMON_OPTS
        then
            log_end_msg 1
        else
            log_end_msg 0
        fi
        ;;
    stop)
        log_daemon_msg "Stopping $DESC" $NAME
        if kill  -9 `cat $PIDFILE`
        then
            rm -f $PIDFILE
            log_end_msg 0
        else
            log_end_msg 1
        fi
        ;;
    restart)
        $0 stop
        $0 start
        ;;
    status)
        status_of_proc -p "$PIDFILE" "$DAEMON" $NAME && exit 0 || exit $?
        ;;
    *)
        echo "Usage: $SCRIPTNAME {start|stop|restart|status}" >&2
        exit 1
        ;;
esac

exit 0

```

## Resources:
[How-To: Managing services with update-rc.d](http://www.debuntu.org/how-to-manage-services-with-update-rc.d)