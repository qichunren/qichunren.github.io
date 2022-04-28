---
layout: single
title: "Fixed a problem with creating texture background in cocos2d"
date: 2012-06-03 22:01
comments: true
categories: [ios, cocos2d, game-dev]
---

我尝试在 cocos2d 游戏中使用小图片重复平铺的方式来创建游戏背景时，总是遇到这个问题，报错如下：

```
Terminating app due to uncaught exception 'NSInternalInconsistencyException', reason: 'GL_CLAMP_TO_EDGE should be used in NPOT dimensions'
```

我的代码是这样的：

```
CCSprite *wall = [CCSprite spriteWithFile:@"pattern1.png" rect:CGRectMake(0, 0, 320, 480)];
wall.anchorPoint = ccp(0,0);
[self addChild:wall z:-1 tag:111];
ccTexParams params = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT};
//ccTexParams params = {GL_LINEAR,GL_LINEAR,GL_CLAMP_TO_EDGE, GL_CLAMP_TO_EDGE};
[wall.texture setTexParameters:&params];
```

我运行 cocos2d 项目的测试例子，却发现它的例子是工作正常的，百思不得其解啊。然后我看到它代码的注释中写着：

```
// The .png image MUST be power of 2 in order to create a continue effect.
// eg: 32x64, 512x128, 256x1024, 64x64, etc..
```

我想可能是我的图片尺寸不符合规格，检查了一下，果然发现纹理图片的不是 2 的次方的正方形。

*总结，使用小图片重复平铺来创建背景纹理图片的小图片尺寸必须设置成 2 的 n 次方的正方形大小。*