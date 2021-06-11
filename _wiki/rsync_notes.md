---
layout: single
---

https://www.samba.org/ftp/rsync/rsync.html

将当前 pis-ui 目录同步到远程机器中的 /home/ntwork/ 目录下，注意 pis-ui 后面没有斜线 '/'

    rsync -ar  pis-ui ntwork@192.168.8.196:/home/ntwork/


