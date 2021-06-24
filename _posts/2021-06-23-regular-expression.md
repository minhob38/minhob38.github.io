---
title: "정규표현식"
categories:
  - programming
date: 2021-06-23 01:00:00 +0900
last_modified_at: 2021-06-23 01:00:00 +0900
---

# 정규표현식(Regular Expression)
[정규표현식]((https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D))은 문자열에서, 특정 문자를 검색, 삽입 등에 사용됩니다. RegExp의 exec, test 메소드와 String의 match, replace, search, split 메소드와 함께 사용됩니다.

## 정규표현식 만들기
정규표현식은 리터럴 표기법, RegExp객체 두가지 방법으로 만들 수 있습니다. 

**리터럴 표기법**

```js
const re = /ab+c/;
```

**RegExp**
```js
const re = new RegExp('ab+c');
```

## 정규표현식 패턴 만들기

**단순 검색**
```js
const str = 'abcdeabcde';
const re = /bc/g; // bc를 검색합니다.
str.match(re);
```

**정의되지 않은 문자**  
정의되지 않은 문자는 `.`를 통해 표현식을 작성합니다.
```js
const str = 'abcdeabcde';
const re = /.../g; // 정의되지 않은 문자 3개를 검색합니다.
str.match(re);
```

**한번 이상 반복되는 문자**  
한번 이상 반복되는 문자는 `+`를 통해 표현식을 작성합니다.
```js
const str = 'a ab aab aaab aaaaa';
const re = /a+/g; // a로 반복되는 문자를 검색합니다.
str.match(re);
```

**0번 이상 반복되는 문자**  
0번 이상 반복되는 문자는 `*`를 통해 표현식을 작성합니다.
```js
const str = 'a ab abb aaab ababc';
const re = /ab*/g; // ab로 반복되는 문자를 검색합니다.
str.match(re);
```

**0 ~ 1번 반복되는 문자**  
0번 이상 반복되는 문자는 `?`를 통해 표현식을 작성합니다.
```js
const str = 'a ab abb aaab ababc';
const re = /ab?/g; // ab로 반복되는 문자를 검색합니다.
str.match(re);
```

**n 번 반복되는 문자**  
0번 이상 반복되는 문자는 {n}를 통해 표현식을 작성합니다.
```js
const str = 'a ab abb abbb ababc';
const re = /ab{2}/g; // ab로 반복되는 문자를 검색합니다.
str.match(re);
```

**n ~ m번 반복되는 문자**  
0번 이상 반복되는 문자는 {n, m}를 통해 표현식을 작성합니다. m이 생략되면 무한대로 설정됩니다.
```js
const str = 'a ab abb abbb ababc';
const re = /ab{1,2}/g; // ab로 반복되는 문자를 검색합니다.
str.match(re);
```

**또는(or)**  
`|`를 통해 또는(or)을 표현할 수 있습니다.
```js
const str = 'a ab abc ababa';
const re = /a|b/g; // a 또는 b를 검색합니다.
str.match(re);
```

**Character Set**  
`[]`를 통해 character set을 만들 수 있으며, character set에 포함되어 있는 문자를 검색합니다. -를 통해 범위를 지정할 수 있습니다.
```js
const str = 'a ab abc ababa';
const re = /[ab]/g; // a 또는 b를 검색합니다.
str.match(re);
```

```js
const str = 'a ab abc abcd abcde';
const re = /[a-c]/g; // a ~ c에 있는 문자를 검색합니다.
str.match(re);
```

```js
const str = 'a ab abc abcd abcde';
const re = /[a-c]+/g; // a ~ c로 반복되는 문자를 검색합니다.
str.match(re);
```

**특정 문자열로 시작**  
`^`를 통해 특정 문자열로 시작하는지 검색할 수 있습니다.
```js
const str = 'hello hello wolrd world';
const re = /^hello/; // hello로 시작하는지 검색합니다.
re.test(str);
```

**특정 문자열로 끝**  
`$`를 통해 특정 문자열로 끝나는지 검색할 수 있습니다.

```js
const str = 'hello hello wolrd world';
const re = /world$/; // hello로 시작하는지 검색합니다.
re.test(str);
```

