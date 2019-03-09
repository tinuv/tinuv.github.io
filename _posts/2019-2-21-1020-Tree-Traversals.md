---
layout: post
title: '1020 Tree Traversals'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-PAT
---



# 题目
[题目链接](https://pintia.cn/problem-sets/994805342720868352/problems/994805485033603072)
1020 Tree Traversals （25 分）


Suppose that all the keys in a binary tree are distinct positive integers. Given the postorder and inorder traversal sequences, you are supposed to output the level order traversal sequence of the corresponding binary tree.

Input Specification:


Each input file contains one test case. For each case, the first line gives a positive integer N (≤30), the total number of nodes in the binary tree. The second line gives the postorder sequence and the third line gives the inorder sequence. All the numbers in a line are separated by a space.

Output Specification:


For each test case, print in one line the level order traversal sequence of the corresponding binary tree. All the numbers in a line must be separated by exactly one space, and there must be no extra space at the end of the line.

Sample Input:

7

2 3 1 5 7 6 4

1 2 3 4 5 6 7

Sample Output:

4 1 6 3 5 7 2

# 思路
由一个后序序列和一个中序序列退出层次序列.首先根据中序序列和后续序列建立一颗数组表示的树,其实这颗树是一颗不完整的树,没有节点的位置没有,根据index的值记录了有节点的值,然后排序(想想二叉树的数组表示法,顺序输出天然就是层次输出,这里接用这个思想)

# 代码
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;


struct node {
    int index;
    int value;
};
vector<node> result;

void sp(int *ps,int *is,int n,int index) {
    if(n==0) {
        return;
    }
    result.push_back({index,ps[n-1]});
    int ileft[100];
    int iright[100];
    int pleft[100];
    int pright[100];
    int flag = -1;
    int lcnt = 0;
    int rcnt = 0;
    for(int i=0; i<n; i++) {
        if(is[i]==ps[n-1]) {
            flag = i;
            continue;
        }
        if(flag==-1) {
            ileft[i] = is[i];
            pleft[i] = ps[i];
            lcnt++;
        } else {
            iright[rcnt] = is[i];
            pright[rcnt] = ps[i-1];
            rcnt++;
        }
    }
    sp(pleft,ileft,lcnt,index*2+1);
    sp(pright,iright,rcnt,index*2+2);
}


int main() {
    int n,ps[100],is[100];
    cin>>n;
    for(int i=0; i<n; i++)
        cin>>ps[i];
    for(int i=0; i<n; i++)
        cin>>is[i];
    sp(ps,is,n,0);
    sort(result.begin(),result.end(),[](node n1,node n2)->bool{return n1.index<n2.index;});
    for(int i=0; i<result.size(); i++) {
        if(i!=result.size()-1)
            cout<<result[i].value<<" ";
        else
            cout<<result[i].value;
    }
    return 0;
}

```