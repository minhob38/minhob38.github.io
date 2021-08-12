---
title: "Socket IO"
categories: 
  - programming
date: 2021-08-04 01:00:00 +0900
last_modified_at: 2021-08-04 01:00:00 +0900
---

### Websocket
기존 http 통신은 클라이언트가 요청을 보내면 서버가 응답을 하는 단방향 통신이였습니다. 이는 서버를 기준으로 실시간, 유저간 상호작용 등의 통신이 되지않기 때문에, 이러한 한계를 해결하고자 html5 표준으로 양방향으로 통신(bi-directional full duplex communication)이 가능한 websocket이 만들어졌습니다.  

## 환경설정
### • 설치
[socketio](https://www.npmjs.com/package/socket.io)를 통해 소켓통신을 할 수 있습니다.

`npm install socket.io`
### • 실행환경
**\- 서버애플리케이션**
```js
const app = require('app')'
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("title", (dataFromClient) => {
    socket.broadcast.emit("title", dataFromClient);
  });

  socket.on("content", (dataFromClient) => {
    socket.broadcast.emit("content", dataFromClient);
  });
});
```
🔎 connection 이벤트는 클라이언트에서 socket을 연결할 때 emit 됩니다.

**\- 클라이언트**

```jsx
import socketio from "socket.io-client";

const socket = useCallback(socketio(process.env.REACT_APP_SERVER), []);
  socket.on("title", (dataFromServer) => {
    const { socketTitle, soketDocId } = dataFromServer;

    if (docId === soketDocId && option === "put") {
      setTitle(socketTitle);
    }
  });
  socket.on("content", (dataFromServer) => {
    const { socketContent, soketDocId } = dataFromServer;

    if (docId === soketDocId && option === "put") {
      setContent(socketContent);
    }
  });

  const handleSaveClick = () => setIsClicked(true);
  const handleTitleChange = (ev) => {
    setTitle(ev.target.value);
    const dataToServer = { socketTitle: ev.target.value, soketDocId: docId };
    socket.emit("title", dataToServer);
  };
```

### socket intance
socket이 연결되면 socket id(임의 길이 20의 문자열)를 할당 받습니다.
https://socket.io/docs/v3/client-socket-instance/#Socket-id
```js
io.on("connection", (socket) => {
  console.log(socket.id)
});
```

### broadcast
**\- 요청보낸 클라이언트에게만 응답 보내기**
![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1db51ce-7042-4198-93ea-a6c681485da5/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1db51ce-7042-4198-93ea-a6c681485da5/Untitled.png)

```js
io.on("connection", (socket) => {
  socket.emit("event", "data");
});
```

**\- 소켓에 연결된 모든 클라이언트에게 응답 보내기**
![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1db51ce-7042-4198-93ea-a6c681485da5/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1db51ce-7042-4198-93ea-a6c681485da5/Untitled.png)

```jsx
io.on("connection", (socket) => {
  io.emit("event", "data");
});
```

**\- 보낸 클라이언트를 제외한 소켓에 연결된 모든 클라이언트에게 응답 보내기**
![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d01603c1-b75d-40f6-8231-90d10d540a73/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d01603c1-b75d-40f6-8231-90d10d540a73/Untitled.png)

```jsx
io.on("connection", (socket) => {
  socket.broadcast.emit("event", "data");
});
```
```
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only');
```
## 참고자료
https://d2.naver.com/helloworld/1336



websocket api 문서가 없네...
//https://stackoverflow.com/questions/63639197/how-to-document-websockets