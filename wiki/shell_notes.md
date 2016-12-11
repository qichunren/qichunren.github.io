         ls -tr /var/log/paigo/stm32-data-* | head -n -6 | xargs rm || true


        log_size_kb=`du -k /var/log/paigo/info.log  | cut -f1`
        if [[ "$log_size_kb" -gt 30720 ]] ; then
            # 30Mb
            echo "" > /var/log/paigo/info.log
        fi
