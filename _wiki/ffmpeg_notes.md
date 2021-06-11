# ffmpeg 使用笔记


删除片头

    ./ffmpeg.exe -i 'E:\aa.mp4' -ss 00:00:10 -vcodec copy -acodec copy -f mp4 E:\bb.mp4

    