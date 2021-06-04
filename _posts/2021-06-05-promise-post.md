---
title: "promise"
categories: 
  - programming
date: 2021-06-05 01:00:00 +0900
last_modified_at: 2021-06-05 01:00:00 +0900
---

## 프로미스

프로그램을 만들때 동기 코드가 비동기 코드에 비해 이해하기 쉽습니다. 따라서 비동기 코드를 동기 코드로 바꾸기 위해 여러가지 노력이 있었으며, 그 결과 ES6부터 프로미스가 도입되었습니다. 프로미스는 비동기 작업의 결과([[PromiseState]], [[PromiseResult]])를 담고있는 객체를 의미합니다.

😺 [[PromiseState ]] → fulfilled / rejected / pending [[PromiseResult]] → value

📔 **참고자료** : [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

📔 **참고자료** : [https://javascript.info/promise-basics](https://javascript.info/promise-basics)

📔 **참고자료** : [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)

### 프로미스 만들기

프로미스 객체는 생성자 함수 Promise로 만듭니다. 생성자 함수 Promise는 인자로 실행자함수(executor)를 전달 받으며, 실행자 함수의 매개변수는 resolve 함수와 reject 함수입니다. (일반적으로 resolve 함수에 인자로 some value를, reject 함수에 인자로 failure reason을 전달해줍니다.) 아래는 프로미스 객체를 만드는 코드입니다.

```jsx
const promise = new Promise(function(resolve, reject){
  console.log('Promise는 생성자 함수');
  console.dir(resolve);
  console.dir(reject);
});
```

프로미스 객체의 상태인 [[PromiseState]]는 세가지 값 "(1)대기(Pending) (2)성공(Fulfilled) (3)실패(Rejected)" 을 가집니다. 처음 프로미스 객체가 만들어지면 pending 상태이며, resolve함수가 호출되면 fulfilled로 바뀝니다. 반대로 reject함수가 호출되면 rejected로 바뀝니다. 프로미스 상태는 처음으로 호출되는 함수(resolve / reject)에 의해 결정되며 이후에 바뀌지 않습니다. 또한 프로미스의 객체의 값인 [[PromiseResult]]는 undefined에서 실행된 resolve / reject의 인자로 바뀝니다. 다음은 위에서 설명한 내용을 보여주는 코드입니다.

- **🔎 Promise State / Promise Result 예제 코드**
    - **resolve가 실행되면 프로미스 객체는 pending → fulfilled, undefined → successed로 바뀝니다.**

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('successed');
        console.log(promise);
      }, 3000)
    //  console.log(promise); promise 할당이 끝나기 전에 출력을 하기 때문에, 초기화 오류 발생
    });

    console.log(promise);
    ```

    - **reject가 실행(호출)되면 프로미스 객체는 pending → rejected, undefined → failed로 바뀝니다.**

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject('failed');
        console.log(promise);
      }, 3000)
    });

    console.log(promise);
    ```

    - **프로미스 객체의 상태는 첫번째 호출에만 영향을 받습니다. (fulfilled → rejected X / rejected → fulfilled X)**

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('successed');
        reject('failed');
        console.log(promise);
      }, 3000)
    });

    console.log(promise);
    ```

    - **프로미스 값 [[PromiseState]] / [[PromiseResult]]**

    😺 [[PromiseState]] / [[PromiseResult]] 내부 프로퍼티입니다.

    ```jsx
    const promise = new Promise(function(resolve, reject){
      resolve(3);  
    })
    console.log(promise) // [[PromiseState]]: 'fulfilled', [[PromiseResult]]: 3
    ```

### 프로미스 사용하기

프로미스 객체가 만들어지면, 프로미스 메소드와 체이닝을 통해 비동기 프로그래밍을 할 수 있습니다.

- **프로미스 메소드**
- **then**

    then 메소드는 프로미스의 객체 상태가 settled(fulfilled / rejected)되면 실행됩니다. 만일 프로미스 객체 상태가 fulfilled면 첫번째 인자의 함수가 실행되며, rejected되면 두번째 인자의 함수가 실행됩니다. then 메소드는 실행된 뒤 프로미스([[PromiseState]], [[PromiseResult]])를 반환합니다. 아래는 기본적인 then 메소드를 사용한 코드입니다.

    - syntax : `p.then(onFulfilled, onRejected)`

    😺 then의 인자인 콜백함수는 [[PromiseResult]]를 전달 받습니다.

    📔 **참고자료** : [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/then](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      const number = 5; // 5면 then문의 첫번째 함수 실행, 2면 then문의 두번째 함수 실행 
      setTimeout(function() {
        if (number > 3) {
          resolve('successed');
        } else {
          reject('failed');
        }
      }, 3000)
    });
    console.log(promise);

    const promiseOfThen = promise.then(function funcOnFufilled(argumentOfResolve) {
      console.log(`콜백함수 매개변수는 ${argumentOfResolve}`); // argumentOfResolve = 'succesed' -> resolve 입력인자와 같음
      return 'then successed';
    }, function funcOnRejected(argumentOfReject) {
      console.log(`콜백함수 매개변수는 ${argumentOfReject}`) // argumentOfResolve = 'failed' -> rejected 입력인자와 같음
      return 'then failed';
    });
    ```

    then은 프로미스를 반환할 때 여러 특징을 가지며, 코드를 통해 이에 대해 알아보겠습니다.

    - **🔎 then 특성**
        - **return문이 실행 될 때, then의 [[PromiseResult]]와 [[PromiseState]]는 반환값과 fulfilled로 상태가 바뀝니다.**

        ```jsx
        const promise = new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve(1);
          }, 3000);
        });

        const thenOfPromise = promise.then(function(a) {
          console.log(`a의 값은 ${a}`);
          a += 1;
          return a;
        })

        thenOfPromise.then(function(b) {
          console.log(`b의 값은 ${b}`);
        });
        ```

        ```jsx
        const promise = new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve(1);
          }, 3000);
        });

        const promiseOfThen = promise.then(function(a) {
          setTimeout(function(){
            console.log(`a의 값은 ${a}`);
            a += 1;
          }, 3000);
          
          return a;
        });

        promiseOfThen.then(function(b) {
          console.log(`b의 값은 ${b}`);
        });
        ```

        - **return문이 없을 경우, 코드가 끝난 후 [[PromiseResult]]와 [[PromiseState]]는 undefined와 fulfilled로 상태가 바뀝니다.**

        ```jsx
        const promise = new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve(1);
          }, 3000);
        });

        const promiseOfThen = promise.then(function(a) {
          console.log(`a의 값은 ${a}`);
        });

        promiseOfThen.then(function(b) {
          console.log(`b의 값은 ${b}`);
        });
        ```

        - **then에서 오류 발생 시,  [[PromiseResult]]와 [[PromiseState]]는 오류내용, rejected로 상태가 바뀝니다.**

        ```jsx
        const promise = new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve(1);
          }, 3000);
        });

        const promiseOfThen = promise.then(function(a) {
          console.log(`a의 값은 ${a}`);
          throw new Error('오류');
          return a;
        })

        promiseOfThen.then(
          () => console.log('null'),
          (b) => console.log(`b의 값은 ${b}`)
        );
        ```

