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
**\- info**  
[info](https://docs.docker.com/engine/reference/commandline/info/)로 현재 docker의 정보를 볼 수 있습니다.
```
docker info [image 이름]
```

## image
image는 애플리케이션과 유사한 개념입니다.
### • image 만들기
**\- bulild**  
[images](https://docs.docker.com/engine/reference/commandline/build/)로 image 목록을 볼 수 있습니다.
```
docker bulid [option] [경로]
docker bulid -t [image 이름][:tag 이름]
```
### • image 목록 보기
**\- images**  
[images](https://docs.docker.com/engine/reference/commandline/images/)로 image 목록을 볼 수 있습니다.
```
docker images [image 이름][:tag 이름]
```
### • image history 보기
**\- images**  
[image history](https://docs.docker.com/engine/reference/commandline/image_history/)로 image history를 볼 수 있습니다.
```
docker images [image 이름][:tag 이름]
```
🔎 [:tag 이름]을 지정하지 않으면, latest를 찾습니다.

### • image 올리기(배포하기)
**\- push**  
[push](https://docs.docker.com/engine/reference/commandline/push/)로 image를 dock hub에 올릴 수 있습니다.
```
docker push [image 이름][:tag 이름]
```
### • image 받기
**\- pull**  
[pull](https://docs.docker.com/engine/reference/commandline/pull/)로 image를 받을 수 있습니다.
```
docker pull [image 이름][:tag 이름]
```
🔎 default tag는 latest입니다.
### • image 실행
**\- run**  
[run](https://docs.docker.com/engine/reference/commandline/run/)으로 image를 실행 시키고, container를 만들어 실행 시킵니다.
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

### • image 만들기(수정하기)  
**\- commit**  
[commit](https://docs.docker.com/engine/reference/commandline/rmi/)으로 변경된 container로부터 새로운 image를 만들 수 있습니다.
```
docker commit [option] [container 이름/id] [repository 이름[:tag 이름]]
```
### • image 만들기(이름 수정하기)
**\- tag**  
[image](https://docs.docker.com/engine/reference/commandline/tag/)로 현재 image에서 새로운 이름을 갖는 image를 만듭니다.
```
docker tag [현재 image 이름][:현재 tag 이름] [새로운 image 이름][:새로운 tag 이름]
```
🔎 dock hub 저장소에 push 할때, 이미지 이름은 [계정 이름]/[image 이름:tag 이름]로 바꾸어야 합니다. 계정이름이 다르면 접근 권한이 없으며, 이미지 이름에 맞는 저장소가 없으면 새로운 저장소를 만듭니다.

## container
container는 image를 실행한 프로세스와 유사한 개념으로, 격리된 공간에서 프로세스가 동작합니다.
### • container 만들기
**\- create**  
[create](https://docs.docker.com/engine/reference/commandline/create/)으로 image에서 container를 만듭니다.
```
$ docker create [option] [image 이름] [command] [arg...]
```
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
### • 모든 (중지된) container 삭제하기  
**\- conatiner prune**  
[container prune](https://docs.docker.com/engine/reference/commandline/container_prune/)으로 모든 중지된 container를 지울 수 있습니다.
```
docker container prune [option]
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

## docker volume
container가 지워지면 container에 있던 data들도 지워집니다. 따라서 data들의 pesistency를 위해 container 바깥(호스트)에 data들을 저장하고, container는 이 경로를 공유하여 data에 접근할 수 있습니다.
### • volume 만들기  
**\- volume**
[create](https://docs.docker.com/engine/reference/commandline/volume_create/)로 docker volume을 만들 수 있습니다.
```
$ docker volume create [option] [volume 이름]
```
### • volume 공유하기  
-v 옵션으로 volume을 공유할 수 있습니다.
```
docker run [image 이름] -v [volume 이름]:[container 공유 경로]
```
🔎 volume이 container에 mount 되는 개념으로, container 공유 경로에 다른 데이터들이 있다면 덮어씁니다.
### • volume 보기  
**\- ls**  
[ls](https://docs.docker.com/engine/reference/commandline/volume_ls/)로 volume의 목록들을 볼 수 있습니다.
```
docker volume ls
```
### • volume 지우기  
**\- prune**  
[prune](https://docs.docker.com/engine/reference/commandline/volume_prune/)로 모든 volume들을 지울 수 있습니다.
```
docker volume prune [option]
```
**\- rm**  
[rm](https://docs.docker.com/engine/reference/commandline/volume_rm/)로 해당 volume을 지울 수 있습니다.
```
docker volume rm [option] [volume 이름]
```

## docker file
개발한 애플리케이션의 docker image를 만들기 위해선, 빈 image(os image)를 바탕으로 환경 설정 및 애플리케이션 개발을 한 뒤 container를 만들고 commit을 하여 image를 만들 수 있습니다. 이러한 작업과정을 [Dockerfile(https://docs.docker.com/engine/reference/builder/)에 정의하여 편리하게 image를 만들 수 있습니다.

### • docker file 명령어  
**\- FROM**  
[FROM](https://docs.docker.com/engine/reference/builder/#from)은 base image를 설정합니다.
```
FROM [이미지]
```
**\- MAINTAINER**  
[MAINTAINER](https://docs.docker.com/engine/reference/builder/#maintainer-deprecated)는 작성자를 정의합니다.
```
MAINTAINER [작성자]
```
**\- LABEL**  
[LABEL](https://docs.docker.com/engine/reference/builder/#label)은 메타데이터를 정의합니다.
```
LABEL [key=value]
```
**\- RUN**  
[RUN](https://docs.docker.com/engine/reference/builder/#run)은 container shell의 명령어를 실행시킵니다.
```
RUN [shell 명령어]
```
🔎 container shell에서 실행되는 명렁어 입니다.  
**\- WORKDIR**  
[WORKDIR](https://docs.docker.com/engine/reference/builder/#workdir)은 docker file의 명령어(RUN, CMD, COPY, ADD, ENTRY POINT 등)가 실행되는 경로를 설정합니다.
```
WORKDIR [container 경로]
```
🔎 container의 경로이며, 없을 경우 새로 생성합니다.  
**\- COPY**  
[COPY](https://docs.docker.com/engine/reference/builder/#copy)는 작업 컴퓨터의 경로/파일을 container 해당 경로에 복사합니다.
```
COPY [작업 컴퓨터 경로/파일] [container 경로]
```
**\- ADD**  
[ADD](https://docs.docker.com/engine/reference/builder/#add)는 작업 컴퓨터의 경로/파일을 container 해당 경로에 복사합니다.
```
COPY [작업 컴퓨터 경로/파일] [container 경로]
```
🔎 [ADD vs COPY](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy
) - ADD는 COPY처럼 경로/파일을 복사할 수 있으며, 압축파일 해제 및 URL을 처리할 수 있습니다.  
**\- EXPOSE**  
[EXPOSE](https://docs.docker.com/engine/reference/builder/#expose)는 container 포트를 정의합니다.
```
EXPOSE [container 포트/ protocol]
```
**\- CMD**  
[CMD](https://docs.docker.com/engine/reference/builder/#cmd)는 container가 시작될때 실행되는 명렁어를 정의합니다.
```
CMD [shell 형태]
CMD [exec 형태]
```
**\- ENV**  
[ENV](https://docs.docker.com/engine/reference/builder/#env)는 container의 환경변수를 설정합니다.
```
ENV [key=value]
```
### • dockerignore
docker context에서 무시할 파일/폴더를 [dockerignore](https://docs.docker.com/engine/reference/builder/#dockerignore-file)에 정의합니다.





## docker network




## docker demon

## docker layer

## docker compose
[docker compose](https://docs.docker.com/compose/) yml로 여러 container를 실행시킬 수 있는 도구입니다.
### • 설치
docker를 설치할때 docker compose도 같이 설치됩니다.  
🔎 리눅스에서는 따로 설치해야합니다.
### • compose version 보기
```
docker-compose -v
```
### • compose 실행하기
**\- up**
[up](https://docs.docker.com/compose/reference/up/)로 docker-compose.yml에 정의한대로 container를 만들 수 있습니다.
```
$ docker-compose up [option] [--scale] [service 이름]
```
🔎 `docker-compose -p [프로젝트 이름] up`으로 프로젝트 이름을 정의할 수 있습니다.
### • compose 종료 및 지우기
**\- down**
[down](https://docs.docker.com/compose/reference/down/)로 만들어진 compose를 종료하고 지웁니다.
```
$ docker-compose up down
```
🔎 `docker-compose -p [프로젝트 이름] down`으로 해당 프로젝트를 지울 수 있습니다.
### • compose 보기
**\- ps**
[ps](https://docs.docker.com/compose/reference/ps/)로 만들어진 compose 목록들을 볼 수 있습니다.
```
$ docker-compose ps [option] [service 이름]
```
### • compose 보기
**\- ps**
[ps](https://docs.docker.com/compose/reference/ps/)로 만들어진 compose 목록들을 볼 수 있습니다.
```
$ docker-compose ps [option] [service 이름]
```
### • docker-compose.yml 검사하기
**\- config**
[config](https://docs.docker.com/compose/reference/config/)로 docker-compose.yml의 유효성을 검사합니다.
```
$ docker-compose config [option]
```
### • docker-compose.yml
docker cli를 docker-compose.yml로 바꾸면 다음과 같습니다.
```
docker container run -d -p 3000:3000 --link postgresql:db --name myappserver myapp:latest

docker container run -d -p 5432:5432 --name mydbserver mydbapp:latest echo ...
```

```yml
version: 1.0
services:
  myappserver:
    image: myapp
    ports:
      - "3000:3000"
    links:
      - postgresql:db
  mydbserver:
    image: mydb
    ports:
      - "5432:5432"
    command: echo ...
```
**\- version**  
docker-compose.yml의 version을 정의합니다.
**\- services**  
만들 service(container)들의 모음이며, key로 service 이름(container 이름)을 할당합니다.
**\- image**  
container의 image를 정의합니다.
**\- port**  
container의 port를 정의합니다.


docker attach
알아서 실행되는거는 -d 가능
알아서 실행안되는거는 -d 불가

## swarm

## kubernetis


## docker hub
이미지 저장소

## 참고자료
[• docker 공식 문서](https://docs.docker.com/)  
[• docker 공식 Reference 문서](https://docs.docker.com/reference/)  

https://jonnung.dev/docker/2020/02/16/docker_network/
https://www.daleseo.com/docker-nodejs/
http://labs.brandi.co.kr/2018/05/25/kangww.html


이미지 캐시
https://jonnung.dev/docker/2020/04/08/optimizing-docker-images/
https://twpower.github.io/247-file-download-issue-caused-by-layer-cache-in-docker-build
---
예로들어
내가 가지고 있는 컴퓨터는 mac
->
python이 맥에서 잘 안깔림
-> 1. VM에 윈도우를 깔고 python을 설치
-> 2. 윈도우컴 사고 python 설치
-> 도커 (윈도우 + 파이썬) 이미지를 만들어 실행 (guest OS가 아닌 docker engine에서 도는거라 노상관)

같은 프로그램을 까는데,
A서버에서는 잘돌아가는데 B서버에서는 잘 안돌아감 (알고보니 B컴퓨터 한글이름이 들어가 있었음)
이처럼 환경에 따라 프로그램 설치가 의존적임

프로그램을 만들고 배포했는데
A사람은 32bit, B사람은 64bit...

프로그램을 만들고 배포했는데
배포한 프로그램 이름이 같다..

프로그램을 만들고 nodejs를 배포했는데
A사람은 mysql1 B사람은 Mysql2..


이처럼 컴퓨터 환경(하드웨어, 소프트웨어 환경)

서버마다 조금씩 환경이 다르기에, 서버애플리케이션을 관리하기 힘듬



도커 개념
https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html

이미지는 컨테이너가 실행되기 위한 파일, 설정들을 포함

https://kamang-it.tistory.com/entry/DockerDocker%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-%EB%8F%84%EC%BB%A4%EC%9D%98-%EA%B8%B0%EC%B4%88%EC%99%80-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%84%A4%EC%B9%98%ED%95%98%EA%B3%A0-%EC%82%AC%EC%9A%A91


https://cloudacademy.com/blog/docker-vs-virtual-machines-differences-you-should-know/

https://stackoverflow.com/questions/16047306/how-is-docker-different-from-a-virtual-machine


https://m.blog.naver.com/lovemycat/221934095769


도커는 커널을 공유함
예로들어,
A(m) OS가 있고 B OS(m+n)가 있다면, 도커는 n을 떼고 OS를 공유하여 실행



---
docker image tag --help

dettach vs attach


`docker history, show layer`

https://okky.kr/article/650088

docker run -d -e ROOT_URL=http://localhost -e MONGO_URL=mongodb://localhost:27017 --network="Host"

https://subicura.com/