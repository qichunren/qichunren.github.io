---
layout: single
title: "Customizing rails generator templates"
date: 2012-01-12 13:49
comments: true
categories: ruby
---

Rails framework and twitter bootstrap are good for your startup project, build-in generators generate source code by its way. It is  a good starting point. 

But I often have to change default generted source code:

+ Add **encoding: utf-8** into ruby file header, for Ruby 1.9.2 encoding.
+ Change scaffold view files to apply [bootstrap](http://twitter.github.com/bootstrap/) css.
+ Other things you want to override default templates.

Rails provides the mechanism to custom generator behavior.

I have already got it, and source code is on [github](https://github.com/qichunren/rails_generator_override_templates), follow README for usage.