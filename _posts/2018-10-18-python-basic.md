---
layout: post
title: 'Python基础知识'
subtitle: ''
date: 2018-10-18
categories: Python
cover: ''
tags: Python Python-自带组件 Python-语言技巧
---
# 基础知识
* Python编码

  Python默认编码是ASCII,没修改编码时会报错,解决方法是在开头加上`#coding:utf-8`或者`_*_coding=utf-8_*_`
* 成员的访问权限
  带下划线`_`的成员是私有成员,如`_var`,`_init_`是默认构造函数. 

* Python中的逻辑运算用关键字`and`,`or`,`not`运算而不是通用的`&&`,`||`


* `list`列表类型

    十分强大,元素可以是任意的数据类型,甚至可以不同的数据元素混搭,可以通过索引来访问里面的元素,通过`len()`函数来得到数据的长度,还可以用负数从尾来访问元素,但要注意一点,从正数访问,索引是从`0`开始的,而倒数访问是从`-1`开始 的,`-1`代表数组最后一个数,`-2`代表数组倒数第二个数,依次类推.还有一些数据操作的方方法:
    
    * 声明一个空的list
    ```python
    my_list = []
    ```

    * 在后面追加元素
    ```python
    my_list.appead("tinuv")
    ```
    * 插入数据
    ```python
    my_list.insert(2,"tinuv")
    ```
    * 删除最后一个元素
    ```python
    my_list.pop()
    ```
    * 删除指定位置的元素,其中参数是索引位置
    ```python
    my_list.pop(i)
    ```

* `tuple`元组类型

    元组类型与`list`类型相似,只不过他是一旦初始化就不可变的,因此没有`insert()`,`pop()`和`appead()`,也不可以赋值替换其中一个元素的值
    
    * 元组的声明
    ```python
    my_tuple = ()
    ```
    
    * 注意事项:如果元组只有一个元素,必须加一个逗号
    ```python
    my_tuple = (1,)
    ```
# 迭代器
## 介绍
在Python中有两种迭代对象`Iterable`和`Iterator`,`Iterable`可用for循环迭代,而`Iterator`可用`next()`函数迭代

## `Iterable`可迭代对象
可用`isinstance()`来判断是否是`Iterable`可迭代对象
```python
from collections import Iterable

i = isinstance("tinuv",Iterable)
print(i)
```

## 常见的`Iterable`可迭代对象
* 集合数据类型:`list`,`tuble`,`dict`,`str`,`set`
* 生成器对象


## `Iterator`迭代器对象
`Iterator`对象是一种惰性计算序列,不能提前知道长度,只能不断计算直到抛出`StopIteration`异常
同样可以通过`isinstance()`来判断是否是`Iterator`对象
```python
from collections import Iterator

i = (x for x in range(1,9))
q = isinstance(i,Iterator)
print(q)
```

## 常见的`Iterator`对象
生成器(generator)都是`Iterator`但集合数据类型不是`Iterator`

## 由`Iterable`对象变为`Iterator`对象
使用`iter()`函数
如:
```python
from collections import Iterator
from collections import Iterable

my_name = "tinuv"
p = isinstance(my_name,Iterable)
print(p)
my_name = iter(my_name)
p = isinstance(my_name,Iterator)
print(p)
```
输出两个都是`True`

# 生成器
## 介绍
生成器是我在其他语言每怎么接触过的东西,所以要好好说一说.`通过列表生成式，我们可以直接创建一个列表。但是，受到内存限制，列表容量肯定是有限的。而且，创建一个包含100万个元素的列表，不仅占用很大的存储空间，如果我们仅仅需要访问前面几个元素，那后面绝大多数元素占用的空间都白白浪费了。`这个例子我觉得说得很好,生成器保存的是一个算法,通过算法来推算出值,这根矢量图和位图的关系是差不多的,但局限也在这里,因为不可能永远能找到得一个函数或者说算法来刻画一个模型.


## 使用
生成器的使用很简单,类似于列表生成式,只是把中括号变为小括号

如
```python
my_generator = (x*x for x in range(3,10))
print(next(my_generator))
```
用`next()`方法返回下一个计算的值
当然也可以用迭代的方式
```python
my_generator = (x*x for x in range(3,10))
for n in my_generator:
    print(n)
```

## 另外一种定义的generator的方法
用第一种定义generator的局限性实在是太大了,用定义函数的方法能解决大部分的问题,在定义函数的时候要加入关键字`yield`,返回的是一个`generator`,那么这个函数的执行过程与普通函数的执行过程有什么不同呢,这里引用`廖雪峰老师`的总结

>这里，最难理解的就是generator和函数的执行流程不一样。函数是顺序执行，遇到return语句或者最后一行函数语句就返回。而变成generator的函数，在每次调用next()的时候执行，遇到yield语句返回，再次执行时从上次返回的yield语句处继续执行。

再引用`廖雪峰老师`的一个例子,我觉得这个例子对说明这句话的含义有很大的表现力

```python
def odd():
    print('step 1')
    yield 1
    print('step 2')
    yield(3)
    print('step 3')
    yield(5)
```

返回
```python
>>> o = odd()
>>> next(o)
step 1
1
>>> next(o)
step 2
3
>>> next(o)
step 3
5
>>> next(o)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```
再写一个例子
斐波那契shulie
```python
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'

if __name__ == '__main__':
    my_generator = fib(5)
    print(next(my_generator))
    print(next(my_generator))
    print(next(my_generator))
    print(next(my_generator))
```

