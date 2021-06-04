---
title: "클로저 & "
categories: 
  - programming
date: 2021-06-05 01:00:00 +0900
last_modified_at: 2021-06-05 01:00:00 +0900
---

## Closure
함수가 실행될 때 실행컨텍스트 만들고 그 실행컨텍스트는 선언환경을 기반으로 만듭니다.

- **정의**

클로저는 아래와 같이 다양하게 정의되고 있습니다.

   - 생명주기가 끝난 외부함수 변수를 참조하는 함수

   - 함수를 선언할 떄 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수

   - “A closure is the combination of a function and the lexical environment within which that function was declared.”

   - 클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다. - MDN

   - 외부함수에 접근할 수 있는 내부함수

이들을 정리하면 다음과 같습니다. 클로저는 함수와 그 함수가 선언되었을 때의 렉시컬 환경과의 조합으로 생기는 현상입니다. 이를 쉽게 말하면 외부 함수에서 선언한 변수를 참조하는 내부함수를, 외부로 전달할 경우 외부함수 실행컨텍스트가 종료되도  외부함수 변수가 사라지지 않는 현상을 의미합니다. 

   **- 내부함수를 외부로 보내는 방법 (return / callback)**

```jsx
let str = 'bye';

function outer() { // outer의 실행컨텍스트
  const str = 'hello';
  
  return function inner() {
    console.log(str);
  }
} // outer의 실행컨텍스트>

const func = outer();

func();
```

```jsx
let str = 'bye';

function outer() {
  const str = 'hello';
  
  setTimeout(function inner() {
    console.log(str);
  }, 1000);
}

const outer();

//1000ms후, inner 실행
```

   **- 하나의 함수 선언 당, 하나의 실행콘텍스트 생성**

```jsx
function outer(str) { // outer의 실행컨텍스트
  let numOuter = 0;

  return function inner() {
    let numInner = 0;
    numInner++;
    numOuter++;
    console.log(`${str}`)
    console.log(`numOuter는 ${numOuter}`)
    console.log(`numInner는 ${numInner}`)
  }
} // outer의 실행컨텍스트>

const funcA = outer('Hello'); //매개변수는 실행될때 할당된다고 생각(실행콘텍스트)
const funcB = outer('Bye');
const funcC = outer('World');

funcA();
funcB();
funcC();
funcC();
```

# 실행컨텍스트(execution context)

- **실행컨텍스트: 실행할 코드에 제공할 환경정보들을 모아놓은 객체(변수/상위스코프/this)**
- **함수 실행환경은 실행 시 선언 환경(Lexical Environment)에 의해 결정됨**

**※실행컨텍스트의 수집 정보**

![nse-8977404420852252105-289.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/45dc46a1-b43a-4093-90d1-e884312157a0/nse-8977404420852252105-289.jpg)

   **- VariableEnvironment:** LexicalEnvironment의 스냅샷

   **- LexicalEnvironment:** 현재 컨텍스트의 식별자 + 외부환경 정보

   **- ThisBInding:** this가 가리키는 객체

## **Lexical Environment (environmentrecord/outerEnvironmentReference)**

```jsx
function outer(C, D) {
  c = 3;
  d = 4;

  function inner(A, B) {
    const a = 1;
    const b = 2;
  }

  inner();
}

outer();

// function inner의 Lexcial Envirionment (Envrionment Record + outerEnvironmentReference)
// function inner의 Envrionment Record :  a, b, A, B, this(global)
// function inner의 outerEnvironmentReference : function outer의 lexical environment
// function outer의 Environment Record : inner, c, d, C, D, this(global)
```

- **Environment Record**

   - 현재 컨텍스트와 관련된 식별자 정보(변수/함수/매개변수)들이 저장됨 (컨텍스 내부 전체를 순서대로 탐색함)

   - 식별자 정보 탐색을 위해, 컨텍스트 내부에서 호이스팅 됨(변수는 선언부, 함수는 선언/할당부가 호이스팅 됨)

- **outerEnvironmentReference**

   - 외부환경정보(상위스코프) *스코프 : 식별자의 유효범위

   - 선언될때 LexicalEnvironment를 참조함 (선언된다는 것은 함수 실행컨텍스트가 활성화 되었을 때, 즉 함수 실행될때)
