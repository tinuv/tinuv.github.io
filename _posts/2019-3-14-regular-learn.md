---
layout: post
title: 'Java正则表达式简单学习'
subtitle: ''
date: 2019-3-13
categories: Android
cover: ''
tags: Android Android-Java Android-Java-语言技巧
---
# 与正则表达式相关的类

## Pattern类

Pattern 模式,代表匹配的模式,Pattern没有公共的构造方法,只有一个私有的构造方法

```java
private Pattern(String p, int f)
```

通常使用静态方法`compile()`来生成一个Pattern对象

```java
public static Pattern compile(String regex)
```

`compile()`方法的参数就是一个正则表达式,正则表达式待会再说.

## Matcher类

Matcher直译为匹配者,Matcher类也没有公共的构造方法,默认的构造方法,不能被外面的包访问,因此通常情况下不能直接的创建实例,只能通过Pattern对象的`matcher()`方法来创建实例.

```java
// Matcher的默认构造方法
Matcher() {
    }

    /**
     * All matchers have the state used by Pattern during a match.
     */
    Matcher(Pattern parent, CharSequence text) {
        this.parentPattern = parent;
        this.text = text;

        // Allocate state storage
        int parentGroupCount = Math.max(parent.capturingGroupCount, 10);
        groups = new int[parentGroupCount * 2];
        locals = new int[parent.localCount];

        // Put fields into initial states
        reset();
    }

// 通过Pattern对象的matcher()方法创建实例
public Matcher matcher(CharSequence input) {
        if (!compiled) {
            synchronized(this) {
                if (!compiled)
                    compile();
            }
        }
        Matcher m = new Matcher(this, input);
        return m;
    }
```

Pattern对象的`matcher()`的参数就是要进行匹配的字符串.Matcher类有一个`find()`方法,当目标字符串的一个`子串`与模式匹配时会返回`true`同时可以利用`start()`得到匹配子串的开始索引,利用`end()`方法得到匹配子串的结束索引,即匹配子串的最后一个位置的索引.

# 正则表达式的语法

## 基本模式

[`候选字符集合`]{`n,m`}...

表示其中一个候选字符至少匹配`n`次,至多匹配`m`次

## 特殊元单词

"元单词"是我自己取的名,表示是不可分割的块单位,元单词分为几类

### 首尾类

只有两个符号`^`,`$`表示匹配首尾,可以修饰候选字符.

如开始的位置,要求字符串必须以a或b或c开头

```
^[abc]{1}
```

如结尾的位置,要求以a或b或c结尾

```
[abc]${1}
[abc]$
```

### 次数类

前面说`{n,m}`是基本的匹配次数,还有一些匹配次数可以使表达式跟简单,表达能力更强

* `*`表示0次或多次
* `+`表示一次或多次
* `?`表示0次或一次
* `{n}`匹配n次
* `{n,}`至少匹配n次

### 候选词类

[`候选字集合`]是基本候选词类,还有其他候选词类,可以使表达式跟简单,表达能力更强

* [`^候选字集合`]表示候选字的补集
* `[a-z]`候选字范围a-z
* `[0-9]`候选字范围0-9

### 特殊类

