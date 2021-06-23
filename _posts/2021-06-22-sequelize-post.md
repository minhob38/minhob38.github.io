---
title: "Sequalize"
categories: 
  - programming
date: 2021-06-14 01:00:00 +0900
last_modified_at: 2021-06-14 01:00:00 +0900
---

# Sequelize
[Sequelize](https://sequelize.org/master/manual/getting-started.html)는 관계형 데이터베이스를 위한 nodejs ORM입니다.

## 환경설정
### 설치하기
npm을 통해 sequelize와 해당 Database의 패키지를 설치합니다.
```
npm install --save sequelize
```
```
npm install --save pg pg-hstore # Postgres
npm install --save mysql2
npm install --save mariadb
npm install --save sqlite3
npm install --save tedious # Microsoft SQL Server
```
npm을 통해 sequelize-cli를 설치합니다. sequelize-cli는 터미널에서 sequelize 명령어를 입력하게 해주는 도구입니다.
```
npm install --save-dev sequelize-cli
```
## Config
애플리케이션 안에 Database의 빈프로젝트를 초기화 해줍니다. 빈프로젝트는 config, migrations, models, seeders 폴더 트리로 구성되어 있습니다.
```
npx sequelize-cli init
```

### config
```
{
  "development": {
    "username": "postgres",
    "password": "passwordsqldb",
    "database": "vos_assignment",
    "host": "34.64.125.55",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "passwordsqldb",
    "database": "vos_assignment",
    "host": "34.64.125.55",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "passwordsqldb",
    "database": "vos_assignment",
    "host": "34.64.125.55",
    "dialect": "postgres"
  }
}
```
- Local Database
터미널에 whoami를 입력하여 user name을 확인할 수 있습니다.
- Google Cloud SQL Database  
<img src="../assets/images/google_cloud_sql_username_password.png" alt="image" width="50%">

## sequelize cli
[Migration](https://sequelize.org/master/manual/migrations.html)이란 Model Schema를 정의하고, 이를 테이블에 옮기는 것을 의미합니다.  

### Model 만들기
[Database Model](https://sequelize.org/master/manual/migrations.html#creating-the-first-model--and-migration-)을 만듭니다.

```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```
### Migration 실행하기
[Migration](https://sequelize.org/master/manual/migrations.html#running-migrations)을 Database에 옮깁니다.
```
npx sequelize-cli db:migrate
```
### Migration 취소하기
옮긴 [Migration](https://sequelize.org/master/manual/migrations.html#undoing-migrations)을 취소할 수 잇습니다.
```
npx sequelize-cli db:migrate:undo
```

### Seed
Seed는 테이블에 데이터를 삽입하는 것을 의미합니다.

**Seed 만들기**  
[Seed](https://sequelize.org/master/manual/migrations.html#creating-the-first-seed)를 만듭니다.
```
npx sequelize-cli seed:generate --name demo-user
```

**Seed Database에 넣기**
[Seed](https://sequelize.org/master/manual/migrations.html#running-seeds)를 Database에 넣어줍니다.
```
npx sequelize-cli db:seed:all
```

**Seed**
```
npx sequelize-cli db:seed:undo
```



### sequelize configuration
[.sequelizerc](https://sequelize.org/master/manual/migrations.html#the--code--sequelizerc--code--file)는 sequelize-cli의 환경을 설정할 수 있는 파일입니다.
```
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
};
```

## API
### Model
[Model](https://sequelize.org/master/manual/model-basics.html)은 Database Table의 구조를 sequelize가 표현하는 것을 의미합니다.

**[Model 정의](https://sequelize.org/master/manual/model-basics.html#model-definition)**  
`sequelize.define`: 함수를 통해 모델을 정의할 수 있습니다.  
`extends model`: 상속을 통해 모델을 정의할 수 있습니다.

**[Model Sync](https://sequelize.org/master/manual/model-basicshtml#model-synchronization)**  
`sequelize.sync`를 통해 Database와 Model을 동기화 합니다.

**[Time Stamp](https://sequelize.org/master/manual/model-basics.html#timestamps)**  
sequelize는 table을 만들때, 자동으로 createdAt, updatedAt을 column에 넣습니다. 이는 option으로 비활성화 할 수 있습니다.

**[Column Option](https://sequelize.org/master/manual/model-basics.html#column-options)**

```
module.exports = (sequelize, DataTypes) => {
  const LandValue = sequelize.define("LandValue", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      defaultValue: new Date(),
    },
  }, {
    timestamps: false,
  });

  return LandValue;
}

```

### Validation
https://sequelize.org/v5/manual/models-definition.html#validations


## Database 다루기
### Create

## Read
Database를 [조회](https://sequelize.org/master/manual/model-querying-finders.html)합니다.  
``findAll``: 전체 Database를 조회합니다.  
``findByPk``: Primary Key로 Database를 조회합니다.  
``findOne``: 조건에 맞는 Database 한개를 조회합니다.  
``findOrCreate``: 조건에 맞는 Database를 조회하고 없으면 Databae를 만듭니다.  
``findAndCountAll``: 전체 Database를 조회하고 갯수 반환합니다.  



[where](https://sequelize.org/v5/variable/index.html#static-variable-Op)




https://www.youtube.com/watch?v=eISxHn-ddvc
model 테이블 스키마 정의
migration 모델을 테이블에 옮기며, 모델 변화를 기억하고 잇음
seed 데이터베이스에 데이터 넣는과정

https://www.youtube.com/watch?v=Zhi7Y1oi5qs
https://blog.devari.kr/2020/nodejs/nodejs-sequelize
https://srk911028.tistory.com/146
https://www.youtube.com/watch?v=Crk_5Xy8GMA
https://smoh.tistory.com/305
https://sihus.tistory.com/13
https://www.youtube.com/watch?v=Eu-h3iUk45o
https://velog.io/@eddie_kim/Sequelize-cli%EC%99%80-PostgreSQL%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-Migration-%EB%B0%8F-Seed%ED%95%98%EA%B8%B0
https://leanylabs.com/blog/js-csv-parsers-benchmarks/
https://stackabuse.com/reading-and-writing-csv-files-with-node-js
https://sequelize.org/v3/api/datatypes/

modle은 column정의만,, Migration이 스키마정의...
https://baeharam.netlify.app/posts/Node.js/Node.js-Sequelize-%EB%8B%A4%EB%A3%A8%EA%B8%B0

검색
https://victorydntmd.tistory.com/92

좋은자료
https://velog.io/@cadenzah/sequelize-document-1

인덱스
https://mangkyu.tistory.com/96
https://velog.io/@gillog/SQL-Index%EC%9D%B8%EB%8D%B1%EC%8A%A4


crud 보기
https://www.youtube.com/watch?v=Crk_5Xy8GMA&t=4s

https://velog.io/@gillog/SQL-Index%EC%9D%B8%EB%8D%B1%EC%8A%A4
https://brunch.co.kr/@skeks463/25

index
update / delete하면 기존거는 사용안하고, 새로운게 삽입되서 무거워짐...
https://mangkyu.tistory.com/96