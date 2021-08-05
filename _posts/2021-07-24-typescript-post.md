---
title: "TypeScript"
categories: 
  - programming
date: 2021-07-24 01:00:00 +0900
last_modified_at: 2021-07-24 01:00:00 +0900
---

# TypeScript
[TypeScript](https://www.typescriptlang.org/)는 JavaScript의 superset입니다. TypeScript는 새로운 언어가 아니기에 브라우저 또는 nodejs에서 실행되지 않습니다. 다만, type을 정의해주기에 runtime error를 미리 방지할 수 있어 개발에 도움을 줄 수 있습니다.

## 환경설정
### • 설치하기
npm을 통해 typescript를 [설치](https://www.typescriptlang.org/download)합니다.
```
npm install --save-dev typescript
```

### • compile
`tsc [file]`로 typescript에서 javascript로 compile합니다. 또한 `tsc --init`를 실행하여 [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)에 compile 환경을 설정합니다.  
🔎 ts-node 패키지를 통해 typescript를 nodejs에서 편리하게 사용할 수 있습니다.
```js
// tsconfig.json
{
  {
      "strict": true,
      "target": "ES6",
      "lib": ["ES2015", "DOM"],
      "module": "CommonJS"
  }
  "exclude": [
    ***.ts
    *.dev.ts
    node_modules
  ],
  "include": [
    "src/**/*.ts"
  ]
}
```

## Types
typescript는 타입을 정의하여, 정적으로 타입오류를 찾아주어 개발을 편리하게 해줍니다. 이때 보통 변수선언(var/const/let), 함수선언(매개변수, 반환값) 시 타입을 지정해 줍니다.
### • 기본 Type
typescript는 기본 type으로 number, string, boolean, object, array, tuple, enum, any, union, literal을 가지고 있으며, `: type`으로 타입을 정의해줍니다.  
🔎 typescript는 변수 초기화 시, 별도로 `: type`을 하지 않아도 타입을 지정합니다.

**\- number**  
숫자 type입니다.(정수, 실수를 구분하지 않습니다.)  
```
let a: number;
```
**\- string**  
문자열 type입니다.  
```
let a: string;
```
**\- boolean**  
불리언(true/false) type입니다.(truthy, falsy는 해당되지 않습니다.)  
```
let a: boolean;
``` 
**\- object**  
객체 type입니다.
```
const obj: {
  a: string,
  b: number
} = {
  a: 'hello',
  b: 1
}
```
**\- array**  
배열 type입니다.
```js
const a: string[] = ['hello', 'typescript'];
const a: Array<string> = ['hello', 'typescript'];
const c: any[] = ['hello', 1];
```
**\- tuple**  
튜플(고정된 길이의 배열) type입니다.  
🔎 tuple은 push/pop/unshift/shift/splice는 검사하지 않습니다.
```js
const a: [number, string] = ['hello', 1];
a[2] = 'typescript'; //error
a.push(3); // non error
```

**\- enum**  
열거형 type입니다.  
🔎 코드 가독성을 위해 enum을 쓰며, 초기화를 하지않을 경우 0부터 오름차순으로 초기화됩니다.
```js
enum A { p = 'hello', q = 'typescript' };
```

**\- any**  
지정되지 않은 type입니다.
```js
const a: any
```

**\- unknown**  
지정되지 않은 type입니다.
🔎 any처럼 모든 type을 받을 수 있지만 지정된 typescript형식의 변수를 담는건 안되며 type을 개발자가 지정하여 사용해야 합니다. 또한 객체 key에
```js
let a: unknown;
let b: number = 1;
a = 1; // non error
a = 'hello'; //non error
a = b; // error

if (typeof a === 'string') {
  a.indexOf('k');
}
```

**\- union**  
조합된 type입니다.
```js
let a: number | string;
a = 1;
a = 'hello';
```

**\- literal**  
literal type입니다.
```js
let a: 'hello' | 3 | 'typescript';
a = 'hello';
a = 3;
a = 'typescript';
```

**\- never**  
절대 생기지 않는 값의 type입니다. 일반적으로 함수가 return으로 끝나지 않고 throw로 끝날때 정의합니다.
```js
function func(): never {
  throw new Error();
}

function func(): void {
  throw new Error();
}
```

### • Type Alias
type을 alias할 수 있습니다.
```js
type A = number | string;
let b: A;
```

### • Function Type
**\- 매개변수/반환값 type**  
함수 매개변수/반환값에 type을 지정하여 함수 type을 정의합니다..
```js
let a: Function;
a = function () {};
```
```js
let a: (m: number, n: true) => string;
a = function (p, q) {
  if (n) {
    return m.toString();
  }

  return 'hello';
};
```

```js
function func(a: number, b: number): number {
  return a + b;
}

function func(a: number, b: number): void {
  console.log('hello typescript');
}

function func(a: number, b: number): void {
  return;
}

// 사용하지 않는 형태
function func(a: number, b: number): undefined {
  return;
}
```

```js
function func(m: string, cb: (n: string) => void): void {
  cb(m.toString());
};
```
## Class & Interface
### • Class
```js
class M {
  c: string;
  private d: string[] = [];

  constructor(b: string) {
    this.c = b;
  }

  func(this: M) {
    console.log(this.c);
  }
}

const m = new M('hello')
```
readonly
은닉화 (메소드로만 조작해야하는걸 숨김)

### • Interface
객체의 구조(인터페이스) 타입을 정의합니다. type가 유사하지만 명확히 타입을지정할 수 있으며 class interface와 함께 사용될 수 있습니다.  
```
interface M {
  a: string;
  b: number;
  func(c: number): string {

  }
}

const d: M = {
  a: 'hello',
  b: 1,
  func(c: number): string {

  }
}
```

**\- Optional**
```
interface M {
  a: string;
  b?: string;
}

const c: M = 

```


JavaScript vs TypesScript
JavaScript는 동적타입 프로그래밍 언어이기에, 아래와 같이 런타임에 오류가 발생합니다. 반면 TypeScript는 정적타입 프로그래밍 언어이기에 컴파일 시 오류가 발생합니다.
```js
function func(n) {
  if (typeof n !== 'number') {
    throw new Error();
  }

  console.log(n)
}

func('3');
```

```js
function func(n: number) {
  console.log(n);
}

func('3');
```

타입스크립트 원시형자료형은 소문자입니다. (Number X number O)


타입스크립트에서 변수 선언 시, 초기화를 하지 않으면 any로 지정됩니다.
```js
let n;
n = 3;
n = 5;
```
반면, 초기화를 하면 할당된 변수에 맞게 타입이 지정되며 아래 두 코드는 같은 코드입니다.
```js
let n = 3;
n = 5;
n '5'; // error
```

```js
let n: number;
n = 3;
n = 5;
n '5'; // error
```

https://hyunseob.github.io/2017/12/12/typescript-type-inteference-and-type-assertion/

타입단언