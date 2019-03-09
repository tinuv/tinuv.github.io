---
layout: post
title: '1106 Sign In and Sign Out'
subtitle: ''
date: 2019-2-21
categories: 数据结构与算法
cover: ''
tags: 数据结构与算法 数据结构与算法-PAT
---



[题目链接](https://pintia.cn/problem-sets/994805342720868352/problems/994805516654460928)
```CPP
#include <iostream>
#include <map>
#include <algorithm>
#include <string>

using namespace std;

struct t {
    string id;
    float timein;
    float timeout;
} people[1000];

int main() {
    string id[1000];
    int rn;
    cin >> rn;
    for(int i = 0; i < rn; i++) {
        cin >> people[i].id;
        string signin, signout;
        cin >> signin >> signout;
        string secondin = signin.substr(6, 2);
        string minin = signin.substr(3, 2);
        string hourin = signin.substr(0, 2);
        float timein = ((atoi(signin.substr(6, 2).c_str()) / 60.0) + atoi(signin.substr(3, 2).c_str())) / 60.0 + atoi(signin.substr(0, 2).c_str());
        float timeout = ((atoi(signout.substr(6, 2).c_str()) / 60.0) + atoi(signout.substr(3, 2).c_str())) / 60.0 + atoi(signout.substr(0, 2).c_str());
        people[i].timein = timein;
        people[i].timeout = timeout;
    }
    sort(people, people + rn, [](t a, t b)->bool {
        return a.timein < b.timein;
    });
    cout << people[0].id << " ";
    sort(people, people + rn, [](t a, t b)->bool {
        return a.timeout > b.timeout;
    });
    cout << people[0].id;

    return 0;
}

```