**이스케이프 문자**  
`\`를 통해 특수문자를 이스케이프 할 수 있습니다.

```js
const re = /\[/;
```

\d를 통해 숫자를 표현하며, [0-9]와 동일합니다.

```js
const re = \d;
```

## 정규표현식 사용하기
RegExp의 exec, test 메소드와 String의 match, replace, search, split 메소드를 통해 정규표현식을 사용할 수 있습니다.  

### RegExp
**exec**  
exec함수는 정규표현식이 일치한 문자열의 정보를 갖고 있는 배열을 반환합니다. 만일 정규표현식과 일치하지 않는다면 null을 반환합니다. flag가 global이라면 lastindex가 갱신되어 exec 함수를 반복 실행할 때 문자열을 순회합니다. 반면 flag가 global이 아니라면 lastindex는 0이며, 함수를 반복 실행하더라도 문자열을 처음부터 검색합니다.  
**syntax** : `regexObj.exec(str)`
```js
const str = 'abcdeabcde';
const re = /bc/g;
re.lastIndex;
re.exec(str);
re.lastIndex;
re.exec(str);
re.lastIndex;
```

**test**  
test함수는 해당문자열에 정규표현식이 일치하는 부분이 문자열이 있으면 true를 반환하며, 일치하지 않는다면 false를 반환합니다. flag에 따른 문자열 검색은 exec함수와 동일합니다.  
**syntax** : `regexObj.test(str)`
```js
const str = 'abcdeabcde';
const re = /bc/g;
console.log(re.lastIndex);
re.test(str));
console.log(re.lastIndex);
re.test(str);
console.log(re.lastIndex);
```

**match**  
match함수는 정규표현식이 일치한 문자열을 배열로 반환합니다. 만일 정규표현식과 일치하지 않는다면 null을 반환합니다. flag가 global이라면 전체 문자열에서 표현식이 일치하는지 검색하며, flag가 global이 아니라면 `regexObj.exec(str)`와 결과가 동일합니다.  
**syntax** : `str.match(regexp)`
```js
const str = 'abcdeabcde';
const re = /bc/g;
str.match(re);
```

**replace**  
relace함수는 정규표현식이 일치한 문자열을 다른 문자로 바꾼 후, 문자열로 반환합니다.  
**syntax** : var newStr = str.replace(regexp|substr, newSubstr|function)

```js
const str = 'hello world';
const re = /hello/;
str.replace(re, 'bye');
```

## 정규식 패턴
[https://jeffrey-oh.tistory.com/23](https://jeffrey-oh.tistory.com/23)

**개행 공백 제거**  
eventId = eventId.replace(/\n| /g, "");

함수 인자 / 몸체 분리

```js
const getArgsAndBody = (func) => {
  const funcStr = func.toString();

  const trimmedFuncStr = funcStr.replace(/\n|\r| /g, "");
  const reOfArgsBracket = /\([^\)]*\)/;
  const reOfBodyBracket = /\{.*\}/;

  const argsBracket = trimmedFuncStr.match(reOfArgsBracket)[0];
  const bodyBracket = trimmedFuncStr.match(reOfBodyBracket)[0];

  const args = argsBracket.slice(1, -1).split(",");
  const body = bodyBracket.slice(1, -1);

  return { args, body };
};

module.exports = getArgsAndBody;
```

## 문자열 함수
JavaScript는 문자를 다루기 위한 함수들을 가지고 있습니다.

**substring**  
문자열을 반환합니다.
**syntax** : str.substring(indexStart[, indexEnd])
```js
var str = 'abcde';
str.substring(1, 3); // return is 'bc', from index 1 to 3-1
str.substring(3, 1); // return is 'bc', from index 1 to 3-1 
str.substring(2); // return is 'cdei', from index 2 to last
```

**~~substr (사용X)~~**  
문자열을 반환합니다.  
**syntax** : str.substr(start[, length])
```js
var str = 'abcde';
str.substr(1, 3); // return is 'bcd', from index 1 to length
str.substr(2); // return is 'cde', from index 2 to last
```

**[split]**
문자열을 구분자로 자르고 배열을 반환합니다.  
**syntax** : `str.split([separator[, limit]])`
```js
var str = 'abcde';
str.split('b'); // return is ['a', 'cde']
str.split(''); // return is ['a', 'b', 'c', 'd', 'e']
str.split(); // return is ['abcde']
```

**indexOf**  
문자열을 앞 요소부터 찾습니다.  
**syntax** : str.indexOf(searchValue[, fromIndex])
```js
var str = 'abcdebc';
str.indexOf(bc); // return is 1
str.indexOf(f); // return is -1, 해당값이 없을 경우 -1 반환
```

**lastIndexOf**  
문자열을 뒤 요소부터 찾습니다.  
**syntax** : str.lastIndexOf(searchValue[, fromIndex])
```js
var str = 'abcdebc';
str.lastIndexOf(bc); // return is 5
str.lastIndexOf(f); // return is -1, 해당값이 없을 경우 -1 반환
```

**reverse**

**concat**

**toUpperCase**  
문자열을 대문자로 변환하고 새로운 배열을 반환합니다.  
**syntax** : `str.toUpperCase()`
```js
const str = 'abc';
const STR = str.toUpperCase();
console.log(str);
console.log(STR);
```

**charCodeAt**
문자열의 utf-16 값을 반환합니다.  
**syntax** : `str.charCodeAt(index)`
```js
var str = 'abcde';
str.charCodeAt(0);
```

 ※유니코드 구하기 : str.charCodeAt(index)
```js
var str = 'hello';
console.log(str.charCodeAt(0)); //첫번째 문자 유니코드
console.log(str.charCodeAt(4)); //첫번째 문자 유니코드
```