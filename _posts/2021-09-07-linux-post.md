---
title: "Linux"
categories: 
  - programming
date: 2021-08-28 01:00:00 +0900
last_modified_at: 2021-08-28 01:00:00 +0900
---

# Linux
docker는 애플리케이션이 운영체제(os)와 분리되어 실행될 수 있는 공간인 container를 기반으로 하는 오픈소스 가상화 플랫폼입니다.

**\- whoami**

**\- hostname**


**\- hostname**


### • network
**\- ifconfig / ip**

ctrl + c

### • path
**\- cd**  
cd(Change Directory)는 해당 경로로 바꿉니다.  
`cd /[절대 경로]`: 절대경로로 이동합니다.  
 `cd [상대 경로]`: 상대경로로 이동합니다.  
`cd /`: root 경로로 이동합니다.  
`cd ..`: 상위 경로로 이동합니다.  
**\- pwd**  
pwd(Print Working Directory)는 현재 작업 경로를 보여줍니다.  
**\- ls**  
ls(LiSt)는 현재 작업 경로의 폴더/파일을 보여줍니다.  
🔎 절대경로는 /로 시작하며, 상대경로는 /없이 현재 경로를 기준으로 이동합니다.

ssh -l iafzal 192.168.1.x

### • file 만들기
`touch [file 이름]`: file을 만듭니다.
`cp [원본 file 이름] [새로운 file 이름]`: file을 복사합니다.
`vi [file 이름]`: file을 만들고 편집합니다.
🔎 :wq!로 나올 수 있습니다.

### • directory(folder) 만들기
`mkdir [directory 이름]`: directory(folder)를 만듭니다.
  
### • file 종류
|기호|의미|
|-|-|
|-|regular file|
|d|directory|
|l|link|
|c|special, device file|
|s|socket|
|p|named pipe|
|b|block device|

### • file 찾기 
`find [기준 경로] -name [file 이름]`: 해당 file을 찾으며, file이 있는 경로를 보여줍니다.  
🔎 root부터 찾는다면 `/`, 현재 경로부터 찾는다면 `.`, `./`로 기준 경로를 설정합니다.  
`locate [file 이름]`: 해당 file을 찾으며, file을 포함한 경로를 보여줍니다.  
🔎 find가 모든 경로를 탐색하는 것과 달리, locate는 db에 경로를 저장하고 있어보다 탐색 속도가 빠릅니다 하지만, db가 최신화되어 있지 않을 수 있기에 updatedb를 통해 db를 업데이트 할 수 있습니다.

## 환경설정
### • 설치
[공식 홈페이지에서](https://docs.docker.com/desktop/mac/install/)를 통해 docker를 설치할 수 있습니다.  
🔎 `docker cli`에서 `docker` 및 `docker [command] --help`로 command 정보를 볼 수 있습니다.  

### • docker version 보기
**\- version**  
[version](https://docs.docker.com/engine/reference/commandline/version/)으로 version 정보를 볼 수 있습니다.
```
docker version [option]
```


## docker network

## 이미지 만들기

## 배포

## swarm

## kuberntis


## 참고자료
[• docker 공식 문서](https://docs.docker.com/)  
[• docker 공식 Reference 문서](https://docs.docker.com/reference/)  

https://jonnung.dev/docker/2020/02/16/docker_network/
https://www.daleseo.com/docker-nodejs/
http://labs.brandi.co.kr/2018/05/25/kangww.html