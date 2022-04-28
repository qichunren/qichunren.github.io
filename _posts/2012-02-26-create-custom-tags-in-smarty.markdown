---
layout: single
title: "Create custom tags in Smarty 3"
date: 2012-02-26 14:21
comments: true
categories: php
---

接着上一篇，还是来说说 PHP 模板引擎 Smarty。PHP 的众多 CMS 框架，如 DEDE CMS，对于前端展示都是有一套自己开发的标签，用于显示管理后台维护的数据。在 DEDECMS 中，如下的代码

```
<h2>最近新闻</h2>
<ul>
    {dede:arclist typeid='1' row='10'}
    <li>[field:textlink/]</li>
    {/dede:arclist}
</ul>
```

就可以显示最近 type id 为 1 的 10 条新闻。在 Smarty 中创建属于自己的标签是很容易的，我之前在网络上搜索的关于创建 smarty 标签的内容大多数都是基于 Smarty2 的，我基于 Smarty3 中的 plugins 目录的代码了解到在 Smarty3 中创建自定义标签更为简单直观。

在 smarty 程序包的 plugins 目录中，可以看到有 block \ function \ modifier 等几种前缀的 php 文件。像 block 前缀的 php 文件可以创建闭合的标签，就如上文提到的那个 dede cms 新闻标签的例子。现在我正是要创建这样类型的标签。

我结合 CodeIgniter 来说明，我现在创建一个用户列表的标签，可以显示最近注册的用户。
在 smarty 的 plugins 目录中创建的文件会自动被 smarty 加载而识别的，文件名和其中的 function 名称需要特定的约定好的格式。
我现在想创建一个 users 标签，还有一个 limit 参数，用来显示取多少条数据

```
用户列表：
<ul>
    <{users limit='3'}>
        <li><{$user->login}></li>
    <{/users}>
</ul>
```

那么文件名就应该指定为 block.users.php，然后 function 应该命名为 smarty_block_users：

```
<?php
function smarty_block_users($params, $content, $smarty, &$repeat){
    if (empty($content)){
        if (empty($params['limit'])) {
            $limit = 10;
        } else {
            $limit = $params['limit'];
        }
        $CI =& get_instance();
        $GLOBALS['users'] = $CI->db->query("select * from users order by created_at desc limit $limit")->result();
    }
    if(isset($GLOBALS['users']) != NULL && count($GLOBALS['users'])>0){
        $user = array_shift($GLOBALS['users']);
        $smarty->assign('user', $user);
        if (count($GLOBALS['users']) == 0){
            unset($GLOBALS['users']);
            $repeat = false;
        }
        $repeat = true;
    }else {
        $repeat = false;
    }

    return $content;
}
?>
```

这个 function 中有四个参数，$params 参数存储的是标签中的属性信息，如上面的 limit。$content 是标签中间的内容，$smarty 是 smarty 的实例对象，$repeat 用于指定 block 是否重复执行。
解释完了 function 的参数，我想其中的执行原理应该很容易看明白了吧。