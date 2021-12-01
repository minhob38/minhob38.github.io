---
title: "Socket IO"
categories: 
  - programming
date: 2021-08-04 01:00:00 +0900
last_modified_at: 2021-08-04 01:00:00 +0900
---

### Websocket
기존 http 통신은 클라이언트가 요청을 보내면 서버가 응답을 하는 단방향 통신이였습니다. 이는 서버를 기준으로 실시간, 유저간 상호작용 등의 통신이 되지않기 때문에, 이러한 한계를 해결하고자 html5 표준으로 양방향으로 통신(bi-directional full duplex communication)이 가능한 websocket이 만들어졌습니다.  
(7계층, tcp)

## websocket 연결과정

## websocket 프레임

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

## socketio basic
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

## middleware
미들웨어는 모든 소켓 연결 및 요청에 실행되는 함수

📔 [https://socket.io/docs/v4/middlewares/](https://socket.io/docs/v4/middlewares/)

**- connection middlware**  
[connection middleware](https://socket.io/docs/v4/server-api/#namespace-use-fn)는 socket이 해당 namespace에 연결할때 실행됩니다. `next()`로 다음 함수를 실행시키며, `next(인자)`로 오류를 발생시킵니다. 오류는 클라이언트에서 `connect_error`로 받을 수 있습니다.
```js
io.use((socket, next) => {
  ...
  next();
});

io.on("connection", (socket) => {
  ...
});
```

**- packet middleware**  
[packet middleware](https://socket.io/docs/v4/server-api/#namespace-use-fn)는 socket이 packet을 보낼때 실행됩니다. `next()`로 다음 함수를 실행시키며, `next(인자)`로 오류를 발생시킵니다. 오류는 클라이언트에서 `error`로 받을 수 있습니다.
```js
io.on("connection", (socket) => {
  socket.use((packet, next) => {
    next();
  });
  ...
});
```


## namespace
[namespace](https://socket.io/docs/v4/namespaces/)는 소켓서버(로직)을 분리할 수 있는 채널입니다.
**- namespace 만들기 (server)**
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

**\- namespace 정보보기**


## adapter
[adapter](https://socket.io/docs/v4/adapter/)를 통해, 다른 프로세스에서 실행 중인 소켓과 통신할 수 있습니다.
🔎 소켓은 프로세스 기반이기에, 같은 서버 애플리케이션일지라도 프로세스가 다르면 통신할 수 없습니다.

### • adapter 만들기
[adapter](https://socket.io/docs/v4/server-api/#server-adapter-value)로 adapter를 만들 수 있습니다.  

**\- postgresql**
socket서버를 postgreqsql(socket_io_attachments)과 연결하며, postgresql을 매개체로 서버끼리 통신할 수 있습니다.
```js
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/postgres-adapter");
const { Pool } = require("pg");

const io = new Server();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "changeit",
  port: 5432,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS socket_io_attachments (
      id          bigserial UNIQUE,
      created_at  timestamptz DEFAULT NOW(),
      payload     bytea
  );
`);

io.adapter(createAdapter(pool));
io.listen(3000);
```

### • emiiter 만들기
[emitter](https://socket.io/docs/v4/adapter/#Emitter-cheatsheet)는 다른 서버에서 emit 이벤트를 보낼 수 있습니다.

**\- postgresql**
서버를 postgreqsql(socket_io_attachments)과 연결하며, postgresql을 매개체로 서버끼리 통신할 수 있습니다.
```js
const { Emitter } = require("@socket.io/postgres-emitter");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "changeit",
  port: 5432,
});

const emitter = new Emitter(pool);

emitter.emit("event", 'data')
emitter.of('/nsp').in('room').emit("event", 'data')
```


## 참고자료
[• websocket vs socketio](https://www.educba.com/websocket-vs-socket-io/)  
https://d2.naver.com/helloworld/1336

https://gipyeonglee.tistory.com/99

https://darrengwon.tistory.com/724


https://sookocheff.com/post/networking/how-do-websockets-work/


!!
https://velog.io/@pbg0205/Socket%EC%86%8C%EC%BC%93


소켓은 프로세스 기반이기에, 서버가 여러개면 데이터 공유가 불가하기에 db, redis로 공유

https://hjw1456.tistory.com/1
https://ahribori.com/article/59f28a92ec22820fdcd9185c


redis
https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174390/redis-%EA%B8%B0%EB%B3%B8-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95

adapter
https://stackoverflow.com/questions/40840394/what-does-adapter-means-in-socket-io

https://rumor1993.github.io/articles/2020-03/Socket.io_%EB%B6%84%EC%82%B0%EC%B2%98%EB%A6%AC_1


room sid 속성
https://socket.io/docs/v4/rooms/#Implementation-details

미들웨어
https://socket.io/docs/v4/middlewares/
https://socket.io/docs/v4/server-api/#namespace-use-fn
https://socket.io/docs/v4/server-api/#socket-use-fn

https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=chohs00&logNo=80163369076

인증
https://stackoverflow.com/questions/36788831/authenticating-socket-io-connections-using-jwt



https://medium.com/@tomokazukozuma/how-to-use-socket-io-protocol-42fa6dd93b0e



용량
https://github.com/socketio/socket.io/issues/3135
https://socket.io/docs/v3/custom-parser/

옵션
https://runebook.dev/ko/docs/socketio/client-initialization

admin
https://github.com/socketio/socket.io-admin-ui/blob/main/lib/index.ts#L80

instrument에 정의되지 않은 namespace 접근할때는, 일반 소켓 접속과 같음
반면 정의된 namespace라면 그냥 모든권한을 가짐 (미들웨어 안거침, connection 이벤트 ㄴㄴ)




redix nginx
https://blog.jscrambler.com/scaling-node-js-socket-server-with-nginx-and-redis


socket transport issue
https://github.com/socketio/socket.io/issues/3025


cloud run?
https://cloud.google.com/run/docs/configuring/request-timeout
https://stackoverflow.com/questions/66633358/gcp-cloud-run-socket-io-timeout


enginio code
https://stackoverflow.com/questions/36031347/socketio-chrome-inspector-frames
https://github.com/socketio/engine.io-protocol/blob/master/README.md

같은 domain이면 하나만 생기는듯?

https://medium.com/containers-on-aws/scaling-a-realtime-chat-app-on-aws-using-socket-io-redis-and-aws-fargate-4ed63fb1b681

https://blog.naver.com/PostView.nhn?isHttpsRedirect=true&blogId=1ilsang&logNo=221563459499&categoryNo=126&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView

https://stackoverflow.com/questions/10814481/how-to-debug-a-socket-hang-up-error-in-nodejs/11542134#11542134



socketio connection
https://newbedev.com/maximum-concurrent-socket-io-connections



https://tech.kakao.com/2021/09/29/mocking-fe/




load test
https://artillery.io/blog/load-testing-socketio-with-artillery/