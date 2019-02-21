---
layout: post
title: '1007 Maximum Subsequence Sum'
subtitle: ''
date: 2019-2-21
categories: PAT C++
cover: ''
tags: PAT C++
---



这道题用到了动态规划算法,感觉第三题都会用到点动态规划算法再加一点扩展,要好好学习动态规划算法

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    int leftindex = 0, rightindex = n - 1, sum = -1, temp = 0, tempindex = 0;
    for (int i = 0; i < n; i++) {
        cin >> v[i];
        temp = temp + v[i];
        if (temp < 0) {
            temp = 0;
            tempindex = i + 1;
        } else if (temp > sum) {
            sum = temp;
            leftindex = tempindex;
            rightindex = i;
        }
    }
    if (sum < 0)
        sum = 0;
    cout << sum << " " << v[leftindex] << " " << v[rightindex];
    return 0;
}

```