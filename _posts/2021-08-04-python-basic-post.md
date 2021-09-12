---
title: "Python Basic"
categories: 
  - programming
date: 2021-08-04 01:00:00 +0900
last_modified_at: 2021-08-04 01:00:00 +0900
---

# Python
[파이썬](https://www.python.org/)은 1990년 귀도 반 로섬이 개발한 인터프리터 언어입니다. 귀도 반 로섬은 즐겨보던 코미디쇼인 "몬티 파이썬의 날아다니는 서커스"에서 개발한 언어의 이름을 따왔습니다. 파이썬은 파이썬을 통해 시스템 유틸리티 개발, GUI 프로그래밍, C/C++과의 통합, 웹 프로그래밍, 수치 연산 프로그래밍(NumPy), 데이터베이스 프로그래밍, 데이터 분석, IOT 제어 등을 할 수 있습니다.

## 환경설정
### • 설치하기
**\- 파이썬 설치**
파이썬 [공식홈페이지]에서(https://www.python.org/downloads/)설치하거나 터미널에 `brew install python3`를 입력하여 파이썬을 설치합니다.

**\- 아나콘다 설치**
아나콘다 [공식홈페이지에서](https://www.anaconda.com/products/individual)설치합니다.


🔎 `python3 --version` 또는 `python3 -V`를 터미널에 입력하여 설치된 파이썬의 버전을 확인할 수 있습니다. (MacOS에는 python 2.7이 기본으로 설치되어 있습니다.)

### 실행

파이썬은 기본적으로 터미널 또는 IDLE(Integrated Development and Learning Environment)을 통해 프로그래밍 할 수 있습니다. 터미널에서 python을 입력하면 파이썬을 사용할 수 있으며, exit() / quit() / ctrl + d로 종료할 수 있습니다. IDLE은 IDLE은 입력한 코드를 바로 출력해주는 대화형 인터프리터창(Pyton Shell)과 이러한 코딩을 도와주는 Editor를 가지고 있습니다. IDLE 또한 터미널처럼 exit() / quit() / ctrl + d로 종료할 수 있습니다.

`def cls() : print("\n"*100)`

😺  파이썬의 확장자는 .py입니다.


## 자료형
자료형이란 데이터를 표현하는 기준을 의미하며, 파이썬에는 숫자형 / 문자열 / 리스트 / 튜플 / 딕셔너리 / 집합 / 불이 있습니다.
- 😺  변수들의 자료형은 type 함수를 통해 알 수 있습니다.
    - **typeof**

    피연산자 자료형을 문자열로 반환합니다.

     - syntax : `typeof operand`, `typeof(operand)`

    ```jsx
    console.log(typeof 'a');
    console.log(typeof([]));
    console.log(typeof typeof 3);
    ```

### • 숫자형
숫자형은 수를 표현하는 자료형으로, 정수형 / 실수형 / 8진수 / 16진수가 있습니다.  
**\- 정수형**  
정수를 표현합니다.
```python
num = 1
```

**\- 실수형**  
실수(32bit?)를 표현합니다.
```python
num_a = 1.0
num_b = 10.5
num_c = 10e3 # 10^3과 같습니다.
num_d = 10E3 # 10^3과 같습니다.
```

**\- 8진수**  
8진수(Octal)를 만들기 위해 0o 또는 0O를 앞에 붙여주면됩니다.  
```python
num_a = 0o345
num_b = 0O345
```

**\- 16진수**  
16진수(Hexadecimal)를 만들기 위해 0x를 앞에 붙여주면됩니다.
```python
num = 0x345
```

### • 문자열
문자열은 문자 및 문자열의 집합을 표현하는 자료형입니다. 문자열은 `' '`, `" "`, `''' '''`, `""" """`을 통해 만들 수 있습니다.
```python
str_a = 'python'
str_b = "python"
str_c = '''python'''
str_d = """python"""
```

**\- 문자 가져오기**  
문자열은 인덱스로 접근할 수 있으며, 시작(왼쪽) 문자부터 0, 1, 2, 3 ...로 가져올 수 있습니다. 또한 음수 인덱스를 통해 끝문자부터 -1로 접근할 수 있습니다.  
🔎 문자열은 Immutable 자료형이기 때문에 가져온 문자에 새로운 문자를 할당할 수 없습니다.
```python
str = 'python'
print(str[0]) # p
print(str[5]) # n
print(str[-1]) # n
print(str[-6]) # p
str[1] = 'i' # error
```

**\- 문자열 가져오기**  
파이썬은 인덱스 범위`[시작인덱스 : 끝인덱스 : 간격]`를 지정하여 문자열을 가져올 수 있으며, 이때 끝인덱스는 가져오지 않습니다. 만일 시작인덱스를 지정하지 않으면 첫문자열부터 지정한 끝인덱스 -1 까지 문자열을 가져오며, 끝인덱스를 지정하지 않으면 지정한 시작인덱스부터 끝문자열까지 가져옵니다.
```python
str = 'python'
print(str[:2]) # py
print(str[2:]) # thon
print(str[:]) # python
print(str[1::2]) # yhn
```
🔎 print([::-1])을 하면, 문자열을 뒤집을 수 있습니다.

**\- 문자열 포매팅**  
문자열 포매팅이란 문자열 안에 다른 문자를 삽입하는 것을 의미합니다.  
syntax : `'string %[포맷코드]' %삽입할 문자`  `'string %[포맷코드1] ... %[포맷코드n]' % (삽입할 문자1 ... 삽입할 문자n)` 

🔎 포맷코드 :  문자 : %c / 문자열 : %s / 정수 : %d / 실수 : %f / 8진수 : %o / 16진수 : %x / % : %%  
```python
str_a = 'python %d' % 1
print(str_a)

str_b = 'study'
str_c = 'python %s' % str
print(str_c)

str_d = 'study'
str_e = 'python %s %f' % (str_d, 3.14)
print(str_e)
```

또는 format 함수 및 f-string을 통해 문자열을 포매팅할 수 있습니다.
```python
print('hello {}'.format('python'))
print('hello {} {}'.format('python', 'world'))
print('hello {0} {0}'.format('python', 'world'))
print('hello {p} {w}'.f ormat(p='python', w='world'))
```
```python
name = 'jerry'
print(f'hello {name}')
```

**\- 이스케이프 문자**  
이스케이프 문자란 \와 함께 쓰여 원래 문자와 다른 의미를 가지게 되는 특수한 문자입니다.
```python
print('py\'thon')
print('py\nthon')
```

### • 리스트
리스트란 공통 특성을 가진 자료형들을 모아 넣은 자료형입니다.  
🔎 다른 자료형끼리도 모아 넣을 수 있습니다.  
```python
list_a = [1, 2, 3]
list_b = ['a', 'b', 'c']
list_c = [1, 2, 'a', 'b']
list_d = [1, 'a', [2, 'b']]
```

**\- 리스트 요소 가져오기 / 수정하기**  
리스트 요소는 인덱스로 접근할 수 있으며, 시작(왼쪽) 요소부터 0, 1, 2, 3 ...로 가져올 수 있습니다. 또한 음수 인덱스를 통해 끝요소부터 -1로 접근할 수 있습니다.  
🔎 리스트는 가져온 요소에 새로운 값을 할당할 수 있습니다.
```python
list_a = [1, 2, 3]
list_b = ['a', 'b', 'c']
list_c = [1, 2, 'a', 'b']
list_d = [1, 'a', [2, 'b']]

print(list_a[0])
print(list_b[1])
print(list_c[2])
print(list_d[2])
print(list_a[-1])
print(list_d[2][1])

list_a[2] = 4
print(list_a)
#list_a[2:3] = 4, 5 #초과된 인덱스에 할당 가능
print(list_a)
```

**\- 리스트 요소들 가져오기**  
파이썬은 인덱스 범위`[시작인덱스 : 끝인덱스]`를 지정하여 리스트 요소을 가져올 수 있으며, 이때 끝인덱스는 가져오지 않습니다. 만일 시작인덱스를 지정하지 않으면 첫요소부터 지정한 끝인덱스 -1 까지 문자열을 가져오며, 끝인덱스를 지정하지 않으면 지정한 시작인덱스부터 끝요소까지 가져옵니다.
```python
list_a = [1, 2, 3]
list_b = ['a', 'b', 'c']
list_c = [1, 2, 'a', 'b']
list_d = [1, 'a', [2, 'b']]

print(list_a[1])
print(list_b[1:])
print(list_c[:2])
print(list_c[2:])
print(list_d[2])
print(list_d[2][1])
```

**\- 리스트 요소 삭제하기**  
리스트 요소는 `del list[index]`로 삭제할 수 있습니다.
```python
list_a = ['a', 'b', 'c']
del list_a[1]; # ['a', 'c']

list_b = ['a', 'b', 'c']
del list_b[:2]; # ['c']
```

### • 딕셔너리
딕셔너리란 key - value를 담을 수 있는 자료형입니다.  
```python
dic = {"key_a": "value_a", "key_b": "value_b"}
```
🔎 숫자를 제외하고 key는 문자열로 만들어야 합니다.

**\- 딕셔너리 요소 가져오기 / 수정하기**  
딕셔너리 요소는 key로 접근할 수 있습니다.
🔎 딕셔너리 요소는 key로 접근하여 수정할 수 있습니다.
```python
dic_a = {"a": "hello", "b": "python"}
dic_b = {1: "bye", 2: "python"}
dic_a["a"] = "bye"

print(dic_a["a"])
print(dic_b[1])
```

**\- 딕셔너리 요소 삭제하기**  
딕셔너리 요소는 `del[key]`로 삭제할 수 있습니다.
```python
dic = {"a": "hello", "b": "python"}
del dic["b"]
print(dic)
```

values
items (key, value) 튜플을 list로 반환
keys list로 반환

### • 튜플
튜플은 리스트와 비슷하지만, immutable한 차이가 있습니다.
```python
tup = (1, 'a', True)
print(tup[0]) # 1

tup[0] = 10 # error
```

### • set
set은 중복이 없는 자료형입니다.
```python
my_set = set()
my_set.add(1)
my_set.add(2)
my_set.add(2)
print(my_set) # {1,2}
```

```python
my_list = [1,1,1,2,2,3]
my_set = set(my_list)
print(my_set) # {1,2,3}
```

### • 불
참과 거짓을 표현하는 자료형으로 참은 True, 거짓은 False로 표현합니다.
```python
a = True
b = False
```

Truthy & Falsy

bool연산을 통해 자료형의 불린을 알 수 있습니다.

## 연산자
연산자는 대입 연산자 / 산술연산자 / 비교연산자 / 논리연산자 / 비트연산자가 있습니다.

### • 대입 연산자
\- a = b : a에 b를 대입합니다.

### • 산술 연산자
\- a + b : a와 b를 더합니다.  
\- a - b : a에 b를 뺍니다.  
\- a * b : a와 b를 곱합니다.  
\- a / b : a를 b로 나눕니다.  
\- a ** b : a를 b제곱합니다.  
\- a % b : a를 b로 나눈 나머지를 계산합니다.  
\- a // b : a를 b로 나눈 몫을 계산합니다.  

### • 비교 연산자
\- a == b : a와 b가 일치하면 True를 반환합니다.  
\- a != b : a와 b가 불일치하면 True를 반환합니다.  
\- a > b : a가 b보다 크면 True를 반환합니다.  
\- a >= b : a가 b보다 크거나 같으면 True를 반환합니다.  
\- a < b : a가 b보다 작으면 True를 반환합니다.  
\- a >= b : a가 b보다 작거나 같으면 True를 반환합니다.  

### • 논리연산자
\- and : and 연산입니다.  
\- or : or 연산입니다.  
\- not :  not 연산입니다.  
\- x in 리스트, x not in 리스트 : 리스트에 x가 있으면(없으면) true를 반환합니다.  
\- x in 튜플, x not in 튜플  
\- x in 문자열, x not in 문자열  

https://docs.python.org/2/tutorial/floatingpoint.html

## 조건문
조건문이란 특정 조건에서 실행 되는 구문을 의미합니다.

### • 종류
**\- if문**  
조건식이 참이면 구문을 실행하며, 실행될 구문은 들여쓰기(띄어쓰기)로 코딩되어야 합니다.
```python
if a > 3:
    print('python')
```
🔎 들여쓰기의 칸수는 정해져있지 않으며, 같은 조건문에서 동일한 칸수를 가지면 됩니다.
```python
a = 5

if a > 3:
    print('python')
    print('1')

if a > 3:
    print('python')
    print('2')

# error
if (a > 3):
    print('python')
    print('3')

```

**\- if ~ else문**  
조건식이 참이면 if문을 실행하며, 거짓이면 else문을 실행합니다.
```python
a = 5

if a > 3:
    print('if')
else:
    print('else')
```

**\- if ~ else if ~ else문**  
조건식이 참인 if  & else if문 실행하며, 모두 거짓인 경우 else문을 실행합니다.  
🔎 참인 if & else if문 다음에는 조건식 연산을 건너뜁니다.
```python
a = 3

if a == 1:
    print('if')
elif a == 2:
    print('elif1')
elif a == 3:
    print('elif2')
else:
    print('else')
```

**\- 조건부 표현식**  
조건에 맞는 코드를 실행하고 실행결과를 반환합니다.
```python
a = 5

print('py') if a > 3 else print('thon')

b = 'hello' if a > 3 else 'world'
print(b)
```

## 반복문
반복문이란 특정조건까지 반복되는 구문을 의미합니다.

### • 종류
**\- while 문**  
조건식이 참이면 구문을 실행하며, 실행될 구문은 들여쓰기(띄어쓰기)로 코딩되어야 합니다.
```python
i = 0
while i < 10:
  print(i)
  i = i + 1
```
```python
while i < 10:
  print(i)
  i = i + 1
else:
  print('loop complete')
```

**\- for 문**  
조건식이 참이면 구문을 실행하며, 실행될 구문은 들여쓰기(띄어쓰기)로 코딩되어야 합니다.  
`for 인덱스 in 리스트(또는 튜플, 문자열): 실행문`
```python
list = ['a', 'b', 'c']

for i in list:
  print(i)
```
```python
str = 'python'

for i in str:
  print(i)
```
```python
tup = ('a', 'b', 'c')

for i in tup:
  print(i)
```
```python
list = [('a', 'b'), ('c', 'd')]

for (m, n) in list:
  print(a)
  print(b)
```
```python
dic = {'a': 1, 'b': 2}

for (key, value) in dic.items():
  print(key)
  print(value)
```

### • continue & break & pass
**\- break**  
break문을 감싸고 있는 반복문을 탈출합니다.  
```python
list = [1, 2, 3, 4, 5]

for i in list:
    if i == 3: break
    print(i)
```

**\- continue**  
continue문을 감싸고 있는 반복문 조건식으로 이동합니다.  
```python
i = 0
  
while i < 10:
    i = i + 1
    if i % 2 == 0: continue 
    print(i)
```

**\- pass**  
반복문을 실행시키지 않습니다.  
```python
list = [1, 2, 3, 4, 5]

for i in list:
    pass

print('eof')
```


### • range & enumerate & zip + in
파이썬은 range, enumerate, zip 함수와 for문을 함께 많이 사용되며 for문이 실행되는 조건은 in 연산이 참일때 입니다.  
**\- range**  
[range](https://docs.python.org/ko/3/library/functions.html#func-range)는 range객체를 반환합니다.  
*syntax : `range(start, stop, [step])`

```python
a = range(5)
for i in a:
  print(i)
b = range(1, 3)
for i in b:
    print(i
c = range(0, 10, 2)
for i in c:
    print(i)
```

```python
a = range(5) # a = 0, 1, 2, 3, 4
for i in a:
    print(i)

b = range(1, 3) # b = 1, 2, 3
for i in b:
    print(i)
```

**\- enumerate**  
[enumerate](https://docs.python.org/ko/3/library/functions.html#enumerate)는 튜플 반환
```python
str = 'abc'
for char in enumerate(str):
    print(char)
```

**\- zip**  
```python
list_a = [1, 2, 3]
list_b = ['a', 'b', 'c']
list_c = [4, 5, 6]

for item in zip(list_a, list_b, list_c):
    print(item)
```
**\- in**
```
'a' in 'abc'
'a' in ['a', 'b', 'c']
'a' in {'a':1, 'b':2, 'c':3}
```

from random inport shuffle

## 함수
함수는 입력과 출력 간 관계의 표현식이라 할 수 있으며, 또다른 의미로는 하나의 단위로 실행되는 문이라 할 수 있습니다.  
🔎 만일 입력과 출력이 없다면 함수라 할 수 있을까요? 프로그래밍에서 함수는 수학적 정의와 다소 다른 점이 있다. 수학에서는 함수f는 입력 x와 출력y가 있어야 정의될 수 있습니다. 프로그래밍에서 입력과 출력의 정의를 '함수실행 = 입력, 어떠한 결과 = 출력'까지 확장한다면 전달하는 입력과 반환값이 없을지라도 함수라 할 수 있습니다.

### • 선언
`def` 키워드를 통해 함수를 선언할 수 있습니다.
```python
def func(a, b):
    c = a + b
    print(c)
```

### • 반환값
`return` 키워드를 통해 반환값을 반환하고 함수를 종료시킵니다.
```python
def func(a, b):
    c = a + b
    return c
```

### • 기본값
`arg = 기본값`을 통해 입력 인자에 기본값을 할당할 수 있습니다.
```python
def func(a = 1, b = 2):
    c = a + b
    return c
```

### • args / kwargs
**\- args**  
`*` 키워드를 통해 함수 안에서 입력인자를 튜플로 받을 수 있습니다. 이때, 임의의 인자의 개수를 전달할 수 있습니다.
```python
def func(*args):
    print(args)
```

**\- kwargs**  
`**` 키워드를 통해 함수 안에서 입력인자를 딕셔너리로 받을 수 있습니다. 이때, 임의의 인자의 개수를 전달할 수 있습니다.
```python
def func(**kwargs):
    print(args)
```

## 클래스
객체지향프로그래밍이란 프로그램을 단순한 명령어의 집합으로 바라보는 기존 컴퓨터 프로그래밍과 달리, 관계성 있는 객체들의 집합으로 바라보는 프로그램 설계입니다. 객체지향프로그래밍을 위해서 객체의 특성을 담고 있는 클래스라는 추상적 개념을 정의합니다. 이러한 클래스에 구체적인 특성들을 정의해줌으로써 실존적 개념인 인스턴스를 얻을 수 있습니다.
### • 선언
`class` 키워드를 통해 클래스를 선언할 수 있으며, `__init__` 함수를 통해 인스턴스를 초기화 할 수 있습니다.
또한 일반 변수, 함수 선언으로 속성, 메소드를 정의할 수 있습니다.
```python
class Car():
    id = 'id'

    def __init__(self,model,color):
        self.color = color
        self.model = model

    def func(self)
        print(self.color)

my_car = Car('i30','blue')
my_car.func()
my_car.id
Car.id
```

### • 상속
```python
class Vehicle():
    def __init__(self, a):
        self.a = a

    def func(self)
        print(self.a)

class Car(Vehicle):
    def __init__(self):
        Vehicle.__init__(self, a)
```

__main__

### • Dunder Method
**\- __str__**  
`print([instance 이름])`, `str([instance 이름])`을 입력했을때, 실행되는 함수를 정의합니다.  
**\-__len__**  
`len([instance 이름])`을 입력했을때, 실행되는 함수를 정의합니다.  
**\-__del__**  
`del([instance 이름])`을 입력했을때, 실행되는 함수를 정의합니다.  





pypi
pypi는 파이썬 개발자들이 패키지를 공유하는 생태계입니다.

pip
pip는 파이썬 패키지를 관리해주는 시스템입니다.

`$ pip list`
`$ pip install [패키지 이름]`
`$ pip uninstall [패키지 이름]`

pip -v
pip intall --upgrade

홈브루에서
sudo easy-intall pip

from [스크립트(모듈) 이름] import [함수 이름]
import [스크립트(모듈) 이름]

🔎 스크립트(모듈)은 *.py 파일입니다.

패키지 만들기
__init__.py


---
__name__
python [***.py]이면 __name__ = "__main__"
import할때 파일이 실행되기 때문에, 이를 방지하기 위해 __name__ 조건문을 작성함

__main__

```
a/
    __init__.py
    b/
        __init__.py
        m.py
        n.py
    c/
        __init__.py
        p.py
        q.py
```
```python
# m.py
def func_m():

```

```python
import a.b.m
a.b.m.func_m()
```
```python
?
import a
a.b.m.func_m()
```

```python
from a import b
b.m.func_m()
b.n.func_n()
```

```python
from a.b import m
m.func_m()
```

```python
from a.b.m import func_m
func_m()
```

## 예외처리
`try`, `excpet`, `finally`로 예외처리를 할 수 있습니다.
### • try
정상적으로 작동하는 코드 영역입니다.
```python
try:
    print('try before error')
    a = 
    print('try after error)
except:
    print('except')
```

### • except
try에서 오류가 발생하면, 처리하는 코드 영역입니다. [error 종류](https://docs.python.org/3/library/exceptions.html)에 따라 except를 나눌 수 있습니다.
```python
try:
    print('try before error')
    raise Exception('error : (')
    print('try after error')
except:
    print('except')
```
```python
try:
    print('try before error')
    raise Exception('error : (')
    print('try after error')
except TypeError:
    print('except type error')
except: OSError:
    print('except os error')
except:
    print('except error')
```
```python
try:
    print('try before error')
    raise Exception('error : (')
    print('try after error')
except TypeError as e:
    print(e)
    print('except type error')
except: OSError as e:
    print('except os error')
    print(e)
except Exception as e:
    print('except error')
```

### • else
try에서 오류가 발생하지 않으면, 실행되는 코드 영역입니다. error 종류에 따라 except를 나눌 수 있습니다.
```python
try:
    print('try')
else:
    print('else')
```

### • finally
try에서 오류발생 여부와 관계없이 실행되는 코드 영역입니다.

```python
try:
    print('try before error')
    raise Exception('error : (')
    print('try after error')
except TypeError:
    print('except')
except: OSError:
    print('except')
finally:
    print('finally')
```


pylint myexample.py -r y
unittest
`pip install pylint`


PEP8코드스타일