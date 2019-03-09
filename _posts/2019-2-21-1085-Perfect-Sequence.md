---
layout: post
title: '1085 Perfect Sequence'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-PAT
---



# 题目
寻找一个最长的子序列,使子序列满足所谓的完美序列,即
```math
M \leq m\times p 
```
其中M是序列中的最大值,m是序列中的最小值,p是参数.


# 思路
一开始我以为最长的序列就一定是最小值是第一个,然后找到最大值就行了,但其实最小值可以是后面的,从最小值开始,找到最大值为止,算出长度最大的即可.

# 代码
```cpp
#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    int n;
    long long p;
    long long seq[100010];
    cin>>n>>p;
    for(int i=0; i<n; i++)
        cin>>seq[i];
    sort(seq,seq+n);
    int result = 0;
    int temp = 0;
    for(int i=0; i<n; i++) {
        for(int j=i+result; j<n; j++) {
            if(seq[j]<=seq[i]*p) {
                temp = j-i+1;
                if(temp>result) {
                    result = temp;
                }
            } else {
                break;
            }
        }
    }
    cout<<result;
    return 0;
}

```