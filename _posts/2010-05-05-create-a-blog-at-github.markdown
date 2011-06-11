---
layout: post
title: Create a blog at github
meta-keywords: git,github   
tags:
- github
---

First ,of course you must have an account at github.
 assume your loign id at github is "xiaofeiren",
Then create a new repost at github called "xiaofeiren.github.com"

Now in your pc(Linux platform,and git)
{% highlight bash %}
mkdir xiaofeiren.github.com
cd xiaofeiren.github.com
git init
touch README
touch index.html
echo "This is my git blog" >> index.html
git add README
git commit -m 'first commit'
git remote add origin git@github.com:xiaofeiren/xiaofeiren.github.com.git
git push origin master
{% endhighlight %}

Now, your can visit http://xiaofeiren.github.com, this is your github blog home-url.

