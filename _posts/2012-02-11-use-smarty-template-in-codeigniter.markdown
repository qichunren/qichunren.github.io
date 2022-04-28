---
layout: single
title: "Use Smarty template in CodeIgniter"
date: 2012-02-11 16:57
comments: true
categories: php
---

[CodeIgniter](http://codeigniter.com/)是一个不错的 PHP 开发框架，很合我的口味，我做的一些 PHP 项目就是用的它。

[Smarty](http://www.smarty.net/)是目前业界最著名的 PHP 模板引擎之一。它分离了逻辑代码和外在的内容，提供了一种易于管理和使用的方法，用来将原本与 HTML 代码混杂在一起的 PHP 代码逻辑分离。

一般来说使用原生 PHP 作为视图会比使用模板引擎高效，一些简单的项目或者个人开发者可以直接使用 PHP，如果是大一点的项目，再加上要和美工配合，使用模板引擎会是分工明确，合作高效一些。

在 CodeIgniter 使用 Smarty 模板引擎一点也不复杂，这是因为 CodeIgniter 提供了[创建类库](http://codeigniter.org.cn/user_guide/general/creating_libraries.html)的方便方法。

我这里使用的 CodeIgniter 和 Smarty 都是最新版本，2.1.0 和 3.1.7

1: 将 Smarty 包下载后，解压后，放入 CodeIgniter 项目中的 application/libraries 目录。
```
caojinhua:company caojinhua$ ls application/libraries/
Smarty.php	index.html	smarty/
caojinhua:company caojinhua$ ls application/libraries/smarty/
Smarty.class.php	SmartyBC.class.php	debug.tpl		plugins/		sysplugins/
```

2: 在 application/libraries 目录中创建 Smarty.php 文件。
{% highlight php %}
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once('smarty/Smarty.class.php');

class CI_Smarty extends Smarty {
        function __construct(){
          parent::__construct();
                $this->compile_dir = FCPATH . "application/views/templates_c";
                $this->template_dir = FCPATH . "application/views/templates";
                $this->cache_dir = FCPATH . "application/views/cache";//缓存目录
                $this->caching = 1;
                //$this->cache_lifetime = 120; //缓存更新时间
                $this->debugging = false;
                $this->compile_check = true; // 检查当前的模板是否自上次编译后被更改；如果被更改了，它将重新编译该模板。
                //$this->force_compile = true; // 强制重新编译模板
                //$this->allow_php_templates= true; // 开启 PHP 模板
                $this->left_delimiter = "{"; //左定界符
                $this->right_delimiter = "}"; //右定界符
        }
}
?>
{% endhighlight %}
根据代码中的 smarty 目录配置，需要在 application/views 中建立 templates_c\templates\cache 三个目录。
这就算创建好了。

3: 使用方法。
控制器中的代码：
{% highlight php %}
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Debug extends MY_Controller {

  function __construct()
  {
    parent::__construct();
    // Write your own initialize code
  }

    function index(){
      $this->load->library('smarty');
      $this->smarty->assign("title","smarty template");
      $this->smarty->assign("body","欢迎使用 smarty 模板引擎");
      $arr = array(1 => 'number 1', 2 => 'number 2', 3 => 'number 3');
      $this->smarty->assign("myarray", $arr);
      $this->smarty->display('index.html');
    }

}
{% endhighlight %}

模板代码：
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>smarty 模板使用示例</title>
</head>
<body>
<h1>{$title}</h1>
<p>{$body}</p>
<ul>
        {foreach from=$myarray item=v}
        <li>{$v}</li>
       {/foreach}
</ul>
</body>
</html>
```

