---
layout: post
title: '1092 To Buy or Not to Buy'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-PAT
---



# 题目
判断字符串里面是否含有所有Eva要买的颜色,如果有,输出多余买的,如果欠缺Eva所需的颜色则输出缺失的颜色

# 思路
非常简单

# 代码
```cpp
#include <iostream>

using namespace std;

int main() {
    string s1;
    string s2;
    cin>>s1;
    cin>>s2;
    int shop[1000] = {0};
    int eva[1000] = {0};
    for(int i=0; i<s1.size(); i++) {
        shop[((int)s1[i])]++;
    }
    for(int i=0; i<s2.size(); i++) {
        eva[((int)s2[i])]++;
    }

    bool flag = true;
    int extra = 0,miss = 0;
    int visit[1000] = {0};
    for(int i=0; i<s2.size(); i++) {
        if(eva[((int)s2[i])]>shop[((int)s2[i])]&&visit[((int)s2[i])] == 0) {
            flag = false;
            visit[((int)s2[i])] = 1;
            miss = miss+(eva[((int)s2[i])]-shop[((int)s2[i])]);
        }
    }
    if(flag) {
        cout<<"Yes "<<s1.size()-s2.size();
    } else {
        cout<<"No "<<miss;
    }
    return 0;
}

```