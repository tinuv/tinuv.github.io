---
layout: post
title: '小结(三)'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-语言技巧
---



# 在控制台上得到一行有空格的字符串
字符串输入大多数可以使用cin来解决,但有一种例外,因为cin默认使用空格或者是换行来标记一次输入,当输入的字符串具有空格是,cin就无法解决了,这是需要使用getline()来解决

# 代码
```cpp
#include <iostream>

using namespace std;

int main() {
    int n;
    scanf("%d\n",&n);
    string s[100];
    for(int i=0; i<n; i++) {
        getline(cin,s[i]);
    }
    cout<<"\n";
    for(int i=0; i<n; i++) {
        cout<<s[i]<<"\n";
    }
    return 0;
}
```