# 列表生成式
#### 第一种列表生成式

`list(range(start,end))`返回一个list列表
要注意的是列表从`start`开始包括`start`(`start`不是下标而是自然的序号),结束于`end`但不包括`end`,他是一个前闭后开的区间.

比如
```python
my_list = list(range(3,10))
print(my_list)
```
形成的列表是这样的
```
[3, 4, 5, 6, 7, 8, 9]
```

#### 比较高级的列表生成式(带有`for`循环的表达式)
这个不好描述,但用起来是非常舒服的

用这种方式实现的示例:
```python
my_list = [x for x in range(3,10)]
print(my_list)
```
结果是一样的
```
[3, 4, 5, 6, 7, 8, 9]
```
这种方式更大的优点在于可以实现筛选功能
如
```python
my_list = [x for x in range(3,10) if x%2==0]
print(my_list)
```
上例可以筛选出偶数

还可以实现简单的处理功能

如
```python
my_list = [x*x for x in range(3,10)]
print(my_list)
```
上例中返回了x的平方
# 切片操作(`Slice`)
切片操作是为了增强取元组`tuple`或者列表`list`部分元素的便利性而设计的,使用一个切片操作符`:`,这个操作符在很多数据处理软件都有.表示从某一个`索引值`开始到某一`索引值`结束,但不包括最后一个数,如`my_list[3:6]`表示从索引的`3`开始(包括3)到6(不包括6),是一个左闭右开区间.

如果是从0开始的可以将0省略如`my_list[0:3]`与`my_list[:3]`是等价的

它同样支持倒数切片(因为`list`和`tuple`支持倒数索引)如`my_list[-3:-1]`

但要注意的是切片只支持正的切片,也就是说必须索引从小到大,不支持从大到小切片

字符串也可看成是一个列表,因此也可以对字符串进行切片操作

如以下程序:
```python
#coding:utf-8;
my_list = ["tinuv","deng","hui"]
# my_list[0:2]表示选择从0到2但不包括2
print(my_list[0:2])
```

会输出以下结果

```
['tinuv','deng']
```

# 介绍
这里的偏函数可不是高数里面的偏函数,他是通过设置参数的默认值降低函数调用的难度,如果是Java的话你不得不针对不同的参数写一堆不同的重载函数.

# 举个栗子
当在python中使用`int`函数将字符串转化成整型,默认是转化成十进制的
```python
a = int("145")
print(a)
```

但其实他还有个参数可以控制进制
如转化成二进制
```python
a = int('10101011', base=2)
print(a)
```

# 定义一个默认为二进制转十进制的函数
```python
def int2(x,base = 2):
    return int(x,base)

a = int2('10101011')
print(a)
```

# 使用python的`functools.partial`包创建偏函数
```java
from functools import partial


int2 = partial(int,base = 2)
a = int2('10101011')
print(a)
```

#### 介绍
高阶函数不仅可以把函数作为参数,还可以返回函数,在这里我嗅到了浓浓的自定义高阶函数的味道,就是像map那样的函数,我不知道Python可不可以,但我猜是可以的,到底可不可以这里不做探究,以后再说吧
#### 使用
因为我不太熟悉,我就借用廖雪峰老师的例子吧,好吧,为自己找了个借口

通常实现数组求和是这样的

```python
def sum_list(list):
    s = 0
    for n in list:
        s = s+n
    return s

if __name__ == '__main__':
    my_list = [1,2,3,4,5]
    s = sum_list(my_list)
    print(s)
```

但如果现在不求和以后根据需要再求怎么办,那就返回函数

```python
def sum_list(list):
    def sum_later():
        s = 0
        for n in list:
            s = s+n
        return s
    return sum_later

if __name__ == '__main__':
    s = sum_list([1,2,3,4,5])
    print(s())
```

##### 值得注意的地方(踩了一个坑)
在放回函数的时候千万不能返回函数,否则相当于调用了内部的这个函数
```python
def sum_list(list):
    def sum_later():
        s = 0
        for n in list:
            s = s+n
        return s
    return sum_later # 返回不能带括号
```

#### 说明
* 当我们调用了`sum_list()`这个函数是返回的是一个函数,这个函数就是`sum_later()`
* 调用完`sum_list()`之后调用`sum_later()`后才是执行求和函数,因为内部函数使用了`sum_list()`的参数
* 在这个例子中,在`sum_list()`函数又定义了一个内部函数`sum_later()`,这个内部函数可以引用父函数的参数和局部变量并保存在这个内部函数中,这种程序结构称为闭包.

#### 闭包
另一个需要注意的问题是，返回的函数并没有立刻执行，而是直到调用了f()才执行。我们来看一个例子

```python
def count():
    fs = []
    for i in range(1, 4):
        def f():
             return i*i
        fs.append(f)
    return fs


if __name__ == '__main__':
    f1,f2,f3 = count()
    print(f1())
    print(f2())
    print(f3())
```

第一眼看可能的结果是`1`,`4`,`9`,的确我也是这样觉得的但是实际的结果却是
```python
9
9
9
```

原因在于它并不立即执行,而是在返回时才会引用变量`i`,这是变量`i`已经变为了`3`

##### 注意
返回闭包时牢记一点：返回函数不要引用任何循环变量，或者后续会发生变化的变量.


#### 解决办法
如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变：

```python
def count():
    def f(j):
        def g():
            return j*j
        return g
    fs = []
    for i in range(1, 4):
        fs.append(f(i)) # f(i)立刻被执行，因此i的当前值被传入f()
    return fs
```