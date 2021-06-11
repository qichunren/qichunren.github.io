---
layout: single
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

构建JSON的方法如下    


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

      The json object created: { "Site Name": "Joys of Programming", "Technical blog": true, "Average posts per day": 2.140000, "Number of posts": 10, "Categories": [ "c", "c++", "php" ] }
      
解析JSON字符串的方法如下

例如有如下的字符串

```
{"column":["symbol","name"],"data":[["SZ000001","平安银行"],["SZ000005","世纪星源"],["SZ000006","深振业A"],["SZ000008","神州高铁"],["SZ000009","中国宝安"]],"count":1544.0}      
```
                
                
    QByteArray json_content_arr = network_reply->readAll();
    const char *json_content = json_content_arr.constData();
    puts("Sync from xueqiu");

    struct json_tokener *tokener;
    struct json_object *json_root, *data_array_child, *stock_item_child, *stock_code_child, *stock_name_child;

    tokener = json_tokener_new();
    json_root = json_tokener_parse_ex(tokener, json_content, strlen(json_content));
    json_tokener_free(tokener);
    if(json_root == NULL) {
        return;
    }
    json_object_object_get_ex(json_root, "data", &data_array_child);
    if(data_array_child != NULL) {


        FILE *f = fopen("/home/qichunren/logs.txt", "a+");
        if (f == NULL) {
            printf("Error opening file!\n");
            return;
        }
            int array_len = json_object_array_length(data_array_child);
            printf("stock length %d\n", array_len);
            for(int i=0;i<array_len;i++) {
                stock_item_child = json_object_array_get_idx(data_array_child, i);
                if(stock_item_child == NULL) {
                    continue;
                }
                stock_code_child = json_object_array_get_idx(stock_item_child, 0);
                stock_name_child = json_object_array_get_idx(stock_item_child, 1);
                if(stock_code_child != NULL && stock_name_child != NULL) {
                    const char *stock_code = json_object_get_string(stock_code_child);
                    const char *stock_name = json_object_get_string(stock_name_child);
                    fprintf(f, "%s %s\r\n", stock_code, stock_name);
                }
            }
            fclose(f);
    }
    //qDebug() << json_content_arr;
    network_reply->deleteLater();
    
    
    
    
