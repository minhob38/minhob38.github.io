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

## SQL문
postgreSQL cli인 psql 또는 sql 편집기를 통해 database를 다룰 수 있습니다.

<img src="/assets/images/sql.png" alt="image" width="60%">

### • Database 만들기
`CREATE DATABASE [DB이름];`을 통해 database를 만들 수 있습니다.

### • Database 지우기
`DROP DATABASE [DB이름];`을 통해 database를 지울 수 있습니다.

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

### • Table 연결하기
아래와 같이 [Join](https://www.tutorialspoint.com/postgresql/postgresql_using_joins.htm)을 통해 table을 연결할 수 있습니다. 조건에 따라 join을 하면 기준 테이블 옆에 join되는 테이블이 붙어 새로운 테이블이 만들어 집니다.  
**\- (Inner) Join**  
inner join은 on 조건에 맞는 table a와 table b의 행들을 연결하여 새로운 테이블을 만듭니다.  
`SELECT [column 이름] FROM [table a 이름] JOIN [table b 이름] ON [table a's common column] = [table b's common column]`  
`SELECT [column 이름] FROM [table a 이름] JOIN [table b 이름] USING [tables' common column]`  
```
SELECT * FROM table_a JOIN table_b ON table_a's common_column = table_b's common_column
```
```
SELECT * FROM table_a JOIN table_b USING common_column
```
🔎 table b의 common_column은 foreign key로 primary key가 되어야 합니다.

**\- Left(Outer) Join**  
left join은 왼쪽 테이블을 기준으로, on 조건에 맞는 table b의 행들을 연결하여 새로운 테이블을 만듭니다.  
`SELECT [column 이름] FROM [table a 이름] LEFT JOIN [table b 이름] ON [table a's common column] = [table b's common column]`  
```
SELECT * FROM table_a LEFT JOIN table_b ON table_a's common_column = table_b's common_column
```
**\- Right(Outer) Join**  
right join은 오른쪽 테이블을 기준으로, on 조건에 맞는 table b의 행들을 연결하여 새로운 테이블을 만듭니다.  
`SELECT [column 이름] FROM [table a 이름] RIGHT JOIN [table b 이름] ON [table a's common column] = [table b's common column]`  
```
SELECT * FROM table_a RIGHT JOIN table_b ON table_a's common_column = table_b's common_column
```
**\- Full(Outer) Join**  
full join은 왼쪽/오른쪽 테이블을 기준으로, on 조건에 맞는 table b의 행들을 연결하여 새로운 테이블을 만듭니다.  
`SELECT [column 이름] FROM [table a 이름] FULL JOIN [table b 이름] ON [table a's common column] = [table b's common column]`  
```
SELECT * FROM table_a FULL JOIN table_b ON table_a's common_column = table_b's common_column
```
**\- Cross Join**  
cross join은 왼쪽/오른쪽 테이블을 서로 교차한 행들을 연결하여 새로운 테이블을 만듭니다. 따라서, 왼쪽 테이블이 n행이고 오른쪽 테이블이 m행이라면 n * m행의 테이블이 만들어지게 됩니다.  
`SELECT [column 이름] FROM [table a 이름] CROSS JOIN [table b 이름]`  
```
SELECT * FROM table_a CROSS JOIN table_b
```
**\- Self Join**  
**\- Nautral Join**  
**\- COALESCE**  

### • Subquery
아래와 같이 다른 쿼리문 안에 감싸져 있는 쿼리를 서브쿼리라 합니다. 서브쿼리는 SELECT, INSERT, UPDATE, DELETE와 함께 사용됩니다.
서브쿼리 규칙은 아래와 같습니다.
\- 서브쿼리는 ()안에 작성됩니다.
\- SELECT 서브쿼리는 하나의 행을 반환해야 합니다.  
\- SELECT 서브쿼리는 IN, EXISTS, NOT IN, ANY, SOME, ALL 연산자와 함께 하나의 행 이상을 반환할 수 있습니다.  
\- ORDER BY는 사용될 수 없습니다.  
\- 서브쿼리는 BETWEEN과 함께 사용될 수 없습니다. (서브쿼리 안에서는 BEWEEN을 사용할 수 있습니다.)

`SELECT * FROM [table a 이름] WHERE 조건 (SELECET ... FROM [table b 이름])`  
```
SELECT * FROM table_a WHERE column_a = (SELECT column_b FROM table_b)
```

### • Transaction
Database를 수정 중 문제가 발생하면, 작업이 완전히 끝나지 않 Database는 중간의 데이터를 저장하고 있습니다. 또한 database에 다른 작업이 실행 중인데, 또 다른 작업이 끼어든다면 database가 꼬이게 됩니다. [Transaction](https://www.tutorialspoint.com/postgresql/postgresql_transactions.htm)은 여러개의 Database 작업을 하나로 묶어, Database를 요구대로 수정하거나 아예 바꾸지 않게 해주며, ACID(Atomicity, Consistency, Isolation, Durability) 특성을 가지고 있습니다.  
\- Atomicity: Transaction은 하나의 작업으로 여겨져야 합니다.  
\- Consistency: Transaction의 결과는 일관성이 있어야합니다.  
\- Isolation: Transaction 작업 시, 또다른 Transaction으로부터 고립되어야 합니다.  
\- Durability: 반영된 transaction 결과는 database에 영구히 저장됩니다.  

이러한 transaction은 SQL문은 아래와 같습니다.  
\- BEGIN: transation의 시작점입니다.  
\- COMMIT: transaction의 끝점입니다.  
\- ROLLBACK: transaction 작업 중 오류가 발생하면, 제일 가까운 database로 원복시킵니다.  
\- SAVEPOINT: transaction 작업 중 오류가 발생하면, 원복될 지점을 정의합니다.  
🔎 transaction의 작업 단위는 `BEGIN [작업...] COMMIT`으로 정의합니다. 만일 COMMIT이 없다면 transaction이 끝나지 않기에 database에 변화는 없습니다.


ACID(Atomicity, Consistency, Isolation, Durability)



### • postgreSQL 연산자
postgreSQL [연산자](https://www.tutorialspoint.com/postgresql/postgresql_operators.htm)는 산술, 비교, 논리, 비트 연산자가 있습니다.

### • postgreSQL 자료형
https://www.tutorialspoint.com/postgresql/postgresql_data_types.htm
**\- boolean:** TRUE, FALSE, NULL (TRUE, 'true', 'false', 't', 'f', 'y', 'n', 'yes', '1', '0')  

**\- string:** CHARACTER(n)/CHAR(n) 고정된 길이, CHARACTER VARYING(n)/VARCHAR(n) 변할수 있는 길이 (+제한 길이), TEXT/VARCHAR 길이제한 없음
|||
|-|-|
|||

**\- number:**  
||||
|-|-|-|
|smallint|2byte|-32768 ~ 32767|
|integer|4byte|-2147483648 ~ 2147483647|
|bigint|8byte|9223372036854775808 ~ 9223372036854775807|

||||
|-|-|-|
|smallserial|2byte|1 ~ 32767|
|serial|4byte|1 ~ 2147483647|
|bigserial|8byte|1 ~ 9223372036854775807|

**\- decimal:**  
||||
|-|-|-|
|numeric(n, m), decimal |variable|소수점 앞, 소수점 뒤|
|real|4byte|유효 소수점 6자리|
|double precision|8byte|유효 소수점 15자리|

**\- date / time:**  
||||
|-|-|-|
|date |날짜|YYYY-MM-DD|
|time|시간|HH:MM, HH:MM:SS, HHMMSS, MM:SS.pppppp, HH:MM:SS.pppppp, HHMMSS.pppppp|
|timestamp|날짜 + 시간||
|timestamptz|날짜 + 시간 + 타임스탬프|유효 소수점 15자리|

timestamp는 현재 utc 시간을 보여줌 2021-08-01 01:00
timestamp는 해당 timezone의 현재 시간을 보여줌 2021-08-01 09:00

**\- date / time:**  
https://medium.com/building-the-system/how-to-store-dates-and-times-in-postgresql-269bda8d6403

*CURRENT_DATE
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

### • JSON
[jsonb](https://postgresql.kr/blog/postgresql_jsonb.html)는 json의 binary 형식으로 아래와 같이 차이점이 있습니다.
|json|jsonb|
|-|-|
|json 형식의 string|json 형식의 binary|
|공백(\n?) 저장|공백(\n?) 제거|
|full text search indexing 없음|full text search indexing 있음| <- 더 알아보자...
|적은 json 함수 및 연산|많은 json 함수 및 연산|
|생성이 빠름|미리 parsing된것처럼 빠름| <- 더 알아보자...
 
**\- jsonb_build_object**  
jsonb 객체를 만듭니다.
```sql
select jsonb_build_object('name', first_name||' '||last_name, 'contact', jsonb_build_object('email', email, 'phone', phone_number)) from users;
```
```
{"name": "Kate Deedes", "contact": {"email": "kdeedes0@wikipedia.org", "phone": "766-876-2982"}}
```

jsonb_agg  
::jsonb   (:: type cast)

**[JSONB 연산]**  
**\- -->**  
jsonb의 해당 key를 ''의 문자열로 반환합니다.  
`SELECT book_info->'title'`  
**\- -->>**  
jsonb의 해당 key를 문자열로 반환합니다.  
`SELECT book_info->>'title'`  
**\-||**  
jsonb의 해당 key를 문자열로 반환합니다.  
`UPDATE SET book_info = book_info || { "title": "physics" } WHERE book_info->> 'title'='title_a'`  
**\- row_to_json**  
table의 모든 행/열을 json으로 바꿉니다. (하나의 열로 변환됩니다)  
`SELECT row_to_json(book) FROM book`  
**\- json_agg**  
aggregate를 위해 array 형태의 json을 만듭니다.  
`SELECT json_agg(b) FROM (SELECT book_info FROM book) as b`  

## 참고 자료
[• 유튜브 강의](https://www.youtube.com/watch?v=qw--VYLpxG4)  
[• postgreSQL document](https://www.postgresql.org/docs/13/index.html)  
[• postgreSQL tutorial](https://www.postgresql.org/docs/online-resources/)

함수
https://www.tutorialspoint.com/postgresql/postgresql_useful_functions.htm