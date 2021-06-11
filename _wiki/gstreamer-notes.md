---
layout: single
position: Developer
sidebar:
  - title: "GStreamer Framework"
    url: https://gstreamer.freedesktop.org/
  - title: "Another Title"
    text: "More text here."
---

# GStreamer notes

## Test if audio output device is ok

    gst-launch-1.0 audiotestsrc ! alsasink

## udpsink

    gst-launch-1.0 -v audiotestsrc ! udpsink

## Encode microphone audio to UDP RTP

    gst-launch-1.0 alsasrc ! audioconvert ! audio/x-raw,channels=1,depth=16,width=16,rate=22000 ! rtpL16pay ! udpsink host=255.255.255.255 port=5000

## RTSP Related

    gst-launch-1.0 rtspsrc location=rtsp://admin:novo1234@192.168.110.71/ ! rtph264depay ! h264parse ! matroskamux! filesink location=test.mkv
    sudo ifconfig enp0s3 192.168.9.6 netmask 255.255.0.0
    gst-launch-1.0 rtspsrc location=rtsp://admin:novo1234@192.168.110.71/ ! rtph264depay ! decodebin ! ximagesink
    gst-launch-1.0 rtspsrc location=rtsp://admin:novo1234@192.168.1.64/ ! rtph264depay ! decodebin ! videoconvert ! ximagesink
    gst-launch-1.0 playbin uri="rtsp://admin:novo1234@192.168.1.64/" video-sink=ximagesink