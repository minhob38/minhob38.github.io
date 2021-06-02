---
title: "Length of Longest Substring"
categories: 
  - algorithm
date: 2021-06-02 01:00:00 +0900
last_modified_at: 2021-06-02 01:00:00 +0900
---

중복되지 않는 제일 긴 문자열의 길이를 찾는 문제입니다..  
예로 들어 pwwkew 중복되지 않는 제일 긴 문자열은 abc, bca, cab이며, 이때 문자열 길이는 3입니다.

[Leet Code](https://leetcode.com/problems/longest-substring-without-repeating-characters/submissions/)

### JavaScript 풀이
- 문자열 길이를 계산하기 위해, 중복되지 않는 문자열의 시작 인덱스와 끝 인덱스를 저장합니다.
- 현재 문자가 중복된다면, 시작 인덱스를 중복된 문자의 다음 인덱스로 옮깁니다.
  - 단순히 시작인덱스에 + 1을 한다면, abcb와 같은 경우 cb가 아닌 bcb가 되어 중복이 발생합니다.

```
function lengthOfLongestSubstring(s) {
  const map  = new Map();
  let start = 0;
  let answer = 0;

  for (let i = 0; i < s.length; i++) {
    const cur = s[i]
    const end = i

    if (map.has(cur) && map.get(cur) >= start) {
      start = map.get(cur) + 1;
    }

    const length = end - start + 1;
    answer = length > answer ? length :  answer;

    map.set(cur, i)
  }

  return answer;
}

```
