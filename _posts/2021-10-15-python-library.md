---
title: "Python Library"
categories: 
  - programming
date: 2021-10-15 01:00:00 +0900
last_modified_at: 2021-10-15 01:00:00 +0900
---

# Python 라이브러리
python은 많은 라이브러리를 가지고 있습니다.

## Pandas
데이터 분석/처리를 위한 라이브러리입니다.
📔 공식홈페이지 : https://pandas.pydata.org/
### • 환경설정
**\- 설치**
```sh
$ pip install pandas
```
**\- 가져오기**
```
import pandas
```

### • 자료형

**\- Series**
Series는 1차원 자료구조입니다.
```
from pandas import Series
```
Series는 list를 통해 만듭니다.
list = ['a','b','c']
s = Series(list)

index를 지정할 수 있습니다.
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = ['a','b','c']
s = Series(list, index=date)
```

조회
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = ['a','b','c']
s = Series(list, index=date)
s['20201-10-12']
s.index
s.values
```

삽입
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = ['a','b','c']
s = Series(list, index=date)
s['20201-10-15'] = 'd'
```

삭제
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = ['a','b','c']
s = Series(list, index=date)
s.drop('20201-10-15')
```
🔎 새로운 series를 반환


연산
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = [1,2,3]
s = Series(list, index=date)
print(s + 3)
```
🔎 새로운 series를 반환





DataFrame


파이썬은 문자열을 다루기 위한 함수들을 가지고 있습니다.  
**\- 문자열 더하기**
### •