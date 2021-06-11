---
layout: single
title: "Create custom tags in Smarty 3"
date: 2012-02-26 14:21
comments: true
categories: php
---

接着上一篇，还是来说说PHP模板引擎Smarty。PHP的众多CMS框架，如DEDE CMS，对于前端展示都是有一套自己开发的标签，用于显示管理后台维护的数据。在DEDECMS中，如下的代码

```
<h2>最近新闻</h2>
<ul>
    {dede:arclist typeid='1' row='10'}
    <li>[field:textlink/]</li>
    {/dede:arclist}
</ul>
```

就可以显示最近type id为1的10条新闻。在Smarty中创建属于自己的标签是很容易的，我之前在网络上搜索的关于创建smarty标签的内容大多数都是基于Smarty2的，我基于Smarty3中的plugins目录的代码了解到在Smarty3中创建自定义标签更为简单直观。

在smarty程序包的plugins目录中，可以看到有block \ function \ modifier 等几种前缀的php文件。像block前缀的php文件可以创建闭合的标签，就如上文提到的那个dede cms新闻标签的例子。现在我正是要创建这样类型的标签。

我结合CodeIgniter来说明，我现在创建一个用户列表的标签，可以显示最近注册的用户。
在smarty的plugins目录中创建的文件会自动被smarty加载而识别的，文件名和其中的function 名称需要特定的约定好的格式。
我现在想创建一个users标签,还有一个limit参数，用来显示取多少条数据

```
用户列表：
<ul>
    <{users limit='3'}>
        <li><{$user->login}></li>
    <{/users}>
</ul>
```

那么文件名就应该指定为block.users.php，然后function应该命名为smarty_block_users：

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

这个function中有四个参数，$params参数存储的是标签中的属性信息，如上面的limit。$content是标签中间的内容，$smarty是smarty的实例对象，$repeat用于指定block是否重复执行。
解释完了function的参数，我想其中的执行原理应该很容易看明白了吧。