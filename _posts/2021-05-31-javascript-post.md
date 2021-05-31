---
title: "testing library react / react native"
categories: 
  - javascript
date: 2021-05-31 14:55:00 +0900
last_modified_at: 2021-05-31 14:55:00 +0900
---

## Testing Library?
TDD 개발을 할 경우, 사소한 코드 변경에 의해 애플리케이션 개발 속도가 더뎌질 수 있습니다.  
Testing Library는 DOM에 대해 기능 테스트를 하여, 위에 언급한 문제들을 해결할 수 있습니다.
Testing Library는 React, Angular, Vue, Cypress, React Native에 사용될 수 있습니다.

[Testing Library Homepage](https://testing-library.com/docs/react-testing-library/intro/)

> You want to write maintainable tests that give you high confidence that your components are working for your users.  
As a part of this goal, **you want your tests to avoid including implementation details so refactors of your components  
(changes to implementation but not functionality) don't break your tests and slow you and your team down.**

> **The core library, DOM Testing Library, is a light-weight solution for testing web pages by querying and interacting with DOM nodes  
(whether simulated with JSDOM/Jest or in the browser).**  
The main utilities it provides involve querying the DOM for nodes in a way that's similar to how the user finds elements on the page.  
In this way, the library helps ensure your tests give you confidence that your application will work when a real user uses it.  
**The core library has been wrapped to provide ergonomic APIs for several frameworks, including React, Angular, and Vue.  
There is also a plugin to use testing-library queries for end-to-end tests in Cypress and an implementation for React Native.**

## Install
```
npm install --save-dev @testing-library/react
```

## React

### 요소 탐색

### 사용자 이벤트

### 비동기 작업

### 서버 요청
