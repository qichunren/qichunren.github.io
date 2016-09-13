Before back up a device data, you should umount it.

    sudo umount /dev/sdb?

## Backup /dev/sdb data into a gz file.

    sudo dd if=/dev/sdb bs=16M | gzip > ~/ntpis-sd-2016-09-09.img.gz

## If your /dev/sdb data space is not full, you may only backup data port.

For example, if your /sdev/sdb used size is 4G, you can dd like this:

    sudo dd if=/dev/sdb bs=1M count=4000 | gzip > ~/paigo-sd-2016-09-09.img.gz


## Directly dd from A device to B

    sudo dd if=/dev/sdb of=/dev/sda bs=16M

## dd from backup file

    gunzip -c imx-test-util-2016-08-03.img.gz | sudo dd of=/dev/sdb bs=16M	
