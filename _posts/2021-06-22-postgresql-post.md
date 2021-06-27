---
title: "PostgreSQL"
categories:
  - programming
date: 2021-06-22 01:00:00 +0900
last_modified_at: 2021-06-22 01:00:00 +0900
---

# PostgreSQL
## 환경설정

### 설치하기

**PostgreSQL**

[공식 홈페이지](https://postgresapp.com/)에서 PostgreSQL을 설치할 수 있습니다.

설치 후, 아래 명령어를 터미널에 입력하여 PostgreSQL CLI를 사용할 수 있도록 설정합니다.

```
sudo mkdir -p /etc/paths.d &&
echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp
```

**pgAdmin**

PostgreSQL의 GUI 환경으로, [공식 홈페이지](https://www.pgadmin.org/download/)에서 pgAdmin을 설치할 수 있습니다.


## pgAdmin
### • Server 만들기
<img src="/assets/images/pgAdmin_create_server1.png" alt="image" width="30%">
<img src="/assets/images/pgAdmin_create_server2.png" alt="image" width="30%">
<img src="/assets/images/pgAdmin_create_server3.png" alt="image" width="30%">

### • Google Cloud SQL
[Google Cloud SQL](https://cloud.google.com/sql)에서 SQL Database를 저장할 수 있습니다. 클라우드를 만드는 법은 [공식홈페이지](https://cloud.google.com/sql/docs/postgres/quickstart?hl=ko)에 기술되어 있습니다.
- PostgreSQL 인스턴스 만들기
- Cloud SQL 연결하기
