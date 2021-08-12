---
title: "Database Design"
categories: 
  - programming
date: 2021-07-26 01:00:00 +0900
last_modified_at: 2021-07-26 01:00:00 +0900
---

# Database Design
## 관계형 Database
관계형 database는 아래 단계에 따라 설계합니다.
1) 요구도 분석
2) 개념 설계
3) 논리적 설계
4) 물리적 설계
5) 구현

이에 대해 자세히 살펴보겠습니다.
### • 요구도 분석
database의 요구사항을 분석하여 요구도 문서를 만듭니다. 예로들어 A는 a를 가져야 한다.

### • 개념 설계
요구도를 기반으로 개체(entity), 개체의 속성(entity type), 개체 간 관계(relation type)와 함께 개념 설계를 합니다. 이때 개념설계는 ERD(Entity Relational Diagram)로 합니다.
\- 개체: 사각형
\- 개체의 속성: 타원
\- 개체의 행위: 마름모

### • 논리적 설계
ERD를 기반으로 table을 만들어 논리적 설계를 합니다.  
아래는 ERD → Table 설계 시 규칙입니다.  
\- 1:1 : 
\- 1:n : A테이블과 B테이블이 있을때, A테이블의 한 행은 B테이블의 여러행과 관계를 맺을 수 있습니다. 1:n 테이블은 A테이블에 Primary Key를 만들고, B테이블에서 A테이블의 Primary Key를 Foreign Key로 참조하게 테이블을 설계합니다.  
\- n:1 : A테이블과 B테이블이 있을때, B테이블의 한 행은 A테이블의 여러행과 관계를 맺을 수 있습니다.  
\- n:m : A테이블과 B테이블이 있을때, A테이블의 한 행은 B테이블의 여러행과, B테이블의 한 행은 A테이블의 여러행과 관계를 맺을 수 있습니다.

### • join 관계
**1:n -> n:1**  
|id|학생|
|-|-|
|1|철수|
|2|영희|
|3|민호|
|4|태리|
|5|채원|

|과목명|학생id|강의실id|
|-|-|-|
|물리|1|1|
|유체역학|1|1|
|동역학|2|2|
|화학|3|2|
|고체역학|3|3|

|id|강의실|
|-|-|
|1|101호|
|2|102호|
|3|103호|

**1:n -> 1:n**  
|id|학생|
|-|-|
|1|철수|
|2|영희|
|3|민호|
|4|태리|
|5|채원|

|id|과목명|학생id|
|-|-|-|
|1|물리|1|
|2|유체역학|1|
|3|동역학|2|
|4|화학|3|
|5|고체역학|3|

|id|과목명|교수|
|-|-|-|
|1|물리|Jerry|
|1|물리|Tom|
|2|유체역학|Chris|
|2|유체역학|Jeff|
|3|동역학|Mark|
|4|화학|Jone|
|4|화학|Doe|
|5|고체역학|Jane|

### • 정규화
**- 1 정규형**

**- 2 정규형**

**- 3 정규형**

테이블은 공통 요소의 집합이며, 기본키의 함수입니다.


## 참고자료
[• DB 설계](https://ms3864.tistory.com/250)  
[• 3 table join](https://learnsql.com/blog/how-to-join-3-tables-or-more-in-sql/)

SQL Test Script
```
drop table table_a;
drop table table_b;
drop table table_c;

create table table_a (
  a int,
  b varchar,
  c varchar
);

create table table_b (
  d int,
  e varchar,
  f varchar
);

create table table_c (
  g int,
  h varchar,
  i varchar
);


insert into table_a (a, b, c)
values 
(1, 'table_a', 'table_a'),
(2, 'table_a', 'table_a'),
(3, 'table_a', 'table_a');

insert into table_b (d, e, f)
values
(1, 'table_b', 'table_b'),
(1, 'table_b', 'table_b'),
(1, 'table_b', 'table_b'),
(2, 'table_b', 'table_b');

insert into table_c (g, h, i)
values
(1, 'table_c', 'table_c'),
(1, 'table_c', 'table_c'),
(1, 'table_c', 'table_c'),
(2, 'table_c', 'table_c');

select * from table_a;
select * from table_b;
select * from table_c;

select * from table_a join table_b on table_a.a = table_b.d join table_c on table_a.a = table_c.g
```
