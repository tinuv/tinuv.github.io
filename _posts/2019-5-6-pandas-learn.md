---
layout: post
title: 'Pandas快速学习'
subtitle: ''
date: 2019-5-6
categories: 数据分析
cover: ''
tags: 数据分析 数据分析-Pandas
---



## pandas的数据结构

pandas的数据结构是构建在 numpy 的基础上的,pandas 的数据结构可以分为三个级别,低级别的数据结构可以看成是高级别的的数据结构的元素,可以这样理解,最低级别的数据结构是一维数组,第二个级别的数据结构可以看成是二维数组,第三个级别的数据结构可以看成是三维的数组,当然这三个数据结构的复杂程度远高于数组,这三个数据结构分别是`Series`,`DataFrame`和`Panel`,这些数据结构的详细如下

### Series

Series 字面意思为`系列`,它是一个一维数组,它的复杂程度在于他为一维数组提供了很多的操作方法,便于处理这些一维数据.

* 创建一个 Series 对象

  * 构造函数的参数

    * `data`参数,就是传入的数据,必须是一个数组或可迭代的对象

    * `index`参数,指定索引,必须是一个一维的数组(也可以是多维数组,比如)

    * `dtype`参数,指定元素的数据类型

      ```python
      import pandas as pd
      
      s1 = pd.Series([[1,2,3],[2,3,4]],index=[[1,2],[3,4]])
      print(s1)
      ```

      返回的 Series 如下

      ```python
      1  3    [1, 2, 3]
      2  4    [2, 3, 4]
      ```

  * 创建一个 Series 对象

    ```python
    import pandas as pd
    
    s1 = pd.Series([1,2,3,4])
    ```

    也可以使用多维数组来创建 `Series`对象,只不过他会将数据解析成一维的形式,如下

    ```python
    import pandas as pd
    
    s1 = pd.Series([[1,2,3],[2,3,4]])
    ```

    它会解析成如下形式

    ```python
    0    [1, 2, 3]
    1    [2, 3, 4]
    ```

    其中左边是索引,右边是值,也就是说,无论传多少维的数组,他始终会将之解析成一维的形式,只不过里面的元素会变成`n-1`维而已.

* Series 中几个重要的属性

  * `T`属性:返回`Series`的转置,转置的类型也是`Series`,`Series`的转置不会变,可以这样理解,放回的转置重新被构造成了一个 `Series`对象.

  * `at`属性:放回一个`pandas.core.indexing._AtIndexer`的对象,可以通过这个对象来使用索引访问数据

    ```python
    import pandas as pd
    
    s = pd.Series([1,2,3])
    print(s.at[1])
    ```

    返回如下

    ```
    2
    ```

    实际上属性的命名应该使用名词,但是他为了看起来更像是自然语言,用了一个应该是副词吧,作为属性名

### DataFrame

`DataFrame`的字面意思是数据框,从字面意思也可以看出来是一个二维数组,与`Series`类似,他应该也是被解析成一个二维数组

