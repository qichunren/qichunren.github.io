.. _doc_dd_notes:

Linux dd 命令
================

生成1M大小的文件::

    dd if=/dev/zero of=1M.txt bs=1M count=1

bs 代表字节为单位的块大小


==================    ===============
   单元大小	           代码       
==================    ===============
   字节（1B）        	c 
   字节（2B）           w
   块（512B）          b 
  千字节（1024B）       k 
  兆字节（1024KB）      M  
  吉字节（1024MB）      G
==================    ===============


当一个存储设备备份成一个gz压缩包文件::

    sudo dd if=/dev/sdb bs=1M count=5000 | gzip > imx-test-util-2016-08-03.img.gz

将一个gz格式的镜像压缩包恢复到一个存储设备中，即烧录::

    gunzip -c imx-test-util-2016-08-03.img.gz | sudo dd of=/dev/sdb bs=16M

将一个xz格式的镜像压缩包恢复到一个存储设备中，即烧录::

    unxz -c project.emmc-latest.img.xz | dd of=/dev/mmcblk0 bs=16M