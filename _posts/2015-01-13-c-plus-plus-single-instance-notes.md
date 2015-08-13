---
layout: post
title: C++中实现单例
date: 2015-01-13 10:43
comments: true
categories: Development
---

data_package.h文件

      #ifndef DATA_PACKAGE_H
      #define DATA_PACKAGE_H

      #include <QObject>

      class DataPackage : public QObject
      {
          Q_OBJECT
      public:          
          static DataPackage &instance();

      signals:

      public slots:

      private:
          explicit DataPackage(QObject *parent = 0);

      };

      #endif // DATA_PACKAGE_H


data_package.cpp文件

      #include "data_package.h"
      #include <QDebug>

      DataPackage::DataPackage(QObject *parent) :
          QObject(parent)
      {
          qDebug() << "init data package";
      }

      DataPackage& DataPackage::instance()
      {
          static DataPackage _instance;
          return _instance;
      }


调用：

      DataPackage::instance();
      DataPackage::instance();


连续调用两次instance方法，发现只会示例一次。搞定。

## 参考资料

[C++ Singleton design pattern](http://stackoverflow.com/questions/1008019/c-singleton-design-pattern)