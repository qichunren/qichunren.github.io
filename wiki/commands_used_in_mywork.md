
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