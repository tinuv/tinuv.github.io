---
layout: post
title: '1047 Student List for Course'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-PAT
---



# 题目
根据课程排序,输入学生的总数量,课程总量,每个学生的课程数,课程量和课程号,要求按照课程号和学生姓名的字母序排序.

# 思路
使用一个二维数组作为map,下标作为课程号,那么按顺序输出就不要排序了,只需要对名字做一遍按字母序排序即可([按字母序排序](https://tinuv.me/2019/02/18/304.html))

# 代码
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string.h>

using namespace std;


int main() {
    ios::sync_with_stdio(false);
    int m,n;
    cin>>m>>n;
    vector<vector<string>> ans;
    ans.resize(m);
    for(int i=0; i<m; i++) {
        string name;
        int cn;
        cin>>name>>cn;
        for(int j=0; j<cn; j++) {
            int cNum;
            cin>>cNum;
            ans[cNum].push_back(name);
        }
    }

    for(int i=1; i<=n; i++) {
        cout<<i<<" "<<ans[i].size()<<"\n";
        sort(ans[i].begin(),ans[i].end(),[](string s1,string s2)->bool{
            return strcmp(s1.c_str(),s2.c_str())<0;
        });
        for(int j=0; j<ans[i].size(); j++) {
            cout<<ans[i][j]<<"\n";
        }
    }
    return 0;
}

```