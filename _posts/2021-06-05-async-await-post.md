---
title: "async / await"
categories: 
  - programming
date: 2023-03-11 01:00:00 +0900
last_modified_at: 2021-06-05 01:00:00 +0900
---

## async & await
프로미스가 비동기 코드를 동기 코드로 바꾸기 위해 나온것처럼, async & await 또한 더 편한게 코드를 작성하기 위해 도입되었습니다.

- **비동기코드를 동기코드와 유사하게 바꾸어주는 문법**

[async와 await](https://ko.javascript.info/async-await)

- **프로미스 구문을 async/await 구문으로 바꾸면 다음과 같습니다.**

    ```jsx
    function func () {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('hello');
          resolve();
        }, 1000);
      });

      promise.then(() => console.log('bye'));
    }

    func();
    ```

                                                                                 ↓

    ```jsx
    async function func () {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('hello');
          resolve();
        }, 1000);
      });

      await promise;
      
      console.log('bye');
    }

    func();
    ```

### **async**

aync 키워드는 비동기 함수를 정의할 때 쓰이며, 해당 함수는 프로미스([[PromiseState]], [[PromiseResult]])를 반환합니다.

- syntax : `async function() {}` 

 프로미스 반환값은 아래와 같이 then 메소드와 동일합니다.

- return문이 있는 경우, [[PromiseResult]]와 [[PromiseState]]는 반환값과 fulfilled로 반환된다.

- return문이 없는 경우, [[PromiseResult]]와 [[PromiseState]]는 undefined fulfilled로 반환된다.

- 오류가 발생할 경우, [[PromiseResult]]와 [[PromiseState]]는 오류 내용과 rejected로 반환된다.

[async function](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

- **다음은 async 예제 코드입니다.**

    ```jsx
    async function funcA() {
      console.log('A');
      return 'async function';
    }

    async function funcB() {
      console.log('B');
    }

    async function funcC() {
      console.log('C');
      throw new Error('오류');
      return 'async function';
    }

    const A = funcA();
    const B = funcB();
    const C = funcC();
    ```

### **await**

await 키워드는 async 함수 안에서 동작하며, 프로미스가 settled 될 때까지 함수 실행을 멈추게(기다리게) 합니다. (await 다음 코드를 읽고, fullfilled될때까지 코드 실행을 멈춥니다.) 프로미스가 fulfilled되면 멈추었던 코드를 실행하고 [[PromiseResult]]를 반환합니다. (await의 피연산자가 프로미스가 아니면 피연산자 자체를 반환합니다.) 프로미스가 reject되면 오류를 발생시키고 코드 실행을 멈추며, [[PromiseResult]]를 반환합니다.

😺 await은 Promise가 아닌 [[PromiseResult]]를 반환합니다.

- syntax : `await promise` 

[await](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/await)

- **다음은 async, await의 예제 코드입니다.**
    - 프로미스가 fulfilled 되었을때, await 실행

    ```jsx
    async function func() {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('hello');
        }, 3000)
      })

      console.log('before await');
      const result = await promise;
      console.log('after await');
      console.log(`await 결과는 ${result}`);

      return result;
    }

    const promiseOfAsync = func();
    ```

    - 프로미스가 rejected 되었을때, await 실행

    ```jsx
    async function func() {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('hello');
        }, 3000)
      })

      console.log('before await');
      const result = await promise;
      console.log('after await');
      console.log(`await 결과는 ${result}`);

      return result;
    }

    const promiseOfAsync = func();
    ```

    - 반복문

    ```jsx
    async function func () {
      for (let i = 0; i < 5; i++) {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('hello');
            resolve();
          }, 3000);
        });
        
        //promise.then()코드비교!!! 
        await promise;
        //promise.then() (await까지만 기다릴분, 그 후에는 비동기코드(then)은 콜스택에 등록하므로 다른 동기 코드가 먼저 실행됨)
      }
    }

    func();
    console.log('bye') //콜스택 관점 생각
    ```
