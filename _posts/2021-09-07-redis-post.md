---
title: "Redis"
categories: 
  - programming
date: 2021-08-28 01:00:00 +0900
last_modified_at: 2021-08-28 01:00:00 +0900
---

### Redis
redis(REmote DIctionary Server)는 메모리에 데이터를 저장하는, 임시적인 nosql database입니다.


string, list, sets, sorted, set


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
$ npm start 
```
**\- 실행(app)**
```
$ cd medis/bin
$ node pack.js
$ cd medis/dist//ut/Medis-mas-X64
$ Finder에서 Medis.app 실행
```

## database 다루기




**\- version**  
[version](https://docs.docker.com/engine/reference/commandline/version/)으로 version 정보를 볼 수 있습니다.
```
docker version [option]
```
### • docker info 보기
**\- version**  
[info](https://docs.docker.com/engine/reference/commandline/info/)로 현재 docker의 정보를 볼 수 있습니다.
```
docker info [image 이름]
```

용도
캐싱
세션
채팅(pub/sub)


## 참고자료



[• nodejs redis](https://www.zerocho.com/category/NodeJS/post/5a3238b714c5f9001b16c430)




https://rayner.tistory.com/6

https://ssungkang.tistory.com/entry/redis-redis-%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80?category=371931

https://jeong-pro.tistory.com/139