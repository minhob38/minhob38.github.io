---
title: "Two Sums (input array is sorted)"
categories: 
  - algorithm
date: 2023-03-19 01:00:00 +0900
last_modified_at: 2021-06-12 01:00:00 +0900
---

정렬된 배열에서 합이 목표와 같은 두 요소를 찾는 문제입니다. 

[Leet Code](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted)

### JavaScript 풀이
- 배열이 정렬되어 있으므로, Two Pointer를 사용할 수 있습니다.
- 두 포인터의 합이 타겟보다 작으면, 왼쪽 포인터를 오른쪽으로 +1 이동시킵니다.  
(오른쪽 포인터가 왼쪽으로 -1 이동하면 수가 더 작아집니다.)

``` js
function twoSum(nums, target) {
  let leftIdx = 0;
  let rightIdx = nums.length - 1;

  while (leftIdx < rightIdx) {
    if (nums[leftIdx] + nums[rightIdx] < target ) {
      leftIdx++;
    } else if (nums[leftIdx] + nums[rightIdx] > target) {
      rightIdx--;
    } else {
      return [leftIdx + 1, rightIdx + 1];
    }
  }
}

```
