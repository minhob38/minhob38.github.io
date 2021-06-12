---
title: "Maximum Subarray"
categories: 
  - algorithm
date: 2021-06-12 01:00:00 +0900
last_modified_at: 2021-06-12 01:00:00 +0900
---

인접한 요소들로 구성된 sub array의 최대값을 구하는 문제입니다. 

[Leet Code](https://leetcode.com/problems/maximum-subarray)

### JavaScript 풀이
- sub array의 합이 음수면, 이후 요소를 해당 sub array에 넣어도 합은 최대가 될 수 없습니다.
- sub array의 합이 음수면, 해당 sub array를 버리고 새로운 sub array를 만들어 합을 구합니다.
- 음수에 대응하기 위해, 초기 최대값은 단일 요소의 최대값으로 합니다.

``` js
function maxSubArray(nums) {
  let sum = 0;
  let max = Math.max(...nums);

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (sum < 0) {
      sum = 0;
    } else {
      if (max < sum) {
        max = sum;
      }
    }
  }

  return max;
}

```
