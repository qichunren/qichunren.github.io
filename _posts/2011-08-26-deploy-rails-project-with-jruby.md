---
layout: post
title: 使用Jruby来部署Rails应用
tags:
- jruby
- deploy
- rails
---

为了保护最近做的产品的源代码，需要将项目中的源代码进行保护起来。我目前了解到的方案有以下两种：

1. 使用代码混淆工具

2. 使用JRuby将Ruby代码编译成java字节码文件（.class）


-----
第一种方案，有一个名为[ruby encoder](http://rubyencoder.com)的产品，我试用了一下，发现太重量级了，我个人只是一个可以将代码混淆一下的小工具而已，而ruby encoder有自己的运行加载机制，源代码二次编码，基于域名可以设置产品过期失效时间等等一系列功能，我不需要这些功能，另外它不是免费的，所以我没有采用这个方案。

第二种方安装就是使用JRuby。整体思路就是将Ruby项目的代码编译成java字节码文件，然后运行于Java环境中。

-----
将项目中的ruby文件编译成java的class文件不是一件容易的事情，所幸有一个名为warbler的gem可以帮助我们搞定这一切，它可以将项目打包(.war)，同时可以将ruby代码编译成class文件。然后你将生成好的.war文件放进JAVA应用服务器的应用目录中，如Tomcat的webapps中就可以了。

warbler提供若干个任务可供使用：
<pre>
qichunren@qichunren-desktop:~/code/ntdeck$ warble -T
warble compiled    # Feature: precompile all Ruby files
warble config      # Generate a configuration file to customize your archive
warble executable  # Feature: make an executable archive
warble gemjar      # Feature: package gem repository inside a jar
warble pluginize   # Install Warbler tasks in your Rails application
warble version     # Display version of Warbler
warble war         # Create the project war file
warble war:clean   # Remove the project war file
warble war:debug   # Dump diagnostic information
</pre>

平时最常用的就是warble war命令了，需要关注的是warble的配置文件，它的配置文件是通过warble config来生成的，在这个文件中有一系列的配置项可以设置，以下是我的配置文件：
{% highlight ruby %}
# Disable Rake-environment-task framework detection by uncommenting/setting to false
# Warbler.framework_detection = false

# Warbler web application assembly configuration file
Warbler::Config.new do |config|
  # Features: additional options controlling how the jar is built.
  # Currently the following features are supported:
  # - gemjar: package the gem repository in a jar file in WEB-INF/lib
  # - executable: embed a web server and make the war executable
  # - compiled: compile .rb files to .class files
  config.features = %w(executable compiled)

  # Application directories to be included in the webapp.
  config.dirs = %w(app config db lib log vendor tmp)

  # Additional files/directories to include, above those in config.dirs
  # config.includes = FileList["db"]

  # Additional files/directories to exclude
  # config.excludes = FileList["lib/tasks/*"]

  # Additional Java .jar files to include.  Note that if .jar files are placed
  # in lib (and not otherwise excluded) then they need not be mentioned here.
  # JRuby and JRuby-Rack are pre-loaded in this list.  Be sure to include your
  # own versions if you directly set the value
  # config.java_libs += FileList["lib/java/*.jar"]

  # Loose Java classes and miscellaneous files to be included.
  # config.java_classes = FileList["target/classes/**.*"]

  # One or more pathmaps defining how the java classes should be copied into
  # the archive. The example pathmap below accompanies the java_classes
  # configuration above. See http://rake.rubyforge.org/classes/String.html#M000017
  # for details of how to specify a pathmap.
  # config.pathmaps.java_classes << "%{target/classes/,}p"

  # Bundler support is built-in. If Warbler finds a Gemfile in the
  # project directory, it will be used to collect the gems to bundle
  # in your application. If you wish to explicitly disable this
  # functionality, uncomment here.
  # config.bundler = false

  # An array of Bundler groups to avoid including in the war file.
  # Defaults to ["development", "test"].
  # config.bundle_without = []

  # Other gems to be included. If you don't use Bundler or a gemspec
  # file, you need to tell Warbler which gems your application needs
  # so that they can be packaged in the archive.
  # For Rails applications, the Rails gems are included by default
  # unless the vendor/rails directory is present.
  # config.gems += ["activerecord-jdbcmysql-adapter", "jruby-openssl"]
  # config.gems << "tzinfo"

  # Uncomment this if you don't want to package rails gem.
  # config.gems -= ["rails"]

  # The most recent versions of gems are used.
  # You can specify versions of gems by using a hash assignment:
  # config.gems["rails"] = "2.3.10"

  # You can also use regexps or Gem::Dependency objects for flexibility or
  # finer-grained control.
  # config.gems << /^merb-/
  # config.gems << Gem::Dependency.new("merb-core", "= 0.9.3")

  # Include gem dependencies not mentioned specifically. Default is
  # true, uncomment to turn off.
  # config.gem_dependencies = false

  # Array of regular expressions matching relative paths in gems to be
  # excluded from the war. Defaults to empty, but you can set it like
  # below, which excludes test files.
  # config.gem_excludes = [/^(test|spec)\//]

  # Pathmaps for controlling how application files are copied into the archive
  # config.pathmaps.application = ["WEB-INF/%p"]

  # Name of the archive (without the extension). Defaults to the basename
  # of the project directory.
  config.jar_name = "ntdeck"

  # Name of the MANIFEST.MF template for the war file. Defaults to a simple
  # MANIFEST.MF that contains the version of Warbler used to create the war file.
  # config.manifest_file = "config/MANIFEST.MF"

  # When using the 'compiled' feature and specified, only these Ruby
  # files will be compiled. Default is to compile all \.rb files in
  # the application.
  # config.compiled_ruby_files = FileList['app/**/*.rb']
  compile_me = FileList[*config.dirs.map {|x| "#{x}/**/*.rb"}].exclude("config/compass.rb").exclude("lib/printer/*") 
  config.compiled_ruby_files = compile_me

  # === War files only below here ===

  # Path to the pre-bundled gem directory inside the war file. Default
  # is 'WEB-INF/gems'. Specify path if gems are already bundled
  # before running Warbler. This also sets 'gem.path' inside web.xml.
  # config.gem_path = "WEB-INF/vendor/bundler_gems"

  # Files for WEB-INF directory (next to web.xml). This contains
  # web.xml by default. If there is an .erb-File it will be processed
  # with webxml-config. You may want to exclude this file via
  # config.excludes.
  # config.webinf_files += FileList["jboss-web.xml"]

  # Files to be included in the root of the webapp.  Note that files in public
  # will have the leading 'public/' part of the path stripped during staging.
  # config.public_html = FileList["public/**/*", "doc/**/*"]

  # Pathmaps for controlling how public HTML files are copied into the .war
  # config.pathmaps.public_html = ["%{public/,}p"]

  # Value of RAILS_ENV for the webapp -- default as shown below
  # config.webxml.rails.env = ENV['RAILS_ENV'] || 'production'

  # Application booter to use, one of :rack, :rails, or :merb (autodetected by default)
  # config.webxml.booter = :rails

  # Set JRuby to run in 1.9 mode.
  # config.webxml.jruby.compat.version = "1.9"

  # When using the :rack booter, "Rackup" script to use.
  # - For 'rackup.path', the value points to the location of the rackup
  # script in the web archive file. You need to make sure this file
  # gets included in the war, possibly by adding it to config.includes
  # or config.webinf_files above.
  # - For 'rackup', the rackup script you provide as an inline string
  #   is simply embedded in web.xml.
  # The script is evaluated in a Rack::Builder to load the application.
  # Examples:
  # config.webxml.rackup.path = 'WEB-INF/hello.ru'
  # config.webxml.rackup = %{require './lib/demo'; run Rack::Adapter::Camping.new(Demo)}
  # config.webxml.rackup = require 'cgi' && CGI::escapeHTML(File.read("config.ru"))

  # Control the pool of Rails runtimes. Leaving unspecified means
  # the pool will grow as needed to service requests. It is recommended
  # that you fix these values when running a production server!
  config.webxml.jruby.min.runtimes = 1
  config.webxml.jruby.max.runtimes = 1

  # JNDI data source name
  # config.webxml.jndi = 'jdbc/rails'
end

{% endhighlight %}

需要注意的是config.features = %w(executable compiled)配置中，其中的compiled就是可以将ruby代码编译成class代码的。
