---
layout: single
position: Developer
title: Rsync notes
---

`rsync` is a utility for efficiently transferring and synchronizing files across computer systems.

It uses a delta-transfer algorithm which sends only the differences between the source files and the existing files in the destination.

## Examples

Syncing a local directory to a remote machine. Please note that there is no slash '/' after 'my-app' in the command below.

    rsync -ar my-app username@some_host:/home/username/

The '-a' parameter stands for archive mode, while the '-r' parameter represents recursive mode, meaning it synchronizes all files within the directory recursively.

## References

* [rsync(1) manpage](https://www.samba.org/ftp/rsync/rsync.html)