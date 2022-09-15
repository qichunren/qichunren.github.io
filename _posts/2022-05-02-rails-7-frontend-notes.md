---
layout: single
title: "Rails 前端解决方案简介"
date: 2022-05-02 00:05
comments: true
categories: Development
---

前不久 Rails 7.0 版的发布带来了 Hotwire 这个框架作为 Rails 的前端解决方案，用来取代 Rails UJS，用来增强 Rails 后端与页面之间的交互能力；Rails 7.0 版还带来了 import_map、cssbundling-rails 和 jsbundling-rails，优化前端资源打包的流程，放弃 webpacker 项目，脱离 NodeJS 依賴，将选择权交出来，让用户自行选择打包方案。由于简化了 asset pipleline 打包流程，之前功能强大的 Sprockets 在新的集成环境中也显得有些繁重，所以 DHH 又推出了 Propshaft，它相当于是一个简化版的 Sprockets。

## Hotwred

[Hotwire](https://hotwired.dev/) 的核心是 Turbo，它是由四部分组成。

- Turbo Driver，它是在以前的 [turbolinks](https://github.com/turbolinks/turbolinks) 的基础上改进而来，利用 Ajax 请求和 History 实现了页面无抖动的快速加载，省去了静态资源文件的二次请求。
- Turbo Frame，通过 turbo frame，将整个页面可以划分为多个局部的页面，从而可以实现局部更新。
- Turbo Stream，通过 turbo stream，可以不用写 Javascript 代码，来实现页面的异步更新。
- Turbo Native 是用于移动端 WebView 集成开发，我没有过多研究，这是不多做解释。

## Stimulus JS

Turbo 解决了平时需要 Javascript 解决的大部分问题，Stimulus JS 通过 MutationObserver 接口来增强了 HTML Dom 的能力，而不用我们关心 DOM 载入和卸載时机等细节问题。一些需要写额外 JS 的事情，都可以通过写 Stimulus Controller 来解决。

## 打包流程

如果是使用 Rails 7 默认提供的 import_map，就不需要打包这个流程了，因为现代的浏览器中也支持 ES Module 的导入了。Rails 的 import_map 内部是使用了 https://wicg.github.io/import-maps/ 来提供支持的。

如果实在需要打包，采用了 cssbundling-rails 和 jsbundling-rails 后，会将 `yarn build` 和 `yarn build:css` hook 到 `assets:precompile` 任务中，它们产生的文件会放到 app/assets/builds 目录下面，我们自己在 package.json 中定义好相应的打包任务。Rails 在生产环境会执行 `rake assets:precompile` 任务资源打包任务，将 app/assets/builds 目录中的文件复制到 public/assets 目录中。

## 我的看法

从目前的反馈来看，hotwire 似乎反响不是很热烈，不少人对 Rails 提供的新的前端解决方案还持有一个观望的态度。而我在 Rails 7 还没有发布的时候就尝试了这个新方案，可以说在我目前的工作领域它是非常高效的一个方案，我主要负责的是公司的业务后台，还有公司的各种前端网站，我一个人能搞定这些，我没有必须用上表面看起来更好用的 React / Vue 这类方案。

Rails 的方案是一个前后端紧密结合的方案，它需要用户即要熟悉前端，又要熟悉 Rails，在国内的目前的环境中，只有一些小型高效团队能体会到它的好处。

React / Vue 这类的方案，我想我需要在浏览器中实现一套类似设计编辑器复杂度的工具时，我才会去考虑采用它。
