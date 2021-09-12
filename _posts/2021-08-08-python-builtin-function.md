---
title: "Python"
categories: 
  - programming
date: 2021-08-04 01:00:00 +0900
last_modified_at: 2021-08-04 01:00:00 +0900
---

# Python 내장 함수
python은 많은 built-in 함수를 가지고 있습니다.  
🔎 `help(built-in 함수)`를 통해 함수 설명을 볼 수 있습니다.
## 문자열 함수
파이썬은 문자열을 다루기 위한 함수들을 가지고 있습니다.  
**\- 문자열 더하기**
`+`로 문자열끼리 더하면 서로 연결된 문자열이 됩니다.  
```python
"py" + "thon" # python
```
**\- 문자열 곱하기**  
문자열을 수에 곱하면, 수만큼 반복된 문자열이 반환됩니다
```python
'py' * 3 # pythonpythonpython
```
**\- len**  
[len](https://docs.python.org/ko/3/library/functions.html#len)은 문자열 길이를 반환합니다.
```python
len('python') # 6
```
**\- lower**  
[lower](https://docs.python.org/ko/3/library/stdtypes.html?highlight=lower#str.lower)는 소문자로 바꾼 새로운 문자열을 반환합니다.  
```python
str = "PYthoN"
print(str, str.lower())
```

**\- isalnum**  
[isalnum](https://docs.python.org/ko/3/library/stdtypes.htmhighlight=isalnum#str.isalnum)은 모든 문자열이 알파벳, 숫자로 이루어져 있으면 True를 반환하며, 그렇지 않으면 False를 반환합니다(문자열이 없어도 False를 반환합니다.  
```python
str_a = "python3"
str_b = "python3#"
str_c = ""
print(str_a.isalnum(), str_b.isalnum(), str_c.isalnum())
```

## 리스트 함수
파이썬은 리스트를 다루기 위한 [함수](https://docs.python.org/ko/3/tutorial/datastructures.html#more-on-lists)들을 가지고 있습니다.  

**\- 리스트 더하기**  
`+`로 리스트끼리 더하면 서로 연결된 리스트가 됩니다.
```python
[1, 2, 3] + ['a', 'b', 'c'] # [1, 2, 3, 'a', 'b', 'c']
```
**\- 리스트 곱하기**  
리스트에 수를 곱하면, 수만큼 반복된 리스트가 반환됩니다.
```python
['a', 'b', 'c'] * 3 # ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c']
```
**\- len**  
[len](https://docs.python.org/ko/3/library/functions.html#len)은 리스트 길이를 반환합니다.
```python
len(['a', 'b', 'c']) # 3
```
**\- pop**  
[pop](https://docs.python.org/ko/3/library/array.html?highlight=pop#array.array.pop)은 리스트 특정 위치의 요소를 제거하고 그 값을 반환합니다. 인자를 전달하지 않으면 기본값으로 -1이 전달되며 마지막 요소를 제거하고 반환합니다.
```python
list = [1, 2, 3]
list.pop(1)
```
**\- append**  
[append](https://docs.python.org/ko/3/library/array.html?highlight=append#array.array.append)는 리스트 끝에 요소를 추가합니다.
```python
list = [1, 2, 3]
list.append(1)
```
for문과 함께 사용될 수 있습니다.
```python
str = 'hello'
for char in str:
    list.append(char)
```
```python
str = 'hello'
list = [char for char in str]
```
**\- extend**  
[extend]는 리스트 끝에 iterable 요소를 열거하여 추가합니다.
```python
list = [1, 2, 3]
list.append([4, 5])
print(list) # [1, 2, 3, 4, 5]
```

**\- reverse**  
[reverse](https://docs.python.org/ko/3/library/array.html?highlight=reverse#array.array.reverse)는 리스트를 요소 순서를 뒤집습니다.  
🔎 `[::-1]` 또한 리스트 요소 순서를 뒤집습니다.
```python
list = [1, 2, 3]
list.reverse(1)
list[::-1]
```

### 리스트 연산
sort  
index  
insert  
remove  
count  
extend  

## 딕셔너리 함수
파이썬은 딕셔너리를 다루기 위한 함수들을 가지고 있습니다.  
**\- key 조회하기**  
keys로 딕셔너리의 key들을 조회할 수 있습니다.
```python
```
**\- value 조회하기**  
values로 딕셔너리의 value들을 조회할 수 있습니다.
```python
```
**\- item 조회하기**  

```python
len(['a', 'b', 'c']) # 3
```

## 함수
### • map
[map](https://docs.python.org/ko/3/library/functions.html#map)은 입력에 대해 함수를 반복실행하며, 함수의 반환값들을 반환합니다.
```python
inputs = [1, 2, 3]

def func(a):
  return a + 1

map(func, input)
list(map(func, input))
```

### • map
[filter](https://docs.python.org/ko/3/library/functions.html#filter)는 입력에 대해 함수를 반복실행하며, 반환값이 True인 함수의 입력들을 반환합니다.
```python
inputs = [1, 2, 3]

def func(a):
  return a % 2 == 0

map(func, input)
list(map(func, input))
```

### • lambda
람다 표현식은 함수를 한줄의 anonymous 함수형태로 선언합니다.  
🔎 여러줄은 함수는 람다 표현식으로 만들 수 없습니다.
```python
def func(a):
  return a + 1
```

```python
func = lambda a: a + 1
```

legb