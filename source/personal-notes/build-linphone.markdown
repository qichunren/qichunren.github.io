---
layout: page
title: "Build Linphone"
date: 2012-11-28 11:07
comments: true
sharing: true
footer: true
---


qichunrens-MacBook-Pro:linphone-iphone qichunren$ brew install coreutils
==> Installing coreutils dependency: xz
==> Downloading http://tukaani.org/xz/xz-5.0.4.tar.bz2
######################################################################## 100.0%
==> ./configure --prefix=/usr/local/Cellar/xz/5.0.4
==> make install
/usr/local/Cellar/xz/5.0.4: 58 files, 1.5M, built in 22 seconds
==> Installing coreutils
==> Downloading http://ftpmirror.gnu.org/coreutils/coreutils-8.20.tar.xz
######################################################################## 100.0%
==> Patching
patching file Makefile.in
==> ./configure --prefix=/usr/local/Cellar/coreutils/8.20 --program-prefix=g
==> make install
==> Caveats
All commands have been installed with the prefix 'g'.

If you really need to use these commands with their normal names, you
can add a "gnubin" directory to your PATH from your bashrc like:

    PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"

Additionally, you can access their man pages with normal names if you add
the "gnuman" directory to your MANPATH from your bashrc as well:

    MANPATH="/usr/local/opt/coreutils/libexec/gnuman:$MANPATH"

==> Summary
/usr/local/Cellar/coreutils/8.20: 208 files, 9.4M, built in 2.3 minutes



brew install libtool

==> ./configure -
==> make install
==> Caveats
In order to prevent conflicts with Apple's own libtool we have prepended a "g"
so, you have instead: glibtool and glibtoolize.



qichunrens-MacBook-Pro:linphone-iphone qichunren$ brew info intltool
intltool: stable 0.50.2
http://www.freedesktop.org/wiki/Software/intltool
Not installed
https://github.com/mxcl/homebrew/commits/master/Library/Formula/intltool.rb
qichunrens-MacBook-Pro:linphone-iphone qichunren$ brew install intltool
==> Downloading http://launchpad.net/intltool/trunk/0.50.2/+download/intltool-0.50.2.tar.gz
######################################################################## 100.0%
==> ./configure --prefix=/usr/local/Cellar/intltool/0.50.2
==> make install
/usr/local/Cellar/intltool/0.50.2: 19 files, 388K, built in 18 seconds



qichunrens-MacBook-Pro:linphone-iphone qichunren$ brew install yasm
==> Downloading http://tortall.net/projects/yasm/releases/yasm-1.2.0.tar.gz
######################################################################## 100.0%
==> ./configure --prefix=/usr/local/Cellar/yasm/1.2.0
==> make install
/usr/local/Cellar/yasm/1.2.0: 44 files, 3.4M, built in 25 seconds





qichunrens-MacBook-Pro:linphone-iphone qichunren$ brew install  make
==> Downloading http://ftpmirror.gnu.org/make/make-3.82.tar.gz
######################################################################## 100.0%
==> ./configure --prefix=/usr/local/Cellar/make/3.82
==> make install
==> Caveats
This formula is keg-only: so it was not symlinked into /usr/local.

Mac OS X already provides this software and installing another version in
parallel can cause all kinds of trouble.
==> Summary
/usr/local/Cellar/make/3.82: 8 files, 448K, built in 15 seconds





qichunrens-MacBook-Pro:build qichunren$ brew install openssl
==> Downloading http://openssl.org/source/openssl-1.0.1c.tar.gz
######################################################################## 100.0%
==> perl ./Configure --prefix=/usr/local/Cellar/openssl/1.0.1c --openssldir=/usr/local/etc/openssl zlib-dynamic shared darwin64-x86_64-cc
==> make
==> make test
==> make install MANDIR=/usr/local/Cellar/openssl/1.0.1c/share/man MANSUFFIX=ssl
==> Caveats
This formula is keg-only: so it was not symlinked into /usr/local.

Mac OS X already provides this software and installing another version in
parallel can cause all kinds of trouble.

The OpenSSL provided by OS X is too old for some software.

Generally there are no consequences of this for you. If you build your
own software and it requires this formula, you'll need to add to your
build variables:

    LDFLAGS:  -L/usr/local/opt/openssl/lib
    CPPFLAGS: -I/usr/local/opt/openssl/include

==> Summary
/usr/local/Cellar/openssl/1.0.1c: 429 files, 15M, built in 3.0 minutes