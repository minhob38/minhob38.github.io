---
title: "Redis"
categories: 
  - programming
date: 2021-08-28 01:00:00 +0900
last_modified_at: 2021-08-28 01:00:00 +0900
---

### Redis
redis(REmote DIctionary Server)는 메모리에 데이터를 저장하는, 임시적인 nosql database입니다.


string, list, set, sorted, set


## 환경설정
### • 설치
homebrew에서 `brew install redis`로 설치할 수 있습니다.

2. 설치된 경로
🔎 설치된 경로
\- redis 실행파일: /usr/local/bin/redis-server,  redis-cli
\- redis 설정파일: /usr/local/etc/redis.conf

출처: https://dev4u.tistory.com/963 [데브포유]

### • 실행 및 종료
`brew services start redis`로 redis를 켤 수 있습니다.
`brew services restart redis`로 redis를 다시 켤 수 있습니다.
`brew services stop redis`로 redis를 종료시킬 수 있습니다.
`redis-server`로 redis를 실행 시킬 수 있습니다.

redis-server /usr/local/etc/redis.conf
redis-cli ping

## GUI 환경
### • medis
**\- 설치**
```
$ git clone https://github.com/luin/medis
$ npm install
$ npm run pack
```
**\- 실행(electron)**
```
$ cd [medis directory]
$ npm start
```
**\- 실행(app)**
``` sh
# Medis.app 만들기
$ cd [medis directory]
$ cd bin
$ node pack.js
$ cd medis/dist//ut/Medis-mas-X64

# Medis.app 실행
Finder에서 Medis.app 실행
```

### • 자료형
**\- string**  
**\- list**  
**\- sets**  
**\- sorted set**  
**\- hashes**  

