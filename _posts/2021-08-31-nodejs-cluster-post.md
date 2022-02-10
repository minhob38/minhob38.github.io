---
title: "Nodejs Cluster"
categories: 
  - programming
date: 2021-08-28 01:00:00 +0900
last_modified_at: 2021-08-28 01:00:00 +0900
---
nodejs 단일 요청이 큰 작업처리량이 클떄 안좋음 (싱글코어-멀티쓰레드이기때문에, 비동기로 큰 작업을 처리해도 cpu자원을 잡아먹음)


js는 싱글코어 멀티쓰레드 (js 실행이 main thread)
프로세서, 쓰레드
코어, 쓰레드 정리
nodejs 싱글스레드 정리
https://medium.com/@gwakhyoeun/%EC%99%9C-node-js%EB%8A%94-single-thread-%EC%9D%B8%EA%B0%80-bb68434027a3

https://darrengwon.tistory.com/763

https://sjh836.tistory.com/149

싱글쓰레드: 프로세스에 다른 작업이 들어와도 cpu core하나로 모든일을 처리
쓰레드(카레 도마) 요리사가 카레만들고나서, 스테이크 만듬
멀티쓰레드: 프로세스에 다른 작업이 들어오면, 다른 쓰레드로 할당하여 작업처리 (코어하나가 번갈아가면서...)
쓰레드(카레 도마, 스테이크 도마) 요리사가 카레, 스테이크 번갈아가면서 요리
프로세스: 주방(메모리)
코어: 일하는 사람(cpu)
https://m.blog.naver.com/hhw1990/221394005779

멀티쓰레드에서 여러개의 코어로 할당가능, 하지만 싱글쓰레드는 cpu1개밖에 못쓰기때문에 cpu연산이 많다면 느림
(쓰레드 하나당 하나의 cpu가 할당되도록)
프로세스: 프로그램 하나

멀티프로세스: 하나의 프로그램을 여러 프로세스로 쪼개는거
### Nodejs 클러스터
[cluster](https://nodejs.org/api/cluster.html)를 통해 싱글스레드인 nodejs를 멀티스레드에서 실행시킬 수 있습니다.

https://blog.naver.com/PostView.nhn?isHttpsRedirect=true&blogId=strike0115&logNo=221440344642&parentCategoryNo=&categoryNo=52&viewDate=&isShowPopularPosts=true&from=search

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