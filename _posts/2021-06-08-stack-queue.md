---
title: "Stack / Queue"
categories: 
  - programming
date: 2023-03-26 01:00:00 +0900
last_modified_at: 2021-06-08 01:00:00 +0900
---

# 스택 & 큐
## 스택 (stack)
스택은 선형구조로써 뜻 그대로 데이터를 쌓으면서 저장하는 방법입니다.

예로들어, 구슬통에 구슬(구슬통 지름과 구슬 지름은 비슷하다)을 넣고 빼는 동작들이 스택의 특징과 같다 할 수 있습니다. 구슬을 아래순서로 넣었을때, 빼는 순서는 역순이 됩니다. 이러한 특징으로 스택은 LIFO(Last In First Out), 후입선출 특징을 가집니다.

구슬을 넣을 때: 빨간 구슬 → 노란 구슬 → 파란 구슬 → 주황 구슬 → 초록 구슬

구슬을 뺄 때 : 초록 구슬 → 주황 구슬 → 파란 구슬 → 노란 구슬 → 빨간 구슬

### 예시

- Undo/Redo Mechanism
- Backwards/Forwards Mechanism of Browsers
- Call Stack

### 빅오

스택의 추가 빅오는 O(1), 삭제 빅오는 O(1), 탐색의 빅오는 O(n)입니다.

### 스택 코드

- **JavaScript**
    - 스택은 top 속성과  add, remove, contain 메소드를 가집니다.

    ```jsx
    function Stack () {
      const stack = {};
      const storage = [];

      stack.top = null;

      stack.add = function (value) {
        storage.push(value);
        stack.top = value;
      }

      stack.remove = function () {
        if (storage.length === 0) {
          return;
        }

        storage.pop();
        stack.top = storage[storage.length - 1] === undefined
          ? null
          : storage[storage.length - 1];
      }

      stack.contain = function (value) {
        for (let i = 0; i < storage.length; i++) {
          if (storage[i] === value) {
            return true;
          }
        }

        return false;
      }

      return stack;
    }
    ```

## 큐 (queue)

큐 또한 선형구조로써 뜻 그대로 데이터를 줄세우며 저장하는 방법입니다.

예로들어, 파이프에 구슬(구슬통 지름과 구슬 지름은 비슷하다)을 넣고 빼는 동작들이 스택의 특징과 같다 할 수 있습니다. 구슬을 아래순서로 넣었을때, 빼는 순서는 순서대로 됩니다. 이러한 특징으로 스택은 FIFO(First In First Out), 선입선출 특징을 가집니다.

구슬을 넣을 때: 빨간 구슬 → 노란 구슬 → 파란 구슬 → 주황 구슬 → 초록 구슬

구슬을 뺄 때 : 빨간 구슬 → 노란 구슬 → 파란 구슬 → 주황 구슬 → 초록 구슬

### 예시

- Line of people standing for food
- Callback queue

### 빅오

스택의 추가 빅오는 O(1), 삭제 빅오는 O(1), 탐색의 빅오는 O(n)입니다.

### 큐 코드

- **JavaScript**
    - 큐는 bottom 속성과  add, remove, contain 메소드를 가집니다.

    ```jsx
    function Queue () {
      const queue = {};
      const storage = [];

      queue.bottom = null;

      queue.add = function (value) {
        storage.unshift(value);
        queue.bottom = storage[storage.length - 1];
      }

      queue.remove = function () {
        storage.pop();
        queue.bottom = storage[storage.length - 1] === undefined
          ? null
          : storage[storage.length - 1];
      }

      queue.contain = function (value) {
        for (let i = 0; i < storage.length; i++) {
          if (storage[i] === value) {
            return true;
          }
        }

        return false;
      }

      return queue;
    }
    ```
