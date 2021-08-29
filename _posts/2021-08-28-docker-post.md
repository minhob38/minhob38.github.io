---
title: "Docker"
categories: 
  - programming
date: 2021-08-28 01:00:00 +0900
last_modified_at: 2021-08-28 01:00:00 +0900
---

### Docker
docker는 애플리케이션이 운영체제(os)와 분리되어 실행될 수 있는 공간인 container를 기반으로 하는 오픈소스 가상화 플랫폼입니다.

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
### • docker info 보기
**\- version**  
[info](https://docs.docker.com/engine/reference/commandline/info/)로 현재 docker의 정보를 볼 수 있습니다.
```
docker info [image 이름]
```

## image
image는 애플리케이션과 유사한 개념입니다.
### • image 받기
**\- pull**  
[pull](https://docs.docker.com/engine/reference/commandline/pull/)로 image를 받을 수 있습니다.
```
docker pull [image 이름]
```
### • image 실행
**\- run**  
[run](https://docs.docker.com/engine/reference/commandline/run/)으로 image를 실행 시킬 수 있습니다.
```
$ docker run [option] [image 이름] [command] [arg...]
```
```
$ docker run --detach --name [container 이름] [image 이름]
```
🔎 해당 image를 로컬에서 찾습니다. 만약 찾지 못한다면 원격저장소에서 이미지를 찾고 최신 버전으로 다운 받습니다. (기본적으로 docker hub로 설정되어 있습니다.)  
🔎 `--detach`는 container를 background에서 실행시키며, `--name`은 container의 이름을 정의합니다.

### • image 삭제하기  
**\- rmi**  
[rmi](https://docs.docker.com/engine/reference/commandline/rmi/)으로 container를 지울 수 있습니다.
```
docker rmi [option] [image 이름] [image...]
```

## container
container는 image를 실행한 프로세스와 유사한 개념입니다.
### • container 보기  
**\- ps**  
[ps](https://docs.docker.com/engine/reference/commandline/ps/)로 실행되고 있는 container 목록을 볼 수 있습니다.
```
docker ps [option]
```
```
docker ps -a
```
### • container 종료하기  
**\- stop**  
[stop](https://docs.docker.com/engine/reference/commandline/stop/)으로 container를 종료할 수 있습니다.
```
docker stop [option] [container 이름 또는 id] [container...]
```
### • container 삭제하기  
**\- rm**  
[rm](https://docs.docker.com/engine/reference/commandline/rm/)으로 container를 지울 수 있습니다.
```
docker rm [option] [container 이름 또는 id] [container...]
```
### • container log 보기  
**\- logs**  
[logs](https://docs.docker.com/engine/reference/commandline/logs/)으로 container의 log를 볼 수 있습니다.
```
docker logs [option] [container 이름 또는 id]
```
### • container 터미널 실행하기  
**\- exec**  
[exec](https://docs.docker.com/engine/reference/commandline/exec/)으로 container의 터미널을 실행할 수 있습니다.
```
$ docker exec [option] [container 이름 또는 id] [터미널 명령어] [args...]
```
```
$ docker exec -it [container 이름 또는 id] /bin/sh
```
### • container 정보 보기  
**\- inspect**  
[inspect](https://docs.docker.com/engine/reference/commandline/inspect/)로 container의 형상 정보를 볼 수 있습니다.
```
$ docker inspect [option] [container 이름 또는 id]
```
**\- stats**  
[stats](https://docs.docker.com/engine/reference/commandline/stats/)로 container의 stats를 볼 수 있습니다.
```
$ docker stats [option] [container 이름 또는 id]
```
**\- top**  
[top](https://docs.docker.com/engine/reference/commandline/top/)으로 container의 process를 볼 수 있습니다.
```
$ docker top [container 이름 또는 id]
```
**\- port**  
[port](https://docs.docker.com/engine/reference/commandline/port/)으로 container의 port를 볼 수 있습니다.
```
$ docker port [container 이름 또는 id]
```

## docker network

## 이미지 만들기

## 배포

## swarm

## kuberntis


## 참고자료
[• docker 공식 문서](https://docs.docker.com/)  
[• docker 공식 Reference 문서](https://docs.docker.com/reference/)  

