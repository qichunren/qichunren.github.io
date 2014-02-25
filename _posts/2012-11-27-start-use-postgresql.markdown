---
layout: post
title: "Use postgres database on Mac Lion"
date: 2012-11-27 10:52
comments: true
categories: database
---

## Mac平台

### brew info postgresql
<pre>
qichunrens-MacBook-Pro:luna-client1 qichunren$ brew info postgresql
postgresql: stable 9.2.1
http://www.postgresql.org/
Depends on: readline, ossp-uuid
Not installed
https://github.com/mxcl/homebrew/commits/master/Library/Formula/postgresql.rb
==> Options
--no-perl
	Build without Perl support
--enable-dtrace
	Build with DTrace support
--32-bit
	Build 32-bit only
--no-python
	Build without Python support
--without-ossp-uuid
	Build without OSSP uuid
==> Caveats
# Build Notes

If builds of PostgreSQL 9 are failing and you have version 8.x installed,
you may need to remove the previous version first. See:
  https://github.com/mxcl/homebrew/issues/issue/2510

To build plpython against a specific Python, set PYTHON prior to brewing:
  PYTHON=/usr/local/bin/python  brew install postgresql
See:
  http://www.postgresql.org/docs/9.2/static/install-procedure.html

# Create/Upgrade a Database

If this is your first install, create a database with:
  initdb /usr/local/var/postgres -E utf8

To migrate existing data from a previous major version (pre-9.2) of PostgreSQL, see:
  http://www.postgresql.org/docs/9.2/static/upgrading.html

# Start/Stop PostgreSQL

If this is your first install, automatically load on login with:
  mkdir -p ~/Library/LaunchAgents
  cp /usr/local/Cellar/postgresql/9.2.1/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
  launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

If this is an upgrade and you already have the homebrew.mxcl.postgresql.plist loaded:
  launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
  cp /usr/local/Cellar/postgresql/9.2.1/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
  launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

Or start manually with:
  pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

And stop with:
  pg_ctl -D /usr/local/var/postgres stop -s -m fast

# Loading Extensions

By default, Homebrew builds all available Contrib extensions.  To see a list of all
available extensions, from the psql command line, run:
  SELECT * FROM pg_available_extensions;

To load any of the extension names, navigate to the desired database and run:
  CREATE EXTENSION [extension name];

For instance, to load the tablefunc extension in the current database, run:
  CREATE EXTENSION tablefunc;

For more information on the CREATE EXTENSION command, see:
  http://www.postgresql.org/docs/9.2/static/sql-createextension.html
For more information on extensions, see:
  http://www.postgresql.org/docs/9.2/static/contrib.html

# Other

Some machines may require provisioning of shared memory:
  http://www.postgresql.org/docs/9.2/static/kernel-resources.html#SYSVIPC

To install postgresql (and ossp-uuid) in 32-bit mode:
   brew install postgresql --32-bit

If you want to install the postgres gem, including ARCHFLAGS is recommended:
    env ARCHFLAGS="-arch x86_64" gem install pg

</pre>



### brew install postgresql

<pre>
qichunrens-MacBook-Pro:luna-client1 qichunren$ brew install postgresql
==> Installing postgresql dependency: readline
==> Downloading http://ftpmirror.gnu.org/readline/readline-6.2.tar.gz
######################################################################## 100.0%
==> Patching
patching file callback.c
patching file input.c
patching file patchlevel
patching file support/shobj-conf
patching file vi_mode.c
==> ./configure --prefix=/usr/local/Cellar/readline/6.2.4 --mandir=/usr/local/Cellar/readline/6.2.4/share/man --infodir=/usr/local/Cellar/readline/6.2.4/share/info --enable-multibyt
==> make install
==> Caveats
This formula is keg-only: so it was not symlinked into /usr/local.

OS X provides the BSD libedit library, which shadows libreadline.
In order to prevent conflicts when programs look for libreadline we are
defaulting this GNU Readline installation to keg-only.

