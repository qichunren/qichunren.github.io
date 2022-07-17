---
layout: single
title: 说说 rspec 的测试 (1)
date: 2010-12-21 09:12:12
comments: true
categories: [rails, test]
---

虽然之前就用过 rspec 来测试系统的各种业务流程和业务逻辑，最近又在开始一个新的系统的测试，写起来又感觉很开心，很安心。所以就想说说用 rspec 来写 rails 项目测试的总结和体会。

rspec 项目 在 github 上很活跃，rspec2 较之 1.x 的版本变得更模块化了，从[这里](https://github.com/rspec/) 看以到 rspec 的各个子项目，rspec2 依赖于[rspec-core](https://github.com/rspec/rspec-core) [rspec-expectations](https://github.com/rspec/rspec-expectations) [rspec-mocks](https://github.com/rspec/rspec-mocks)

在 Rails 3 项目中，只需要在指定 rspec-rails 这个 gem 即可，它会自动依赖 rspec2。

```
gem "rspec-rails", "2.3.1"
```

在 rspec2 中，Rails3 项的测试被分成控制器（controller）、模型（model）、请求（request）、路由（routing）、助手（helper）、视图（view）六大块的测试。从中可以看出 rspec2 力图让你的测试变得更为职责清楚和模块化，减少各种类型测试的影响，让测试变得更有效率和保证。我个人最喜欢的是模型（model）和请求的测试（request），这两个测试写得最为直接和有效，其它类型的测试如 controller 测试在复杂一点的业务中需要 mock、stub 等等，会将代码弄得有些复杂，当然这其中也有我对 mock 和 stub 没有用得理解的原因，不过我感觉测试 controller 还不如直接测试 request 来得直接。另外在 factory-girl 的帮助下能很快地写出有保证的测试。

在这里我贴出我系统中登录测试这一块的例子，从中可以看出测试目的是很明显的，测试效率是很高的。

这里的管理员 (Admin) 登录系统 (AdminSession) 是用到 authlogic 这个 gem 的。

这个是 factory-girl 的数据文件：

{% highlight ruby %}

# spec/factories/admins.rb

Factory.define :admin do |a|
a.sequence(:login) {|i| "worker#{i}" }
a.name {|a| a.login }
a.email {|a| "#{a.login}@gmail.com" }
a.password {|a| a.login }
a.password_confirmation {|a| a.login }

a.active false
a.dept 0
end

Factory.define :actived_admin, :parent => :admin do |a|
a.login "actived_admin"
a.active true
end

Factory.define :unactived_admin, :class => Admin do |a|
end
{% endhighlight %}

这里测试管理员登录系统的逻辑：
{% highlight ruby %}

# spec/requests/root_request_spec.rb

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
      response.should contain("登录成功！")
    end

    it "should show error info with wrong loign id" do
      current_admin = Factory("actived_admin")
      login_with("actived_admin", "adminpassword_error")
      response.should contain("你输入的帐号或密码不正确！")
    end

end

end
{% endhighlight %}
