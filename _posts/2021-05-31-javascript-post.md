---
title: "testing library react / react native"
categories: 
  - javascript
date: 2021-05-31 14:55:00 +0900
last_modified_at: 2021-05-31 14:55:00 +0900
---

## Testing Library?
TDD 개발을 할 경우, 사소한 코드 변경에 의해 애플리케이션 개발 속도가 더뎌질 수 있습니다.  
[Testing Library](https://testing-library.com/docs/react-testing-library/intro/)는 DOM에 대해 기능 테스트를 하여, 위에 언급한 문제들을 해결할 수 있습니다.  
Testing Library는 React, Angular, Vue, Cypress, React Native에 사용될 수 있습니다.

> You want to write maintainable tests that give you high confidence that your components are working for your users.  
As a part of this goal, **you want your tests to avoid including implementation details so refactors of your components  
(changes to implementation but not functionality) don't break your tests and slow you and your team down.**

> **The core library, DOM Testing Library, is a light-weight solution for testing web pages by querying and interacting with DOM nodes  
(whether simulated with JSDOM/Jest or in the browser).**  
The main utilities it provides involve querying the DOM for nodes in a way that's similar to how the user finds elements on the page.  
In this way, the library helps ensure your tests give you confidence that your application will work when a real user uses it.  
**The core library has been wrapped to provide ergonomic APIs for several frameworks, including React, Angular, and Vue.  
There is also a plugin to use testing-library queries for end-to-end tests in Cypress and an implementation for React Native.**

## Setup
### Install
```
npm install --save-dev @testing-library/react
```

## React
React에서 Testing Library에 대해 살펴보겠습니다.

### 요소 탐색
[Queries](https://testing-library.com/docs/queries/about)는 요소를 탐색하여 반환합니다.   
- ByRole
- ByLabelText
- ByPlaceholderText
- ByText
- ByDisplayValue
- ByTitle
- ByTestId
  
<u>요소를 못 찾을 경우 get은 error, query는 null, find는 reject를 반환합니다.</u>

```
import React from "react";
import { render } from "@testing-library/react";

function Component({ content }) {
  return (
    <p>{content}</p>
    <div testID="testing-libirary">Testing Library</div>
  );
}

describe("<Component />", () => {
  test("find element", () => {
    const { queryByText, queryById } = render(<Component content={"REACT TEST"}>)
    const $p = queryByText("REACT TEST");
    const $div = queryByTestId("testing-libirary");
    
    expect($p).not.toBeNull();
    expect($div).not.toBeNull();
  });
});
```

<br>

### 사용자 이벤트
[fireEvent](https://testing-library.com/docs/dom-testing-library/api-events)를 통해, 사용자 이벤트를 모사할 수 있습니다.
```
import React from "react";
import { render, fireEvent } from "@testing-library/react";

function Component({ onClick }) {
  return (
    <button onClick={onClick} >
      Click
    </button>
  );
}

describe(("<Component />", () => {
  test("user event", () => {
    const mockFn = jest.fn();
    const { queryByText } = render(<Component onClick={mockFn}>)
    const $button = queryByText("Click");

    fireEvent.click($button);
   
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
```
<br>

### 비동기 작업
[Async Methods](https://testing-library.com/docs/dom-testing-library/api-async)를 통해 비동기 작업을 다룰 수 있습니다.

<br>

### 서버 요청
[Mock Service Worker](https://mswjs.io/)를 통해 서버 요청을 모사할 수 있습니다. (axios-mock-adapter, nock etc)
```
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

function Component({ onClick }) {
  return (
    <button onClick={() => fetch("http://localhost:3000/api", { method: "GET })} >
      Click
    </button>
  );
}

describe("<Component />", () => {
  const server = setupServer(
    rest.get("http://localhost:3000/api", (req, res, ctx) => {
      return res(ctx.json({ message: "sucess", data: "hello", error: null }));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("server request", async () => {
    const { queryByText } = render(<Component onClick={mockFn}>)
    const $button = queryByText("Click");

    fireEvent.click($button);
   
    await waitFor(() => expect(...));
  });
});
```

### 비고
Third-party 라이브러리 테스트  
https://medium.com/xebia/de-mystifying-jest-snapshot-test-mocks-8e7183d109ea
