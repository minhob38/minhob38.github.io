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
`"start": tsc & nodemon -e ts --exec ts-node server.ts"`
```js
// tsconfig.json
{
  "compilerOptions": {
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

**\- intersection**  
type을 조합하여, 또 다른 type을 정의합니다.
```js
type A = {
  k: string,
  p: string,
  q: number
};

type B = {
  k: string,
  m: string,
  n: boolean
};

type C = A & B;

const c: C = {
  k: 'typescript',
  p: 'hello',
  q: 1,
  m: 'typescript',
  n: true
};
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

**\- Optional**
해당 변수가 있거나 없거나의 type을 선택적으로 정의합니다.
```js
interface M {
  a: string;
  b?: string;
}

const c: M = {
  a: 'hello'
}

```

**\- TypeGuard**
**\- !**


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
typescript는 class를 type으로 가질 수 있습니다.
```js
class Vehicle {
  color: string;
  constructor (color: string) {
    this.color = color;
  }
}

const vehicle: Vehicle = new Vehicle('red')

console.log(vehicle.color); // non error
console.log(vehicle.wheel); // error
```


**\- constructor**  
Vehicle의 인스턴스를 초기화하기 위해, constructor의 매개변수 및 멤버변수 type을 정의해주어야 합니다.
```js
class Vehicle {
  color: string;

  constructor (color: string) {
    this.color = color;
  }
}

const vehicle: Vehicle = new Vehicle('blue');
```

**\- 메소드**  
this의 type을 정의해주는 것을 제외하고, 함수 type 정의와 같습니다.
```js
class Vehicle {
  ignite(ignition: boolean): void {
      if (ignition) {
        console.log('start');
      }
  }

  inform(this: Vehicle) {
      console.log(this)
  }
}

const vehicle: Vehicle = new Vehicle()
const mockVehicle = {
  inform: vehicle.inform
}

vehicle.inform(); // non error
mockVehicle.inform(); // error
```

**\- 상속**  
this의 type을 정의해주는 것을 제외하고, 함수 type 정의와 같습니다.
```js
class Vehicle {
  color: string;

  constructor (color: string) {
    this.color = color;
  }

  ignite(ignition: boolean): void {
      if (ignition) {
        console.log('start');
      }
  }

  inform(this: Vehicle) {
      console.log(this)
  }
}

class Car extends Vehicle {
  model: string;
  constructor (color: string, model: string) {
    super(color);
    this.model = model;
  }
}

const carA: Vehicle = new Car('blue', 'i30');
const carB: Car = new Car('black', 'tesla s');

carA.inform()
carB.inform()

console.log(carA.model); // error
console.log(carB.model); // non error
```

**\- public / private / protected**  
접근권한에 따라 public, private, protected로 변수를 선언할 수 있습니다. public은 외부/같은 클래스/자식 클래스, private는 같은 클래스, protected는 같은 클래스/자식 클래스에서 접근이 가능합니다.
```js
class Vehicle {
  public color: string;
  private _price: number;
  protected _owner: string;

  constructor (color: string, price: number, owner: string) {
    this.color = color;
    this._price = price;
    this._owner = owner;
  }

  get(this: Vehicle) {
    console.log(this.color); // non error
    console.log(this._price); // non error
    console.log(this._owner); // non error
  }
}

class Car extends Vehicle {
  model: string;
  constructor (color: string, price: number, owner: string, model: string) {
    super(color, price, owner);
    this.model = model;
  }
  get(this: Car) {
      console.log(this.color); // non error
      console.log(this._price); // error
      console.log(this._owner); // non error
  }
}

const vehicle: Vehicle = new Vehicle('blue', 1000, 'me');
const car: Car = new Car('blue', 1000, 'me', 'i30');

console.log(vehicle.color) // non error
console.log(vehicle.price) // error
console.log(vehicle.owner) // error

console.log(car.color) // non error
console.log(car.price) // error
console.log(car.owner) // error

```

**\- readonly**  
readonly는 읽기만 가능한 type입니다.
```js
class Vehicle {
  readonly color: string;
  model: string;

  constructor (color: string, model: string) {
    this.color = color;
    this.model = model;
  }
}
const vehicle: Vehicle = new Vehicle('blue', 'i30');

vehicle.model = 'tesla s'; // non error
vehicle.color = 'black'; // error
```


🔎 public / private / protected / readonly 키워드를 constructor 매개변수에 정의하면, 초기화를 하지 않아도 됩니다.
```js
class Vehicle {
  color: string;
  price: number;
  owner: string;
  model: string;

  constructor (color: string, price: number, owner: string, model: string) {
    this.color = color;
    this.price = price;
    this.owner = owner;
    this.model = model;
  }
}

const vehicle: Vehicle = new Vehicle('blue', 1000, 'me', 'i30);
```
```js
class Vehicle {
  constructor (public color: string, private price: number, protected owner: string, readonly model: string) {
  }
}

const vehicle: Vehicle = new Vehicle('blue', 1000, 'me', 'i30);
```

### • Interface
객체의 구조(인터페이스) 타입을 정의합니다. type가 유사하지만 명확히 타입을지정할 수 있으며 class interface와 함께 사용될 수 있습니다.  
```js
interface Vehicle {
  color: string;
}

const vehicle: Vehicle = { color: 'blue' };
```

**\- extends**  
interface는 class처럼 type을 상속받을 수 있습니다.
```js
interface Vehicle {
  color: string;
}

interface Car extends Vehicle{
  model: string;
}

const vehicle: Vehicle = { color: 'blue' };
const car: Car = { color: 'blue', model: 'i30' };
```

**\- implements**  
interface는 class처럼 type을 정의할 수 있습니다. (interface에 없는 멤버, 메소드를 허용합니다.)
```js
interface IVehicle {
  color: string;
}

class Vehicle implements IVehicle {
  color: string;
  model: string; // non error
  constructor (color: string, model: string) {
    this.color = color;
    this.model = model;
  }
}

const vehicle: Vehicle = { color: 'blue', model: 'i30' };
```

## Type Casting
외부에서 오는 변수처럼, 해당 변수의 type을 모를때 type casting을 합니다.

아래 코드에서 typescript는 $input이 input dom인지 알 수 없기에 오류가 발생합니다.
```js
const $input = document.getElementById('input');
$input.value = 'hello'; // error 발생
```
아래처럼 두가지 방식으로 type casting을 하면 올바른 type을 정의하기에 오류가 발생하지 않습니다.
```js
const $input = <HTMLInputElement>document.getElementById('input');
$input.value = 'hello';
```
```js
const $input = document.getElementById('input')! as HTMLInputElement;
// null이 아닐때 !를 붙이고, null일 수 있다면 !를 붙이지 않습니다.
$input.value = 'hello';
```

## Generics
Generic이란...
### • Generic Function 만들기
```js
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "jerry" }, { age: "30" });
```
keyof constraint

```js
function func<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}
```

### • Generic Class 만들기


### • Generic Utillity Type
**\- Partial**
interface b의 모든 key를 optional type으로 정의합니다.
```js
interface b = {
  p: string,
  q: number
};
const a: Partial<b> = {};
```

**\- Readonly**
interface b의 모든 key를 optional type으로 정의합니다.
```js
const a: Readonly<string[]> = ['hello', 'typescript'];
a.push('^___^'); // error
```

## Decorator
Generic이란...


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