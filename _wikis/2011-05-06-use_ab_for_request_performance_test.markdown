---
title: 使用ab进行http性能测试
---
ab的全称是ApacheBench，是 Apache 附带的一个小工具，专门用于 HTTP Server 的benchmark testing，可以同时模拟多个并发请求。


    usermatoMacBook-Pro:qichunren.github.com qichunren$ ab -n 200 -c 10 http://qichunren.github.com/
    This is ApacheBench, Version 2.3 <$Revision: 655654 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
    Licensed to The Apache Software Foundation, http://www.apache.org/

    Benchmarking qichunren.github.com (be patient)
    Completed 100 requests
    Completed 200 requests
    Finished 200 requests


    Server Software:        nginx/0.7.67
    Server Hostname:        qichunren.github.com
    Server Port:            80

    Document Path:          /
    Document Length:        6035 bytes

    Concurrency Level:      10
    Time taken for tests:   17.831 seconds
    Complete requests:      200
    Failed requests:        0
    Write errors:           0
    Total transferred:      1263400 bytes
    HTML transferred:       1207000 bytes
    Requests per second:    11.22 [#/sec] (mean)
    Time per request:       891.560 [ms] (mean)
    Time per request:       89.156 [ms] (mean, across all concurrent requests)
    Transfer rate:          69.19 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:      268  285 141.9    275    2281
    Processing:   556  587  48.3    574     859
    Waiting:      275  297  46.9    284     569
    Total:        830  872 149.8    850    2867

    Percentage of the requests served within a certain time (ms)
      50%    850
      66%    857
      75%    861
      80%    866
      90%    877
      95%    952
      98%   1086
      99%   1134
     100%   2867 (longest request)
    usermatoMacBook-Pro:qichunren.github.com qichunren$