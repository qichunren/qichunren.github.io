--------------------------------
Install rbenv
--------------------------------

::

  apt-get install gcc make build-essential
  apt-get install nodejs # Rails need nodejs runtime.

  apt-get install -y libssl-dev libreadline-dev zlib1g-dev
  git clone git://github.com/sstephenson/rbenv.git ~/.rbenv
  echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
  echo 'eval "$(rbenv init -)"' >> ~/.bashrc

--------------------------------
Install ruby-build 
--------------------------------

https://github.com/rbenv/ruby-build

::

  # As an rbenv plugin
  $ mkdir -p "$(rbenv root)"/plugins
  $ git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build

--------------------------------
Install ruby
--------------------------------

::

  apt-get install -y libssl-dev libreadline-dev zlib1g-dev
  rbenv install 2.4.4

Set default global ruby version by `rbenv global 2.4.4`

Set ruby version for a project by add a file named .ruby-version into project root dir.
