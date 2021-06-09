---
title: "redux test"
categories: 
  - programming
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
  
    const action = types.addToDo("payload");
    const expectedAction = { type: types.ADD_TO_DO, payload: "payload" }

    expect(action).toEqual(expectedAction);
  });
});
```

<br>

### Async Action Creator
비동기로 Action이 실행되는지 Test합니다.

```
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

function Component() {
  const action = () => async (dispatch) => {
    disaptch({ type: "FETCH_REQUEST" })
    await fetch("http://localhost:8000, { method: "GET }");
    disaptch({ type: "FETCH_COMPLETION" })
  };
  
  return <Button onClick={() => dispatch(action())}>Click</Button>
}

describe("action creator", () => {
  test("test", () => {
    const store = configureMockStore([thunk])();
    await store.dispatch(action())
  
    const expectedActions = [
      { type: "FETCH_REQUEST" },
      { type: "FETCH_COMPLETION" },
    ];
    
    expect(store.getActions()).toEqual(expectedActions);
  });
});
```

✏️ Jest가 Fetch를 못 찾을 경우, cross-fetch와 localstorage polyfill을 가져오면 문제가 해결됩니다.

```
import "cross-fetch/polyfill";
import "localstorage-polyfill"
```

<br>

### Reducer

<br>

### 참고자료
- https://velopert.com/3591
