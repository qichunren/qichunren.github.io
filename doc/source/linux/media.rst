.. _doc_media_process_notes:

媒体文件文件相关笔记
========================

播放48K音频::

    gst-launch-1.0 audiotestsrc ! audio/x-raw,rate=48000 ! alsasink

播放音频文件,wav和mp3都支持::

    gst-launch-1.0 filesrc location=/dingdong.wav ! decodebin ! audioconvert ! audioresample ! audio/x-raw,rate=48000 ! alsasink

修改MP3文件sample rate::

    ffmpeg -i 11-starting.mp3 -ar 48000 A11-starting.mp3

多个音频文件拼接成一个音频文件::

    sox --combine sequence dingdong-prefix.mp3 A11-starting.mp3 output.mp3


生成二维码::

        qrencode hello -o /hello.png -s 10
        convert /hello.png -crop 234x234+28+28 /hello_c.png
        convert /hello_c.png -resize 80x80 /hello_80.png