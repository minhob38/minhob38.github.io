---
title: "Synchronous / Asynchronous"
categories: 
  - programming
date: 2021-06-04 01:00:00 +0900
last_modified_at: 2021-06-04 01:00:00 +0900
---

## 동기 / 비동기 개념

자바스크립트는 동기(Synchronous), 비동기(Asynchronous) 두가지 방법으로 코드가 실행됩니다. 아래 두 코드를 보며 차이점에 대해 알아보겠습니다.

**동기실행은 현재 코드 실행이 완료된 후, 다음 코드를 실행합니다.** 따라서 아래 결과는 A → B → C 순서로 출력됩니다.

```jsx
function funcA() {
    console.log('A');
}

function funcB() {
  console.log('B');
}

function funcC() {
  console.log('C');
}

funcA();
funcB();
funcC();**비동기 : 현재 코드 실행 완료와 상관없이, 다음 코드 실행**
```

**비동기실행은 현재 코드 실행이 완료와 관계없이, 다음 코드를 실행합니다.** 따라서 아래 결과는 B → C → A 순서로 출력됩니다.

```jsx
function funcA() {
  setTimeout(function () {
    console.log('A');
  }, 1000);
}

function funcB() {
  console.log('B');
}

function funcC() {
  console.log('C');
}

funcA();
funcB();
funcC();
```

이러한 비동기프로그래밍을 위해서, 비동기 콜백, 프로미스 등 비동기 코드를 사용해야 합니다.

비동기 프로그래밍을 깊이 이해하기 위해, 먼저 Event Loop에 대한 이해가 필요합니다.

브라우저는 아래와 같이 자바스크립트 엔진, Web API, Callback Queue로 이루어져 있습니다.

- 자바스크립트 엔진 : 자바스크립트를 실행하기 위한 소프트웨어입니다. 이를 위해 Memory Heap(변수, 함수 저장), Call Stack(코드)로 이루어져 있습니다.
- Web API : 자바스크립트와의 연동을 위해 브라우저에서 제공하는 API로, DOM, AJAX, TimeOut 등이 있습니다.
- Callback Queue : 비동기적으로 실행된 콜백함수가 저장되는 곳입니다.

자바스크립트 엔진은 Call Stack에 있는 함수를 순차적으로 실행하며, 비동기적으로 실행되는 콜백함수가 호출되면 이를 Callback Queue에 저장합니다. Event Loop는 Call Stack이 비어있는지 확인하여 비어있을 경우 Callback Queue에 쌓여 있는 함수를 실행합니다.

[](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

![%E1%84%87%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC%E1%84%80%E1%85%B5%20(Promise%20Async)%20d28c51753a8844e7b5f4fa3228cb732d/Untitled.png](%E1%84%87%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC%E1%84%80%E1%85%B5%20(Promise%20Async)%20d28c51753a8844e7b5f4fa3228cb732d/Untitled.png)

이러한 Event Loop에 대한 이해를 바탕으로, 아래 코드를 살펴보겠습니다. funcA를 실행하면 비동기 콜백함수 callback이 호출되고 WEB API가 0ms가 지난 후 Callback Queue에 등록시킵니다. funcB는 callback의 실행완료와 관계없이 먼저 실행되고, funcC는 funcB의 실행 종료 후 실행됩니다. funcC 실행이 끝나면 Call Stack이 비고 Callback Queue에서 대기하고 있던 callback이 실행됩니다. 이러한 흐름으로 A → B → C가 아닌 B → C → A로 출력됩니다.

```jsx
function funcA() {
  setTimeout(function callback() {
    console.log('A');
  }, 0);
}

function funcB() {
  console.log('B');
}

function funcC() {
  console.log('C');
}

funcA();
funcB();
funcC();
```

## 비동기 제어

프로그램을 만들다 보면, 비동기 코드를 동기처리 할 필요가 있습니다. 이를 위해 콜백함수를 사용합니다. 콜백함수란 다른 함수의 인자로 넘겨지는 함수를 의미하며 동기 콜백함수와 비동기 콜백함수가 있습니다.

- 동기 콜백 함수

```jsx
function syncFunction(callback) {
  callback();
}

syncFunction(() => {
  console.log('synchronous callback')
});
```

- 비동기 콜백 함수

```jsx
setTimeout(() => {
  console.log('Asynchronous callback')
}, 1000);
```

콜백함수를 통한 비동기 흐름 제어에 대해 살펴보겠습니다. 예로 들어 funcA(비동기) → funcB(동기) → funcC(동기) 순서로 실행되도록 프로그램을 만들고 싶다면 어떻게 해야할까요? 별도로 비동기 흐름을 제어하지 않고 funcA, funcB, funcC 순서로 실행시킨다면 이상한 결과가 나올 것입니다. 이를 해결하기 위해 비동기 함수에 동기 함수를 콜백으로 넘겨주고 중첩함으로써 비동기 흐름을 제어합니다. 아래 코드는 1초뒤에 A → B → C 순서로 출력시키는 코드이다.

```jsx
function funcA(callback) {
  setTimeout(function () {
    console.log('A');
    callback();
  }, 1000);
}

function funcB(callback) {
  console.log('B');
  callback();
}

function funcC() {
  console.log('C');
}

funcA(function() {
  funcB(function() {
    funcC();
  });
});
```

`func() → function() {func()})` (함수인자에 실행된 함수를 넣을 수 없으므로, 익명함수로 감싸서 전달합니다.)

`funcA(funcB(funcC))`로 함수를 호출한다면, 인자가 함수 `funcB`를 전달받는 것이 아닌 `funcB(funcC)`의 반환값이 전달됩니다.

하지만 콜백함수를 통한 비동기 흐름 제어를 하면, 프로그램이 커질수록  콜백함수 전달이 반복되어 코드가 복잡해집니다. 이를 콜백헬(Callback Hell)이라 부르며 아래코드는 콜백헬 코드입니다. 

```jsx
setTimeout(function(){
  console.log('hello');
  setTimeout(function(){
    console.log('bye');
    setTimeout(function(){
      console.log('world');
    }, 1000);
  }, 1000);
}, 1000);
```

콜백함수를 기명함수로 바꾸고, 하나의 함수에서 하나의 콜백함수만 호출하도록 함수를 나누어 콜백헬을 해결할 수 있습니다. 아래는 위 콜백헬 코드를 기술한 방법으로 바꾼 코드입니다.

```jsx
function funcA() {
  console.log('hello');
  setTimeout(funcB, 1000);
}

function funcB() {
  console.log('bye');
  setTimeout(funcC, 1000);
}

function funcC() {
  console.log('world');
}

setTimeout(funcA, 1000);
```
