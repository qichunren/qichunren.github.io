---
layout: single
position: Developer
---

# GStreamer notes

## Test if audio output device is ok

    gst-launch-1.0 audiotestsrc ! alsasink

## udpsink

    gst-launch-1.0 -v audiotestsrc ! udpsink

## Encode microphone audio to UDP RTP

    gst-launch-1.0 alsasrc ! audioconvert ! audio/x-raw,channels=1,depth=16,width=16,rate=22000 ! rtpL16pay ! udpsink host=255.255.255.255 port=5000