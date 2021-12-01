---
title: "Python Pandas"
categories: 
  - programming
date: 2021-10-15 01:00:00 +0900
last_modified_at: 2021-10-15 01:00:00 +0900
---

# Python 라이브러리
python은 많은 라이브러리를 가지고 있습니다.

pip
## Scraping
selenium
request
beautisoup

pip install requests
import requests
https://docs.python-requests.org/en/latest/user/quickstart/
https://www.daleseo.com/python-requests/
https://me2nuk.com/Python-requests-module-example/

pip install beautifulsoup4
from bs4 import BeautifulSoup

https://blex.me/@mildsalmon/%ED%95%9C%EB%9D%BC%EB%8C%80%ED%95%99%EA%B5%90-%EA%B3%B5%EC%A7%80-%EC%95%8C%EB%A6%BC-%EB%B4%87-%EC%A0%9C%EC%9E%91%EA%B8%B0-3-%EC%BD%94%EB%93%9C%EB%B6%84%EC%84%9D

beautiful soup
https://www.crummy.com/software/BeautifulSoup/bs4/doc/



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

## Series

**\- Series**
Series는 1차원 자료구조입니다.
```
from pandas import Series
```

**Series 만들기**  
Series는 list를 통해 만듭니다.
list = ['a','b','c']
s = Series(list)

index를 지정할 수 있습니다.
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = ['a','b','c']
s = Series(list, index=date)
```
s.index를 통해, index들을 얻을 수 있습니다.
s.values를 통해, value들을 얻을 수 있습니다.


조회
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = ['a','b','c']
s = Series(list, index=date)
s[0]
s.iloc[0]
s['20201-10-12']
s.loc['20201-10-12']
```

삽입
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = ['a','b','c']
s = Series(list, index=date)
s['20201-10-15'] = 'd'
```

추출
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = ['a','b','c']
s = Series(list, index=date)
s[0:2]
s.iloc[0:2]
s[[0,2]]
s.iloc[[0,2]]
s["2021-10-12", "2021-10-14"]
s.loc["2021-10-12", "2021-10-14"]
s[["2021-10-12", "2021-10-14"]]
s.loc[["2021-10-12", "2021-10-14"]]
```
🔎 숫자로 접근하면, list처럼 마지막 숫자의 데이터는 가지고 오지 않습니다.

삭제
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = ['a','b','c']
s = Series(list, index=date)
s.drop('20201-10-15')
```
🔎 새로운 series를 반환


**연산**
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
list = [1,2,3]
s = Series(list, index=date)
print(s + 3)
```

## DataFrame
Dataframe는 2차원 자료구조입니다.
```
from pandas import DataFrame
```
### • DataFrame 만들기
Dataframe은 dictionary, list를 통해 만듭니다.
```
dic = {'a': [1, 2], 'b': [3, 4], 'c': [5, 6]}
df = DataFrame(dic)
```
```
data = [[1, 2], [3, 4], [5, 6]]
columns = ['a', 'b', 'c']
df = DataFrame(data=data, columns=columns)
```
```
data = [
  {'a': 1, 'b': 3, 'c': 5},
  {'a': 2, 'b': 4, 'c': 6},
]
df = DataFrame(data=data)
```

**index / column**
dataframe은 index를 지정할 수 있습니다.
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
dic = {'a': [1, 2], 'b': [3, 4], 'c': [5, 6]}
df = DataFrame(dic, index=date)
```
set_index를 통해, 기존 데이터로 index를 만들 수 있습니다.
```python
dic = {'date': ['2021-10-12', '2021-10-13', '2021-10-14'], 'b': [3, 4, 5], 'c': [6, 7, 8]}
df = DataFrame(dic)
df.set_index('date')
```
dataframe의 크기는 df.columns, df.index, df.shape로 알 수 있습니다.
또한, df.columns, df.index로 column과 index를 바꿀 수 있습니다.

multi index / column


excel을 읽어 만들 수도 있습니다.

**조회**
```python
date= ['2021-10-12', '2021-10-13', '2021-10-14']
dic = {'a': [1, 2], 'b': [3, 4], 'c': [5, 6]}
df = DataFrame(dic, index=date)

# 열 조회
df['a'] # 열을 조회합니다.
df[['a', 'b']] # 여러열을 조회합니다.

# 행조회
df.loc['2021-10-12'] # index로 행을 조회합니다.
df.iloc[0] # 행번호로 행을 조회합니다.

# 특정위치 조회
df.loc['a']['2021-10-12']
df.loc['2021-10-12']['a']
df.loc['2021-10-12', 'a']
```
iloc vs loc
https://stackoverflow.com/questions/31593201/how-are-iloc-and-loc-different

**열 삽입**
열을 삽입할 때는 list / series를 만들고, [] / assign으로 dataframe에 추가합니다.
***\- series**
```python
dic = {'a': [1, 2], 'b': [3, 4], 'c': [5, 6]}
df = DataFrame(dic)
s = Series([7, 8])
df['d'] = s
```
***\- list**
```python
dic = {'a': [1, 2], 'b': [3, 4], 'c': [5, 6]}
df = DataFrame(dic)
l = [7, 8]
df['d'] = s
```
***\- assign**
새로운 dataframe 할당


**행 삽입**
열을 삽입할 때는 dictionary, list를 만들고 [] / assign으로 dataframe에 추가합니다.
https://zephyrus1111.tistory.com/64

### • DataFrame 만들기
**\- apply**
DataFrame의 axis에 대해 연산합니다. (단일 원소가 인자인 함수는 DataFrame의 모든 요소에 연산됩니다.)

```python
df.apply(numpy.sqrt)

df.apply(numpy.sum, axis=0)
df.apply(numpy.sum, axis=1)

df.apply(lambda item: item => 3, axis=0)
```

https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.apply.html


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



### multi index / column

tuple로 접근... df[(col1, col2)] 또는 df[co1, col2]



https://teddylee777.github.io/thoughts/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B6%84%EC%84%9D-%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5-%EC%84%9C%EC%A0%81-%EC%B6%94%EC%B2%9C


pandas dataframe 열추가
https://www.delftstack.com/ko/howto/python-pandas/how-to-add-new-column-to-existing-dataframe-in-python-pandas/


## 연산
### • 차이
**\- diff**
[diff](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.diff.html)를 통해 행간 또는 열간 차이를 계산할 수 있습니다.


### • 누적합
**\- cumsum**


### • 형변환
**\- tolist**
리스트로 바꿉니다.
df.columns.tolist() # 필드명 리스트
df.values.tolist() # 전체 값 리스트(2차원 리스트로 출력)
df.칼럼명.tolist() # 특정 칼럼만 리스트로 출력 
df.index.tolist() # 인덱스 -> 리스트로 출력

## 참고 자료
[• 금융 데이터 분석을 위한 파이썬 Pandas](https://wikidocs.net/45641)
[• DataFrame, ndarray, list, dictionary 형변환](https://ek-koh.github.io/data%20analysis/df-transform/)

dataframe의 한 열은 series로 기존 dataframe의 인덱스도 가져옴


인덱스이름
https://www.delftstack.com/ko/howto/python-pandas/pandas-get-and-set-index-name/