Generally there are no consequences of this for you. If you build your
own software and it requires this formula, you'll need to add to your
build variables:

    LDFLAGS:  -L/usr/local/opt/readline/lib
    CPPFLAGS: -I/usr/local/opt/readline/include

==> Summary
/usr/local/Cellar/readline/6.2.4: 31 files, 1.6M, built in 13 seconds
==> Installing postgresql dependency: ossp-uuid
==> Downloading ftp://ftp.ossp.org/pkg/lib/uuid/uuid-1.6.2.tar.gz
######################################################################## 100.0%
######################################################################## 100.0%==> ./configure --prefix=/usr/local/Cellar/ossp-uuid/1.6.2 --without-perl --without-php --without-pgsql
==> make
==> make install
==> Caveats
This formula is keg-only: so it was not symlinked into /usr/local.

OS X provides a uuid.h which conflicts with ossp-uuid's header.

Generally there are no consequences of this for you. If you build your
own software and it requires this formula, you'll need to add to your
build variables:

    LDFLAGS:  -L/usr/local/opt/ossp-uuid/lib
    CPPFLAGS: -I/usr/local/opt/ossp-uuid/include

==> Summary
/usr/local/Cellar/ossp-uuid/1.6.2: 15 files, 232K, built in 28 seconds
==> Installing postgresql
==> Downloading http://ftp.postgresql.org/pub/source/v9.2.1/postgresql-9.2.1.tar.bz2
######################################################################## 100.0%
==> Patching
patching file src/pl/plpython/Makefile
patching file contrib/uuid-ossp/uuid-ossp.c
==> ./configure --prefix=/usr/local/Cellar/postgresql/9.2.1 --datadir=/usr/local/Cellar/postgresql/9.2.1/share/postgresql --docdir=/usr/local/Cellar/postgresql/9.2.1/share/doc/postg
==> make install-world
==> Caveats
# Build Notes

</pre>


### initdb /usr/local/var/postgres -E utf8

<pre>
qichunrens-MacBook-Pro:luna-client1 qichunren$ initdb /usr/local/var/postgres -E utf8
The files belonging to this database system will be owned by user "qichunren".
This user must also own the server process.

The database cluster will be initialized with locale "en_US.UTF-8".
The default text search configuration will be set to "english".

creating directory /usr/local/var/postgres ... ok
creating subdirectories ... ok
selecting default max_connections ... 20
selecting default shared_buffers ... 1600kB
creating configuration files ... ok
creating template1 database in /usr/local/var/postgres/base/1 ... ok
initializing pg_authid ... ok
initializing dependencies ... ok
creating system views ... ok
loading system objects' descriptions ... ok
creating collations ... ok
creating conversions ... ok
creating dictionaries ... ok
setting privileges on built-in objects ... ok
creating information schema ... ok
loading PL/pgSQL server-side language ... ok
vacuuming database template1 ... ok
copying template1 to template0 ... ok
copying template1 to postgres ... ok

WARNING: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the option -A, or
--auth-local and --auth-host, the next time you run initdb.

Success. You can now start the database server using:

    postgres -D /usr/local/var/postgres
or
    pg_ctl -D /usr/local/var/postgres -l logfile start


</pre>


### 相关的常用命令

#### createuser
<pre>
qichunrens-MacBook-Pro:luna-server qichunren$ createuser --help
createuser creates a new PostgreSQL role.

Usage:
  createuser [OPTION]... [ROLENAME]

