---
layout: post
title: "Remove Duplicate Letters"
categories: 
  - algorithm
tags: 
  - recursive
date: 2021-05-31 12:30:00 +0900
---

# Alogrithm

## Remove Duplicate Letters
문자열을 lexicographical order (사전적 순서)를 유지하며 중복된 문자열을 제거하는 문제입니다.  
예로 들어 cbacdcbc를 문제 조건에 따라 중복문자를 제거하면 acdb가 되어야 합니다.  
[Leet Code](https://leetcode.com/problems/remove-duplicate-letters)

### JavaScript 풀이
- 중복을 다루기 위해 set 자료형을 사용하며, lexicographical order 요구조건을 위해 set에 담긴 원소들을 배열에 담아 정렬합니다.
- lexicographical order 순서에 따른 기준 문자열을 정의한 뒤, 뒤 문자열과 앞 문자열의 set이 같다면 앞문자열을 삭제합니다.
  - 뒤 문자열이 앞 문자열을 가지고 있으므로 중복된 문자열을 제거할 수 있습니다.
  - lexicographical order 순서이므로, 앞 문자열을 삭제해야 순서가 보장됩니다.
- 뒤 문자열에 기준 문자열을 제거한 뒤, 해당 함수를 재귀로 호출합니다.


```
function removeDuplicateLetters(s) {
  const set = new Set(s);
  const sets = [...set].sort();

  for (let i = 0; i < sets.length; i++) {
    const suffix = s.slice(s.indexOf(sets[i]));
    const suffixs = [...new Set(suffix)].sort();

    if (suffixs.join("") === sets.join("")) {
      const reg = new RegExp(`${sets[i]}`, "g");

      return sets[i] + removeDuplicateLetters(suffix.replace(reg, ""));
    }
  }

  return "";
}

```
