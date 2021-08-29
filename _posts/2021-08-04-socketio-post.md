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
**\- nodejs**  
[socket.io](https://www.npmjs.com/package/socket.io)를 통해 소켓통신을 할 수 있습니다.  
`npm install socket.io`

**\- client**  
[socket.io-client](https://www.npmjs.com/package/socket.io-client)를 통해 소켓통신을 할 수 있습니다.  
`npm install socket.io-client`

### • 실행환경
**\- 서버애플리케이션**
```js
const app = require('app');
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
  socket.on("send", (dataFromClient) => {
    socket.broadcast.emit("send", dataFromClient);
  });
});
```
🔎 connection 이벤트는 클라이언트에서 socket을 연결할 때 emit 됩니다.

**\- 클라이언트**
```js
import socketio from "socket.io-client";

const socket = socketio("http://localhost:8000");

socket.on("connection", (dataFromServer) => {
  // To Do ...
});

socket.on("send", (dataFromServer) => {
  // To Do ...
});

const handleClick = (ev) => {
  socket.emit("send", dataToServer);
};
```

### • socket instance
[socket instance](https://socket.io/docs/v4/server-socket-instance/)는 연결된 소켓의 정보를 가지고 있습니다.

**\- socket id**  
socket이 연결되면 socket id(임의 길이 20의 문자열)를 할당 받습니다.
```js
io.on("connection", (socket) => {
  console.log(socket.id)
});
```

**\- socket rooms**  
socket이 연결된 room의 정보를 가지고 있습니다.
```js
io.on("connection", (socket) => {
  console.log(socket.rooms)
});
```

### • broadcast
[broadcast](https://socket.io/docs/v4/broadcasting-events/)는 소켓에 연결된 모든 클라이언트에게 응답을 보냅니다.
**\- 요청보낸 클라이언트에게만 응답 보내기**
```js
io.on("connection", (socket) => {
  socket.emit("event", "payload");
});
```
```js
io.on("connection", (socket) => {
  socket.send("event", "payload");
});
```

**\- 소켓에 연결된 모든 클라이언트에게 응답 보내기**  
<img src="/assets/images/socket_broadcast1.png" alt="image" width="60%">
```js
io.on("connection", (socket) => {
  io.emit("event", "payload");
});
```

**\- 보낸 클라이언트를 제외한 소켓에 연결된 모든 클라이언트에게 응답 보내기**  
<img src="/assets/images/socket_broadcast1.png" alt="image" width="60%">
```js
io.on("connection", (socket) => {
  socket.broadcast.emit("event", "payload");
});
```

### • room
[room](https://socket.io/docs/v4/rooms/)은 소켓들이 join/leave할 수 있는 집합입니다.  
<img src="/assets/images/socket_room.png" alt="image" width="60%">

**\- 해당 룸에 들어하기**
```js
io.on("connection", (socket) => {
  socket.join('room name');
});
```

**\- 보낸 클라이언트를 제외한 해당 룸에 연결된 모든 클라이언트에게 응답 보내기**
```js
io.on("connection", (socket) => {
  socket.broadcast.to('room name').emit("event", "payload");
});
```

**\- 해당 룸에 연결된 모든 클라이언트에게 응답 보내기**
```js
io.on("connection", (socket) => {
  io.in('roomId').emit("event", "payload");
});
```
🔎 in과 to는 같습니다.

### • adapter?
### • namespace
[namespace](https://socket.io/docs/v4/namespaces/)는 소켓로직을 분리할 수 있는 채널입니다.  
**\- namespace 만들기 (server)**
```js
const chat = io.of("/chat");

chat.on("connection", (socket) => {
  socket.join("room");
  chat.to("room").emit("hello");
});
```

**\- namespace 연결하기 (client)**
```js
// same origin
const socket = io();
const socketA = io("/chat");
```
```js
// cross origin
const socket = io("http://localhost:3000");
const socketA = io("http://localhost:3000/chat");
```

## 참고자료
[• websocket vs socketio](https://www.educba.com/websocket-vs-socket-io/)  
https://d2.naver.com/helloworld/1336

https://gipyeonglee.tistory.com/99