---
layout: post
title: '堆排序'
subtitle: ''
date: 2019-2-27
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 排序
---

# 堆的基本概念

堆是将一个序列看成完全二叉树,意思就是说将一个序列看成是二叉树的顺序结构,而且这个顺序结构没有空节点,常见的考法是判断一个序列是否是一个堆(大根堆或小根堆),大根堆和小根堆的定义如下:

* 小根堆 : 所有的根节点小于所有子节点(如果子节点存在),即$K[i]\leq K[2*i]$且$K[i]\leq K[2*i+1]$
* 大根堆 : 所有的根节点大于所有子节点(如果子节点存在),即$K[i]\geq K[2*i]$且$K[i]\geq K[2*i+1]$


# 堆排序

## 调整算法

堆排序实际上是不断将一个堆上的根结点弹出,因为根节点总是最大的或者最小的,只要弹出后不断建成新的堆即可,建堆时间利用的就是调整算法.调整算法有如下特点:  
* 从第一个非叶子节点开始调整
* 如果调整的非叶子节点的子节点也是非叶子节点,那么子树还要调整,因为调整后可能破环子树的堆状态.

代码:  

```cpp
void sift(int *seq,int low,int high) {
    int i = low;
    int j = 2*i;
    int temp = seq[i];
    while(j<=high) {
        if(j<high&&seq[j]<seq[j+1]) {
            j = j+1;
        }
        if(temp<seq[j]) {
            seq[i] = seq[j];
            i = j;
            j = 2*i;
        } else {
            break;
        }
    }
    seq[i] = temp;
}
```

## 排序算法

堆排序算法示例:

```cpp
#include <iostream>

using namespace std;

void sift(int *seq,int low,int high) {
    int i = low;
    int j = 2*i;
    int temp = seq[i];
    while(j<=high) {
        if(j<high&&seq[j]<seq[j+1]) {
            j = j+1;
        }
        if(temp<seq[j]) {
            seq[i] = seq[j];
            i = j;
            j = 2*i;
        } else {
            break;
        }
    }
    seq[i] = temp;
}

int main() {
    int seq[10] = {6,8,7,9,0,1,3,2,4,5};
    for(int i=4; i>=0; i--) {
        sift(seq,i,9);
    }
    for(int i=0; i<10; i++) {
        cout<<seq[i]<<" ";
    }
    cout<<"\n";
    for(int i=0; i<10; i++) {
        cout<<seq[0]<<" ";
        seq[0] = seq[9-i];
        sift(seq,0,9-i);
    }

}
```