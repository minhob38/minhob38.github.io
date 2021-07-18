---
title: "PostgreSQL"
categories:
  - programming
date: 2021-06-22 01:00:00 +0900
last_modified_at: 2021-06-22 01:00:00 +0900
---

# PostgreSQL
PostgreSQL은 오픈소스 관계형 데이터베이스로 대용량 Transaction 처리, GIS에 유용한 특징을 가지고 있습니다.  
🔎 관계형데이터베이스는 정규화된 테이블로 이루어져 있습니다.
(column(attribute) row(tuple))

## 환경설정
### • 설치하기
**PostgreSQL**  
[공식 홈페이지](https://postgresapp.com/)에서 PostgreSQL을 설치할 수 있습니다. 설치 후, 아래 명령어를 터미널에 입력하여 PostgreSQL CLI를 사용할 수 있도록 설정합니다.

```
sudo mkdir -p /etc/paths.d &&
echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp
```

**psql**  
psql은 postgres cli입니다.

**pgAdmin**  
PostgreSQL의 GUI 환경으로, [공식 홈페이지](https://www.pgadmin.org/download/)에서 pgAdmin을 설치할 수 있습니다.

<br>

## Terminal
터미널로 database를 다루기 위해서, postgreSQL cli인 psql이 먼저 설치되어 있어야합니다.

### • Database 만들기
psql 환경으로 들어간 후, `CREATE DATABASE [DB이름];`을 통해 database를 만들 수 있습니다.

### • Database 지우기
psql 환경으로 들어간 후, `DROP DATABASE [DB이름];`을 통해 database를 지울 수 있습니다.

### • Database 연결하기
`psql [Option]... [DBNAME [USERNAME]]`를 통해 database에 연결 할 수 있으며, 아래는 예시 입력입니다.  
```
psql -h localhost -p 5432 -U minho [DB이름]
```
🔎 Option은 `psql --help`를 터미널에 입력하여 볼 수 있습니다.

### • Table 만들기
table은 아래와 같이 `CREATE TABLE [table 이름] ([column 이름] [Data Type])`으로 만들며, `\d`로 database에 있는 table들을 또는 `\d [table 이름]`으로 table의 column들을 볼 수 있습니다.
```
CREATE TABLE table_name (
  column datatype constraint
  ...
);
```

### • Table 지우기
`DROP TABLE [table 이름]`으로 table을 지울 수 있습니다.
```
DROP TABLE table;
```
### • Table에 Record(Row) 삽입하기
`INSERT INTO [talbe 이름] ([column 이름])` `VALUE ([column 값])`으로 table에 record를 삽입할 수 있습니다.
```
INSERT INTO table_name (column, ...)
VALUE (value, ...);
```
🔎 Option은 `/i`를 통해 sql파일로부터 record를 삽입할 수 있습니다.

\- Data Constraint
Data의 [Constraint](https://www.postgresql.org/docs/13/ddl.html)를 정의할 수 있습니다.

\- Data Constraint
[Data Type](https://www.postgresql.org/docs/13/datatype.html)을 정의할 수 있습니다.

### • Table 조회하기
아래와 같이 [SELECT](https://www.tutorialspoint.com/postgresql/postgresql_select_query.htm)을 통해 table을 조회할 수 있습니다.  
`SELECT [column 이름] FROM [table 이름]`
```
SELECT column, ... FROM table;
```
또한, [DISTINCT](https://www.tutorialspoint.com/postgresql/postgresql_distinct_keyword.htm)를 통해 중복값을 없애고 조회할 수 있습니다.  
`SELECT DISTINCT[column 이름] FROM [table 이름]`
```
SELECT DISTINCT column, ... FROM table;
```
🔎 ON 키워드를 통해 중복된 특정 column을 정의할 수 있습니다.

SELECT는 WHERE, LIMIT 등을 통해 여러가지 형태로 table을 조회할 수 있습니다.

\- WHERE  
[WHERE](https://www.tutorialspoint.com/postgresql/postgresql_where_clause.htm)은 여러 조건 [AND/OR](https://www.tutorialspoint.com/postgresql/postgresql_and_or_clauses.htm), IN, NOT IN, BETWEEN, [LIKE](https://www.tutorialspoint.com/postgresql/postgresql_like_clause.htm), NOT LIKE, IS NULL, IS NOT NULL 조합을 통해 조건에 맞는 record만 조회할 수 있습니다.  
`SELECT [column 이름] FROM [table 이름] WHERE [조건]`
```
SELECT column, ... FROM table
WHERE column = ... AND ... OR ... IN ... NOT IN ... BETWEEN ... NOT BETWEEN ... LIKE ... NOT LIKE ... IS NULL ... IS NOT NULL ...;
```
```
WHERE column = a AND column = b;
WHERE column = a OR column = b;
WHERE column IN (a, b);
WHERE column NOT IN (a, b);
WHERE column BETWEEN a AND b;
WHERE column NOT BETWEEN a AND b;
WHERE column LIKE a%;
WHERE column NOT LIKE a_;
WHERE column IS NULL;
WHERE column IS NOT NULL;
```

\- LIMIT  
[LIMIT](https://www.tutorialspoint.com/postgresql/postgresql_limit_clause.htm)를 통해 조회하는 row 수를 제한합니다. OFFSET과 같이 사용될 수 있습니다.  
`SELECT [column 이름] FROM [table 이름] LIMIT [가져올 record 수]`
`SELECT [column 이름] FROM [table 이름] OFFSET [시작행] LIMIT [가져올 record 수]`
```
SELECT column, ... FROM table LIMIT number;
SELECT column, ... FROM table OFFSET row LIMIT number;
```
🔎 단지, SELECT로 조회한 row에서 보여주는 수를 제한합니다.

\- FETCH  
FETCH를 통해 조회하는 row 수를 제한합니다. OFFSET, FETCH와 같이 사용될 수 있습니다.  
`SELECT [column 이름] FROM [table 이름] FETCH FIRST [가져올 record 수] ROW ONLY`
`SELECT [column 이름] FROM [table 이름] OFFSET [시작행] FETCH FIRST [가져올 record 수] ROW ONLY`
```
SELECT column, ... FROM table FETCH FIRST number ROW ONLY;
SELECT column, ... FROM table OFFSET row FETCH FIRST number ROW ONLY;
```
🔎 단지, SELECT로 조회한 row에서 보여주는 수를 제한합니다.

\- GROUP BY
[GROUP BY](https://www.tutorialspoint.com/postgresql/postgresql_group_by.htm)에서 COUNT, SUM 등의 [aggreation 함수](https://www.postgresql.org/docs/13/functions-aggregate.html)를 통해 group의 정보(통계)를 알 수 있습니다. [HAVING](https://www.tutorialspoint.com/postgresql/postgresql_having_clause.htm)과 함께 사용될 수 있습니다.  
`SELECT [column 이름] 통계식 FROM [table 이름] GROUP BY [기준 column]`
```
SELECT column, ... FROM table GROUP BY column;
```

### • Table 정렬하기
아래와 같이 [ORDER BY](https://www.tutorialspoint.com/postgresql/postgresql_order_by.htm)를 통해 table을 정렬할 수 있습니다.  
`SELECT [column 이름] FROM [table 이름] ORDER BY [기준 column] [오름차순/내림차순]`
```
SELECT column, ... from table ORDER BY column, ... ASC;
```

### • postgreSQL 연산자
postgreSQL [연산자](https://www.tutorialspoint.com/postgresql/postgresql_operators.htm)는 산술, 비교, 논리, 비트 연산자가 있습니다.

### • postgreSQL 자료형

### • postgreSQL 날짜 다루기
```
select
  date('2020-3-1') - date('2020-2-28')
```

## pgAdmin
### • Server(Database) 만들기
<img src="/assets/images/pgAdmin_create_server1.png" alt="image" width="30%">
<img src="/assets/images/pgAdmin_create_server2.png" alt="image" width="30%">
<img src="/assets/images/pgAdmin_create_server3.png" alt="image" width="30%">

### • Google Cloud SQL
[Google Cloud SQL](https://cloud.google.com/sql)에서 SQL Database를 저장할 수 있습니다. 클라우드를 만드는 법은 [공식홈페이지](https://cloud.google.com/sql/docs/postgres/quickstart?hl=ko)에 기술되어 있습니다.
- PostgreSQL 인스턴스 만들기
- Cloud SQL 연결하기

## 참고 자료
[• 유튜브 강의](https://www.youtube.com/watch?v=qw--VYLpxG4)  
[• postgreSQL document](https://www.postgresql.org/docs/13/index.html)  
[• postgreSQL tutorial](https://www.postgresql.org/docs/online-resources/)

함수
https://www.tutorialspoint.com/postgresql/postgresql_useful_functions.htm