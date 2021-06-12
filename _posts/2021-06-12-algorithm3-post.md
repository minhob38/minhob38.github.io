---
title: "Search a 2D Matrix II"
categories: 
  - algorithm
date: 2021-06-12 01:00:00 +0900
last_modified_at: 2021-06-12 01:00:00 +0900
---

2차원 행렬에서 합이 목표값을 찾는 문제입니다. 

[Leet Code](https://leetcode.com/problems/search-a-2d-matrix-ii)

### JavaScript 풀이
- 행렬이 정렬되어 있으므로 목표값이 해당 요소보다 크면, 다음 행으로 이동합니다.
- 행렬이 정렬되어 있으므로 목표값이 해당 요소보다 작으면, 해당 요소의 열을 넘을 수 없습니다.
- 위 두조건을 활용하기 위해 첫행 마지막열부터 탐색을 시작합니다.

``` js
function searchMatrix(matrix, target) {
  let row = 0;
  let column = matrix[row].length - 1;

  while (row < matrix.length && column >= 0) {
    if (matrix[row][column] === target) {
      return true
    }

    if (matrix[row][column] > target) {
      column--;
    } else if (matrix[row][column] < target) {
      row++;
    }
  }

  return false;
}

```
