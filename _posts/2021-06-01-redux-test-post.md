---
title: "redux test"
categories: 
  - javascript
date: 2021-06-01 01:00:00 +0900
last_modified_at: 2021-06-01 01:00:00 +0900
---

## React
React에서 [Redux Test](https://redux.js.org/recipes/writing-tests)에 대해 살펴보겠습니다.

### Action Creator
Action Creator가 Action을 알맞게 생성하는지 Test 합니다.

```
describe("action creator", () => {
  test("test", () => {
    const types = { ADD_TO_DO: "ADD_TO_DO" }
  
    const addToDo = (payload) => ({
      type: types.ADD_TO_DO,
      payload,
    })
  
    const actions = types.addToDo("payload");
    const expectedAction = { type: types.ADD_TO_DO, payload: "payload" }

    expect(action).toEqual(expectedAction);
  });
});
```

<br>

### Async Action Creator

### Reducer
[Async Methods](https://testing-library.com/docs/dom-testing-library/api-async)를 통해 비동기 작업을 다룰 수 있습니다.

<br>

### 참고자료
- https://velopert.com/3591
