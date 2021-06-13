---
title: "Climbing Stairs"
categories: 
  - algorithm
date: 2021-06-13 01:00:00 +0900
last_modified_at: 2021-06-13 01:00:00 +0900
---

계단에 올라갈 수 있는 조합의 수를 구하는 문제입니다.

[Leet Code](https://leetcode.com/problems/climbing-stairs)

### JavaScript 풀이
- 계단에 오르는 방법은 1 step / 2 step 두가지 방법이 있습니다. 따라서 현재 계단의 이전 계단은 1 step 또는 2 step 차이가 있습니다.  
현재 계단이 3층이라면, 이전 계단은 2층과 1층입니다. 따라서 3층에 올라갈 수 있는 경우의 수는 2층과 1층에 올라가는 경우의 수의 합과 같습니다.  
``f(3) = f(2) + f(1)`` 
- 이는 피보나치 수열과 같습니다.
- 피보나치 수열은 Timeout이 발생할 수 있으므로, 이전에 연산된 값을 재연산하지 않도록 Memoization을 해주어야합니다.

🔎 **Memoization**  
아래에서 f(5)를 구할때, 좌항의 f(4), 좌항 f(3), 좌항 f(2)가 먼저 실행되며, Memoization한다면 우항 f(3), f(2)를 별도로 실행하지 않아도 됩니다.
```
f(5) = f(4) + f(3)
f(4) = f(3) + f(2)
f(3) = f(2) + f(1)
```

``` js
// fibonacci numbers
function climbStairs(n) {

  if (n <= 2) {
    return n;
  }

  return climbStairs(n - 1) + climbStairs(n - 2);
}
```

``` js
// memoization
const memo = {};

function climbStairs(n) {
  if (n <= 2) {
    return n;
  }

  memo[n] = (memo[n - 1] || climbStairs(n - 1)) + (memo[n - 2] || climbStairs(n - 2));

  return memo[n];
}
```
