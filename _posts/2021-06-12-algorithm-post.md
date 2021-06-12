---
title: "Intersection of Two Arrays"
categories: 
  - algorithm
date: 2021-06-12 01:00:00 +0900
last_modified_at: 2021-06-12 01:00:00 +0900
---

배열에 해당 요소를 찾는, 이진 탐색 문제입니다. 

[Leet Code](https://leetcode.com/problems/intersection-of-two-arrays/submissions/)

### JavaScript 풀이
- 중복된 요소를 제거하기 위해 Set을 이용합니다.
- Two Pointer를 사용하기 위해, set을 배열에 담고 오름차순으로 정렬합니다.
- 각 배열에 있는 Pointer를 비교하며 이동시킵니다.

``` js
function intersection(nums1, nums2) {
  const answer = [];
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);

  const _set1 = [...set1].sort((a, b) => a - b);
  const _set2 = [...set2].sort((a, b) => a - b);

  let i = 0;
  let j = 0;

  while (i < _set1.length && j < _set2.length) {
    if (_set1[i] > _set2[j]) {
      j++;
    } else if (_set1[i] < _set2[j]) {
      i++;
    } else {
      answer.push(_set1[i]);
      i++;
      j++;
    }
  }

  return answer;
}

```