- **catch**

    catch 메소드는 프로미스의 객체 상태가 rejected되면 실행됩니다. 이는 then(undefined, onRejected)와 동일합니다. catch 메소드는 실행된 뒤 프로미스([[PromiseState]], [[PromiseResult]])를 반환합니다. 아래는 기본적인 catch 메소드를 사용한 코드입니다.

    - syntax : `p.catch(onRejected)`

    😺 catch의 인자인 콜백함수는 [[PromiseResult]]를 전달 받습니다.

    📔 참고자료 : [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      const number = 2; // 5면 catch문 실행안됨
      setTimeout(function() {
        if (number > 3) {
          resolve('successed');
        } else {
          reject('failed');
        }
      }, 3000)
    });
    console.log(promise);

    const catchOfPromise = promise.catch(function funcOnRejected(argumentOfReject) {
      console.log(`콜백함수 매개변수는 ${argumentOfReject}`); // argumentOfResolve = 'failed' -> rejected 입력인자와 같음
      return 'catch';
    });
    ```

    then과 같이 catch 또한 프로미스를 반환할 때 여러 특징을 가지며, 코드를 통해 이에 대해 알아보겠습니다.

    - **🔎 catch 특성**
        - **return문이 실행 될 때, catch의 [[PromiseResult]]와 [[PromiseState]]는 반환값과 fulfilled로 상태가 바뀝니다.**

        ```jsx
        const promise = new Promise(function(resolve, reject) {
          setTimeout(function() {
            reject(1);
          }, 3000);
        });

        const catchOfPromise = promise.catch(function(a) {
          console.log(`a의 값은 ${a}`);
          a += 1;
          return a;
        })

        catchOfPromise.then(function(b) {
          console.log(`b의 값은 ${b}`);
        });
        ```

        - **return문이 없을 경우, 코드가 끝난 후 [[PromiseResult]]와 [[PromiseState]]는 undefined와 fulfilled로 상태가 바뀝니다.**

        ```jsx
        const promise = new Promise(function(resolve, reject) {
          setTimeout(function() {
            reject(1);
          }, 3000);
        });

        const catchOfPromise = promise.catch(function(a) {
          console.log(`a의 값은 ${a}`);
          a += 1;
        })

        catchOfPromise.then(function(b) {
          console.log(`b의 값은 ${b}`);
        });
        ```

        - **catch에서 오류 발생 시,  [[PromiseResult]]와 [[PromiseState]]는 오류내용, rejected로 상태가 바뀝니다.**

        ```jsx
        const promise = new Promise(function(resolve, reject) {
          setTimeout(function() {
            reject(1);
          }, 3000);
        });

        const catchOfPromise = promise.catch(function(a) {
          console.log(`a의 값은 ${a}`);
          throw new Error('오류');
          return a;
        })

        catchOfPromise.catch(function(b) {
          console.log(`b의 값은 ${b}`);
        });
        ```

- **finally 메소드**

    finally 메소드는 프로미스의 객체 상태가 settled(fulfilled/rejected)되면 실행됩니다. 이는 then(onFinally, onFinally)과 유사하지만 onFinally는 인자를 받지 않습니다. finally 메소드는 실행된 뒤 프로미스([[PromiseState]], [[PromiseResult]])를 반환합니다. 아래는 기본적인 finally 메소드를 사용한 코드입니다.

    - syntax : `p.finally(onFinally)`

    📔 **참고자료** : [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      const number = 5; // 5면 catch문 실행안됨
      setTimeout(function() {
        if (number > 3) {
          resolve('successed');
        } else {
          reject('failed');
        }
      }, 3000)
    });
    console.log(promise);

    promise.finally(function funcOnSettled(argumentOfSettled) {
      console.log(`콜백함수 매개변수는 ${argumentOfSettled}`);
    });

    promise.then(function funcOnSettled(argumentOfSettled) {
      console.log(`콜백함수 매개변수는 ${argumentOfSettled}`);
    }, function funcOnSettled(argumentOfSettled) {
      console.log(`콜백함수 매개변수는 ${argumentOfSettled}`);
    });
    ```