## redis 다루기
redis의 command는 공식 문서에서 확인할 수 있습니다.  
📔 https://redis.io/commands
### • 삽입 및 수정하기
**\- string**  
[set](https://redis.io/commands/set)으로 string을 만듭니다.
```sh
$ set [key] [value]
```
**\- hashes**  
[hmset](https://redis.io/commands/hmset)으로 hash를 만듭니다.
```sh
$ hmset [key] [hash key1] [value1] [hash key1] [value1] ...
```
**\- list**  
[lpush](https://redis.io/commands/lpush) / [rpush](https://redis.io/commands/rpush)로 list를 만듭니다.
```sh
$ lpush [key] [item1] [item2] ...
```

**\- set**  
[sadd](https://redis.io/commands/sadd)로 set을 만듭니다.
```sh
$ sadd [key] [member1] [member2] ...
```

**\- sorted set**  
[zadd](https://redis.io/commands/zadd)로 sorted set을 만듭니다.
```sh
$ zadd [key], [score1], [member1], [score2], [member2] ...
```

### • 조회하기
**\- string**  
[get](https://redis.io/commands/get)으로 string을 조회합니다.
```sh
$ get [key]
```
**\- hashes**  
[hgetall](https://redis.io/commands/hgetall)로 hash를 조회합니다.
```sh
$ hgetall [key]
```
**\- list**  
[lrange](https://redis.io/commands/lrange) / [rrange](https://redis.io/commands/rrange)로 list를 조회합니다.
```sh
$ lrange [key] [시작 index] [끝 index]
```

**\- set**  
[smembers](https://redis.io/commands/smembers)로 set을 조회합니다.
```sh
$ smembers [key]
```

### • 삭제하기
[del](https://redis.io/commands/del)로 key를 삭제합니다.
```
$ del [key]
```

**\- sorted set**  
[zrange](https://redis.io/commands/zrange) / [zrevrange](https://redis.io/commands/zrevrange) 로 sorted set을 조회합니다.
```sh
$ zrange [key], [score1], [member1], [score2], [member2] ...
```

## nodejs
nodejs에서는 redis 패키지를 통해 redis를 다룰 수 있습니다.
https://www.npmjs.com/package/redis
### • 환경설정
**\- 설치하기**
```sh
$ npm install redis
```
**\- 가져오기 및 설정**
```js
const redis = require("redis");
const client = redis.createClient({ host: 'localhost', port: '6379' });
```

### • redis 다루기
**\- 삽입 및 수정하기**  
string
```js
client.set([key], [value])

```
hash
```js
client.hmset([key], [hash key1], [hash value1], [hash key2], [hash value2] ...);
```
🔎 해당 key만 덮어씁니다.

list
```js
client.rpush([key], [item1], [item2] ...); // 오른쪽부터 삽입
client.lpush([key], [item1], [item2] ...); // 왼쪽부터 삽입
```

set
```js
client.sadd([key], [member1], [member2] ...);
```
🔎 해당 key만 덮어씁니다.

sorted set
```js
client.zadd([key], [score1], [member1], [score2], [member2] ...);
```

**\- 조회하기**  
string
```js
client.get([key], (err, reply) => {
  console.log(reply);
});
```

hash
```js
client.hgetall([key], (err, reply) => {
  console.log(reply);
});
```

list
```js
// 왼쪽부터 조회
client.lrange([key], [시작 index], [끝 index], (err, arr) => {
   console.log(arr);
});
// 오른쪽부터 조회
client.rrange([key], [시작 index], [끝 index], (err, arr) => {
   console.log(arr);
});
```

set
```js
client.smembers([key], (err, reply) => {
  console.log(reply);
});
```

sorted set
```js
// 오름차순
client.zrange([key], [시작 index], [끝 index], (err, reply) => {
  console.log(reply);
});

// 내림차순
client.zrevrange([key], [시작 index], [끝 index], (err, reply) => {
  console.log(reply);
});
```
🔎 max, min, withscores, limit 옵션 보기

**\- 삭제하기**  
```js
client.del([key])
```


## 참고자료
**• nodejs redis**  
https://www.zerocho.com/category/NodeJS/post/5a3238b714c5f9001b16c430

**• redis 활용**  
https://medium.com/garimoo/%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%A5%BC-%EC%9C%84%ED%95%9C-%EB%A0%88%EB%94%94%EC%8A%A4-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-02-f1029893e263

https://nachwon.github.io/redis/

**• medis 설치하기**  
https://rayner.tistory.com/6


https://jeong-pro.tistory.com/139


`PUBSUB channels`
pub/sub
http://redisgate.kr/redis/command/pubsub_intro.php

pubsub channels

https://great-song2.tistory.com/3

memory usage [key]



대충1gb...
https://redis.io/commands/info

redis benchmark



https://stackoverflow.com/questions/50281492/accessing-gcp-memorystore-from-local-machines

https://cloud.google.com/memorystore/docs/redis/connecting-redis-instance#connecting_from_a_local_machine_with_port_forwarding


haproxy
https://findstar.pe.kr/2018/08/14/fix-haproxy-reload-fail/


gcp redis proxy 설정
```
load_module /usr/lib/nginx/modules/ngx_stream_module.so;
events {}
stream {
  server {
    listen 6379;
      proxy_pass redis;
  }
  upstream redis {
    server 10.90.177.108:6379;
  }
}
```


https://jyejye9201.medium.com/%EB%A0%88%EB%94%94%EC%8A%A4-redis-%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-2b7af75fa818


error
https://stackoverflow.com/questions/62416274/econnreset-error-crashing-nodejs-application

https://github.com/redis/node-redis/issues/713

```
Error: read ECONNRESET at TCP.onStreamRead (internal/stream_base_commons.js:209:20)
```


gcp 인정...
https://stackoverflow.com/questions/62837109/nodejs-app-engine-standard-env-redis-error-read-econnreset?rq=1



nodejs redis 연결끊김
https://stackoverflow.com/questions/57383470/redis-connection-lost-without-any-indication
redis retry_strategy nodejs pubsub channels gone

golang
https://popawaw.tistory.com/226?category=970968


Error: read ECONNRESET at TCP onstreamread internal/stream_base_commons js 205:27