* 创建一个`DataFrame`对象

  * 构造方法参数
    * `data`:传入的数据,一个二维数组
    * `index`:索引名,可以理解成是一个`行`的名字
    * `columns`:列名,跟索引相对,是行的名字
    * `dtype`:元素的数据结构

  * 构造一个 DataFrame 对象

    ```python
    import pandas as pd
    import numpy as np
    
    data_frame = pd.DataFrame([[1,2,3,],[4,5,6],[7,8,9]]
                              ,index=["第一行","第二行","第三行"]
                              ,columns=["第一列","第二列","第三列"]
                              ,dtype=np.int64)
    data_frame
    ```

    ![屏幕快照 2019-05-06 下午6.58.54](https://tinuv.me/image/37.png)

<div align="center" style="font-weight: bold;">图-1 返回的数据对象</div>

​				除了常规方法构造一个 DataFrame 对象外,也可以使用字典创建一个 DataFrame 对象,这样创建对象会将				字典中的`key`作为列名,字典中的`value` 作为一列

* DataFrame 的重要属性

  DataFrame的属性和方法很多很多,这里只说几个比较重要的属性

  * `T`:返回 DataFrame 的转置

    ```python
    import pandas as pd
    import numpy as np
    
    data_frame = pd.DataFrame([[1,2,3,],[4,5,6],[7,8,9]]
                              ,index=["第一行","第二行","第三行"]
                              ,columns=["第一列","第二列","第三列"]
                              ,dtype=np.int64)
    data_frame.T
    ```

    返回如下

    ```
    	第一行	第二行	第三行
    第一列	1	4	7
    第二列	2	5	8
    第三列	3	6	9
    ```

  * `index`:返回所有列名,为什么说重要呢,可以根据 index 来按行查找数据

    ```python
    import pandas as pd
    import numpy as np
    
    data_frame = pd.DataFrame([[1,2,3,],[4,5,6],[7,8,9]]
                              ,index=["第一行","第二行","第三行"]
                              ,columns=["第一列","第二列","第三列"]
                              ,dtype=np.int64)
    data_frame.index
    ```

    ```
    Index(['第一行', '第二行', '第三行'], dtype='object')
    ```

  * `columns`:与列名相对,返回所有的行名

    ```python
    import pandas as pd
    import numpy as np
    
    data_frame = pd.DataFrame([[1,2,3,],[4,5,6],[7,8,9]]
                              ,index=["第一行","第二行","第三行"]
                              ,columns=["第一列","第二列","第三列"]
                              ,dtype=np.int64)
    data_frame.columns
    ```

    ```
    Index(['第一列', '第二列', '第三列'], dtype='object')
    ```

  * `loc`返回一个定位器,这个要细说

    定位器中类似有两个参数一样,一个操作行(即`index`),一个操作列(即`columns`),如下

    ```python
    data_frame.loc[index,columns]
    ```

    这样就很容易理解了,下面看一下这个定位器的花式定位,下面的案例都以下面这一个数据为例

    ![image-20190506193743744](https://tinuv.me/image/38.png)

    <div align="center" style="font-weight: bold;">图 -2 原始数据</div>

    * 定位一行,操作第一个参数

      ```python
      import pandas as pd
      import numpy as np
      
      data_frame = pd.DataFrame([[1,2,3,],[4,5,6],[7,8,9]]
                                ,index=["第一行","第二行","第三行"]
                                ,columns=["第一列","第二列","第三列"]
                                ,dtype=np.int64)
      data_frame.loc["第一行"]
      ```

      返回第一行的数据

      ```
      第一列    1
      第二列    2
      第三列    3
      Name: 第一行, dtype: int64
      ```

    * 定位一列,既要操作第一个参数,因为要返回这一列的所有数据,即这一列的所有行,又要操作第二个参数,因为要指定那一列

      ```python
      import pandas as pd
      import numpy as np
      
      data_frame = pd.DataFrame([[1,2,3,],[4,5,6],[7,8,9]]
                                ,index=["第一行","第二行","第三行"]
                                ,columns=["第一列","第二列","第三列"]
                                ,dtype=np.int64)
      # ':'表示所有,即所有行
      #  即定位第二列的所有数据
      data_frame.loc[:,"第二列"]
      ```

      返回如下

      ```
      第一行    2
      第二行    5
      第三行    8
      Name: 第二列, dtype: int64
      ```

    * 指定多行多列,第一个参数和第二参数都可以传入一个数组,表示多行多列,这是他会放回一个 DataFrame 对象,既然可以指定多行多列当然也可以切片

      ```python
      import pandas as pd
      import numpy as np
      
      data_frame = pd.DataFrame([[1,2,3,],[4,5,6],[7,8,9]]
                                ,index=["第一行","第二行","第三行"]
                                ,columns=["第一列","第二列","第三列"]
                                ,dtype=np.int64)
      data_frame.loc[["第一行","第二行"],["第一列","第二列"]]
      ```

      返回

      <table border="1" class="dataframe">
        <thead>
          <tr style="text-align: right;">
            <th></th>
            <th>第一列</th>
            <th>第二列</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>第一行</th>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <th>第二行</th>
            <td>4</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>

    * 使用条件索引定位

      * 显式条件索引

        ```python
        import pandas as pd
        import numpy as np
        
        data_frame = pd.DataFrame([[1,2,3,],[4,5,6],[7,8,9]]
                                  ,index=["第一行","第二行","第三行"]
                                  ,columns=["第一列","第二列","第三列"]
                                  ,dtype=np.int64)
        
        # 返回最后一行,最后一列
        data_frame.loc[[False,False,True],[False,False,True]]
        ```

        返回如下

        <table border="1" class="dataframe">
          <thead>
            <tr style="text-align: right;">
              <th></th>
              <th>第三列</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>第三行</th>
              <td>9</td>
            </tr>
          </tbody>
        </table>

      * 隐式条件索引,即使用条件表达式来进行条件索引

        ```python
        import pandas as pd
        import numpy as np
        
        data_frame = pd.DataFrame([[1,2,3,],[4,5,6],[7,8,9]]
                                  ,index=["第一行","第二行","第三行"]
                                  ,columns=["第一列","第二列","第三列"]
                                  ,dtype=np.int64)
        
        # 定位第一列大于 2 的所有行
        data_frame.loc[data_frame["第一列"]>2]
        ```

        <table border="1" class="dataframe">
          <thead>
            <tr style="text-align: right;">
              <th></th>
              <th>第一列</th>
              <th>第二列</th>
              <th>第三列</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>第二行</th>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
            <tr>
              <th>第三行</th>
              <td>7</td>
              <td>8</td>
              <td>9</td>
            </tr>
          </tbody>
        </table>