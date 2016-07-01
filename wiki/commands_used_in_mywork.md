
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

		sudo dd if=/dev/sdb > gzip pis-200km-2016-03-28.img.gz


		gunzip -c pis-200km-2016-03-28.img.gz | sudo dd of=/dev/sda bs=16M		


### Change read only file system to read writeable

		mount -o remount,rw /		


### Temp change ip

		sudo ifconfig eth1:2 192.168.8.104 netmask 255.255.255.0 		


### LD_LIBRARY_PATH

qichunren@qichunren-work:~/code/imx6-test-util$ ./imx6-test-util 
./imx6-test-util: error while loading shared libraries: libnttest.so: cannot open shared object file: No such file or directory

		export LD_LIBRARY_PATH=./		


### How to cancel a local git commit

   	 git reset HEAD~1	

http://stackoverflow.com/questions/4850717/how-to-cancel-a-local-git-commit   	 


### Serve current local directory http service.

        ruby -run -e httpd . -p 5000 -b 0.0.0.0


### Find command

	find -name "*.png" -exec ls {} \;



### convert

	find -name "*.png" -exec convert {} -crop 234x234+28+28 {}	 \;	