Options:
  -c, --connection-limit=N  connection limit for role (default: no limit)
  -d, --createdb            role can create new databases
  -D, --no-createdb         role cannot create databases (default)
  -e, --echo                show the commands being sent to the server
  -E, --encrypted           encrypt stored password
  -i, --inherit             role inherits privileges of roles it is a
                            member of (default)
  -I, --no-inherit          role does not inherit privileges
  -l, --login               role can login (default)
  -L, --no-login            role cannot login
  -N, --unencrypted         do not encrypt stored password
  -P, --pwprompt            assign a password to new role
  -r, --createrole          role can create new roles
  -R, --no-createrole       role cannot create roles (default)
  -s, --superuser           role will be superuser
  -S, --no-superuser        role will not be superuser (default)
  -V, --version             output version information, then exit
  --interactive             prompt for missing role name and attributes rather
                            than using defaults
  --replication             role can initiate replication
  --no-replication          role cannot initiate replication
  -?, --help                show this help, then exit

Connection options:
  -h, --host=HOSTNAME       database server host or socket directory
  -p, --port=PORT           database server port
  -U, --username=USERNAME   user name to connect as (not the one to create)
  -w, --no-password         never prompt for password
  -W, --password            force password prompt

Report bugs to <pgsql-bugs@postgresql.org>.
</pre>


#### createdb

<pre>
qichunrens-MacBook-Pro:luna-server qichunren$ createdb --help
createdb creates a PostgreSQL database.

Usage:
  createdb [OPTION]... [DBNAME] [DESCRIPTION]

Options:
  -D, --tablespace=TABLESPACE  default tablespace for the database
  -e, --echo                   show the commands being sent to the server
  -E, --encoding=ENCODING      encoding for the database
  -l, --locale=LOCALE          locale settings for the database
      --lc-collate=LOCALE      LC_COLLATE setting for the database
      --lc-ctype=LOCALE        LC_CTYPE setting for the database
  -O, --owner=OWNER            database user to own the new database
  -T, --template=TEMPLATE      template database to copy
  -V, --version                output version information, then exit
  -?, --help                   show this help, then exit

Connection options:
  -h, --host=HOSTNAME          database server host or socket directory
  -p, --port=PORT              database server port
  -U, --username=USERNAME      user name to connect as
  -w, --no-password            never prompt for password
  -W, --password               force password prompt
  --maintenance-db=DBNAME      alternate maintenance database

By default, a database with the same name as the current user is created.

Report bugs to <pgsql-bugs@postgresql.org>.

---------
pg_ctl -D /usr/local/var/postgres -l logfile start
createuser luna
createdb -O luna -E utf8 luna_production

psql -U luna luna_production
luna_production=> select * from users;
luna_production=> ALTER USER luna WITH PASSWORD ‘whateverpasswordyouwant’;
</pre>

## Ubuntu平台

`sudo apt-get -y install  postgresql libpq-dev` 安装完成以后，我们需要更改postgres用户的密码，否则我们就没法使用这个数据库服务器。以postgres这个系统用户的身份运行psql命令，在终端中输入如下:

```
sudo su postgres -c psql template1
```
这时候会出现新的提示符，输入下面两个命令，用新密码替换 <***password***>：

```
ALTER USER postgres WITH PASSWORD '<***password***>';
```

<pre>

sudo -u postgres psql -c "create user qichunren with password 'qichunren';"
sudo -u postgres psql -c "CREATE DATABASE qichunren_production WITH OWNER qichunren ENCODING 'UTF8';"
# sudo -u postgres psql -c "DROP DATABASE qichunren_production;"
</pre>

### 设置数据库编码

```
psql (9.0.3)
Type "help" for help.
 
postgres=# update pg_database set datallowconn = TRUE where datname = 'template0';
UPDATE 1
postgres=# \c template0
You are now connected to database "template0".
template0=# update pg_database set datistemplate = FALSE where datname = 'template1';
UPDATE 1
template0=# drop database template1;
DROP DATABASE
template0=# create database template1 with template = template0 encoding = 'UTF8' LC_CTYPE = 'en_US.utf8' LC_COLLATE = 'en_US.utf8';
CREATE DATABASE
template0=# update pg_database set datistemplate = TRUE where datname = 'template1';
UPDATE 1
template0=# \c template1
You are now connected to database "template1".
template1=# update pg_database set datallowconn = FALSE where datname = 'template0';
UPDATE 1
```