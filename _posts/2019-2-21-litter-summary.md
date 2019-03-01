---
layout: post
title: 'Python使用小结'
subtitle: ''
date: 2019-2-21
categories: Python
cover: ''
tags: Python
---

# 列出一个文件夹的全部文件
```python
import os

for file in os.listdir("t"):
    do something...
```

# 清除一个文本文件的内容

```python
    f.seek(0)
    f.truncate()
```

# 文件重命名

```python
os.rename("t/" + str(file) + "", "t/2019-2-21-" + str(quote(str(file[0:-3]))) + ".md")
```