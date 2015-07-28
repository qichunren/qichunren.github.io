---
layout: post
title: 在QT5中使用JSON库json-c
date: 2015-7-13 12:30
comments: true
categories: Development
---

首先需要安装json-c库:

    sudo apt-get install libjson-c-dev


在QT的项目中，修改.pro文件，加入：
    
    CONFIG += link_pkgconfig
    PKGCONFIG += json-c
    
上代码：


            #include <json/json.h>
            
            /*Creating a json object*/
            json_object * jobj = json_object_new_object();

            /*Creating a json string*/
            json_object *jstring = json_object_new_string("Joys of Programming");

            /*Creating a json integer*/
            json_object *jint = json_object_new_int(10);

            /*Creating a json boolean*/
            json_object *jboolean = json_object_new_boolean(1);

            /*Creating a json double*/
            json_object *jdouble = json_object_new_double(2.14);

            /*Creating a json array*/
            json_object *jarray = json_object_new_array();

            /*Creating json strings*/
            json_object *jstring1 = json_object_new_string("c");
            json_object *jstring2 = json_object_new_string("c++");
            json_object *jstring3 = json_object_new_string("php");

            /*Adding the above created json strings to the array*/
            json_object_array_add(jarray,jstring1);
            json_object_array_add(jarray,jstring2);
            json_object_array_add(jarray,jstring3);
            json_object_array_add(jarray,jstring4);

            /*Form the json object*/
            /*Each of these is like a key value pair*/
            json_object_object_add(jobj,"Site Name", jstring);
            json_object_object_add(jobj,"Technical blog", jboolean);
            json_object_object_add(jobj,"Average posts per day", jdouble);
            json_object_object_add(jobj,"Number of posts", jint);
            json_object_object_add(jobj,"Categories", jarray);

            /*Now printing the json object*/
            printf ("The json object created: %sn",json_object_to_json_string(jobj));    
            
            
程序结果是：

      The json object created: { "Site Name": "Joys of Programming", "Technical blog": true, "Average posts per day": 2.140000, "Number of posts": 10, "Categories": [ "c", "c++", "php" ] }n/            
    
    
    
    