| \b    | 匹配一个字边界，即字与空格间的位置。例如，"er\b"匹配"never"中的"er"，但不匹配"verb"中的"er"。 |
| ----- | :----------------------------------------------------------- |
| \B    | 非字边界匹配。"er\B"匹配"verb"中的"er"，但不匹配"never"中的"er"。 |
| \c*x* | 匹配 *x* 指示的控制字符。例如，\cM 匹配 Control-M 或回车符。*x* 的值必须在 A-Z 或 a-z 之间。如果不是这样，则假定 c 就是"c"字符本身。 |
| \d    | 数字字符匹配。等效于 [0-9]。                                 |
| \D    | 非数字字符匹配。等效于 [^0-9]。                              |
| \f    | 换页符匹配。等效于 \x0c 和 \cL。                             |
| \n    | 换行符匹配。等效于 \x0a 和 \cJ。                             |
| \r    | 匹配一个回车符。等效于 \x0d 和 \cM。                         |
| \s    | 匹配任何空白字符，包括空格、制表符、换页符等。与 [ \f\n\r\t\v] 等效。 |
| \S    | 匹配任何非空白字符。与 [^ \f\n\r\t\v] 等效。                 |
| \t    | 制表符匹配。与 \x09 和 \cI 等效。                            |
| \v    | 垂直制表符匹配。与 \x0b 和 \cK 等效。                        |
| \w    | 匹配任何字类字符，包括下划线。与"[A-Za-z0-9_]"等效。         |
| \W    | 与任何非单词字符匹配。与"[^A-Za-z0-9_]"等效。                |
| \x*n* | 匹配 *n*，此处的 *n* 是一个十六进制转义码。十六进制转义码必须正好是两位数长。例如，"\x41"匹配"A"。"\x041"与"\x04"&"1"等效。允许在正则表达式中使用 ASCII 代码。 |
| \num  | 匹配 *num*，此处的 *num* 是一个正整数。到捕获匹配的反向引用。例如，"(.)\1"匹配两个连续的相同字符。 |
| \n    | 标识一个八进制转义码或反向引用。如果 \*n* 前面至少有 *n* 个捕获子表达式，那么 *n* 是反向引用。否则，如果 *n* 是八进制数 (0-7)，那么 *n*是八进制转义码。 |
| \nm   | 标识一个八进制转义码或反向引用。如果 \*nm* 前面至少有 *nm* 个捕获子表达式，那么 *nm* 是反向引用。如果 \*nm* 前面至少有 *n* 个捕获，则 *n* 是反向引用，后面跟有字符 *m*。如果两种前面的情况都不存在，则 \*nm* 匹配八进制值 *nm*，其中 *n* 和 *m* 是八进制数字 (0-7)。 |
| \nml  | 当 *n* 是八进制数 (0-3)，*m* 和 *l* 是八进制数 (0-7) 时，匹配八进制转义码 *nml*。 |
| \u*n* | 匹配 *n*，其中 *n* 是以四位十六进制数表示的 Unicode 字符。例如，\u00A9 匹配版权符号 (©)。 |

### 辅助类

| .             | 匹配除"\r\n"之外的任何单个字符。若要匹配包括"\r\n"在内的任意字符，请使用诸如"[\s\S]"之类的模式。 |
| ------------- | ------------------------------------------------------------ |
| (*pattern*)   | 匹配 *pattern* 并捕获该匹配的子表达式。可以使用 **$0…$9** 属性从结果"匹配"集合中检索捕获的匹配。若要匹配括号字符 ( )，请使用"\("或者"\)"。 |
| (?:*pattern*) | 匹配 *pattern* 但不捕获该匹配的子表达式，即它是一个非捕获匹配，不存储供以后使用的匹配。这对于用"or"字符 (\|) 组合模式部件的情况很有用。例如，'industr(?:y\|ies) 是比 'industry\|industries' 更经济的表达式。 |
| (?=*pattern*) | 执行正向预测先行搜索的子表达式，该表达式匹配处于匹配 *pattern* 的字符串的起始点的字符串。它是一个非捕获匹配，即不能捕获供以后使用的匹配。例如，'Windows (?=95\|98\|NT\|2000)' 匹配"Windows 2000"中的"Windows"，但不匹配"Windows 3.1"中的"Windows"。预测先行不占用字符，即发生匹配后，下一匹配的搜索紧随上一匹配之后，而不是在组成预测先行的字符后。 |
| (?!*pattern*) | 执行反向预测先行搜索的子表达式，该表达式匹配不处于匹配 *pattern* 的字符串的起始点的搜索字符串。它是一个非捕获匹配，即不能捕获供以后使用的匹配。例如，'Windows (?!95\|98\|NT\|2000)' 匹配"Windows 3.1"中的 "Windows"，但不匹配"Windows 2000"中的"Windows"。预测先行不占用字符，即发生匹配后，下一匹配的搜索紧随上一匹配之后，而不是在组成预测先行的字符后。 |

# 实例

匹配一个复数

```java
Pattern pattern = Pattern.compile("^[+-]?[1-9][0-9]*[+-][1-9][0-9]*i$");
Matcher matcher = pattern.matcher("9+7i");
System.out.println(matcher.find());
```

