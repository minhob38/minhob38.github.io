---
title: "깊은 복사 / 얕은 복사"
categories: 
  - programming
date: 2023-03-14 01:00:00 +0900
last_modified_at: 2021-06-07 01:00:00 +0900
---

### 얕은 복사 / 깊은복사
문서는 복사를 왜 할까요? 원본을 보호하거나 여러 사람이 볼 수 있게 하기 위해 복사를 합니다. 다른 사람이 복사본을 수정하여도 원본은 변경되지 않으며 반대로 원본을 수정해도 복사본은 변경되지 않습니다. 이처럼 프로그래밍에서도 원변수를 보호하기 위해 다른 변수에 복사를 합니다. 아래 예를 통해 프로그래밍에서 복사에 대해 자세히 살펴보겠습니다.

아래는 a를 복사하여 b를 만드는 코드입니다. b는 복사본이기 때문에 b를 바꿔도 a가 변경되지 않습니다.

```jsx
const a = 1;
const b = a;
b = 2;
console.log(a) // 1
```

하지만, 객체의 경우엔 a를 복사하여 b를 만들지라도, 같은 주소를 참조하기 때문에 서로 영향을 주게됩니다. 따라서 이를 복사라 하지 않고 참조라고 합니다. (😅 아래 코드가 복사인지 참조인지에 대해서는 의견이 분분합니다.)

```jsx
const a = {name: 'minho'};
const b = a;
b.name = 'jerry';
console.log(a.name); // jerry 
```

- **얕은 복사**

얕은 복사는 Object.assign, spread 연산자를 통해 할 수 있습니다.

아래 코드를 보면 objA를 새로운 빈 객체인 emptyObj에 담아 objB를 만들었습니다. 따라서 objA와 objB는 서로 독립적이기 때문에 복사가 되었습니다.

```jsx
const emptyObj = {}
const objA = {name: 'minho'};
const objB = Object.assign(emptyObj, objA);

objB.name = 'jerry';
console.log(objA.name); // minho
```

그렇다면 아래 코드는 어떨까요? objB에서 objC를 수정한것을 볼 수 있습니다. 이처럼 객체를 한단계만 복사하는 것을 얕은 복사라고 하며, 모든 단계를 복사하는 것을 깊은 복사라 합니다.

```jsx
const emptyObj = {}
const objC = {computer: 'macbook'};
const objA = {name: 'minho', objC};
const objB = Object.assign(emptyObj, objA);

objB.objC.computer = 'gram';
console.log(objA.objC.computer); // gram
```

- **깊은 복사**

원변수(객체)를 위해 얕은 복사가 아닌, 모든 변수를 참조가 아닌 복사를 하는 깊은 복사가 필요합니다. 깊은 복사는 JSON, 재귀, 라이브러리(loadash의 deepclone)을 통해 할 수 있습니다.

- **JSON**

    객체를 JSON 형식으로 바꾸면서 모든 참조가 끊어지며, 다시 객체로 바꾸어 깊은 복사를 합니다.

    😺  객체를 JSON 형식으로 바꾸면서 함수, undefined 등은 사라지기 때문에 완전한 방법은 아닙니다.

    ```jsx
    objA = {
      a: 1,
      b: {c: 'hello'}
    }

    const objB = JSON.parse(JSON.stringfy(obj));
    ```

- **재귀**

    객체/배열을 순회하며 복사를 수행하며, 객체/배열안에 객체/배열이 있을 경우 같은 함수를 반복합니다.

    😺 함수도 객체지만 key가 없다고 가정합니다.

    ```jsx
    function deepCopy(obj) {
      const copyObj = Array.isArray(obj) ? [] : {};

      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          copyObj[key] = solution(obj[key]);
        } else {
          copyObj[key] = obj[key];
        }
      }

      return copyObj;
    }
    ```

- **라이브러리**

    lodash의 `cloneDeep`함수를 통해 깊은 복사를 할 수 있습니다.
