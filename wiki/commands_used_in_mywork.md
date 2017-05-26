
### df

		qichunren@qichunren-work:~$ df -h
		Filesystem      Size  Used Avail Use% Mounted on
		/dev/sda1       235G   11G  213G   5% /
		none            4.0K     0  4.0K   0% /sys/fs/cgroup
		udev            3.9G  4.0K  3.9G   1% /dev
		tmpfs           788M  1.3M  786M   1% /run
		none            5.0M     0  5.0M   0% /run/lock
		none            3.9G   13M  3.9G   1% /run/shm
		none            100M   48K  100M   1% /run/user
		/dev/sda2       679G  110G  535G  17% /home
		/dev/sdb1        64M   21M   44M  32% /media/qichunren/AE95-1FB0
		/dev/sdb2       477M  2.3M  445M   1% /media/qichunren/67972acb-9d78-4491-897f-17ef4f71ed06
		/dev/sdb4       673M  732K  624M   1% /media/qichunren/67827381-c3d6-4526-8eeb-bb3de52b8b0d
		/dev/sdb3       190M  1.6M  175M   1% /media/qichunren/0f61bf36-af75-4a81-8f0d-3bbb044b3136

### Copy files into sdcard

		sudo mkfs.ext4 /dev/sdb2
		sudo tar -xpvf rootfs.tar.gz -C /media/qichunren/0df13c64-ea92-4412-9353-3ac56f3d478a


### Backup data from sdcard


		sudo fdisk -l
		cd /media
		sudo mkdir disk
		sudo mount /dev/sdb1 disk
		sudo umount disk
		sudo dd if=/dev/sdb of=/dev/sda bs=16M

备份的时候，可以只备份有数据的空间，未使用的空间可以不用备份。使用parted命令查看设备的“End”位置，然后dd时设置bs、count参数。

	qichunren@qichunren-work:~/code/paigo-qt$ sudo parted /dev/sdb
	GNU Parted 2.3
	Using /dev/sdb
	Welcome to GNU Parted! Type 'help' to view a list of commands.
	(parted) p                                                                
	Model: Mass Storage Device (scsi)
	Disk /dev/sdb: 15.6GB
	Sector size (logical/physical): 512B/512B
	Partition Table: msdos

	Number  Start   End     Size    Type     File system  Flags
	 1      1049kB  34.6MB  33.6MB  primary  fat16        boot, lba
	 2      34.6MB  3180MB  3146MB  primary  ext4
	 3      3180MB  3442MB  262MB   primary  ext4
	 4      3442MB  3547MB  105MB   primary  ext4

	(parted) q

		sudo dd if=/dev/sdb bs=1M count=4000 | gzip > ~/paigo-sd-2016-09-09.img.gz

		sudo dd if=/dev/sdb > gzip

		 pis-200km-2016-03-28.img.gz

		sudo dd if=/dev/sdb bs=1M count=5000 | gzip > imx-test-util-2016-08-03.img.gz
		sudo umount /dev/sdb?
		gunzip -c imx-test-util-2016-08-03.img.gz | sudo dd of=/dev/sdb bs=16M
		unxz -c paigo.sd-latest.img.xz | sudo dd of=/dev/sdb bs=16M


### Change read only file system to read writeable

		mount -o remount,rw /		


### Temp change ip

		sudo ifconfig eth1:2 192.168.8.104 netmask 255.255.255.0 	
		route add default gw 192.168.8.5

/usr/sbin/gpsd -F /var/run/gpsd.sock -P /var/run/gpsd.pid /dev/ttymxc3		
/usr/sbin/gpsd -F /var/run/gpsd.sock -P /var/run/gpsd.pid /dev/ttymxc3

ubuntu:cpu 8.3 mem 2.8
       gpsd 7.6 0.2
		
			


### LD_LIBRARY_PATH

qichunren@qichunren-work:~/code/imx6-test-util$ ./imx6-test-util 
./imx6-test-util: error while loading shared libraries: libnttest.so: cannot open shared object file: No such file or directory

		export LD_LIBRARY_PATH=./		


### How to cancel a local git commit

   	 git reset HEAD~1	

http://stackoverflow.com/questions/4850717/how-to-cancel-a-local-git-commit   	 


### Serve current local directory http service.

        ruby -run -e httpd . -p 5000 -b 0.0.0.0
or
        python -m SimpleHTTPServer 5000
        
        
        /usr/bin/ntpis1 -d -platform eglfs \
            -plugin evdevtouch:/dev/input/event0


### Find command

	find -name "*.png" -exec ls {} \;



### convert

	find -name "*.png" -exec convert {} -crop 234x234+28+28 {}	 \;	

### SSH invoke ui app

	export DISPLAY=:0	
	
	
	
	/usr/bin/ntpis1  -platform eglfs  -plugin evdevtouch:/dev/input/event0
	
	
sudo dd if=/dev/sdb bs=1G count=20 | gzip > 25t-pis-imx6-20160826.img.gz
