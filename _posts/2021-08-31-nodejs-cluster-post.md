---
title: "Nodejs Cluster"
categories: 
  - programming
date: 2021-08-28 01:00:00 +0900
last_modified_at: 2021-08-28 01:00:00 +0900
---

프로세서, 쓰레드
코어, 쓰레드 정리
nodejs 싱글스레드 정리
https://medium.com/@gwakhyoeun/%EC%99%9C-node-js%EB%8A%94-single-thread-%EC%9D%B8%EA%B0%80-bb68434027a3

https://darrengwon.tistory.com/763

### Nodejs 클러스터
[cluster](https://nodejs.org/api/cluster.html)를 통해 싱글스레드인 nodejs를 멀티스레드에서 실행시킬 수 있습니다.



클러스터 만들기
folk
https://nodejs.org/api/cluster.html#cluster_cluster_fork_env


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







## 참고자료
[• docker 공식 문서](https://docs.docker.com/)  
[• docker 공식 Reference 문서](https://docs.docker.com/reference/)  

https://jonnung.dev/docker/2020/02/16/docker_network/
https://www.daleseo.com/docker-nodejs/
http://labs.brandi.co.kr/2018/05/25/kangww.html

https://velog.io/@ckstn0777/Clustering-in-Action

https://nodejs.sideeffect.kr/docs/v0.10.0/api/cluster.html

https://medium.com/beyond-coding/take-advantage-of-node-js-cluster-and-child-processes-with-pm2-rabbitmq-redis-and-nginx-c83eccfb8af8

$ siege -c100 -t60s http://localhost:8080/

https://cheatcode.co/tutorials/how-to-add-cluster-support-to-node-js

https://blog.devgenius.io/how-to-scale-a-nodejs-application-a51d3e8e2d36