- **체이닝**

프라미스는 체인으로 연결할 수 있기에, 코드를 간결하게 작성할 수 있습니다.

- **then 체이닝**

    then은 정의된바와 같이 Promise가 settled되면 실행됩니다. 첫번째 코드는 병렬로 비동기 코드를 수행하는 형태이며, 두번째 코드는 직렬로 비동기 코드를 실행시키는 형태입니다.

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(1);
      }, 3000);
    });

    promise.then(function(a) {
      setTimeout(function(){
      console.log(`a의 값은 ${a}`);  
      a += 1;
      }, 3000);
      
      return a;
    })

    .then(function(b) {
      console.log(`b의 값은 ${b}`);
      b += 1;
      
      return b;
    })

    .then(function(c) {
      console.log(`c의 값은 ${c}`);
      c += 1;

      return c;
    }
    ```

    ```jsx
    const promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(1);
        }, 3000)
      });
      
    promise.then(function(a) {
      return new Promise(function(resolve, reject) {
        console.log(`a의 값은 ${a}`)
        setTimeout(function() {
          resolve(2);
        }, 3000);
      })
    })  
    .then(function(b) {
      console.log(`b의 값은 ${b}`);
    });
    ```

- **then & catch 체이닝**

    아래는 then과 catch를 체이닝한 코드이며, 이 코드를 통해 then과 catch의 실행조건 및 결과에 대해 정확히 이해할 수 있습니다.

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(1);
      }, 3000);
    });

    promise.then(
      () => console.log('이행1'),
      () => console.log('거절1')
    )

    .then(
      () => {
        console.log('이행2')
        throw new Error()
      },
      () => console.log('거절2')
    )

    .then(
      () => console.log('이행3'),
      () => {
        console.log('거절3')
        throw new Error()
      }
    )

    .catch(
      () => console.log('캐치'),
    )

    .then(
      () => console.log('이행4'),
      () => console.log('거절4')
    )
    ```

    만일 체이닝 중간에 reject가 반환된다면, 이를 처리할 수 있는 .then 또는 .catch로 넘어가 실행된다.

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(1);
      }, 3000);
    });

    promise.then(
      () => console.log('이행1'),
      () => console.log('거절1')
    )

    .then(
      () => {
        console.log('이행2')
        throw new Error()
      },
      () => console.log('거절2')
    )

    .then(
      () => console.log('이행3')
    )

    .then(
      () => console.log('이행4')
    )

    .then(
      () => console.log('이행5'),
      () => console.log('거절5')
    )

    .catch(
      () => console.log('캐치'),
    )
    ```

    😺 **.then(onFulfilled, onReject) vs .then(onFulfilled) .catch(onRejected)**

    .then(onFulfilled, onReject)과 .then(onFulfilled) .catch(onRejected)는 기능적으로 유사해 보이지만, 오류 발생 시 강건함에 있어 차이를 보입니다. then(onFulfilled, onReject)은 onFulfilled 내부에서 오류가 발생한다면 이를 처리할 방법이 없습니다. 반면 .then(onFulfilled) .catch(onRejected)는 onFulfilled 내부에서 오류가 발생할 지라도 이어진 catch가 처리할 수 있기에 오류에 강건하다 할 수 있습니다.

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(1);
      }, 3000);
    });

    promise.then(
      () => {
        console.log('이행')
        throw new Error() // catch 문이 오류를 처리함
      }
    )

    .catch(
      () => console.log('캐치'),
    )
    ```

    ```jsx
    const promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(1);
      }, 3000);
    });

    promise.then(
      () => {
        console.log('이행')
        throw new Error() //오류를 처리할 수 없음
      },
      () => console.log('캐치'),
    )
    ```
