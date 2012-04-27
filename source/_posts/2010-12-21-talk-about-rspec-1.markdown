---
layout: post
title: 说说rspec的测试(1)      
tags:
- Test  
- Rspec
---                        

虽然之前就用过rspec来测试系统的各种业务流程和业务逻辑，最近又在开始一个新的系统的测试，写起来又感觉很开心，很安心。所以就想说说用rspec来写rails项目测试的总结和体会。

rspec项目 在github上很活跃，rspec2较之 1.x的版本变得更模块化了，从[这里](https://github.com/rspec/) 看以到rspec的各个子项目，rspec2依赖于[rspec-core](https://github.com/rspec/rspec-core) [rspec-expectations](https://github.com/rspec/rspec-expectations) [rspec-mocks](https://github.com/rspec/rspec-mocks)

在Rails 3项目中，只需要在指定rspec-rails这个gem即可，它会自动依赖rspec2。

{% codeblock lang:ruby %}
gem "rspec-rails", "2.3.1" 
{% endcodeblock %}

在rspec2中，Rails3项的测试被分成控制器（controller）、模型（model）、请求（request）、路由（routing）、助手（helper）、视图（view）六大块的测试。从中可以看出rspec2力图让你的测试变得更为职责清楚和模块化，减少各种类型测试的影响，让测试变得更有效率和保证。我个人最喜欢的是模型（model）和请求的测试（request），这两个测试写得最为直接和有效，其它类型的测试如controller测试在复杂一点的业务中需要mock、stub等等，会将代码弄得有些复杂，当然这其中也有我对mock和stub没有用得理解的原因，不过我感觉测试controller还不如直接测试request来得直接。另外在factory-girl的帮助下能很快地写出有保证的测试。

在这里我贴出我系统中登录测试这一块的例子，从中可以看出测试目的是很明显的，测试效率是很高的。

这里的管理员(Admin)登录系统(AdminSession)是用到authlogic这个gem的。

这个是factory-girl的数据文件：

{% codeblock lang:ruby %}
# spec/factories/admins.rb
# encoding: utf-8
Factory.define :admin do |a|
  a.sequence(:login) {|i| "worker#{i}" }
  a.name             {|a| a.login      }
  a.email            {|a| "#{a.login}@gmail.com" }
  a.password         {|a| a.login }
  a.password_confirmation {|a| a.login } 
  
  a.active           false
  a.dept             0
end

Factory.define :actived_admin, :parent => :admin do |a|
  a.login "actived_admin"
  a.active  true
end

Factory.define :unactived_admin, :class => Admin do |a|
end
{% endcodeblock %} 


这里测试管理员登录系统的逻辑：
{% codeblock lang:ruby %}
# spec/requests/root_request_spec.rb
# encoding: utf-8 
require 'spec_helper'

describe "AdminSessions" do
  
  def login_with(admin_login, admin_password)
    post "/admin_session", :admin_session => { :login => admin_login, 
                                               :password => admin_password }
  end

  describe "GET /" do
    
    it "should redirect to login page" do
      get "/"
      response.should redirect_to(new_admin_session_path)
      get new_admin_session_path 
      response.should contain("你还没有登录，请先登录")
    end
    
    it "should not redirect to loign page if logged" do
      current_admin = Factory("actived_admin") 
      login_with("actived_admin", "actived_admin")
      response.should redirect_to(root_path)
      get "/"                    
      response.should be_success
      response.should contain("登录成功!")
    end
    
    it "should show error info with wrong loign id" do
      current_admin = Factory("actived_admin") 
      login_with("actived_admin", "adminpassword_error")
      response.should contain("你输入的帐号或密码不正确!")
    end
    
  end
  
end
{% endcodeblock %}

