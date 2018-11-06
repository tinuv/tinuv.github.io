---
layout: post
title: '自顶向下语法分析'
subtitle: ''
date: 2018-11-6
categories: 编译原理
cover: ''
tags: 编译原理
---
# 语法规则
```Java
1)  <program> → {<declaration_list><statement_list>}
2)  <declaration_list> → <declaration_list><declaration_stat> | ε
3)  <declaration_stat> → int ID;
4)  <statement_list> → <statement_list><statement>| ε
5)  <statement> → <if_stat>|<while_stat>|<for_stat>|<read_stat>              |<write_stat>|<compound_stat> |<assignment_stat>|;
6)  <if_stat> → if (<bool_expression >) <statement >A
| if (<bool_expression>) <statement >else < statement >
7)  <while_stat> → while (<bool_expression>) < statement >
8)  <for_stat> → for (<assignment_expression>; <bool_expression>;
<assignment_ expression >)<statement>
9)  <write_stat> → write < arithmetic_expression >;
10) <read_stat> → read ID;
11) <compound_stat> → {<statement_list>}
12) <assignment_expression> → ID=<arithmetic_expression>
13) <assignment_stat> →<assignment_expression>;
14) <bool_expression>→<arithmetic_expression> >  <arithmetic_expression>
|<arithmetic_expression> <  <arithmetic_expression>
|<arithmetic_expression> >= <arithmetic_expression>
|<arithmetic_expression> <= <arithmetic_expression>
|<arithmetic_expression> == <arithmetic_expression>
|<arithmetic_expression> != <arithmetic_expression>
15) <arithmetic_expression> → <arithmetic_expression>+<term>
|< arithmetic_expression>-<term>
|< term > 
16) < term > → < term >*<factor>|< term >/<factor>|< factor >
17) < factor > → (<arithmetic_expression>)|ID|NUM 
```
# 思路
首先改写文法,消除左递归,消除左公因子,根据FIRST集和FOLLOW集即可编写语法分析程序
# 程序
```python
class GrammarAnalyse:
    ##################算术表达式###############################
    # <arithmetic>-><term><arithmetic1>                     #
    # <arithmetic1>-><arithmetic2><arithmetic1>|epsilon     #
    # <arithmetic2>->+<term>|-<term>                        #
    # FIRST(<term><arithmetic1>) = {"(","ID","NUM"}         #
    # FIRST(<arithmetic2><arithmetic1>) = {"+","-"}         #
    # FIRST(epsilon) = {epsilon}                            #
    # FIRST(+<term>) = {"+"}                                #
    # FIRST(-<term>) = {"-"}                                #
    # FOLLOW(<arithmetic1>) = {),#}                         #
    # FOLLOW(<term1>) = {"+", "-", ")",">",">=",            #
    #  "<","<=","==","!=","#"}                              #
    # <term>-><factor><term1>                               #
    # <term1>-><term2><term1>|epsilon                       #
    # <term2>->*<factor>|/<factor>                          #
    # FIRST(<term>) = {"(","ID","NUM"}                      #
    # FIRST(<term1>) = {"*","/","epsilon"}                  #
    # FIRST(<term2>) = {"*","/"}                            #
    # FOLLOW(term1) = {"+","-"}                             #
    #                                                       #
    # <factor>->(<arithmetic>)|ID|NUM                       #
    # FIRST(<factor>) = {"(","ID","NUM"}                    #

    #################布尔表达式###############################
    # <bool>-><arithmetic><bool1>
    # <bool1>->><arithmetic>
    # |><arithmetic>
    # |<<arithmetic>
    # |>=<arithmetic>
    # |<=<arithmetic>
    # |==<arithmetic>
    # |!=<arithmetic>

    ################<if_stat>################################
    # <if_stat>->if(<bool_exp>)<statement><if_stat1>
    # <if_stat1>->else<statement>|epsilon
    # FOLLOW(<if_stat1>)={if,while,for,read,write,{,ID,;,}}

    # <program> → {<declaration_list><statement_list>}
    # <declaration_list> →<declaration_stat> <declaration_list> | ε
    # <declaration_stat> → int ID;
    # <statement_list>→ <statement><statement_list> | ε
    # <statement> → <if_stat>|<while_stat>|<for_stat>|<read_stat>|<write_stat>|<compound_stat> |<assignment_stat>|;
    # <if_stat>->if(<bool_exp>)<statement><if_stat1>
    # <if_stat1>->else<statement>|epsilon
    # <while_stat> → while (<bool_expression>) < statement >
    # <for_stat> → for (<assignment_expression>; <bool_expression>;<assignment_ expression >)<statement>
    # <write_stat> → write < arithmetic_expression >;
    # <read_stat> → read ID;
    # <compound_stat> → {<statement_list>}
    # <assignment_expression> → ID=<arithmetic_expression>
    # <assignment_stat> →<assignment_expression>;
    # FOLLOW(<if_stat1>)={if,while,for,read,write,{,ID,;,}}
    def __init__(self, table):
        self.symbol_table = table
        self.symbol_table_len = len(self.symbol_table)
        print(table)
        pass

    current_symbol = 0

    # symbol_table = []
    # symbol_table_len = len(symbol_table)

    def program(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "{":
            self.current_symbol = self.current_symbol + 1
            self.declaration_list()
            self.statement_list()
            if self.symbol_table[self.current_symbol] == "}":
                print("识别完毕,无语法错误")
            else:
                print("语法错误")
        else:
            print("program===>语法错误")

    def declaration_list(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "int":
            self.declaration_stat()
            self.declaration_list()
        elif self.symbol_table[self.current_symbol] in {"if", "while", "for", "read", "write", "{", "ID", "}", ";"}:
            return
        else:
            print("语法错误")

    def declaration_stat(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "int":
            self.current_symbol = self.current_symbol + 1
            if self.symbol_table[self.current_symbol] == "ID":
                self.current_symbol = self.current_symbol + 1
                if self.symbol_table[self.current_symbol] == ";":
                    self.current_symbol = self.current_symbol + 1
                else:
                    print("语法错误")
            else:
                print("语法错误")
        else:
            print("语法错误")

    def statement_list(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {"if", "while", "for", "read", "write", "{", "ID", ";"}:
            self.statement()
            self.statement_list()
        elif self.symbol_table[self.current_symbol] in {"}"}:
            return
        else:
            print("语法错误")

    def statement(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {"if", "while", "for", "read", "write", "{", "ID", ";"}:
            if self.symbol_table[self.current_symbol] == "if":
                self.if_stat()
            elif self.symbol_table[self.current_symbol] == "while":
                self.while_stat()
            elif self.symbol_table[self.current_symbol] == "for":
                self.for_stat()
            elif self.symbol_table[self.current_symbol] == "read":
                self.read_stat()
            elif self.symbol_table[self.current_symbol] == "write":
                self.write_stat()
            elif self.symbol_table[self.current_symbol] == "{":
                self.compound_stat()
            elif self.symbol_table[self.current_symbol] == "ID":
                self.assignment_exp()
            elif self.symbol_table[self.current_symbol] == ";":
                self.current_symbol += 1
            else:
                print("语法错误")

    def compound_stat(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "{":
            self.current_symbol += 1
            self.statement_list()
            if self.symbol_table[self.current_symbol] == "}":
                self.current_symbol += 1
            else:
                print("语法错误")
        else:
            print("语法错误")

    def write_stat(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "write":
            self.current_symbol += 1
            self.arithmetic()
            if self.symbol_table[self.current_symbol] == ";":
                self.current_symbol += 1
            else:
                print("语法错误")
        else:
            print("语法错误")

    def read_stat(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "read":
            self.current_symbol += 1
            if self.symbol_table[self.current_symbol] == "ID":
                self.current_symbol += 1
                if self.symbol_table[self.current_symbol] == ";":
                    self.current_symbol += 1
                else:
                    print("语法错误")
            else:
                print("语法错误")
        else:
            print("语法错误")

    def for_stat(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "for":
            self.current_symbol += 1
            if self.symbol_table[self.current_symbol] == "(":
                self.current_symbol += 1
                self.assignment_exp()
                if self.symbol_table[self.current_symbol] == ";":
                    self.current_symbol += 1
                    self.bool_exp()
                    if self.symbol_table[self.current_symbol] == ";":
                        self.current_symbol += 1
                        self.assignment_exp()
                        if self.symbol_table[self.current_symbol] == ")":
                            self.current_symbol += 1
                            self.statement()
                        else:
                            print("语法错误")
                    else:
                        print("语法错误")
                else:
                    print("语法错误")
            else:
                print("语法错误")
        else:
            print("语法错误")

    def while_stat(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "while":
            self.current_symbol += 1
            if self.symbol_table[self.current_symbol] == "(":
                self.current_symbol += 1
                self.bool_exp()
                if self.symbol_table[self.current_symbol] == ")":
                    self.current_symbol += 1
                    self.statement()
                else:
                    print("语法错误")
            else:
                print("语法错误")
        else:
            print("语法错误")

    def if_stat(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "if":
            self.current_symbol += 1
            if self.symbol_table[self.current_symbol] == "(":
                self.current_symbol += 1
                self.bool_exp()
                if self.symbol_table[self.current_symbol] == ")":
                    self.current_symbol += 1
                    self.statement()
                    self.if_stat1()
                else:
                    print("语法错误")
            else:
                print("语法错误")
        else:
            print("语法错误")

    def if_stat1(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "else":
            self.current_symbol = self.current_symbol + 1
            self.statement()
        elif self.symbol_table[self.current_symbol] in {"if", "while", "for", "read", "write", "{", "ID", ";", "}"}:
            return
        else:
            print("语法错误")

    def assignment_exp(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "ID":
            self.current_symbol = self.current_symbol + 1
            if self.current_symbol >= self.symbol_table_len:
                return
            if self.symbol_table[self.current_symbol] == "=":
                self.current_symbol = self.current_symbol + 1
                self.arithmetic()
            else:
                print("assignment_exp===>语法错误")
        elif self.symbol_table[self.current_symbol] == ";":
            return
        else:
            print("语法错误")

    def assignment_stat(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] == "ID":
            self.assignment_exp()
            if self.symbol_table[self.current_symbol] == ";":
                self.current_symbol = self.current_symbol + 1
            else:
                print("assignment_stat===>语法错误")
        else:
            print("assignment_stat===>语法错误")

    def bool_exp(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {"(", "ID", "NUM"}:
            self.arithmetic()
            self.bool1_exp()
        else:
            print("bool_exp===>语法错误")

    def bool1_exp(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {">", "<", ">=", "<=", "==", "!=", ";"}:
            self.current_symbol = self.current_symbol + 1
            self.arithmetic()
        else:
            print("bool1_exp===>语法错误")

    def arithmetic(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {"(", "ID", "NUM"}:
            self.term()
            self.arithmetic1()
        else:
            print("arithmetic===>语法错误")

    def arithmetic1(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {"+", "-"}:
            self.arithmetic2()
            self.arithmetic1()
        elif self.symbol_table[self.current_symbol] in {";", ")", ">", "<", ">=", "<=", "==", "!="}:
            return
        else:
            print("arithmetic1===>语法错误")

    def arithmetic2(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {"+", "-"}:
            self.current_symbol = self.current_symbol + 1
            self.term()
        else:
            print("arithmetic2===>语法错误")

    def factor(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {"(", "ID", "NUM"}:
            if self.symbol_table[self.current_symbol] == "(":
                self.current_symbol = self.current_symbol + 1
                self.arithmetic()
                if self.symbol_table[self.current_symbol] == ")":
                    self.current_symbol = self.current_symbol + 1
                else:
                    print("factor===>语法错误")
            else:
                self.current_symbol = self.current_symbol + 1
        else:
            print("factor===>语法错误")

    def term(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {"(", "ID", "NUM"}:
            self.factor()
            self.term1()
        else:
            print("term===>语法错误")

    def term1(self):
        # print(self.symbol_table[self.current_symbol])
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {"*", "/"}:
            self.term2()
            self.term1()
        elif self.symbol_table[self.current_symbol] in {"+", "-", ")", "#", ">", ">=", "<", "<=", "==", "!=", ";"}:
            return
        else:
            print("term1===>语法错误")

    def term2(self):
        if self.current_symbol >= self.symbol_table_len:
            return
        if self.symbol_table[self.current_symbol] in {"*", "/"}:
            self.current_symbol = self.current_symbol + 1
            self.factor()
        else:
            print("term2===>语法错误")


if __name__ == '__main__':
    an = GrammarAnalyse()
    an.program()
```
