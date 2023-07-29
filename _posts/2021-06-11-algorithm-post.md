---
title: "Binary Search"
categories: 
  - algorithm
date: 2023-03-22 01:00:00 +0900
last_modified_at: 2021-06-11 01:00:00 +0900
---

배열에 해당 요소를 찾는, 이진 탐색 문제입니다. 

[Leet Code](https://leetcode.com/problems/binary-search)

### JavaScript 풀이
- 배열은 오름차순 또는 내림차순으로 정렬되어 있어야 합니다.
- 찾는 값이 중간값보다 크면, 중간값 왼쪽은 버리고 오른쪽에서 탐색을 진행합니다.
- 찾는 값이 중간값보다 작으면, 중간값 오른쪽은 버리고 왼쪽에서 탐색을 진행합니다.
- 위 과정을 반복합니다. (재귀 또는 반복문)

```
function search(nums, target) {
  function dfs (left, right) {
    if (left > right) {
      return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > target) {
      return dfs(left, mid - 1);
    } else if (nums[mid] < target) {
      return dfs(mid + 1, right);
    } else if (nums[mid] === target) {
      return mid;
    }
  }

  return dfs(0, nums.length - 1);
}

```
