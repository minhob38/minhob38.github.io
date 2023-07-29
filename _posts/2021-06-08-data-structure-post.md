---
title: "Data Structure / Algorithm"
categories: 
  - programming
date: 2023-03-27 01:00:00 +0900
last_modified_at: 2021-06-08 01:00:00 +0900
---

# 자료구조 / 알고리즘 개요
자료구조란 컴퓨터공학에서 데이터를 표현(저장)하는 형태를 의미하며, 알고리즘이란 자료구조를 어떻게 다룰지를 의미합니다. 컴퓨터는 단어 그대로 계산기를 의미하며, 프로그래밍을 통해 데이터를 저장하고, 저장된 데이터를 처리하여 연산을 합니다. 따라서 어떻게 데이터를 저장하고 처리하는지가 시간(연산속도), 공간(메모리 공간) 측면에서 중요합니다. 이에 대해 다루는 것이 자료구조/알고리즘입니다.

[자료 구조](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)

## 시간 / 공간 복잡도

자료구조/알고리즘에 따라 컴퓨터의 연산 성능이 달라지며 성능을 높이는 것이 중요합니다. 따라서 자료구조/알고리즘을 시간(연산속도), 공간(메모리 공간) 기준에서 평가합니다.

### 시간 복잡도 (Time Complexity)

알고리즘의 연산 시간 결과를 의미합니다. 하지만, 실제 연산 시간을 재는 것은 어렵기 때문에 데이타 수(n)에 대한 연산횟수(T(n))로 시간 복잡도를 계산합니다. (보수적으로 연산횟수는 최대 연산횟수로 가정합니다.)

- **빅오(Big-O) 표기법**

시간복잡도 함수T(n)을 정확히 구하는 것은 어렵습니다. 또한 알고리즘 평가에서 정확한 값보다 데이터 수 증가에 따른 연산횟수의 증가 형태(점근 상한)가 중요합니다. 따라서, T(n)의 근사치 함수인 Big-O를 통해 시간복잡도를 평가합니다.

- **빅오 규칙**

- 계수법칙

`f(n) = 3n → O(n)`

- 합의 법칙

`f(n) = O(p(n)), g(n) = O(q(n)) → f(n) + g(n) = O(p(n) + q(n))`

- 곱의 법칙

`f(n) = O(p(n)), g(n) = O(q(n)) → f(n) x g(n) = O(p(n) x q(n))`

- 전이 법칙

`f(n) = O(p(n)), p(n) = O(h(n)) → f(n) = O(h(n))`

- 다항 법칙

`f(n) = n³ + n² + n + 1 → O(n³)`

- **빅오 종류**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0fe6676c-fcf6-47ca-b9fa-fd5ae1fe5b28/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0fe6676c-fcf6-47ca-b9fa-fd5ae1fe5b28/Untitled.png)

O(1) : 상수형 빅오

O(logn) : 로그형 빅오

O(n) : 선형 빅오

O(nlogn) :선형 로그형 빅오

O(n²)

O(n³)

O(2ⁿ) : 지수형 빅오

**※ 빅오 수학적 이론**

- 수학적 표현

$x>=x_0~일때~|f(x)|<M|g(x)|를~만족시키는 ~양의~실수~x_0과~M이~존재할때~f(x)=O(g(x))이다.$

   - 데이터 수 증가에 따른 연산 횟수의 상한 선을 표현

  예) 어떤 알고리즘의 복잡도가 5n² + 3n이라고 할때, 이 복잡도(의 증가 추세)는 n²보다 작음

[점근 표기법](https://ko.wikipedia.org/wiki/%EC%A0%90%EA%B7%BC_%ED%91%9C%EA%B8%B0%EB%B2%95)

[점근 표기법(asymptotic notation)](https://ratsgo.github.io/data%20structure&algorithm/2017/09/13/asymptotic/)

- f(n) = O(g(n))은 "f(n)의 점근 상한은 g(n)이다"를 의미합니다,

- 빅오표기법(f(g(x)))은 점근표기법 중 하나로, 함수 f(x)를 상한점근g(x)으로 단순화하여 표현

- 점근표기법은 정확한 값이 아닌, 증가추세를 단순화하여 나타내는 해석학

- **자료구조 별 빅오**

[Know Thy Complexities!](https://www.bigocheatsheet.com/)
