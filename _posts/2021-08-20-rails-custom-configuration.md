---
layout: single
title: Custom application configuration in Rails
date: 2021-08-20 13:20
comments: true
categories: Development
---

在Rails应用中，实现参数配置的功能，如果不需要在提供修改接口的话，不需要用上rails-settings-cached这类Gem，使用Rails内置的API即可满足基本需求。

在3个地方可以配置参数:

* config/application.rb
* config/environments/*.rb
* config/initializers/*.rb

	# config/environments/development.rb
	
	Rails.application.configure do
	  config.allow_user_register = true
	end
	
	# config/application.rb
	module ApplicationName
		class Application < Rails::Application
			config.load_defaults 6.1
			config.allow_user_register = true
		end
	end
	
通过 Rails.application.config 或者 Rails.configuration 读取配置的参数。

	Rails.configuration.allow_user_register  # =》 true
	
## 嵌套配置参数

使用 Rails中的 config.x 可以存储嵌套的参数。

	config.x.payment_processing.schedule = :daily
	config.x.payment_processing.retries  = 3
	config.super_debugger = true
	
读取这些参数：

	Rails.configuration.x.payment_processing.schedule # => :daily
	Rails.configuration.x.payment_processing.retries  # => 3
	Rails.configuration.x.payment_processing.not_set  # => nil
	Rails.configuration.super_debugger                # => true	
	
使用 Rails::Application.config_for 方法从 yaml 文件中读取配置信息。

	# config/payment.yml:
	production:
	  environment: production
	  merchant_id: production_merchant_id
	  public_key:  production_public_key
	  private_key: production_private_key

	development:
	  environment: sandbox
	  merchant_id: development_merchant_id
	  public_key:  development_public_key
	  private_key: development_private_key



	# config/application.rb
	module MyApp
	  class Application < Rails::Application
		config.payment = config_for(:payment)
	  end
	end
	
读取参数：	
	
	Rails.configuration.payment['merchant_id'] # => production_merchant_id or development_merchant_id	