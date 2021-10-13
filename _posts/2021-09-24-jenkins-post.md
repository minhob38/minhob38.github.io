---
title: "jenkins"
categories: 
  - programming
date: 2021-09-24 01:00:00 +0900
last_modified_at: 2021-09-24 01:00:00 +0900
---

### jenkins
https://www.jenkins.io/


## jenkins 환경설정
### • jenkins 설치
https://www.jenkins.io/doc/book/installing/docker/#downloading-and-running-jenkins-in-docker

### • jenkins 접속
jenkins ip에 접속합니다. 이때 비밀번호는 docker로 실행했다면 `docker logs [jenkins container 이름]`으로 확인합니다.
<img src="/assets/images/jenkins-unlock.png" alt="image" width="80%">

https://cjwoov.tistory.com/3
host에 설치해서 외부에 사이트 연결

## jenkins 실행

## jenkins item
### • jenkins item 만들기
<img src="/assets/images/jenkins-dashboard.png" alt="image" width="20%">

<img src="/assets/images/jenkins-new-item.png" alt="image" width="80%">

<img src="/assets/images/jenkins-project.png" alt="image" width="20%">

### • item 설정

**\- shell**
`add build step`에서 build 시 실행할 작업(ssh, backup)들을 정의하는 shell script를 작성합니다.  
<img src="/assets/images/jenkins-build-shell.png" alt="image" width="100%">  
🔎

**\- parameter**  
`이 빌드는 매개변수가 있습니다.`에서 빌드시 필요한 parameter를 정의합니다. 정의된 parameter는 빌드 시 shell에서 사용될 수 있습니다.  
```
echo $[매개변수 이름] $[매개변수 이름]
```



## jenkins CI/CD 환경설정


CI / CD
### • github - dockerhub
https://watch-n-learn.tistory.com/44
**\- github - dockerhub 연결하기**  
dockerhub의 account setting에서 github 계정을 등록합니다.

**\- github - dockerhub 이미지 빌드(자동화)**  
dockerhub의 build에서 github repository를 등록합니다.

### • dockerhub - jenkins
**\- dockerhub - jenkins 연결하기**  
빌드를 원격으로 유발
https://velog.io/@king/Jenkins-Job-%EC%8B%A4%ED%96%89%EC%9D%84-%EC%9B%90%EA%B2%A9%EC%9C%BC%EB%A1%9C-%EC%9C%A0%EB%B0%9C%ED%95%98%EA%B8%B0-nuk5jjenyk





### • linux 설치

### • docker 설치

### • git clone
```
git clone https://github.com/minhob38/my-app ~/src # ~/src에 설치
```

### • docker image build

### • docker container 실행

### • nginx image 설치


gcp 외부접속을 위해, ip 고정 및 방화벽 설정
