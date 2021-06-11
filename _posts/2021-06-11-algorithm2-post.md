---
title: "Search in Rotated Array"
categories: 
  - algorithm
date: 2021-06-11 01:00:00 +0900
last_modified_at: 2021-06-11 01:00:00 +0900
---

배열에 해당 요소를 찾는, 이진 탐색 문제입니다. 

[Leet Code](https://leetcode.com/problems/search-in-rotated-sorted-array/submissions/)

### JavaScript 풀이
- 회전 배열(Rotated Array)의 정의는 다음과 같습니다.
[a, b, c, pivot, d, e] → [pivot, d, e, a, b, c]
- 배열을 반으로 나누고, 정렬되어 있는 배열(왼쪽/오른쪽)에서 찾는 값이 있으면 탐색 범위를 바꿉니다.

```
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[left] <= nums[mid]) {
      if (nums[mid] > target && nums[left] <= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && nums[right] >=target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

```
