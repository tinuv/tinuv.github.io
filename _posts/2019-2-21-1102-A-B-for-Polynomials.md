---
layout: post
title: '1102 A+B for Polynomials'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-PAT
---



这个题感觉思路对上了,但对后还是没有完全对,借鉴了大神的代码
```cpp
#include <iostream>

using namespace std;

int main() {
    float c[1001] = {0};
    int m, n, t;
    float num;
    cin >> m;
    for(int i = 0; i < m; i++) {
        cin >> t >> num;
        c[t] += num;
    }
    cin >> n;
    for(int i = 0; i < n; i++) {
        cin >> t >> num;
        c[t] += num;
    }

    int cnt = 0;
    for(int i = 0; i < 1001; i++) {
        if(c[i] != 0) {
            cnt++;
        }
    }
    cout << cnt;
    for(int i = 1000; i >= 0; i--) {
        if(c[i] != 0.0) {
            cout << " ";
            printf("%d %.1f", i, c[i]);
        }
    }
    return 0;
}

```