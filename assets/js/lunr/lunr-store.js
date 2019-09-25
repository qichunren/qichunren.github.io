var store = [{
        "title": "Ruby Array的头尾操作的4个方法",
        "excerpt":"在 Ruby 中，Array 对于数组头部和尾部操作有四个方法可以方便的添加和删除元素，这四个方法是shift / unshift / push / pop。它们两两对应。 shift 方法将数组头部第一个元素从数组中删除，并返回这个元素。 unshift方法接受一个或者参数，将元素添加到数组头部。 push方法接受一个或者多个参数，将元素添加到数组尾部。 pop方法将数据尾部最后一个元素从数组中删除，并返回这个元素。 下面直接通过在IRB中演示来了解数组的这4个方法： 1.9.3-p194 :001 &gt; a = [1,2,3] =&gt; [1, 2, 3] 1.9.3-p194 :002 &gt; a.shift =&gt; 1 1.9.3-p194 :003 &gt; a =&gt; [2, 3] 1.9.3-p194 :004 &gt; a.unshift(-2,-1) =&gt; [-2, -1, 2, 3] 1.9.3-p194 :005...","categories": ["ruby"],
        "tags": [],
        "url": "/posts/2008-10-09-array-4-operation-methods.html",
        "teaser":null},{
        "title": "Benchmark用法",
        "excerpt":"Benchmark 可以用来测试某个函数或者任何代码的执行时间。 用法很简单: require 'benchmark' n = 1500 Benchmark.bmbm do |x| x.report(\"+ method\") { n.times {string1 = \"ddd\" + \"11111\" + \"Helodd\" } } x.report(\"&lt;&lt; method\") { n.times {string2 = \"ddd\" &lt;&lt; \"11111\" &lt;&lt; \"Helodd\"} } end 结果如下: usermatoMacBook-Pro:test qichunren$ ruby test.rb Rehearsal --------------------------------------------- + method 0.000000 0.000000 0.000000 (...","categories": ["ruby","test"],
        "tags": [],
        "url": "/posts/2008-10-09-use-benchmark.html",
        "teaser":null},{
        "title": "在本地签出远程仓库上的分支",
        "excerpt":"从远程仓库克隆下来一个项目后，默认是在master分支。   caojinhua:git_test caojinhua$ git branch *  master   查看仓库中的所有分支，使用git branch -a命令：   caojinhua:git_test caojinhua$ git branch -a *  master   remotes/origin/HEAD -&gt; origin/master   remotes/origin/master   remotes/origin/remotebranch   可以看到远程仓库中有master和remotebranch两个分支。现在在本地项目中怎么样切换到remotebranch分支呢？很简单，使用git check命令，具体如下：   git checkout --track -b &lt;local branch&gt; &lt;remote&gt;/&lt;tracked branch&gt;   在我这里就是   git checkout --track -b remotebranch origin/remotebranch   对于这个命令，有一个简化的选项：   git checkout -t origin/remotebranch   参考资料   checkout tracked remote branch  ","categories": ["git"],
        "tags": [],
        "url": "/posts/2008-10-12-checkout-git-remote-branches-to-local.html",
        "teaser":null},{
        "title": "重命名远程仓库中的分支",
        "excerpt":"在某些情况，有可能要修改远程仓库中的分支名称。对于这个需要怎么操作呢？我查了相关资料，没有直接的git命令可以直接实现。   要修改远程仓库的分支名称，只能是基于现在的分支，向远程仓库中推送一个新分支，然后将原来的分支从远程仓库中删除掉。   比如我向远程仓库中推送了一个名为feature的分支，现在要改名为preview。   git checkout feature git checkout -b preview git push origin preview git push origin :feature git branch -d feature  ","categories": ["git"],
        "tags": [],
        "url": "/posts/2008-10-13-rename-git-remote-branch.html",
        "teaser":null},{
        "title": "两种javascript定义function的区别",
        "excerpt":"Javascript代码   function1(); // works fine function2(); // causes an error  // This function is accessible before it's defined function function1() {     $(\"body\").append(\"Test 1\"); }  // This function is not accessible until after it's defined var function2 = function() {     $(\"body\").append(\"Test 2\"); }    在以上的代码中，function1()会工作正常，而function2()调用会出错，因为JS解译器发现此时function2还没有定义。  ","categories": ["javascript"],
        "tags": [],
        "url": "/posts/2008-10-30-difference-between-functions-define-in-js.html",
        "teaser":null},{
        "title": "Ubuntu下apt使用记录",
        "excerpt":"使用Ubuntu系统安装软件我基本上都是通过apt在线安装的方式完成的，很少是下来源代码编译安装，只有在安装源中没有deb包才手动安装。   我现在通过日常的操作流程和具体场景来说明我是如何使用apt的一系列命令的。   当我想安装一个工具软件或者C库的话，我使用apt-cache search加关键字来查找软件包名。   然后具体查阅一个软件包的详细信息时，我使用apt-cache show加上包名即可，或者apt show也可以。   安装软件包使用sudo apt-get install加上包名即可。   卸载软件包使用sudo apt-get purege/remove   ","categories": ["Linux"],
        "tags": [],
        "url": "/posts/2008-11-28-use-apt-notes.html",
        "teaser":null},{
        "title": "Rails中连接Oracle数据库",
        "excerpt":"步骤      在Oracle官方网站下载sdk-10.2.0.5.0-linux-x64.zip和basic-10.2.0.5.0-linux-x64.zip这两个文件。将这两个文件放在同一个地方，然后分别执行：       unzip sdk-10.2.0.5.0-linux-x64.zip     unzip basic-10.2.0.5.0-linux-x64.zip      这样执行后，会在当前目录下有一个instantclient_10_2目录，刚才解压的zip文件的内容就在其中。      安装Ruby-OCI2: 在安装Ruby-OCI2之前必须要先配置LD_LIBRARY_PATH变量       export LD_LIBRARY_PATH=/opt/instantclient_10_2/        然后       gem install ruby-oci8       安装adapter for rails:       gem install activerecord-oracle_enhanced-adapter   Resources     OracleInstantClient下载   oracle-enhanced adapter  ","categories": ["ruby","rails","database","oracle"],
        "tags": [],
        "url": "/posts/2009-05-07-connect-to-oracle-in-rails.html",
        "teaser":null},{
        "title": "Ruby游戏开发利器Gosu",
        "excerpt":"在2009年的Railsconf大会上，Hongli Lai和Ninh Bui of Phusion（开发Passenger的家伙）为了展示Ruby语言的强大，能运行3D游戏，他们构建了一个Wolfenstein游戏的山寨版，用的是Gosu 游戏开发库。 Zed Shaw 在游戏中扮演BOSS 体验方法： 项目地址：http://github.com/FooBarWidget/rubystein/tree/master Git拖下来： git clone git://github.com/FooBarWidget/rubystein.git （没有Git也可以直接在项目主页中下载） 在运行游戏之前在安装gosu gem gem install gosu 我是在ubuntu下测试的，为了安装gosu,还要先安装依赖的库： sudo apt-get install g++ libgl1-mesa-dev libpango1.0-dev libboost-dev libsdl-mixer1.2-dev 在安装好了gosu gem后，直接运行游戏目录中的wolf3d.rb文件： ruby wolf3d.rb 如图： 空格键开枪 很强大吧。 游戏程序代码的大体结构如下，很简单，很明了： require 'rubygems' require 'gosu' class GameWindow &lt; Gosu::Window def initialize super(640, 480,...","categories": ["ruby","game-dev"],
        "tags": [],
        "url": "/posts/2009-05-16-use-ruby-gosu-gem-to-build-game.html",
        "teaser":null},{
        "title": "最近有些郁闷",
        "excerpt":"最近工作得很郁闷，很是不爽。   每天的事情说多也不是太多，主要是我担负着业务数据维护和系统开发两个方面的角色，我感觉很是难处理和协调事情，弄得工作效率十分低下。   一会儿这个人叫我拉点统计数据，一会儿那个叫我改个东西，同时我还要开发业务系统的新功能。感觉人格分裂了。   本来就是两个人做的事情，人走了，都弄给我一个人担当了。   虽然我决定上午做维护方面的工作，下午搞开发写代码，可是还是不行，因为有时上午又没有维护方面的事，那就开发吧，又突然来了个电话，搞得思路全乱了。   这些天我在找一个适合我的todo-list工具，试用了一些，还是没有找到适合我的。我要找的todo-list工具应该可以记录日常数据改动，把list自动转为工作日志这样的。晚上回去在看Delphi7，希望这段时间自己做一个适合自己使用的Todo-list工具。   面对这样子我也不想，我在反思自己：   面对公司其它人经常问我要统计数据的，我之前总是写sql帮他们查，后来我抽时间做出了业务数据统计系统，这方面的事情一下子少了很多。   面对公司其它人经常由于业务原因要回滚业务操作（这里系统设计虽然有问题，但是系统是不可能完全描述实现业务的），我就自己总结写了很多常用的业务维护脚本，这个也节省了我不少时间。   面对开发中调试业务数据十分烦锁，我用rspec跑起了单元测试，这个也一下子节省了我不少时间。   做了以上这些，还是感觉不够，每天还是有很多重复的时候要做。   下一个目标就是安全升级到Rails2.2，再砍掉系统中的垃圾冗余代码。可是实在是太难抽出时间了。   总结：其实现在的环境很是适合我的快速成长， 我觉得在有限的时间里做更多有意义的事情出来，我的2010。   我在javaeye上的原文链接  ","categories": ["life"],
        "tags": [],
        "url": "/posts/2009-12-17-i-fell-unhappy.html",
        "teaser":null},{
        "title": "买票记",
        "excerpt":"昨天是周日，下午三点起开售2月10号的票。   早上就搬一个小板凳去排队。   火车站几百个临时售票窗口前条条长队，哦，还有很多武警。   车票信息屏上显示着到全国各地的车票信息。   下午三点正式售票了。我看着车票信息屏，感觉就像是股市开早盘了，不过比股市更疯狂，在不一个小时的时间里，几百张上千张的到各地的2月10号的车票大部分一售而空，剩余票数从几百一下子变成了0。票务系统都有些卡了。   买到票的人兴奋不已，我看到他们一个劲的仔细的看着他的票。   同时我看到了黄牛党混在其中，兴奋不已，搞到一次票后，又来后面排队。   我没有杯具，买到了一张到三亚的票。不过我一个同学就杯具了，问的时候还有票，付钱的时候就没有票了，只能期待今天能买到11号的票了。   一个小时后售票处就冷清下来了。  ","categories": ["life"],
        "tags": [],
        "url": "/posts/2010-02-01-buy-tickets.html",
        "teaser":null},{
        "title": "Static site using rails",
        "excerpt":"原文地址：Static site using rails. As we know rails is mainly used for dynamic website.we can also display static web pages or we can deploy full static website using rails. The following code can help us to display static pages. Step 1:-Create Rails project rails static_site Step 2:-Generate StaticPage Controller ruby...","categories": ["rails"],
        "tags": [],
        "url": "/posts/2010-04-06-create-static-page-class-in-model.html",
        "teaser":null},{
        "title": "Create a blog at github",
        "excerpt":"First ,of course you must have an account at github. assume your loign id at github is “xiaofeiren”, Then create a new repost at github called “xiaofeiren.github.com” Now in your pc(Linux platform,and git) mkdir xiaofeiren.github.com cd xiaofeiren.github.com git init touch README touch index.html echo \"This is my git blog\" &gt;&gt;...","categories": ["tool","github"],
        "tags": [],
        "url": "/posts/2010-05-05-create-a-blog-at-github.html",
        "teaser":null},{
        "title": "My first post here",
        "excerpt":"Lol.. This is my first post,using markdon. When I first meet jeklyy, I fall in love with it.      I love it’s simple,   I love git way,   I love free.   I love …  ","categories": ["life"],
        "tags": [],
        "url": "/posts/2010-07-28-my-first-post.html",
        "teaser":null},{
        "title": "Create a blog at github using jekyll",
        "excerpt":"First thing you should have to do is: create a repos at github named yourid.github.com   Then   gem install jekyll   git init git add . git commint -am \"firt commit\" git push             Now your blog is http://yourdid.github.com  ","categories": ["tool"],
        "tags": [],
        "url": "/posts/2010-08-06-create-a-blog-use-jekyll-at-github.html",
        "teaser":null},{
        "title": "Show more detail info on will_paginate bar",
        "excerpt":"Just create an extension in lib directory:   And the result is like this:     ","categories": [],
        "tags": [],
        "url": "/posts/2010-08-08-show-more-info-on-will-paginate-bar.html",
        "teaser":null},{
        "title": "Jekyll usage",
        "excerpt":"首先建立一个新的目录，如mkdir qichunren_blog，然后在目录中建立如图中所示的文件和目录结构。      ","categories": ["tool"],
        "tags": [],
        "url": "/posts/2010-08-09-jekyll-usage.html",
        "teaser":null},{
        "title": "Oracle解锁",
        "excerpt":"今天在Plsql中，给Oracle数据库中一个表添加字段的时候，出错了错误，提示：   Oracle资源正忙,要求指定NOWAIT   在网上一查，是表给锁住了，用如下的方法来解决。   select t2.username,t2.sid,t2.serial#,t2.logon_time from v$locked_object t1,v$session t2 where t1.session_id=t2.sid order by t2.logon_time;     USERNAME                              SID    SERIAL# LOGON_TIME   ——————————————— -———- -———- -————   QICHUNREN                                   37       9731 2010-4-10 1      alter system kill session '37,9731';  System altered      select * from v$session where sid=?;   相关的博客：      OraclePLSQL中不能for update的解决办法   Oracle资源正忙,要求指定NOWAIT——Oracle解锁问题  ","categories": ["datebase","oracle"],
        "tags": [],
        "url": "/posts/2010-10-29-get-oracle-unlocked.html",
        "teaser":null},{
        "title": "写Rails程序容易出现的几个不好的地方",
        "excerpt":"这几个地方不知道大家有注意到没有，我今天发现的一个地方就是   class EcGood &lt; ActiveRecord::Bas   #商品分类   GoodCategory = Category.find(:all).map{|category|[category.cn_n, category.id] }   #商品品牌   GoodBrand = EcBrand.find(:all).map{|brand|[brand.brand_name, brand.id] } end  在ActiveRecord中有这样的代码，实在不应该啊。   初次一看没有什么问题，可是Ruby代码是自上而下来执行的，这样会给数据库带来无关的查询。解决办法就是将这个封装到方法中去，另外也说明全局变量要少用。   有时间再更新一下这篇文章来反思一下自己。  ","categories": ["ruby","rails"],
        "tags": [],
        "url": "/posts/2010-10-30-mark-rails-write-code.html",
        "teaser":null},{
        "title": "Rails中的测试那些事",
        "excerpt":"这个本早该记一下的。   现在RUBY社区发展得太快了，各种新技术层出不穷，测试方面同样如此。   我记下我在Rails3项目中所用的测试方面的技术点。   首先是rspec-rails，它是rspec 2的对rails3项目支持的一个gem，只需要在Gemfile中指定rspec-rails就可以了，不用指定rspec2依赖。   然后我还要用到factorygirl-rails，它同样是factorygirl对于rails3项目支持的一个gem，只需要在Gemfile中指定factorygirl-rails就可以了，不用指定factorygirl依赖。   还有一个rspec的match封装gem，remarkable/active_record，用它可以测试 validates,association(关联等)，说到这里，“测试”这个词我觉得不合适，我用到来感觉这个gem太强大了，它简直就是一个代码监管的工具。   另外，ffaker 这个是用来产生随机数据的gem，它可以用来产生email, name, company name等，另外我提交了可以产生中文姓名的代码 ，可是到现在作者还没有将其融合进去，真希望他快点啊。   其它的如cucumber太过先进的东西我还没有在项目中常用。感觉上面介绍的组合就够我用了。   最后持续集成测试方面我还没有在项目中用到，有时间的时候我打算研究一下 cinabox ，为什么要研究这个呢，因为我看到rails项目中就是到的这个来作为它的持续测试的工具，它是基本ubuntu系统上的一个项目，看介绍，安装很方便的，到时候试试。   我以下写下这些，一是作了大致的记录，另外也防止自己out了，如果大家有更好用的工具，也请分享一下。  ","categories": ["ruby","rails","test"],
        "tags": [],
        "url": "/posts/2010-12-11-things-in-rails-test.html",
        "teaser":null},{
        "title": "建立rspec测试的环境",
        "excerpt":"我个人感觉rspec的风格比rails自带项目的test好用一些，更符合我的口味。在这里记录一下rspec的搭建方法，说是搭建，其实没有那么烦琐，就是一些工具的组合起来，这样测试更方便，效率更高。   # in Gemfile group :test, :development do   gem \"rspec-rails\", \"~&gt; 2.5.0\"   gem 'shoulda-matchers', \"1.0.0.beta1\"   gem 'factory_girl_rails', \"1.0.1\" end  然后bundle install, 然后rails g rspec:install 然后你可以将默认的test目录删除掉。   然后，rails g controller pages test来试试，现在生成的测试代码再也不是原来的unit test代码了，是用了新的rspec了。   rspec2将rails项目中的测试分为几块： controllers models helpers lib views requests routing   划分得蛮细的，每一部分测试相对应的代码。  ","categories": [],
        "tags": ["rspec"],
        "url": "/posts/2010-12-12-setup-rspec-test-for-rails-project.html",
        "teaser":null},{
        "title": "说说rspec的测试(1)",
        "excerpt":"虽然之前就用过rspec来测试系统的各种业务流程和业务逻辑，最近又在开始一个新的系统的测试，写起来又感觉很开心，很安心。所以就想说说用rspec来写rails项目测试的总结和体会。 rspec项目 在github上很活跃，rspec2较之 1.x的版本变得更模块化了，从这里 看以到rspec的各个子项目，rspec2依赖于rspec-core rspec-expectations rspec-mocks 在Rails 3项目中，只需要在指定rspec-rails这个gem即可，它会自动依赖rspec2。 gem \"rspec-rails\", \"2.3.1\" 在rspec2中，Rails3项的测试被分成控制器（controller）、模型（model）、请求（request）、路由（routing）、助手（helper）、视图（view）六大块的测试。从中可以看出rspec2力图让你的测试变得更为职责清楚和模块化，减少各种类型测试的影响，让测试变得更有效率和保证。我个人最喜欢的是模型（model）和请求的测试（request），这两个测试写得最为直接和有效，其它类型的测试如controller测试在复杂一点的业务中需要mock、stub等等，会将代码弄得有些复杂，当然这其中也有我对mock和stub没有用得理解的原因，不过我感觉测试controller还不如直接测试request来得直接。另外在factory-girl的帮助下能很快地写出有保证的测试。 在这里我贴出我系统中登录测试这一块的例子，从中可以看出测试目的是很明显的，测试效率是很高的。 这里的管理员(Admin)登录系统(AdminSession)是用到authlogic这个gem的。 这个是factory-girl的数据文件： # spec/factories/admins.rb # encoding: utf-8 Factory.define :admin do |a| a.sequence(:login) {|i| \"worker#{i}\" } a.name {|a| a.login } a.email {|a| \"#{a.login}@gmail.com\" } a.password {|a| a.login } a.password_confirmation {|a| a.login } a.active false a.dept 0 end...","categories": ["rails","test"],
        "tags": [],
        "url": "/posts/2010-12-21-talk-about-rspec-1.html",
        "teaser":null},{
        "title": "在Rails项目中使用compass来管理css",
        "excerpt":"对如今的web项目开发（个人开发），用Rails来快速实现，但是前端这一块会花掉比较多的时间，其中CSS的管理维护是一个越来越麻烦的事情，由于它只是一门单纯的静态标记的语法（说法不准确），我的意思是，比如我设计一个三栏的网页，页面宽度是960px，那么每栏应该是960px的三分之一宽度320px，在css文件中，需要“硬编码”写入单栏的宽度： .box{width:320px;} 然后有一天，某某人说要改网站页面宽度，要调成1200px，这样需要找出css文件中相关的地方都要改成新的400px的宽度。对我来说，做这种事情一点也不爽。如果能自动计算出每栏是网页宽度的三分之一那多好。 Sass 就是做这事情的，而 Compass 是基于Sass之上的一个集成，它让我们在Rails项目中可以更为容易地使用sass，它集成了如 blueprint 这样的css框架。 以上都是废话，哈哈，看看在项目中如何使用起compass，通过它来高级地管理项目的css。 # 在Gemfile中加入gem “compass”, 然后bundle install # 在项目的根目录执行compass init rails . # 以上两步搭建好了基础，接下来就是编写sass和引入css文件. # in application.html.erb &lt;%= stylesheet_link_tag \"compiled/screen.css\", :media =&gt; \"screen, projection\" %&gt; &lt;%= stylesheet_link_tag \"compiled/print.css\", :media =&gt; \"print\" %&gt; 接上开头说的那个问题，我可以在/app/stylesheets/screen.scss中这样来写： $page_width: 960px; body { width: $page_width; } .box {...","categories": ["rails","css"],
        "tags": [],
        "url": "/posts/2010-12-24-use-compass-in-rails.html",
        "teaser":null},{
        "title": "我的常用工具",
        "excerpt":"Textmate OmniGraffle Homebrew gitK Redmine   Firebug      VMware Funsion Sequel Pro: MySQL database management for Mac OS X Air Mouse 7zX  ","categories": [],
        "tags": ["工具"],
        "url": "/posts/2011-01-01-my-useful-tools.html",
        "teaser":null},{
        "title": "在Mac上安装RVM",
        "excerpt":"安装方法   首先需要安装好git 然后，   bash &lt; &lt;(curl -s https://rvm.beginrescueend.com/install/rvm)   然后配置一下，   echo '[[ -s \"$HOME/.rvm/scripts/rvm\" ]] &amp;&amp; . \"$HOME/.rvm/scripts/rvm\" # Load RVM function' &gt;&gt; ~/.bash_profile   使配置文件生效，   source .bash_profile   rvm notes:   ","categories": ["ruby","tool"],
        "tags": [],
        "url": "/posts/2011-01-02-install-rvm-on-mac.html",
        "teaser":null},{
        "title": "在Mac上安装homebrew",
        "excerpt":"homebrew是为mac打造的一个软件包管理工具   首先需要安装好Xcode,其它是需要它其中的gcc等编译器。   安装方法   ruby -e \"$(curl -fsSLk https://gist.github.com/raw/323731/install_homebrew.rb)\"  Install Xcode.   then brew install git first.  ","categories": ["mac","tool"],
        "tags": [],
        "url": "/posts/2011-01-03-install-homebrew-on-mac.html",
        "teaser":null},{
        "title": "分析rubygems.org上受欢迎的gem包",
        "excerpt":"用下载量来作为一个gem包的爱欢迎度的标准。 # encoding: utf-8 require 'rubygems' require 'nokogiri' require 'open-uri' GEM_LIST_URL = \"http://rubygems.org/gems\" MIN_DOWNLOAD_COUNT = 30_0000 ('A'..'Z').to_a.each do |letter| document = Nokogiri::HTML(open(GEM_LIST_URL + \"?letter=#{letter}\")) last_page_number = document.css(\"div.pagination a\")[-2].inner_text.to_i puts \"There are \" + document.css(\"p.entries b\")[1].inner_text + \" gems start with #{letter}, #{last_page_number} pages.\" 1.step(last_page_number) do |page| every_page = Nokogiri::HTML(open(GEM_LIST_URL +...","categories": ["ruby","tool"],
        "tags": [],
        "url": "/posts/2011-01-09-fetch-popular-rubygems.html",
        "teaser":null},{
        "title": "当心ActiveRecord::RecordNotSaved异常",
        "excerpt":"昨天晚上遇到记录不能保存成功，一直遭遇ActiveRecord::RecordNotSaved异常，弄了半小时，找到了原因。   我发现了我在model中的before_create中是这样写的   before_create :set_default_value # 创建站内信时，设置记录的默认值  def set_default_value   self.is_trash = false end  这个callback方法是返回false，导致记录不能保存成功，抛出ActiveRecord::RecordNotSaved异常。   我之前以为出现 ActiveRecord::RecordNotSaved异常，是由于model的验证不通过导致的。我把model中的验证全都去掉了，还是不成功。 解决方法是让这个方法返回true   before_create :set_default_value # 创建站内信时，设置记录的默认值 def set_default_value   self.is_trash = false   true end  ","categories": ["rails"],
        "tags": [],
        "url": "/posts/2011-02-27-active-record-exception.html",
        "teaser":null},{
        "title": "使用capybara来自动化测试业务流程",
        "excerpt":"capybara 是一个基于 webrat   修改的浏览器测试工具，我最近使用它来为我做的后台系统自动化一些工作，而不用我每次重复了无意义的步骤。   使用capybara可以良好地访问有javascript脚本的页面，但是有一个问题就是如果你页面中有confirm这个的等待用户点击“确定”的对话框时capybaray就无能为力了，我在stackoverfollow上找到了解决办法，就是直接让confirm方法返回true:     page.evaluate_script('window.confirm = function() { return true; }')   下面这个例子来自我项目中 真实的代码 可以测试一个用户的认证操作，以test开头的方法都会执行。   ","categories": ["rails","test"],
        "tags": [],
        "url": "/posts/2011-03-26-use-capybara-to-integrate-test.html",
        "teaser":null},{
        "title": "怎么样写好的ruby业务代码",
        "excerpt":"标题很强，心中却很烦乱，写下这个解解闷，吐吐苦水。   最近与一个小Ruby程序员共事，交流起来还没有什么问题，可是看他写的代码，虽然坏不到哪里去，但我还是心里一阵阵反感，这和我平时阅读从github 上拉下的代码的感觉是完成不一样的。   给我不爽的地方有：首先他在用程序员的思维写业务代码。这一点虽然对程序的最终运行结果没有什么影响，但我是非常反感这一点。我一直对自己说，我要写可读的英语的，并且本身能说明它是要做什么事情的代码，尤其我是当在做电子商务方面的业务系统。   我们应该站在设计人员的角度来写代码。我们是整个系统的设计师，控制人员，管理人员，我们可以通过代码的方式为系统来设计各种业务规则。而不仅仅是为了用程序代码来码完业务操作。这种特点的典型特征就是在程序中（特别是在model 中）有很多这样的方法命名，如update_xxx, delete_xxx, set_x_to_y,这种类似的命名，它就是纯粹的数据操作，而不是用代码来表达业务!   都说程序要写耦合内聚什么的，模块化啦，抽取啦，减少重复，但是在这之间把握一个平衡还是要有很多磨练的。我之前一些时候在写Rails代码时就时常被这个问题折磨过，心里总是努力想把代码写得好一点，可最终完成业务目标时，看着自己的代码总是感觉不对劲.   不劲的地方有：   总是在考虑“我这段代码到底是单独抽出来呢，还是就这样放在其中呢”，“我感觉这个命名怎么那么别扭啊，哪里不对了？”等等之内的问题，然后花时间在这些代码段之间穿梭。其实我现在想明白了。要想让自己写的代码（我这里尤其是处理业务逻辑的代码）看得明白，读得顺畅，要把握好几点。   第一，要记得上面第一条中说到的。   第二，英语表达要不能太糟糕。 他英语不太过关，写的一些代码都是去google翻译查的，这我还是不说什么，可以有的翻译真的好离谱啊，再加上他自己的一些润色，完全可以我把搞迷糊。   第三点，要清楚业务需要的实质，明白什么是将来可能变化的，什么是肯定不变化的。明白了这一点，就知道一个业务操作中，到底是应该把方法怎么折分。不变的代码，就都写在一个方法中也是没有问题的，即实代码长一点，那样整个操作是一个整体，到时时候维护起来会很明了。   第四点，对于业务操作的方法，一般写得内聚紧凑一点很是没有什么问题的。不要惦记什么一个方法不能超过多少行代码的信条。   第五点就是测试了，这个一定得搞。  ","categories": ["ruby","test"],
        "tags": [],
        "url": "/posts/2011-04-19-write-buautiful-ruby-business-code.html",
        "teaser":null},{
        "title": "最近实践中学到的Rails测试技巧",
        "excerpt":"最近花时间又将项目中的测试再次仔细地过了一遍。通过挖掘发现了几个提高测试效率的技巧，记一下。 不学习就要落后啊，Ruby的世界进化得太快了，测试技术也是如此。           FactoryGirl这个东西好用级了，之前虽然已经在项目中使用她了，但我之前还是没有完全挖掘出她的特性。对其中的association这个特性我是最喜欢了，让我完全不用关注关联记录的外键数据对应。想起曾经的Rails自带的Fixtures，还阵阵寒，那是给人给的东西么。当应用中的数据表关联多了，再加上业务功能多了，用Fixtures测试绝对会折磨死人，在不同的Fixtures文件中穿梭，人肉拼装适合各种业务场景的数据，那真费脑细胞。而FactoryGirl真的是用起来称心如意啊，她不是数据的fixture,她应该是作为一种数据的构建器(data builder)，在测试中可以让你专注去构建 测试场景的数据和写测试断言。            自动测试gem： autotest. 我和同事之前商量约定好，说提交代码前一定先在本地运行一遍rspec测试，然后再提交。这样工作得很好。我今天研究了一下autotest这东西，发现真是好东西啊。它可以检测到你改动了某个文件，然后就自动地为你执行一次这个文件关联的测试。这可好了，又省了不少事。            接第二条，比起自动监测改动的文件自动测试，你还得关心测试的结果，更好的是有自动通知测试结果的好工具。mac下的 growl 就是这样一个工具。autotest-growl这样的一个Gem很好的做了这个事情。你再不不用切换到测试的终端窗口去查看测试结果，你只需要专心地写着代码，然后屏幕边上会自动显现一个半透明的提示框来告知测试结果（最喜欢看到就是一个绿宝石的提示框）。当然这个工具只有在Mac OSX上才有的。            测试不是很快，这个也有解决方法。Spork就是这样的一个工具，它事先启动一个后端的DRB服务器（端口8989），加载Rails应用的环境。然后每次rspec的测试可以直接与spork打交道，省了加载Rails应用环境这个比较耗时的步骤，直接运行测试用例，速度飞快。      ","categories": ["rails","test"],
        "tags": [],
        "url": "/posts/2011-04-20-rails-test-note.html",
        "teaser":null},{
        "title": "使用Rails ERD生成数据库实体关系图",
        "excerpt":"Rails ERD 可以生成数据库关系实体图，非常方便。   安装很方便，Rails ERD依赖Graphviz，所以首先需要安装Graphviz，在Mac下，直接   brew update brew install cairo pango graphviz   然后在项目中的Gemfile中声明   group :development do   gem \"rails-erd\" end  bundle install rake erd   这样，在项目的根目录中，就会生成一个名为ERD.pdf 文件   ","categories": ["rails","tool"],
        "tags": [],
        "url": "/posts/2011-04-26-use-rails-erd-to-generate-erd-diagrams.html",
        "teaser":null},{
        "title": "听《Sara》",
        "excerpt":"Sara这首歌太好听了，虽然没有清楚具体是唱什么，但我感觉是讲一个故事，很好奇，我找到了歌词。 Sara 塞拉 鲍勃迪伦 I laid on a dune, I looked at the sky, When the children were babies and played on the beach. You came up behind me, I saw you go by, You were always so close and still within reach. 我躺在沙丘上，我向天空凝望， 那时孩子都还小，嬉戏在沙滩上。 我见你走来，又擦身而去 你就是如此接近，近到触手可及。 Sara, Sara, Whatever...","categories": ["life","music"],
        "tags": [],
        "url": "/posts/2011-05-03-listen-to-sara.html",
        "teaser":null},{
        "title": "在Rails项目中导出Excel",
        "excerpt":"excel_rails 这个工具可以实现导出Excel数据的功能。它本身是基于ruby-spreadsheet 使用方法 安装 在Gemfile中 # Excel gem 'excel_rails' # excel_rails need this gem 'spreadsheet' bundle install 使用 在控制器中 # encoding: utf-8 class RemitNotificationsController &lt; ApplicationController def index @search = RemitNotification.valid.order(\"id DESC\").search(params[:search]) @remit_notifications = @search.paginate :per_page =&gt; 20, :page =&gt; params[:page] respond_to do |format| format.html # index.html.erb format.xml { render...","categories": [],
        "tags": ["Excel","Rails"],
        "url": "/posts/2011-05-04-export_data_to_excel_in_rails.html",
        "teaser":null},{
        "title": "初试Rails 3.1 Beta",
        "excerpt":"看到消息 说Rails3.1 Beta出来了，我立刻就想试试，先从大体上了解一下看做了哪些改变。 usermatoMacBook-Pro:code qichunren$ rvm use 1.9.2 Using /Users/qichunren/.rvm/gems/ruby-1.9.2-p0 usermatoMacBook-Pro:jjsc_web_backend qichunren$ gem install rails --pre Successfully installed multi_json-1.0.1 Successfully installed activesupport-3.1.0.beta1 Successfully installed i18n-0.6.0beta1 Successfully installed activemodel-3.1.0.beta1 Successfully installed rack-1.3.0.beta Successfully installed rack-cache-1.0.1 Successfully installed rack-test-0.6.0 Successfully installed rack-mount-0.7.2 Successfully installed hike-1.0.0 Successfully installed sprockets-2.0.0.beta.2 Successfully installed tzinfo-0.3.27 Successfully...","categories": [],
        "tags": ["Rails3"],
        "url": "/posts/2011-05-05-try_rails_31_beta.html",
        "teaser":null},{
        "title": "使用feedzirra分析提取Feed",
        "excerpt":"feedzirra 是一个很好用的提取和分析feed的工具。用法如下：   # encoding: utf-8 require \"feedzirra\"  def fetch_feed(feed_url)   feed = Feedzirra::Feed.fetch_and_parse(feed_url)    feed_entries = feed.entries   feed_entries.each do |entry|     puts entry.inspect   end # end each end  fetch_feed \"http://tech.163.com/special/000944OI/kejitongxin.xml\"  结果：   usermatoMacBook-Pro:gitcard qichunren$ ruby lib/blog_fetcher.rb #&lt;Feedzirra::Parser::RSSEntry:0x00000102137858 @title=\"外媒分析称微软是黑莓和必应合作最大赢家\", @url=\"http://tech.163.com/11/0504/16/737NSCOS000915BE.html\", @summary=\"【赛迪网讯】5月4日消息，据国外媒体报道，在BlackBerry World上RIM请到一位令人意外的客座讲师——微软CEO史蒂夫-鲍尔默（Steve Ballmer）。鲍尔默在会上公开了与RIM的合作关系，称日后微软的Bing将代替谷歌成为黑莓移动设备上的默认搜索引擎。微软明显将从合作关系中获利，但RIM能够得到什么利益？鲍尔默表示，微软将对黑 ......\", @published=\"2011-05-04 16:55:22\"&gt; #&lt;Feedzirra::Parser::RSSEntry:0x0000010212e140 @title=\"工信部4月上半月发放241款电信设备进网许可证\", @url=\"http://tech.163.com/11/0504/09/736SR7MQ000915BE.html\", @summary=\"飞象网讯（崔玉贤/文）飞象网得知工信部4月份上半月发放了241款电信设备进网许可证，其中包含10款进网试用批文。 据悉，4月份上半月工信部共发放了TD终端22款，TD-SCDMA/GSM双模数字移动电话机15款，TD-SCDMA/GSM双模无线数据终端2款，TD-SCDMA固定无线终端5款。其中，TD-SCDMA/GSM双模数字移动电话机有5款进网试用批文，夏 ......\", @published=\"2011-05-04 09:02:53\"&gt;   ","categories": ["ruby","tool"],
        "tags": [],
        "url": "/posts/2011-05-05-use_feedzirra_to_fetch_feed.html",
        "teaser":null},{
        "title": "将Rspec的测试任务添加到Rakefile中",
        "excerpt":"写好Rspec测试好，一般是通过rspec spec/xxx_spec.rb这样来进行测试，这样不能批量进行多个spec文件的测试，解决方法是将rspec的测试任务添加了项目根目录中的Rakefile文件中去，以后直接执行rake或者rake spec就直接测试所有用例了。   require \"rubygems\" require 'rake' require 'rspec/core/rake_task'  task :default =&gt; :spec  RSpec::Core::RakeTask.new(:spec) do |t|   t.pattern = Dir.glob('spec/**/*_spec.rb')   t.rspec_opts = '--format progress -c' end  Resources      RSpec Rake Task 已过期，它是Rspec 1   rspec/core/rake_task.rb   rake test in rails project  ","categories": [],
        "tags": ["Rspec"],
        "url": "/posts/2011-05-07-add-rspec2-task-to-rakefile.html",
        "teaser":null},{
        "title": "学习HTML5杂记",
        "excerpt":"什么是 HTML5？ HTML5 将成为 HTML、XHTML 以及 HTML DOM 的新标准。 HTML 的上一个版本诞生于 1999 年。自从那以后，Web 世界已经经历了巨变。 HTML5 仍处于完善之中。然而，大部分现代浏览器已经具备了某些 HTML5 支持。 新特性 HTML5 中的一些有趣的新特性： 用于绘画的 canvas 元素 用于媒介回放的 video 和 audio 元素 对本地离线存储的更好的支持 新的特殊内容元素，比如 article、footer、header、nav、section 新的表单控件，比如 calendar、date、time、email、url、search Video标签 参考资料 &lt;!DOCTYPE HTML&gt; &lt;html&gt; &lt;body&gt; &lt;video width=\"320\" height=\"240\" controls=\"controls\"&gt; &lt;source src=\"movie.ogg\" type=\"video/ogg\"&gt; &lt;source src=\"movie.mp4\" type=\"video/mp4\"&gt;...","categories": ["web","html5"],
        "tags": [],
        "url": "/posts/2011-05-09-learn-html5.html",
        "teaser":null},{
        "title": "Juqery中元素位置的几个方法笔记",
        "excerpt":"Juqery中元素位置的几个方法笔记   最近在研究页面滚动时，研究了Jquery中几个方法。记录一下。   offset function   offset()方法返回一个元素在整个document中的位置，返回结果是一个对象, 类似 Object { top: 2593.199951171875, left: 452.5 }   屏幕和窗口尺寸   $(window).width()和$(window).height()返回当前网页窗口的可视部分的宽度和高度，窗口放大和缩小后会相应变化。   $(document).width()和$(document).height()是返回浏览器渲染的页面尺寸。   window的scrollTop function   $(window).scrollTop()返回滚动条相对于其顶部的偏移。   通过下面一个操作示例可以理解以上说明的关系：   打开一个网页，滚动条位于顶部：   $(window).scrollTop(); # return 0 $(window).height();    # return 1080 $(document).height();  # return 3376   然后将网页果冻到最底部： $(window).scrollTop(); # return 2296   你会发现 3376-1080=2296   滚动窗口到某个元素的位置   $(‘html, body’).animate({scrollTop: $(“#page”).offset().top}, 2000);  ","categories": ["web","html5"],
        "tags": [],
        "url": "/posts/2011-05-09-jquery-element-position-notes.html",
        "teaser":null},{
        "title": "在Mac上使用gitX",
        "excerpt":"gitX 是mac上一个git的可视化工具，可以与gravatar 、gist集成在一起。我比较喜欢它的界面形式，感觉很舒服。   安装方法：   最简单的安装方法就是下载它的二进制包，直接运行。 在它的wiki页面找到二进制包的 下载地址 , 下载后，解压，直接运行，程序界面就出来了。   然后点菜单“GitX”中的’Enable Terminal Usage …’, 这样可以直接在命令行窗口中，在项目的根目录中直接运行gitx来启动gitX了。      另外有人在Linux系统上也开发了一个类似的git可视化工具，叫gitg, 在Ubuntu下可以直接使用 ** sudo apt-get install gitg ** 来安装.   更新   gitX官方的这个版 本已经好久没有更新了，另外它也有一些缺点，如不能方便从文件中复制代码（很难选中代码的），我找到这个版本, 它从原官方的版本更流行。另外它真的很好用，比官方的版本提高了很多功能点。你自己慢慢体会吧。  ","categories": ["mac","tool"],
        "tags": [],
        "url": "/posts/2011-05-12-use-gitX-on-mac.html",
        "teaser":null},{
        "title": "使用Juggernaut",
        "excerpt":"Juggernaut是基于Node.js的一个实时(Realtime)Web的解决方案。使用起来很方便。 安装方法 安装Node.js: brew install node 安装Redis: brew install redis 安装NPM: curl http://npmjs.org/install.sh sh 安装Juggernaut: 这个会把Juggernaut安装到当前目录，所以我应该先进行项目的/vendor/third目录，然后执行 npm install juggernaut usermatoMacBook-Pro:third qichunren$ npm install juggernaut redis@0.5.11 ./node_modules/juggernaut/node_modules/redis node-static-maccman@0.5.3 ./node_modules/juggernaut/node_modules/node-static-maccman socket.io@0.6.17 ./node_modules/juggernaut/node_modules/socket.io juggernaut@2.0.4 ./node_modules/juggernaut usermatoMacBook-Pro:third qichunren$ 安装Juggernaut gem: gem install juggernaut 使用方法 我们在自己的项目中只需要引入http://localhost:8080/application.js 这个js文件即可。 然后在页面中可以这样接收服务器端的消息： &lt;script type=\"text/javascript\" charset=\"utf-8\"&gt; var jug = new...","categories": ["rails","web"],
        "tags": [],
        "url": "/posts/2011-05-12-use-juggernaut-for-realtime-app.html",
        "teaser":null},{
        "title": "使用Unicorn",
        "excerpt":"Install gem install unicorn Then add gem ‘unicorn’ to Gemfile. bundle exec unicorn_rails to start rails app at 8080 port. caojinhua:qichunren.github.com caojinhua$ unicorn_rails --help Usage: unicorn_rails [ruby options] [unicorn_rails options] [rackup config file] Ruby options: -e, --eval LINE evaluate a LINE of code -d, --debug set debugging flags (set $DEBUG...","categories": ["rails","deploy"],
        "tags": [],
        "url": "/posts/2011-05-13-use-unicorn-in-rails.html",
        "teaser":null},{
        "title": "学习和了解Redis",
        "excerpt":"Redis redis-rb gem install redis   redis-objects是基于redis-rb的一个ruby对象与redis对象映射的gem  ","categories": ["database","nosql","redis"],
        "tags": [],
        "url": "/posts/2011-05-14-learn-redis-db.html",
        "teaser":null},{
        "title": "去掉textmate源代码中的隐形空格",
        "excerpt":"有这个需要，主要是因为不想在git提交后的diff中无看到不有意思的diff显示。使用textmate的同学可以用这个工具来解决这个小问题。   安装方法   cd ~/Library/Application\\ Support/TextMate/Bundles/ git clone git://github.com/glennr/uber-glory-tmbundle.git Uber\\ Glory.tmbundle cd Uber\\ Glory.tmbundle git submodule update --init osascript -e 'tell app \"TextMate\" to reload bundles'  ","categories": ["tool"],
        "tags": [],
        "url": "/posts/2011-05-17-remove-hidden-space-soure-code.html",
        "teaser":null},{
        "title": "Fix problem annotate is broken with rails 3.1.1",
        "excerpt":"今天在做一个小工具，使用最新的Rails版本3.1.1, 在使用annotate(2.4.0)这个gem的时候出错了： caojinhua:tts_cacher caojinhua$ annotate /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/activerecord-3.1.1/lib/active_record/railties/databases.rake:3:in `&lt;top (required)&gt;': undefined method `namespace' for main:Object (NoMethodError) from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/activerecord-3.1.1/lib/active_record/railtie.rb:26:in `load' from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/activerecord-3.1.1/lib/active_record/railtie.rb:26:in `block in &lt;class:Railtie&gt;' from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/railtie.rb:183:in `call' from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/railtie.rb:183:in `block in load_tasks' from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/railtie.rb:183:in `each' from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/railtie.rb:183:in `load_tasks' from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/engine.rb:396:in `block in load_tasks' from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/application/railties.rb:8:in `each' from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/application/railties.rb:8:in `all' from /Users/caojinhua/.rvm/gems/ruby-1.9.2-p180/gems/railties-3.1.1/lib/rails/engine.rb:396:in `load_tasks'...","categories": ["rails"],
        "tags": [],
        "url": "/posts/2011-06-03-fix-annotate-gem-with-rails3-1-1.html",
        "teaser":null},{
        "title": "Install mongo on mac",
        "excerpt":"caojinhuamatoMacBook-Pro:code caojinhua$ brew install mongodb ==&gt; Downloading http://fastdl.mongodb.org/osx/mongodb-osx-x86_64-1.8.1.tgz ######################################################################## 100.0% ==&gt; Caveats If this is your first install, automatically load on login with: mkdir -p ~/Library/LaunchAgents cp /usr/local/Cellar/mongodb/1.8.1-x86_64/org.mongodb.mongod.plist ~/Library/LaunchAgents/ launchctl load -w ~/Library/LaunchAgents/org.mongodb.mongod.plist If this is an upgrade and you already have the org.mongodb.mongod.plist loaded: launchctl unload -w ~/Library/LaunchAgents/org.mongodb.mongod.plist cp...","categories": ["nosql","mongodb"],
        "tags": [],
        "url": "/posts/2011-06-04-install-mongodb.html",
        "teaser":null},{
        "title": "Set proxy in server side to get crossing domain ajax request",
        "excerpt":"class ProxyController &lt; ApplicationController    # GET /proxy/:url   def get_handle     require 'open-uri'     file = open(params[:url])     contents = file.read     render :text =&gt; contents   end  end       get \"/proxy\" =&gt; \"proxy#get_handle\"   ``` $.get(\"/proxy?url=\" + remote_url, function(data){ ```  ","categories": ["rails"],
        "tags": [],
        "url": "/posts/2011-08-18-proxy-in-server-side-for-ajax-crossing-domain.html",
        "teaser":null},{
        "title": "使用Jruby来部署Rails应用",
        "excerpt":"为了保护最近做的产品的源代码，需要将项目中的源代码进行保护起来。我目前了解到的方案有以下两种： 使用代码混淆工具 使用JRuby将Ruby代码编译成java字节码文件（.class） 第一种方案，有一个名为ruby encoder的产品，我试用了一下，发现太重量级了，我个人只是一个可以将代码混淆一下的小工具而已，而ruby encoder有自己的运行加载机制，源代码二次编码，基于域名可以设置产品过期失效时间等等一系列功能，我不需要这些功能，另外它不是免费的，所以我没有采用这个方案。 第二种方安装就是使用JRuby。整体思路就是将Ruby项目的代码编译成java字节码文件，然后运行于Java环境中。 将项目中的ruby文件编译成java的class文件不是一件容易的事情，所幸有一个名为warbler的gem可以帮助我们搞定这一切，它可以将项目打包(.war)，同时可以将ruby代码编译成class文件。然后你将生成好的.war文件放进JAVA应用服务器的应用目录中，如Tomcat的webapps中就可以了。 warbler提供若干个任务可供使用： qichunren@qichunren-desktop:~/code/ntdeck$ warble -T warble compiled # Feature: precompile all Ruby files warble config # Generate a configuration file to customize your archive warble executable # Feature: make an executable archive warble gemjar # Feature: package gem repository inside a jar warble...","categories": ["ruby","jruby","rails","deploy"],
        "tags": [],
        "url": "/posts/2011-08-27-deploy-rails-project-with-jruby.html",
        "teaser":null},{
        "title": "网页截屏的方法",
        "excerpt":"曾经很想有这样一个app, 它可以将微博上用户的微博用图片的形式自动保存起来，留此存照。前几个月的那段时间，微博上很 网页截屏的基本原理就是通过取得webkit渲染（render）的数据来生成图片的，我经过一段时间研究，找到了两个方法来解决这个问题。 一个工具叫phantomjs，另一个工具叫cutycapt 两个工具都不错，个人比较喜欢使用cutycapt这个工具，它是直接提供一个命令行来生成网页截图的，而前者是通过javascript来调用底层webkit接品(page.render方法)来实现的，两者的侧重点不一样。 并且cutycapt是将整个网截下来，phantomjs是将浏览器当前视区的一屏截下来。 Cutycapt的用法如下 qichunren@qichunren-desktop:~/github/cutycapt/CutyCapt$ ./CutyCapt ----------------------------------------------------------------------------- Usage: CutyCapt --url=http://www.example.org/ --out=localfile.png ----------------------------------------------------------------------------- --help Print this help page and exit --url=&lt;url&gt; The URL to capture (http:...|file:...|...) --out=&lt;path&gt; The target file (.png|pdf|ps|svg|jpeg|...) --out-format=&lt;f&gt; Like extension in --out, overrides heuristic --min-width=&lt;int&gt; Minimal width for the image (default: 800) --min-height=&lt;int&gt; Minimal...","categories": ["tool"],
        "tags": [],
        "url": "/posts/2011-10-13-capture-webpage.html",
        "teaser":null},{
        "title": "Shell学习小记录",
        "excerpt":"最近为了一些自动化的任务，要写一些脚本。可以使用Ruby脚本、Ruby的rake\\thor等等，我为了简洁和性能，我了解了一下Shell，发现用Shell来做这个事情更合适。性能，命令行，管道，丰富的现有工具，基于Linux本身，Shell真是一个好东西。以前认为用Ruby来做这个事情是一个不错的选择，现在知道了，那是因为相比起Shell来，更熟悉Ruby，程序员总是喜欢自己熟悉的领域，而排斥自己不熟悉的领域。其实多了解一下其它方面的，更利用自己工作的开展，提高工作效率。 我随便总结一下几个知识点 字符串 声明一个字符串变量后，使用的时候，在变量名前面加一个$符号才能将其值取出来 DATA_FILE=data.tar.gz echo $DATA_FILE 字符串拼接 DATA_DIR=/Users/caojinhua/code/ DATA_FILE=data.tar.gz DATA_PATH=$DATA_DIR\"\"$DATA_FILE 将命令执行的结果保存在变量中 sha1=`ls -al` if语句结构 if语句条件测试命令： [ -d DIR ] 如果DIR存在并且是一个目录则为真 [ -f FILE ] 如果FILE存在且是一个普通文件则为真 [ -z STRING ] 如果STRING的长度为零则为真 [ -n STRING ] 如果STRING的长度非零则为真 [ STRING1 = STRING2 ] 如果两个字符串相同则为真 [ STRING1 != STRING2 ] 如果字符串不相同则为真 [ ARG1...","categories": ["linux","shell"],
        "tags": [],
        "url": "/posts/2011-10-18-learning-shell-tip-note.html",
        "teaser":null},{
        "title": "近期iOS学习点",
        "excerpt":"虽然我业余在学iOS，但是感觉进步缓慢。为了使我的iOS开发的学习效率高一点，我决定先列一个简要的提纲，明确当前一个阶段的学习计划。           iOS体系，了解清楚UI组件的体系            Objective-C中的基本数据结构使用            iOS中的基本的网络编程，主要是iOS客户端方的,如json,http交互等。       先就这么多，每天要进步一点.  ","categories": ["ios"],
        "tags": [],
        "url": "/posts/2011-12-18-ios-learn-note.html",
        "teaser":null},{
        "title": "mongodb的可视化客户端工具:MongoHub",
        "excerpt":"最近在使用mongodb,经常要调试，然后找到了MongoHub这款工具，感觉很好。   MongoHub网站     ","categories": ["tool","nosql","database","mongodb"],
        "tags": [],
        "url": "/posts/2011-12-20-mongodb-ui-client-mongohub.html",
        "teaser":null},{
        "title": "在Rails3中使用ajax",
        "excerpt":"今天写代码的时候突然发现 我之前在Rails3中使用ajax的方式是不太正确的，我走了弯路。 我之前在Rails3项目中使用ajax是这样的： 如果是直接发送一个ajax请求，我就给标签加上:remote =&gt; true。如果我在此基础上还要做其它的操作，如ajax表单提交前要对表单字段验证，我之前以为那样UJS就不能搞定了，需要我自己写代码来处理。然后我就使用jquery中的相关ajax操作来处理。 今天我才了解到UJS的AJAX操作已经为我们提供了6个自定义事件方法： ajax:before – right before ajax call ajax:loading – before ajax call, but after XmlHttpRequest object is created) ajax:success – successful ajax call ajax:failure – failed ajax call ajax:complete – completion of ajax call (after ajax:success and ajax:failure) ajax:after – after ajax call is...","categories": ["rails"],
        "tags": [],
        "url": "/posts/2011-12-22-use-ajax-in-rails3-note.html",
        "teaser":null},{
        "title": "iOS中的arc4random方法",
        "excerpt":"通过arc4random() 获取0到x-1之间的整数的代码如下:  int value = arc4random() % x;    获取1到x之间的整数的代码如下:  int value = (arc4random() % x) + 1;   最后如果想生成一个浮点数，可以在项目中定义如下宏：  #define ARC4RANDOM_MAX      0x100000000    然后就可以使用arc4random() 来获取0到100之间浮点数了（精度是rand（）的两倍），代码如下：  double val = floorf(((double)arc4random() / ARC4RANDOM_MAX) * 100.0f);  ","categories": ["ios"],
        "tags": [],
        "url": "/posts/2012-01-04-arc4random-in-ios.html",
        "teaser":null},{
        "title": "How to update a forked repository from original repository at github?",
        "excerpt":"If you use github, you can follow this. I use huachlee/ruby-china repository for example. At huacnlee/ruby-china repository homepage, clicked “Fork” button, then after serval minutes, you will have you own forked repository copy.Then you clone to local. git clone git@github.com:qichunren/ruby-china.git Then you commit your changes, and push to it.When you...","categories": ["git"],
        "tags": [],
        "url": "/posts/2012-01-09-update-forked-repository-from-original-repository-at-github.html",
        "teaser":null},{
        "title": "Customizing rails generator templates",
        "excerpt":"Rails framework and twitter bootstrap are good for your startup project, build-in generators generate source code by its way. It is a good starting point. But I often have to change default generted source code: Add encoding: utf-8 into ruby file header, for Ruby 1.9.2 encoding. Change scaffold view files...","categories": ["ruby"],
        "tags": [],
        "url": "/posts/2012-01-12-customizing-rails-generator-templates.html",
        "teaser":null},{
        "title": "使用ffaker来产生随机数据",
        "excerpt":"ffaker是一个用来产生随机name\\email之类的工具，可以用在开发时先产生一些有意义的随机数据，将数据写在db/seeds.rb中，这样你就不用每次急燥地添加一些asasddfdsf这样的数据。一个好的工作开发环境，可以让心情舒畅，效率加倍。   在db/seeds.rb中，如果要产生100个用户名，直接这样做：   require 'ffaker'   100.times do    user = User.new    user.name = Faker::Name.name =&gt; \"David Cao\"    user.email = Faker::Internet.email =&gt; \"qichunren@cqror.com\"    user.save  end  我前一段时间，提交了一点代码 ，可以产生天朝的姓名：   require 'ffaker'  Faker::NameCN.first_name # =&gt; 鑫洋 Faker::NameCN.last_name # =&gt; 禹 Faker::NameCN.name # =&gt; 俊伶漫  ffaker目前最新的版本是1.2，可以产生中文的姓名。  ","categories": ["ruby","test"],
        "tags": [],
        "url": "/posts/2012-01-19-use-ffaker.html",
        "teaser":null},{
        "title": "Use Smarty template in CodeIgniter",
        "excerpt":"CodeIgniter是一个不错的PHP开发框架，很合我的口味，我做的一些PHP项目就是用的它。 Smarty是目前业界最著名的PHP模板引擎之一。它分离了逻辑代码和外在的内容，提供了一种易于管理和使用的方法，用来将原本与HTML代码混杂在一起的PHP代码逻辑分离。 一般来说使用原生PHP作为视图会比使用模板引擎高效，一些简单的项目或者个人开发者可以直接使用PHP，如果是大一点的项目，再加上要和美工配合，使用模板引擎会是分工明确，合作高效一些。 在CodeIgniter使用Smarty模板引擎一点也不复杂，这是因为CodeIgniter提供了创建类库的方便方法。 我这里使用的CodeIgniter和Smarty都是最新版本,2.1.0和3.1.7 1: 将Smarty包下载后，解压后，放入CodeIgniter项目中的application/libraries目录. caojinhua:company caojinhua$ ls application/libraries/ Smarty.php index.html smarty/ caojinhua:company caojinhua$ ls application/libraries/smarty/ Smarty.class.php SmartyBC.class.php debug.tpl plugins/ sysplugins/ 2: 在application/libraries目录中创建Smarty.php文件。 &lt;?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); require_once('smarty/Smarty.class.php'); class CI_Smarty extends Smarty { function __construct(){ parent::__construct(); $this-&gt;compile_dir = FCPATH . \"application/views/templates_c\"; $this-&gt;template_dir...","categories": ["php"],
        "tags": [],
        "url": "/posts/2012-02-11-use-smarty-template-in-codeigniter.html",
        "teaser":null},{
        "title": "Create custom tags in Smarty 3",
        "excerpt":"接着上一篇，还是来说说PHP模板引擎Smarty。PHP的众多CMS框架，如DEDE CMS，对于前端展示都是有一套自己开发的标签，用于显示管理后台维护的数据。在DEDECMS中，如下的代码 &lt;h2&gt;最近新闻&lt;/h2&gt; &lt;ul&gt; {dede:arclist typeid='1' row='10'} &lt;li&gt;[field:textlink/]&lt;/li&gt; {/dede:arclist} &lt;/ul&gt; 就可以显示最近type id为1的10条新闻。在Smarty中创建属于自己的标签是很容易的，我之前在网络上搜索的关于创建smarty标签的内容大多数都是基于Smarty2的，我基于Smarty3中的plugins目录的代码了解到在Smarty3中创建自定义标签更为简单直观。 在smarty程序包的plugins目录中，可以看到有block \\ function \\ modifier 等几种前缀的php文件。像block前缀的php文件可以创建闭合的标签，就如上文提到的那个dede cms新闻标签的例子。现在我正是要创建这样类型的标签。 我结合CodeIgniter来说明，我现在创建一个用户列表的标签，可以显示最近注册的用户。 在smarty的plugins目录中创建的文件会自动被smarty加载而识别的，文件名和其中的function 名称需要特定的约定好的格式。 我现在想创建一个users标签,还有一个limit参数，用来显示取多少条数据 用户列表： &lt;ul&gt; &lt;{users limit='3'}&gt; &lt;li&gt;&lt;{$user-&gt;login}&gt;&lt;/li&gt; &lt;{/users}&gt; &lt;/ul&gt; 那么文件名就应该指定为block.users.php，然后function应该命名为smarty_block_users： &lt;?php function smarty_block_users($params, $content, $smarty, &amp;$repeat){ if (empty($content)){ if (empty($params['limit'])) { $limit = 10; } else { $limit =...","categories": ["php"],
        "tags": [],
        "url": "/posts/2012-02-26-create-custom-tags-in-smarty.html",
        "teaser":null},{
        "title": "Use Rubyencoder encrypt ruby code",
        "excerpt":"前些时候研究了一下ruby encoder的加密技术应用，在这里记录一下它的使用过程。 Ruby Encoder将ruby代码加密成不易阅读的格式，然后通过它提供的加载类型来载入ruby代码，从而达到加密的目的。它是一个付费软件，一个许可证要159美金，提供试用版，可以试用一个星期，支持Linux \\ FreeBSD \\ Mac OS X \\ Windows系统。 首先在Ruby Encoder上注册一个帐号，登录进去后，我这里选择下载Mac OS X版的，RubyEncoder Trial for Mac OS X （RubyEncoder_1.3_Trial.dmg），下载后，将dmg中的程序拖到applications目录，就算安装好了。 qichunren:~ qichunren$ cd /Applications/RubyEncoder/ qichunren:RubyEncoder qichunren$ ls Icon? RubyEncoder_User_Manual.pdf bin/ README Start RubyEncoder.app* rgloader/ 第一次使用的话，需要它的官方网站给你提供一个许可证文件(文件名为encode.lic),进行Ruby Encoder的bin目录,执行其中的rubyencoder文件, 它会输出一些它的软件声明信息，一直回车后几次后，阅读完许可声明，它还要求你输入’I AGREE’后，然后输出一个注册码（Reg Key）,要求你登录到它的网站中，在个人帐户里，在页面最下面的Available Licenses中填入注册码，然后下载它提供的encode.lic文件，放在Ruby Encoder的bin目录中，现在就可以使用Ruby Encoder了。 直接执行一下rubyencoder命令，可以先了解一下它的用法。 qichunren:bin qichunren$ ./rubyencoder RubyEncoder 1.3...","categories": ["ruby"],
        "tags": [],
        "url": "/posts/2012-02-27-use-rubyencoder-encrypt-ruby-code.html",
        "teaser":null},{
        "title": "通过update-rc.d来管理Ubuntu系统的自动启动程序",
        "excerpt":"转载, 并记下我的使用心得。 Linux services can be started, stopped and reloaded with the use of scripts stocked in /etc/init.d/. However, during start up or when changing runlevel, those scripts are searched in /etc/rcX.d/ where X is the runlevel number. This tutorial will explain how one can activate, deactivate or modify a...","categories": ["linux"],
        "tags": [],
        "url": "/posts/2012-03-14-how-to-managing-services-with-update-rc-dot-d.html",
        "teaser":null},{
        "title": "怎么样从git提交历史里永久删除一个文件?",
        "excerpt":"需要整理   参考资料     Remove sensitive data   How do I remove sensitive files from git’s history   git: forever remove files or folders from history  ","categories": ["git"],
        "tags": [],
        "url": "/posts/2012-05-17-how-to-remove-a-file-from-git-history-forever.html",
        "teaser":null},{
        "title": "Fixed a problem with creating texture background in cocos2d",
        "excerpt":"我尝试在cocos2d游戏中使用小图片重复平铺的方式来创建游戏背景时, 总是遇到这个问题，报错如下: Terminating app due to uncaught exception 'NSInternalInconsistencyException', reason: 'GL_CLAMP_TO_EDGE should be used in NPOT dimensions' 我的代码是这样的: CCSprite *wall = [CCSprite spriteWithFile:@\"pattern1.png\" rect:CGRectMake(0, 0, 320, 480)]; wall.anchorPoint = ccp(0,0); [self addChild:wall z:-1 tag:111]; ccTexParams params = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT}; //ccTexParams params = {GL_LINEAR,GL_LINEAR,GL_CLAMP_TO_EDGE, GL_CLAMP_TO_EDGE}; [wall.texture setTexParameters:&amp;params]; 我运行cocos2d项目的测试例子, 却发现它的例子是工作正常的,...","categories": ["ios","cocos2d","game-dev"],
        "tags": [],
        "url": "/posts/2012-06-03-fixed-a-problem-with-creating-texture-background-in-cocos2d.html",
        "teaser":null},{
        "title": "使用SSH代理来访访问远程mysql机器",
        "excerpt":"默认安装的mysql的Linux机器基于安全的原因，一般不支持mysql的远程连接访问。有几种方法可以修改配置来让mysql服务器支持远程连接。但是通过ssh的代理功能，可以不用修改服务器配置，来支持从远程连接mysql服务器。   在本地通过ssh连接远程的mysql所在的服务器   ssh -L 1036:localhost:3306 root@xxx.xx.xx.xxx   这样就将远程的mysql主机代理到本地了，端口是1036。 SSH太强大了  ","categories": ["linux"],
        "tags": [],
        "url": "/posts/2012-06-04-use-ssh-proxy-port-trick.html",
        "teaser":null},{
        "title": "Ruby China Chrome浏览器插件",
        "excerpt":"前几天，我花了几天业余时间制作了Ruby China社区网站的Chrome浏览器插件，通过这个插件可以：      不用前往Ruby China网站去浏览主题帖子，直接点击插件图标查看主题。   显示个人未读消息提醒   另外，我发现Chrome浏览器的插件开发非常简单，自由度很大，根据它的开发规范，可以非常容易实现扩展开发。在我了解了这一点之后，我更加喜欢Chrome浏览器了。   这个Chrome浏览器插件项目是开源的，代码在https://github.com/qichunren/ruby-china-chrome   ","categories": ["web"],
        "tags": [],
        "url": "/posts/2012-06-18-i-build-ruby-china-chrome-extension.html",
        "teaser":null},{
        "title": "Use postgres database on Mac Lion",
        "excerpt":"Mac平台 brew info postgresql qichunrens-MacBook-Pro:luna-client1 qichunren$ brew info postgresql postgresql: stable 9.2.1 http://www.postgresql.org/ Depends on: readline, ossp-uuid Not installed https://github.com/mxcl/homebrew/commits/master/Library/Formula/postgresql.rb ==&gt; Options --no-perl Build without Perl support --enable-dtrace Build with DTrace support --32-bit Build 32-bit only --no-python Build without Python support --without-ossp-uuid Build without OSSP uuid ==&gt; Caveats # Build...","categories": ["database"],
        "tags": [],
        "url": "/posts/2012-11-27-start-use-postgresql.html",
        "teaser":null},{
        "title": "最近的境况",
        "excerpt":"好久没有写点东西了。平时虽然脑中想到的东西蛮多的，但是要把它们完整地通过文字表达出来居然有些困难。这是我不想看到的结果。我需要克服各种困难，提高自己的执行效率，提高自己的表达能力。   我在最近的公司项目中遇到了一些困难，导致工作进展缓慢，压力很大。项目的需求在一个多月之前发生了较多的变化，导致之前的软件设计有许多变化。基于演变后的需求进行的结构逻辑设计方面，在我看来，感觉有些混乱，代码写得不顺畅。然后产品客户方面的界面需求与我们现有的产品设计之间在理解上还有不少差距。项目上线发布时间越来越近，如何在产品发布之前，做出一个完美的产品，真的挑战蛮大的。   我现在要做的事情就是克服困难，积极沟通，发现问题，及时解决问题。   加油！  ","categories": ["Life"],
        "tags": [],
        "url": "/posts/2013-05-22-recently-my-thought.html",
        "teaser":null},{
        "title": "开始使用vagrant",
        "excerpt":"Vagrant Vagrant 是一个虚拟机配置管理工具。 简单来说，Vagrant 可以让你用一个文本文件 Vagrantfile 描述一个虚拟机环境，然后根据你的描述启动这样的一台虚拟机，同时将 Vagrantfile 所在的目录的所有内容，和虚拟机中的 /vagrant 这个目录自动实时同步。入门文档在这里。 Get started 下载vagrant, 从http://downloads.vagrantup.com/页面中，根据自己的操作系统平台选择相应的版本下载，我在写这个文档的时候它的最新版本是v1.3.1 安装完成后，在命令行终端中会有一个vagrant命令。 进行自己平时的工作目录，执行 git clone git@github.com:qichunren/luna-vagrant.git cd luna-vagrant vagrant box add precise64 http://files.vagrantup.com/precise64.box # 下载box，它是一个VirtualBox虚拟机导出的文件，版本是Ubuntu 12.04 LTS 64位 vagrant up 自己的工作目录（就是luna-vagrant项目的上一层项目）是实时与虚拟机中的/code目录保持同步。 luna-vagrant目录是实时与虚拟机中的/vagrant目录保持同步。 常用命令 vagrant up # 启动虚拟机 vagrant ssh # ssh登录机器 vagrant halt # 关闭虚拟机 vagrant...","categories": ["Tool"],
        "tags": [],
        "url": "/posts/2013-09-22-start-use-vagrant.html",
        "teaser":null},{
        "title": "我的2013年总结",
        "excerpt":"2013年已经过去了，感觉这一年过得太快了。工作很忙碌，我又是一个严重拖延症患者，难得今天抽出时间写这个年终总结。我认为这是很有必要的，总结经验，不断进步。   2013年这一年都在忙，从去年7年月份开始的一个工程项目，这不是一个专门的软件项目，它是从硬件设计到应用软件开发一整套的项目，实现了网络语音对讲、广播、媒体播放的功能，可用于银行、学校、监狱等场所。我在这个项目中主要负责系统的信息管理配置，包括设备信息管理、频道管理、媒体库管理等功能。   到5月末，这个项目看似完成了，然后我们在上海这边的团队去广州那边的合作伙伴公司，与他们负责硬件的团队一起配合，完成系统的最后部分。没有想到这一去就是整整半年。在14年1月份的时候还去了山西的某监狱中出差，负责系统的软件安装配置。这整个过程就不在这里细说了，反正感觉不好受，以后我再也不想经历这种状态下的工作经历。现在我想总结一下的想法。   阶段工作要做好   一个比较正式的软件工程项目大致可以分为五个阶段：需求分析、系统设计、程序开发、系统测试、部署安装。这五个阶段都是至关重要的，任何一个阶段的工作没有做好的话，都会导致问题发生。   沟通与合作   沟通怎么强调也不为过。在一个团队中，积极沟通，可以让团队人员合作得愉快。在现实生活中，个体之间由于差异化，加上程序员一般有些自傲的特性，交流起来得需要一些方法，有一个段子是这样的：      你也不能对一个程序员说：你的代码有bug。他的第一反应是： 1，你的环境有问题吧； 2，傻逼你会用吗。 如果你委婉地说：你这个程序和预期的有点不一致，你看看是不是我的使用方法有问题。 他本能地会想：操，是不是出bug了！    做减法   做减法是敢于去掉不必须或者目前不那么重要的工作，把精力和资源集中到最重要的目标上，高质量地实现，尽早发布，让人看到。在产品的需求分析方面，广州公司这边是希望做出来的产品功能全面，可以适合于各种场合。他想到的功能，和从竞争对手产品看到的功能，都向需求列表中添加。我知道他们是为了让自己的产品强大，但是我人个是希望是相关人员站在公司战略发展的角度来规划整个产品线，将产品分阶段版本发布，这样可以保证每一版产品都稳定实用。当初的iPhone也不是一下子就完美无缺的。我希望是每一个发布版的产品都是于用户实用的，而不是功能点多，却很多功能都有问题。每一版中多提出一个功能，意味着开发要多做事情，意味着测试要多做事情。我们团队一共才5个人。   另外做减法，我在开发过程也有体会。Ruby写代码很直观，加上经常出来一些新技术工具Gem包之类的，我就尝试它们，觉得不错的话就应用到我们的项目中，因为写代码很容易嘛，花不了多少时间的。然后在以后的某个时候，随着产品需求的明确化，发现其实之前我写的某些代码是多余的。多写了代码，就多了一维护，就多了一个入口。项目中多加一个Gem，以后如果升级项目时，就多了一份检查包兼容检查的工作。   站在用户的角度来思考问题   我的主要经验是在WEB开发上面，感觉设计用户界面是一个比较重要的工作。做出的产品，最终在用户方面，他的使用感受是与产品相关的。   团队中没有产品经理方面的角色，项目前期也没有很具体的界面方面的文档，前期系统是直接借用网上的一个后台模板，然后根据项目的具体情况改进的。在山西那边出差时，在监狱中安装系统，进行系统配置管理时，我发现我做出的界面操作起来很难受，300多台机器呀，应该有的批量操作没有实际用途，而在现场需要的某些批量操作功能却没有。那些时候真是感觉很沮丧。这个促使我在设计界面时，一定要根据产品的实际使用场合来思考构思界面的设计，思考怎么样直观操作，高效操作。     收获与希望      在广州呆了半年，也算是在”去过的地方中”中加一个地点，感受了这个城市。   了解了一个产品诞生的过程，大概知道了硬件是怎么样设计出来的。   加强沟通能力   学习C/C++等比较底层一点的知识，多了解一下与电子方面有关的知识。   ","categories": ["Tool"],
        "tags": [],
        "url": "/posts/2014-01-24-my-2013.html",
        "teaser":null},{
        "title": "解决NTFS格式移动硬盘在MAC系统上不能读的问题",
        "excerpt":"插上移动硬盘后，在命令行终端里输入命令   diskutil info /Volumes/${硬盘名} 然后记下输出结果中的Device Node值，如/dev/disk1s2   弹出移动硬盘   在命令行执行命令　sudo mkdir /Volumes/MyHD   然后mount： sudo mount_ntfs -o rw,nobrowse /dev/disk1s2 /Volumes/MyHD   好了，现在就可以向移动硬盘/Volumes/MyHD中写入内容了。   在Finder中不能看到移动硬盘目录，可以做一个链接 sudo ln -s /Volumes/MyHD ~/MyHD   搞定。  ","categories": ["Tool"],
        "tags": [],
        "url": "/posts/2014-05-04-enable-ntfs-write-on-mac.html",
        "teaser":null},{
        "title": "《写给大家看的设计书》笔记",
        "excerpt":"最近又将《写给大家看的设计书》这本书翻阅了一遍，又有了一些新的体会，感觉非常棒。真的非常佩服和感谢作者能够将关于设计的东西通过如此简明的理论给表达出来，让普通的人可以明白和感受设计的奥妙窍门。   我平时主要是作 WEB 开发方面的工作，在网上看到许多优秀的网页设计排版，感觉非常舒服。我之前一直在思考为什么我就不能设计出来这样类型的网页，只能从形式上去模仿，没有找到设计的精髓，感觉没有头绪。自从看到了《写给大家看的设计书》这本书后，我一口气把它读完了，感觉非常满足。它指点了我，让我从迷惘中走出来。      再次将书中的一些段落摘抄下来感受一下：      优秀的设计就这么容易       1 学习4大基本原则，它们比你想象得要简单。     2 认识到自己没有使用这些原则。形诸文字 —- 陈述问题。     3 应用基本原则。结果将使你大吃一惊。     书中提到的4大基本原则是对比，重复，对齐，亲密性。分别在每一章节中讲述了其中的运用方法，并有实例配套。   最后我想知道的是，在生活中有没有和这本书中类似的看似常人不易掌握，但是经过高人点拨和总结，然后一下子豁然明朗的技能呢？   相关链接   《写给大家看的设计书》  ","categories": ["Tool"],
        "tags": [],
        "url": "/posts/2014-05-16-The-Non-Designers-Design-Book-Note.html",
        "teaser":null},{
        "title": "PostgreSQL 数据库中的高级数据类型",
        "excerpt":"未完成 …  ","categories": ["Tool"],
        "tags": [],
        "url": "/posts/2014-07-14-Anvanced-data-types-in-postgresql-for-rails-developers.html",
        "teaser":null},{
        "title": "将Shadownsocks代理转换成http proxy类型",
        "excerpt":"　 将Shadownsocks代理转换成http proxy类型， 主要就是安装 polipo 工具   brew install polipo   然后就是启动polipo程序开机自动启动。   首先要修改自动启动的配置文件 /usr/local/opt/polipo/homebrew.mxcl.polipo.plist，需要给 polipo 命令加上命令行参数 socksParentProxy=localhost:1080     &lt;!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"&gt;         Label     homebrew.mxcl.polipo     RunAtLoad          KeepAlive          ProgramArguments            /usr/local/opt/polipo/bin/polipo       socksParentProxy=localhost:1080            然后执行以下命令，搞定收工。   ln -sfv /usr/local/opt/polipo/*.plist ~/Library/LaunchAgents launchctl load ~/Library/LaunchAgents/homebrew.mxcl.polipo.plist   polipo 进程默认监听8123端口，在命令行使用 export http_proxy=http://localhost:8123 就可以使用代理了。   export https_proxy=http://localhost:8123 export ftp_proxy=http://localhost:8123  ","categories": ["Tool"],
        "tags": [],
        "url": "/posts/2014-07-15-Convert-shadowsocks-into-http-proxy-on-mac.html",
        "teaser":null},{
        "title": "欧洲旅行记录",
        "excerpt":"2014年9月21到9月30号跟着公司团到欧洲旅行了一圈，这是我的第一次出国。   这次欧洲行游历了四个国家：德国，荷兰，比利时和法国。去过的欧洲城市有柏林，科隆，阿姆斯特丹，布鲁塞尔，巴黎。      购物方面：物价比中国国内便宜。买许多东西比国内便宜，如红酒，化妆品，保健品，手表，奶粉。 交通：在欧洲我经过的几个城市，柏林的交通算比较好，巴黎人口密度大，车也多。然后大家都很遵守交通规则，我没有看到有闯红灯的现象，路上机动车随便变道的情况也非常少，几乎没有鸣喇叭的现象，骑自行车的很多，没有人骑电瓶车，要么就是骑摩托车。   欧洲是一个值得细细感受的地方，如果我下次再来的话，一定会选一个地方，好好呆上一段时间，仔细感受其中的文化底蕴和人化风俗。   最近在看一本书叫《欧洲极简史》，希望能多多了解一下欧洲这片土地。  ","categories": ["Life"],
        "tags": [],
        "url": "/posts/2014-10-04-europe-travel.html",
        "teaser":null},{
        "title": "Game resources note",
        "excerpt":"Game replay video here: https://everyplay.com The Big List Of Game Design Audio: http://www.bfxr.net/ generate small music sound, such as ‘power up’, ‘coin collect’, ‘Attack’, ‘Explosion’ http://www.flashkit.com/ sound resources. Super Dialogue Audio Pack Images VOXEL Builder http://voxelbuilder.com/ 2.5D model tool: http://www.angryoctopus.co.nz/?p=177 http://opengameart.org/ https://itch.io/game-assets The Must-Have Game Assets for Designers and Digital...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2014-10-23-game-resources-note.html",
        "teaser":null},{
        "title": "C++中实现单例",
        "excerpt":"data_package.h文件 #ifndef DATA_PACKAGE_H #define DATA_PACKAGE_H #include &lt;QObject&gt; class DataPackage : public QObject { Q_OBJECT public: static DataPackage &amp;instance(); signals: public slots: private: explicit DataPackage(QObject *parent = 0); }; #endif // DATA_PACKAGE_H data_package.cpp文件 #include \"data_package.h\" #include &lt;QDebug&gt; DataPackage::DataPackage(QObject *parent) : QObject(parent) { qDebug() &lt;&lt; \"init data package\"; } DataPackage&amp; DataPackage::instance() {...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2015-01-13-c-plus-plus-single-instance-notes.html",
        "teaser":null},{
        "title": "在QT5中使用国际化语言",
        "excerpt":"要在QT项目中使用国际化，以支持多种语言，需要如下步骤。 在pro文件中声明TRANSLATIONS文件，如下面的例子，声明了两个ts文件，一个是zh-CN，另一个en的。    TRANSLATIONS = translations/ntptu_zh-CN.ts translations/ntptu_en.ts 在项目的主目录中的命令行中运行 lupdate -verbose ntptu.pro lupdate -verbose ntptu.pro lupdate warning: no TS files specified. Only diagnostics will be produced for ‘D:/code/ntptu/ntptu.pro’. Updating ‘src/translations/ntptu_zh-CN.ts’… Found 104 source text(s) (104 new and 0 already existing) Updating ‘src/translations/ntptu_en.ts’… Found 104 source text(s) (104 new and 0 already...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2015-04-13-qt-internationalization.html",
        "teaser":null},{
        "title": "我的开发感悟（2）",
        "excerpt":"在调研某一项技术时，没有深入到其中之前，会认为它不适合自己的口味，或者认为它比较难以入门。但是某一天当你静下心来研究，一旦入门了，就会感叹：原来如此，我怎么没有早点了解它呢？   最近在研究Backbone这个JS库时，再次有这个感受。Backbone真是一个小而美的前端MVC库，虽然不像AngularJS那样来的直接，但是Backbone层次逻辑清楚，虽然自己需要多写一些代码，但是一切都在掌握之中的感觉真不错，它适合有一定基础并希望可以自由度大一点的开发人员。  ","categories": ["Development"],
        "tags": [],
        "url": "/posts/2015-07-01-my-dev-notes1.html",
        "teaser":null},{
        "title": "在QT5中使用JSON库json-c",
        "excerpt":"首先需要安装json-c库: sudo apt-get install libjson-c-dev 在QT的项目中，修改.pro文件，加入： CONFIG += link_pkgconfig PKGCONFIG += json-c 构建JSON的方法如下 #include &lt;json/json.h&gt; /*Creating a json object*/ json_object * jobj = json_object_new_object(); /*Creating a json string*/ json_object *jstring = json_object_new_string(\"Joys of Programming\"); /*Creating a json integer*/ json_object *jint = json_object_new_int(10); /*Creating a json boolean*/ json_object *jboolean = json_object_new_boolean(1);...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2015-07-13-use-json-in-qt5.html",
        "teaser":null},{
        "title": "对使用http请求的GET和POST的一点思考",
        "excerpt":"对使用http请求的GET和POST的一点思考 在web开发中，一个http请求方法有GET / HEAD / PUT / DELETE / OPTIONS / CONNECT几个形式，对此不多究。我今天主要想谈谈常见的GET和POST两种方法的使用思考。 先来讲一个我最近做的一个 Ruby on Rails 项目，在那个项目中，用户(User)可以选择某一个数据集合(DataSet)项目参与其中做任务(Task)。模型关系如下 class User &lt; ActiveRecord::Base has_many :tasks end class DataSet &lt; ActiveRecord::Base def user_task(user) user.tasks.where(data_set_id: self.id).first end end class Task &lt; ActiveRecord::Base belongs_to :user belongs_to :data_set end 在数据集合(DataSet)列表页面，列出多个集合(DataSet)，用户可以选择其中一个参与任务(Task)。如果用户还没有参与其中的某个项目，显示“开始工作”，否则显示“继续工作”，页面部分代码如下： &lt;% @data_sets.each do |data_set| %&gt; &lt;div...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2015-07-28-http-get-and-post.html",
        "teaser":null},{
        "title": "Linux Deb package notes",
        "excerpt":"使用dh_make命令可以在项目中生成默认的debian目录，此debian目录中包含了默认的deb打包规范的一系列文件。   dh_make --createorig --single -e whyruby@gmail.com -c gpl   需要注意的是在项目目录中执行dh_make命令的时候，会提示项目目录必须要是project-name-1.0类似的形式。   在dh_make命令执行后，继续运行   dpkg-buildpackage -uc -us   会在当前项目目录的上一层生成deb文件。   deb包的构建规范中规定了一系列的规则，最常用的有安装时的文件路经对应，此文件位于debian/install中，如将编译文件的可执行文件将安装的/usr/bin目录，将程序执行图标文件放在/usr/share/applications目录。install文件中类似这样：   bin/new-pis usr/bin new-pis.desktop /usr/share/applications new-pis-icon.png /usr/share/pixmaps db/data.db /var/lib/new-pis   debian目录中其它的文件如提供cron job的文件，日志文件分割等以后深究。   References      Basics of the Debian package management system    Guide for Debian Maintainers   Debian Binary Package Building HOWTO  ","categories": ["Development"],
        "tags": [],
        "url": "/posts/2015-08-06-linux-deb-notes.html",
        "teaser":null},{
        "title": "FANN NOTES",
        "excerpt":"   用BP人工神经网络识别手写数字——《Python也可以》之三    libfann/fann   Neural Networks and Deep Learning   Hacker’s guide to Neural Networks  ","categories": ["Development"],
        "tags": [],
        "url": "/posts/2015-08-18-fann-notes.html",
        "teaser":null},{
        "title": "Wacthdog notes",
        "excerpt":"第一种方法，通过一个SHELL脚本守护进程检查目标进程是否存在。 第二中方法，通过一个守护进程与目标进程进行本地SOCKET通信。 #!/bin/sh PATH=/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/sbin:/usr/local/bin:$PATH trap process_user_sig SIGUSR1 process_user_sig() { echo \"ntpis-watchdog is still alive!\" } echo 'Waiting for ntpis startup....' sleep 30 echo 'Watchdog starting....' DROP_CACHE_COUNT=0 while : do LEVEL=`runlevel | cut -f2 -d ' '` if [ \"$LEVEL\" = \"6\" -o \"$LEVEL\" = \"0\" -o \"$LEVEL\" = \"1\" ]...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2015-08-18-watchdog-notes.html",
        "teaser":null},{
        "title": "Capture all reqeust web page send",
        "excerpt":"The main process is to set QNetworkAccessManager instance to a QWebPage object, then use finished signal to capture QNetworkReply reply. MainWindow::MainWindow(QWidget *parent) : QMainWindow(parent), ui(new Ui::MainWindow) { ui-&gt;setupUi(this); QWebSettings::globalSettings()-&gt;setAttribute(QWebSettings::PluginsEnabled, true); QWebSettings::globalSettings()-&gt;setAttribute(QWebSettings::AutoLoadImages, true); QWebSettings::globalSettings()-&gt;setAttribute(QWebSettings::JavascriptEnabled, true); QWebSettings::globalSettings ()-&gt;setAttribute (QWebSettings::DeveloperExtrasEnabled, true); static QWebView * view; view = new QWebView(this); ui-&gt;verticalLayout-&gt;addWidget(view); nm = new...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2016-03-24-capture-all-request-webpage-send.html",
        "teaser":null},{
        "title": "Linux里GUI程序自启动",
        "excerpt":"将.desktop文件复制到 /home/${user}/.config/autostart/目录下即可。   另外很多时候程序需要用root权限启动，需要修改.desktop文件, 在执行命令前加sudo   [Desktop Entry]   Version=1.0   Type=Application   Terminal=false   Name=NTPIS1   Exec=sudo /usr/bin/nt-web-app   Comment=Shanghai NT PIS 25t   Icon=/usr/share/pixmaps/nt-web-icon.png   StartupNotify=false   Encoding=UTF-8   Categories=Development;   为了让自启动程序不用如入sudo的密码，还需要修改/etc/sudoers文件   sudo visudo  add line  \t%sudo   ALL=(ALL) NOPASSWD: /usr/bin/nt-web-app  after \t%sudo   ALL=(ALL:ALL) ALL  ","categories": ["Development"],
        "tags": [],
        "url": "/posts/2016-06-16-autostart-app-linux.html",
        "teaser":null},{
        "title": "Buildroot简单使用",
        "excerpt":"使用 Buildroot 可以方便的灵活的构建一个定制的用于嵌入式平台的Linux系统。 公司里有自己开发的类beaglebone的核心板。我之前调试QT程序都时需要在板子里编译程序，很花费时间，也不方便。 最近学会了使用Buildroot来跨平台编译程序，感觉我之前的做法太LOW了，现在在自己的开发机器中可以模拟出ARM平台的编译环境，编译好了的程序在目标机器中可以直接运行。 Buildroot的用法很简单，在这里简单记录一下。 下载Buildroot压缩包到本地，解压。 在主目录里创建Config.in文件。在configs目录中有许多不同类型的文件已经创建好了，我们公司的ARM板是和beaglebone差不多，所以Config.in来自beaglebone_defconfig文件。 执行make menuconfig调出编译配置界面，在这里可以对目标系统进行各种定制化，包括Kernel, Bootloader, 各种常用的软件包，系统配置等。 设置完成后退成。实际上UI的各种操作是对Config.in文件的操作。 执行make，编译完成后，在output目录下有编译好的文件。 怎么样将自己写的程序集成到Buildroot的packages中？ 在这里我以我写的一个名为hardware_report程序作为例子，我这个程序是用qt5写的，buildroot需要通过git clone的方式下载代码编译。 修改package目录中的Config.in文件，加入 menu \"Shanghai nt projects\" source \"package/hardware_report/Config.in\" endmenu 创将package/hardware_report目录，在其中创建Config.in和hardware_report.mk文件 Config.in文件中的内容如下： config BR2_PACKAGE_HARDWARE_REPORT bool \"hardware_report\" help this is comment that explains what hardware_report is. https://git.xxxxxx.com hardware_report.mk文件中的内容如下： ################################################################################ # # hardware-report # ################################################################################ HARDWARE_REPORT_VERSION =...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2016-06-21-use-buildroot-cross-build-app.html",
        "teaser":null},{
        "title": "Work with binary data",
        "excerpt":"最近在做一些网络编程方面的东西，之前大多数情况接触的都是文本协议，现在接触的是二进制协议。在此补一下相关知识，下面基本上是以Ruby语言来描述用法。 在Ruby中字面常量二近制数据以 0b 开头: $ irb 1.9.3-p194 :001 &gt; 0b1010 =&gt; 10 1.9.3-p194 :002 &gt; 0b10 =&gt; 2 1.9.3-p194 :003 &gt; 0b11 =&gt; 3 1.9.3-p194 :004 &gt; 0b100 =&gt; 4 Fixnum#to_s(base = 10) Fixnum#to_s(base = 10) 方法用于各种进制之间的转换。 ### 二进制转换成十进制 $ irb 1.9.3-p194 :001 &gt; 0b10.to_s(10) =&gt; \"2\" 1.9.3-p194 :002 &gt;...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2016-06-22-work-with-binary-data.html",
        "teaser":null},{
        "title": "Get started with autotools",
        "excerpt":"Follow this tutorial to get started with autotools. configure.ac文件 使用 autoscan 工具生成 configure.scan 文件，将它重命名为 configure.ac ，默认的文件内容如下： # -*- Autoconf -*- # Process this file with autoconf to produce a configure script. AC_PREREQ([2.69]) AC_INIT([FULL-PACKAGE-NAME], [VERSION], [BUG-REPORT-ADDRESS]) # Checks for programs. # Checks for libraries. # Checks for header files. # Checks...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2016-08-15-get-started-with-autotools.html",
        "teaser":null},{
        "title": "解决Ruby Gem 扩展的交叉编译",
        "excerpt":"Fixed ruby gem package cross compile on ARM / i.MX6 with Buildroot tool. Ariaboard core board 在 ARM 或者 i.MX6 平台上使用 Ruby 不是一件容易的事情，原因在于 Buildroot 的 Ruby 包 中不支持在目标平台上编译带有 C/C++ 扩展的 GEM　包，像一些常用 GEM 包，如 Eventmachine、串口操作的 ruby-serialport 等都没有办法在目标平台上使用，只能安装使用纯 Ruby 代码编写的 GEM 包。 在解决问题的过程中，我查找了不少资料，包括 Buildroot的，包括 gcc 编译相关的，最终都无果。 后来我突发奇想，Ruby 源代码中的 ext 目录的 C 扩展的标准库都可以编译出来，如...","categories": ["Development"],
        "tags": [],
        "url": "/posts/2019-09-25-fixed-gem-extension-build-on-arm-buildroot.html",
        "teaser":null},{
        "title": "160 Pis Server Disk Make",
        "excerpt":"Server Disk make cd / sudo mount /dev/sdb2 /mnt cd /mnt ls lib lost+found sudo mkdir var sudo mount /dev/sdb3 var df -h Filesystem Size Used Avail Use% Mounted on udev 3.2G 0 3.2G 0% /dev tmpfs 649M 9.1M 640M 2% /run /dev/sda1 72G 65G 2.6G 97% / tmpfs 3.2G...","categories": [],
        "tags": [],
        "url": "/wiki/160-pis-server-disk-make.html",
        "teaser":null},{
        "title": "Blockchain Notes",
        "excerpt":"Block chain notes   Block chain.  ","categories": [],
        "tags": [],
        "url": "/wiki/blockchain-notes.html",
        "teaser":null},{
        "title": "C_cpp_dev_linux",
        "excerpt":"日常Linux（Ubuntu）下的开发工具链记录 包管理工具 查找头文件的信息，包括包名、文件具体路径 dpkg -S opencv.hpp 查看包安装好的所有文件和目录 dpkg -L libopencv-core-dev 查看包信息 apt-cache show libopencv-core-dev 查看包是否安装 dpkg -l | grep libopencv-core-dev 搜索包名 apt-cache search keyword1 keyword2 搜索代码 grep –include *.c “memcpy” -R . pkg-config *.pc 文件一般位于 /usr/lib/x86_64-linux-gnu/pkgconfig 目录 pkg-config –list-all 列出当前所有包名 pkg-config –cflags gio-2.0 -pthread -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include pkg-config –libs gio-2.0 -lgio-2.0...","categories": [],
        "tags": [],
        "url": "/wiki/c_cpp_dev_linux.html",
        "teaser":null},{
        "title": "Dd_notes",
        "excerpt":"Before back up a device data, you should umount it. sudo umount /dev/sdb? Backup /dev/sdb data into a gz file. sudo dd if=/dev/sdb bs=16M | gzip &gt; ~/ntpis-sd-2016-09-09.img.gz If your /dev/sdb data space is not full, you may only backup data port. For example, if your /sdev/sdb used size is...","categories": [],
        "tags": [],
        "url": "/wiki/dd_notes.html",
        "teaser":null},{
        "title": "Design Links",
        "excerpt":"Design links      The 75 GoodUI ideas   Adobe color cc   Icon Finder   FLATICON   reddit low poly   CG-Artist      Artem RHADS Chebokha   Anna Lepeshkina at youtube   Somnit: Low poly modeller   Somnit   Low poly      Low Poly Lab   Web templates      Free - Bootstrap Themes &amp; Templates by Xiaoying Riley  ","categories": [],
        "tags": [],
        "url": "/wiki/design-links.html",
        "teaser":null},{
        "title": "Get started with Docker",
        "excerpt":"Check docker process: $ ps -ef | grep docker /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock Check docker version: $ docker --version Docker version 18.09.6, build 481bc77 Check docker info: $ docker info Containers: 5 Running: 0 Paused: 0 Stopped: 5 Images: 2 Server Version: 18.09.6 Storage Driver: overlay2 ... List all docker...","categories": [],
        "tags": [],
        "url": "/wiki/get_started_with_docker.html",
        "teaser":null},{
        "title": "Get started with PyQt5",
        "excerpt":"PyQt5 is a set of Python bindings for v5 of the Qt application framework from The Qt Company.   Usefull links      PyQt5 Reference Guide  ","categories": [],
        "tags": [],
        "url": "/wiki/get_started_with_pyqt5.html",
        "teaser":null},{
        "title": "Get_started_with_ros",
        "excerpt":"Get Started with ROS I assume you are familiar with Ubuntu OS and C++/Python development. Browse ROS Wiki to install ROS packages on you work pc. Follow ROS Tutorials to see how ros apps work. Construe node, topic, service, message in ROS. Follow book &lt;ROS by example volume 1&gt; and...","categories": [],
        "tags": [],
        "url": "/wiki/get_started_with_ros.html",
        "teaser":null},{
        "title": "Gstreamer Notes",
        "excerpt":"GStreamer notes Test if audio output device is ok gst-launch-1.0 audiotestsrc ! alsasink udpsink gst-launch-1.0 -v audiotestsrc ! udpsink Encode microphone audio to UDP RTP gst-launch-1.0 alsasrc ! audioconvert ! audio/x-raw,channels=1,depth=16,width=16,rate=22000 ! rtpL16pay ! udpsink host=255.255.255.255 port=5000 RTSP Related gst-launch-1.0 rtspsrc location=rtsp://admin:novo1234@192.168.110.71/ ! rtph264depay ! h264parse ! matroskamux! filesink location=test.mkv...","categories": [],
        "tags": [],
        "url": "/wiki/gstreamer-notes.html",
        "teaser":null},{
        "title": "Wiki",
        "excerpt":"   在线教育   NTP   Tool Box   Design   日常Linux（Ubuntu）下的开发工具链记录   Get Started series   Get started with Docker Get started with PyQt5  ","categories": [],
        "tags": [],
        "url": "/wiki/index.html",
        "teaser":null},{
        "title": "装修笔记",
        "excerpt":"好用的物品清单 前置反冲洗过滤器 家庭垃圾处理器 FRANKE 断路器 洗碗机 - Panasonic NP-TR1HECN 离子除臭抽湿机 - SHARP DW-CE15F-W 加湿器 - 智米除菌加湿器 扫地机器人 - 小米扫地机器人 加湿器 - 智米除菌加湿器 dyson pure cool link dyson V6 Absolute 电动牙刷 - PHILIPS Sonicare HX9392 男生必备 鼻毛修剪器 - Panasonic ER-GN30-K 吹风机 Dyson Supersonic 电炖盅 - Bear DDZ-A08D1 0.8L 自动烘干毛巾架 智能晾衣夹 环保...","categories": [],
        "tags": [],
        "url": "/wiki/interior_decorator_notes.html",
        "teaser":null},{
        "title": "Node Install",
        "excerpt":"Node Install   nvm install   https://github.com/creationix/nvm   To install or update nvm, you can use the install script using cURL:   ::                  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh       bash           Then exit current shell, and open a new shell:   nvm install node  ","categories": [],
        "tags": [],
        "url": "/wiki/node-install.html",
        "teaser":null},{
        "title": "Online EDU",
        "excerpt":"   http://www.lynda.com/   程序员面试、算法研究、编程艺术、红黑树、数据挖掘5大系列集锦  ","categories": [],
        "tags": [],
        "url": "/wiki/online_edu.html",
        "teaser":null},{
        "title": "QT Notes",
        "excerpt":"QT Console application pro file: #------------------------------------------------- # # Project created by QtCreator 2014-03-31T13:20:57 # #------------------------------------------------- QT += core QT -= gui TARGET = Todo CONFIG += console CONFIG -= app_bundle TEMPLATE = app SOURCES += main.cpp QT Widget application pro file: #------------------------------------------------- # # Project created by QtCreator 2014-03-31T13:27:53 #...","categories": [],
        "tags": [],
        "url": "/wiki/qt.html",
        "teaser":null},{
        "title": "ntp with multicast mode",
        "excerpt":"NTP Install NTP sudo apt-get update sudo apt-get install ntp Config NTP Server Edit /etc/ntp.conf file, below is a real sample: # /etc/ntp.conf, configuration for ntpd; see ntp.conf(5) for help driftfile /var/lib/ntp/ntp.drift logfile /var/log/ntp.log # Enable this if you want statistics to be logged. #statsdir /var/log/ntpstats/ statistics loopstats peerstats clockstats...","categories": [],
        "tags": [],
        "url": "/wiki/ntp_in_multicast_mode.html",
        "teaser":null},{
        "title": "NTP with GPSD",
        "excerpt":"NTP with GPSD Reference page: http://www.catb.org/gpsd/gpsd-time-service-howto.html cp /etc/ntp.conf /etc/ntp.conf.origin pool us.pool.ntp.org iburst driftfile /var/lib/ntp/ntp.drift logfile /var/log/ntp.log restrict default kod nomodify notrap nopeer noquery restrict -6 default kod nomodify notrap nopeer noquery restrict 127.0.0.1 mask 255.255.255.0 restrict -6 ::1 # GPS Serial data reference server 127.127.28.0 fudge 127.127.28.0 time1 0.9999 refid...","categories": [],
        "tags": [],
        "url": "/wiki/ntp_with_gpsd.html",
        "teaser":null},{
        "title": "Openssl Notes",
        "excerpt":"RSA应用举例 生成私匙和公钥 产生1024位RSA私匙，用3DES加密它，口令为trousers，输出到文件rsaprivatekey.pem openssl genrsa -out rsaprivatekey.pem -passout pass:trousers -des3 1024 从文件rsaprivatekey.pem读取私匙，用口令trousers解密，生成的公钥匙输出到文件rsapublickey.pem openssl rsa -in rsaprivatekey.pem -passin pass:trousers -pubout -out rsapubckey.pem 公私钥加密解密 用公钥匙rsapublickey.pem加密文件plain.txt，输出到文件cipher.txt openssl rsautl -encrypt -pubin -inkey rsapublickey.pem -in plain.txt -out cipher.txt 使用私钥匙rsaprivatekey.pem解密密文cipher.txt，输出到文件plain.txt openssl rsautl -decrypt -inkey rsaprivatekey.pem -in cipher.txt -out plain.txt 签名 用私钥匙rsaprivatekey.pem给文件plain.txt签名，输出到文件signature.bin openssl rsautl -sign -inkey rsaprivatekey.pem...","categories": [],
        "tags": [],
        "url": "/wiki/openssl-notes.html",
        "teaser":null},{
        "title": "Proxy Notes",
        "excerpt":"Proxy Notes   socat作端口转发   使用场景:   A 访问 B很慢，C访问B很快，现在可以将C作为中间跳板，使A通过访问C达到加速访问B的目的   在C的机器上执行以下命令   socat TCP-LISTEN:8913,fork TCP:108.61.161.174:22  ","categories": [],
        "tags": [],
        "url": "/wiki/proxy-notes.html",
        "teaser":null},{
        "title": "Rsync_notes",
        "excerpt":"https://www.samba.org/ftp/rsync/rsync.html   将当前 pis-ui 目录同步到远程机器中的 /home/ntwork/ 目录下，注意 pis-ui 后面没有斜线 ‘/’   rsync -ar  pis-ui ntwork@192.168.8.196:/home/ntwork/   ","categories": [],
        "tags": [],
        "url": "/wiki/rsync_notes.html",
        "teaser":null},{
        "title": "Shell_notes",
        "excerpt":"     ls -tr /var/log/paigo/stm32-data-* | head -n -6 | xargs rm || true       log_size_kb=`du -k /var/log/paigo/info.log  | cut -f1`     if [[ \"$log_size_kb\" -gt 30720 ]] ; then         # 30Mb         echo \"\" &gt; /var/log/paigo/info.log     fi   nheqminer -l equihash.hk.nicehash.com:3357 -u 18g1N9S2v163hfzMCibwkvn4NR7d7kqVMb.worker1 -t 6 -cd 0 1  ","categories": [],
        "tags": [],
        "url": "/wiki/shell_notes.html",
        "teaser":null},{
        "title": "qrencode generator",
        "excerpt":"QRCODE sudo apt-get install qrencode qrencode '12345 -o code.png -s 10 SN_SOURCE = [\"A\", \"B\", \"C\", \"D\", \"E\", \"F\", \"G\", \"H\", \"I\", \"J\", \"K\", \"L\", \"M\", \"N\", \"O\", \"P\", \"Q\", \"R\", \"S\", \"T\", \"U\", \"V\", \"W\", \"X\", \"Y\", \"Z\", \"0\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\"] def...","categories": [],
        "tags": [],
        "url": "/wiki/use_qrencode_generate_image.html",
        "teaser":null},{
        "title": "Tool Box",
        "excerpt":"Community      Github   StackOverflow   Ruby-China   Editor      Online Markdown Editor   StackEdit   Markdown Tables Generator   Graph      Online Diagram    Online Diagram: ProcessOn    ICO file editor   Game Resources      OpenGameArt   MagicaVoxel @ ephtracy   Youtube download   https://www.onlinevideoconverter.com/zh/video-convert   MediaWiki   wget https://releases.wikimedia.org/mediawiki/1.31/mediawiki-1.31.0.tar.gz   Install Postgresql server first   sudo apt-get install postgresql postgresql-contrib  ","categories": [],
        "tags": [],
        "url": "/wiki/tool_box.html",
        "teaser":null},{
        "title": "TRDP Notes",
        "excerpt":"Include headers: #include #include #include #if defined (POSIX) #include #include &lt;sys/select.h&gt; #elif (defined (WIN32) || defined (WIN64)) #include \"getopt.h\" #endif #include “trdp_if_light.h” #include “vos_thread.h” #include “vos_utils.h” Init the library: tlc_init Open a session: tlc_openSession(&amp;appHandle, ownIP, 0, /* use default IP address / NULL, / no Marshalling / &amp;pdConfiguration, NULL, /...","categories": [],
        "tags": [],
        "url": "/wiki/trdp-notes.html",
        "teaser":null},{
        "title": "Windows_dev_notes",
        "excerpt":"Windows Dev Notes Windows平台应用程序开发 采用 msys2 工具将 Linux 平台上开发的软件移植到 Windows 平台上 pacman -Sy mingw32/mingw-w64-i686-make pacman -Ss make i686 pacman -Sy git gdb g++ pacman -Sy autoconf automake libtool Synchronizing package databases pacman -Syu Common packages uuid: libutil-linux-devel qichunren@DESKTOP-CGH8J7I MINGW32 ~/code/pudgeptu $ echo $PKG_CONFIG_PATH /mingw32/lib/pkgconfig:/mingw32/share/pkgconfig qichunren@DESKTOP-CGH8J7I MINGW32 ~/code/pudgeptu $ export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/lib/pkgconfig...","categories": [],
        "tags": [],
        "url": "/wiki/windows_dev_notes.html",
        "teaser":null},{
        "title": "Wireshark_usage",
        "excerpt":"Wireshark notes   Wireshark filter usage:   udp.dstport==8086 udp.srcport==8086  ","categories": [],
        "tags": [],
        "url": "/wiki/wireshark_usage.html",
        "teaser":null},{
        "title": "20160522",
        "excerpt":"20160522   TODO      整理PIS系统通讯协议。   改写160公里PIS的屏通讯协议。   配置GPS NTP功能。   测试GPS报站功能。   PAIGO测试程序摄像头测试功能。   TBOX平台展示车辆轨迹。   学习Angular2。   学习GLib的网络通讯接口。   ","categories": [],
        "tags": [],
        "url": "/work_logs/20160522.html",
        "teaser":null},{
        "title": "20160907",
        "excerpt":"手动配置WIFI IP #dhclient wlan0 ifconfig wlan0 192.168.8.220 netmask 255.255.252.0 route add default gw 192.168.8.5 echo “nameserver 192.168.8.5” &gt; /etc/resolv.conf 修复安全问题 cd /etc/ssh &amp;&amp; chmod 600 _key 禁止SSH远程登录：cd /etc/init.d &amp;&amp; mv S50sshd K50sshd 平时只能通过串口登录，手动启动sshd: /etc/init.d/K50ssd start 更新25T最新内核 qichunren@qichunren-work:~/25t-imx6$ ls imx6q-sabresd.dtb mod.tar.gz u-boot.imx uImage [root@pudge tmp]# cp uImage /boot/uboot/ [root@pudge tmp]# cp...","categories": [],
        "tags": [],
        "url": "/work_logs/20160907.html",
        "teaser":null},{
        "title": "20180523",
        "excerpt":"加密解密   今天在设计软件更新机制时的一些想法和笔记。   目的：      为了确保软件更新包的构建源头是我方开发人员。   加密软件更新包，防止他人查看其内容。   对称密码   通信的双方都使用同一个密钥加解密。   非对称加密      密钥和公钥作为一对密码，自己保护好密钥，公钥可以公开。   发送方用自己的私钥对内容签名，接收方用发送方的公钥验证签名的内容   发送方使用接收方的公钥加密内容，然后发给对方，接收方使用自己的私钥解密   软件更新包的设计方法   创建软件更新包时加密，然后在目标机器上获取软件更新包后，进行解密验证。   非对称加密中，加密和验证信息大的内容是非常耗资源的，这样做效率低。可以将对称密码和非对称加密结合   在开发机上创建加密更新包的过程      在开发机器上创建私钥和公钥，同时将公钥上传到产品机器。   将软件更新包的版本号、包文件大小、更新包sha512，再加上随机数，作为密码。   用私钥加密第2步生成的密码。   利用第2步的生成的密码，通过AES加密的方法，将软件更新包加密。   将第3步的加密后的密码，连同第4步加密后的软件包一同打包，作为最终分发的软件更新包。   在产品机上解密验证更新包的过程      解压软件更新包   利用公钥验证加密的密码，获取实际密码，从中可以得到更新包的sha512摘要信息、版本信息。   利用第2步解析出的实际密码，解密 加密的更新包。   通过第2步的sha512摘要信息验证第3步解密出来的软件更新包。   验证   通过以上的方法，不法分子就算通过办法获取到了产品机器上的公钥，他也只能查看到更新包的实际内容，但是他无法二次修改更新包的内容，伪造新的更新包。   参考资料      openssl rsa doc  ","categories": [],
        "tags": [],
        "url": "/work_logs/20180523.html",
        "teaser":null},{
        "title": "20180524",
        "excerpt":"20180524 Work notes qt5 on Windows gtk on Windows msys2 pacman usage 在 Windows 平台开发 QT 应用程序，还是用 mingw 版比较好，配合 msys2 工具，可以，基本可以做到和 Linux 平台一样的流畅开发体验。使用 msvc 版开发 QT 程序，在处理第三方依赖时，非常麻烦，需要自己手动处理 DLL，也可能是我不知道有好的方法。 msys2 同步包仓库 pacman -Syu Before updating you should synchronize your local package databases with the latest repositories: pacman -Sy This command connects...","categories": [],
        "tags": [],
        "url": "/work_logs/20180524.html",
        "teaser":null},{
        "title": "20180529",
        "excerpt":"qt5在mysys2(mingw)平台上没有跟进到 QT最新采用的 WebEngine, 目前还是只能使用之前的 Webkit 折腾 Windows 平台上的应用程序开发，基于 QT5 或者 GTK3 pacman -S mingw-w64-x86_64-devhelp pacman -S mingw-w64-i686-webkitgtk3 find / -name \"*.pc\" | grep web Build via: gcc `pkg-config --cflags gtk+-3.0` `pkg-config --cflags /mingw32/lib/pkgconfig/webkitgtk-3.0.pc` -o example-0 example-0.c `pkg-config --libs gtk+-3.0` `pkg-config --libs /mingw32/lib/pkgconfig/webkitgtk-3.0.pc` example-0.c #include &lt;gtk/gtk.h&gt; #include &lt;webkit/webkit.h&gt; static void activate...","categories": [],
        "tags": [],
        "url": "/work_logs/20180529.html",
        "teaser":null},{
        "title": "20180607",
        "excerpt":"自行设置 so 的位置   在程序启动之前， export LD_LIBRARY_PATH=/a/b/c   然后 so 文件需要做如下命名的软链接形式：   cd /a/b/c  ln -sf liblunapudge.so.2.0.0 liblunapudge.so.2.0 ln -sf liblunapudge.so.2.0.0 liblunapudge.so.2 ln -sf liblunapudge.so.2.0.0 liblunapudge.so   Windows QT5 软件包分发   除了必须的那些dll文件和主程序在一起外，还需要 ./platforms/qwindows.dll , 这个文件位于 D:\\app\\msys32\\mingw32\\share\\qt5\\plugins\\platforms 目录之中。  ","categories": [],
        "tags": [],
        "url": "/work_logs/20180607.html",
        "teaser":null},{
        "title": "20190612",
        "excerpt":"QT I18N steps      Tools -&gt; External -&gt; Linguist -&gt; Update translation (lupdate)   Run linguist src/pis-ui.ts to open edit tool, edit translations, then save.   lrelease generate qm file.   Add qm file into qt resource file.   API:   QTranslator translator; translator.load(\":/translations/cn.qm\"); QCoreApplication::installTranslator(&amp;translator);  ","categories": [],
        "tags": [],
        "url": "/work_logs/20190612.html",
        "teaser":null},{
        "title": "20190613",
        "excerpt":"   Continue improve ntpis-cmon UI.   Baisc godot 3d scene setup.   Android hello word app learn.   Get started with gradle tool.   Create a mask popup dialog.  ","categories": [],
        "tags": [],
        "url": "/work_logs/20190613.html",
        "teaser":null},{
        "title": "20190614",
        "excerpt":"To do list      Continue improve ntpis-comon (media-camview) user interface.   Usefull commands   Kill running daemon by name.   ps -A | grep ntpis-cmon | awk '{print $1}' | xargs kill -9   Sync local directory to remote device.   rsync -a --delete pis-ui ntdeck@192.168.9.153:/home/ntdeck/  ","categories": [],
        "tags": [],
        "url": "/work_logs/20190614.html",
        "teaser":null},{
        "title": "20190617",
        "excerpt":"To do list Movie system management feature improve. [EMS] Learn Android dev from its documentation. Did *　VLC andriod build. Basic android ui switch. Usefull commands Code snipets Get device ip address in android: WifiManager wifiMan = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE); WifiInfo wifiInf = wifiMan.getConnectionInfo(); int ipAddress = wifiInf.getIpAddress(); String ip_string = String.format(\"%d.%d.%d.%d\",...","categories": [],
        "tags": [],
        "url": "/work_logs/20190617.html",
        "teaser":null},{
        "title": "20190618",
        "excerpt":"To do list Android 界面切换 ntpis-cmon-media-only 软件使用说明书 非接触PIS CCU 控制协议 EMS 项目分类管理以及给分类加图片 Code snipets Message tip with toast: String welcome = getString(R.string.welcome); Toast.makeText(getApplicationContext(), welcome, Toast.LENGTH_LONG).show() 2019-06-19 编写非接触 PIS CCU 控制协议文档 研究 Android Webview 2019-06-20 编写非接触 PIS CCU 控制协议文档 优化 EMS 页面在平板上的表现 Learn Android navigation: https://developer.android.com/guide/navigation Learn Android Fragment: https://developer.android.com/guide/components/fragments 2019-06-21...","categories": [],
        "tags": [],
        "url": "/work_logs/20190618.html",
        "teaser":null},{
        "title": "20190624",
        "excerpt":"To do list 到北京联调 3B PIS Did 安装最新 ntpis 到 CPU 板 修复 ntpis-cmon camera-view 的一些 bug. Usefull commands rsync -avz --delete qichunren@192.168.9.6:/home/qichunren/pis_data /root/pis_data # 设置连接外网 # # route add default gw 192.168.8.5 # echo \"nameserver 192.168.8.5\" &gt;&gt; /etc/resolv.conf Code snipets 2019-06-25 Did 优化 ntpis mvb代码 2019-06-27 优化 ntpis mvb代码...","categories": [],
        "tags": [],
        "url": "/work_logs/20190624.html",
        "teaser":null},{
        "title": "20190812",
        "excerpt":"通过 Rmagick 将文字或者图片渲染到图片中，然后查询图片中每一个像素，从而将整个图片转换成点阵信息，然后根据 LED 屏协议，将数据写入 LED 设备的串口， 使得可以在 LED 屏上显示文字和图片。     ","categories": [],
        "tags": [],
        "url": "/work_logs/20190812.html",
        "teaser":null}]
