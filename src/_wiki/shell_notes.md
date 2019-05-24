---
layout: single
position: Developer
---


         ls -tr /var/log/paigo/stm32-data-* | head -n -6 | xargs rm || true


        log_size_kb=`du -k /var/log/paigo/info.log  | cut -f1`
        if [[ "$log_size_kb" -gt 30720 ]] ; then
            # 30Mb
            echo "" > /var/log/paigo/info.log
        fi



nheqminer -l equihash.hk.nicehash.com:3357 -u 18g1N9S2v163hfzMCibwkvn4NR7d7kqVMb.worker1 -t 6 -cd 0 1
