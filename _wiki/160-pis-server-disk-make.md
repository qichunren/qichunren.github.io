---
layout: single
position: Developer
---

# Server Disk make

    cd /
    sudo mount /dev/sdb2 /mnt
    cd /mnt
    ls
    lib  lost+found
    sudo mkdir var
    sudo mount /dev/sdb3 var

    df -h
    Filesystem      Size  Used Avail Use% Mounted on
    udev            3.2G     0  3.2G   0% /dev
    tmpfs           649M  9.1M  640M   2% /run
    /dev/sda1        72G   65G  2.6G  97% /
    tmpfs           3.2G  164K  3.2G   1% /dev/shm
    tmpfs           5.0M  4.0K  5.0M   1% /run/lock
    tmpfs           3.2G     0  3.2G   0% /sys/fs/cgroup
    /dev/sda3        79G   57G   19G  76% /home
    ubuntu_share    124G   67G   58G  54% /media/sf_ubuntu_share
    tmpfs           649M   44K  649M   1% /run/user/1000
    /dev/sdb2       976M  7.8M  901M   1% /mnt
    /dev/sdb3       2.0G  3.0M  1.8G   1% /mnt/var

    qichunren@qichunren-VirtualBox:~/code/ntpis160km/pis-server-buildroot/output/images$ ls
    rootfs.tar  rootfs.tar.xz

    sudo tar -xpf rootfs.tar -C /mnt

    sync
