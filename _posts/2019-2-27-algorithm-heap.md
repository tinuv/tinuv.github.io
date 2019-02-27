---
layout: post
title: 'C++学习_算法_九(三)'
subtitle: ''
date: 2019-2-27
categories: C++
cover: ''
tags: C++ PAT
---


# make_heap()建堆

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    int seq[5] = {10,20,30,5,15};
    make_heap(seq,seq+5);
    for(int i=0; i<5; i++) {
        cout<<seq[i]<<" ";
    }
}
```
默认建大根堆,也可建小根堆

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    int seq[5] = {10,20,30,5,15};
    make_heap(seq,seq+5,[](int a,int b)->bool{
        return a>b;
    });
    for(int i=0; i<5; i++) {
        cout<<seq[i]<<" ";
    }
}
```

# pop_heap()出堆

出堆就是将根节点出堆,出堆后会自动建堆,所以需要一个lambda函数来进行cmp

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main() {
    vector<int> seq = {10,20,30,5,15};
    make_heap(seq.begin(),seq.end(),[](int a,int b)->bool{
        return a>b;
    });
    for(int i=0; i<seq.size(); i++) {
        cout<<seq[i]<<" ";
    }
    cout<<"\n";
    pop_heap(seq.begin(),seq.end(),[](int a,int b)->bool{
        return a>b;
    });
    seq.pop_back();
    for(int i=0; i<seq.size(); i++) {
        cout<<seq[i]<<" ";
    }

}

```

结果:  
```cpp
5 10 30 20 15
10 15 30 20
```

# push_back()进堆

进入元素后在建堆

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main() {
    vector<int> seq = {10,20,30,5,15};
    make_heap(seq.begin(),seq.end(),[](int a,int b)->bool{
        return a>b;
    });
    for(int i=0; i<seq.size(); i++) {
        cout<<seq[i]<<" ";
    }
    cout<<"\n";
    seq.push_back(100);
    push_heap(seq.begin(),seq.end(),[](int a,int b)->bool{
        return a>b;
    });
    for(int i=0; i<seq.size(); i++) {
        cout<<seq[i]<<" ";
    }

}

```

结果:  
```cpp
5 10 30 20 15
5 10 30 20 15 100
```

# sort_heap()堆排序

序列必修是一个堆,堆采用什么cmp函数,sort_heap()就必须采用什么cmp函数

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main() {
    vector<int> seq = {10,20,30,5,15};
    make_heap(seq.begin(),seq.end(),[](int a,int b)->bool{
        return a<b;
    });
    for(int i=0; i<seq.size(); i++) {
        cout<<seq[i]<<" ";
    }
    cout<<"\n";
    sort_heap(seq.begin(),seq.end(),[](int a,int b)->bool{
        return a<b;
    });
    for(int i=0; i<seq.size(); i++) {
        cout<<seq[i]<<" ";
    }

}

```

结果:  

```cpp
30 20 10 5 15
5 10 15 20 30
```

# is_heap()判断是否是一个堆

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main() {
    vector<int> seq = {10,20,30,5,15};
    make_heap(seq.begin(),seq.end(),[](int a,int b)->bool{
        return a<b;
    });
    for(int i=0; i<seq.size(); i++) {
        cout<<seq[i]<<" ";
    }
    cout<<"\n";
    bool a = is_heap(seq.begin(),seq.end());
    cout<<a;

}

```

# is_heap_until()找到序列中第一个不符合堆的元素

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int main() {
    vector<int> seq = {10,20,30,5,15};
    make_heap(seq.begin(),seq.end(),[](int a,int b)->bool{
        return a<b;
    });
    seq[3] = 50;
    for(int i=0; i<seq.size(); i++) {
        cout<<seq[i]<<" ";
    }
    cout<<"\n";
    auto a = is_heap_until(seq.begin(),seq.end());
    cout<<a-seq.begin();

}

```

