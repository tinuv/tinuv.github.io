---
layout: post
title: '小结(四)按字母序排序'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-语言技巧
---



在 C/C++ 中有一个便捷的方式(配合 sort() )能快速实现按字母序排序,那就是 strcmp() ,相等时返回 0 ,不相等时返回 -1 或 1 ,头文件是<string.h>,值得注意的是比较的字符串必须按 c 模式的(也就是字符数组), c++ 的字符串可以使用 c_str() 方法转化为c模式的字符串.

```cpp
sort(ans[i].begin(),ans[i].end(),[](string s1,string s2)->bool{
            return strcmp(s1.c_str(),s2.c_str())<0;
        });
```