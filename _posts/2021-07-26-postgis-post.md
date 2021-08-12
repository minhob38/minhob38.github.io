---
title: "PostGIS"
categories:
  - programming
date: 2021-07-26 01:00:00 +0900
last_modified_at: 2021-07-26 01:00:00 +0900
---

# PostGIS
PostgreSQL은 오픈소스 관계형 데이터베이스로 대용량 Transaction 처리, GIS에 유용한 특징을 가지고 있습니다.  
🔎 관계형데이터베이스는 정규화된 테이블로 이루어져 있습니다.
(column(attribute) row(tuple))

QGIS
Enterpris GIS
Spatial Database
PostGIS

## Spatial Datbase


## 환경설정
### • 설치하기
**PostGIS**  
[PostgreSQL](https://postgresapp.com/downloads.html)을 통해 [PostGIS](https://postgis.net/install/)를 설치할 수 있습니다. SQL 편집기에 `create extension postgis;`를 입력하여 PostgreSQL extenstion에 PostGIS를 추가할 수 있으며, `select postgis_full_version();`를 통해 설정이 잘 되었는지 확인할 수 있습니다.

<img src="/assets/images/postgis_extension.png" alt="image" width="15%">

**QGIS**  
[공식 홈페이지](https://qgis.org/ko/site/forusers/download.html#)에서 QGIS를 설치할 수 있습니다.

**psql**  
psql은 postgres cli입니다.

**pgAdmin**  
PostgreSQL의 GUI 환경으로, [공식 홈페이지](https://www.pgadmin.org/download/)에서 pgAdmin을 설치할 수 있습니다.  

### • Spatial Database 가져오기
**postgis shapefile import/export manager**
window에서는 postgis shapefile import/export manager로 spatial database를 가져올 수 있습니다.

**terminal**
[shp2pgsql](https://postgis.net/workshops/postgis-intro/loading_data.html)을 통해 database를 가져올 수 있습니다.
```
shp2pgsql -s [SRID] [Database]| psql -h [host] -u [user] -d [dbname]
```
```
shp2pgsql -s 4326 /Users/minho/Desktop/Coding-Study/sdb_data/BAEA_Nests.shp | psql h localhost -p 5432 -U postgres -d sdb_course
```


## Vector Gemoety Model
Point: (x, y) 또는 (x, y, z)  
Line String: Point의 배열 (Opened)  
Polygon: line string의 배열 (Closed)  
Multi-part Gemometry: Multi Poligon, Multi Line String, Multi Polygon  
Features: Geometry, Attributes(fields, proterties ...)  

## Spatial Reference ID
SRID(Spatial Reference ID - 공간 참조 식별자)는 Coordinate Reference System(공간 참조 시스템)의 식별자입니다. SRID는 아래 특성을 가지고 있습니다.  
🔎 `select * from spatial_ref_sys`로 SRID를 확인할 수 있습니다.  
\- Coordinate System  
\- Projection  
\- Zone  
\- Datum  

## Geometry / Geography
\- Geometry  
평면 기반이며 좌표시스템에 따라 달라집니다. 또한 2차원이기에 수식이 단순하며 많은 함수들을 가지고 있습니다. 하지만 공간이 넓어지면 정확도가 떨어지는 단점이 있습니다.

\- Geography  
구(지구)기반이며 하나의 좌표시스템(위도/경도)을 사용합니다. 또한 3차원이기에 수식이 복잡하며 적은 함수들을 가지고 있습니다. 하지만 정확도는 높다는 장점이 있습니다.

### • Geometry Basic Function
**\- geometrytype**  
[geometrytype](https://postgis.net/docs/GeometryType.html)은 geometry의 vector geometry type을 반환합니다.
```sql
select geometrytype(geom) from sdb
```
**\- st_coorddim**  
[st_coorddim](https://postgis.net/docs/ST_CoordDim.html)은 geometry의 좌표 차원을 반환합니다.
```sql
select st_coorddim(geom) from sdb
```
**\- st_dimension**  
[st_dimension](https://postgis.net/docs/ST_Dimension.html)은 geometry의 위상 차원을 반환합니다.
```sql
select st_dimenstion(geom) from sdb
```
**\- st_srid**  
[st_srid](https://postgis.net/docs/ST_SRID.html)는 geometry의 srid를 반환합니다.
```sql
select st_srid(geom) from sdb
```
**\- st_iscollection**  
[st_iscollection](https://postgis.net/docs/ST_IsCollection.html)은 geometry가 collection(geometrycollection, compoundcurve, multi...)인지 ture/false로 반환합니다.
```sql
select st_iscollection(geom) from sdb
```
**\- st_numgeometries**  
[st_numgeometries](https://postgis.net/docs/ST_NumGeometries.html)는 geometry의 갯수를 반환합니다.
**\- st_numinteriorrings**??  
```sql
select st_numinteriorrings(geom) from sdb
```
**\- st_npoints**  
[st_npoints](https://postgis.net/docs/ST_NPoints.html)는 geometry의 점 갯수를 반환합니다.
```sql
select st_numpoints(geom) from sdb
```
**\- st_issimple**  
```sql
select st_issimple(geom) from sdb
```
**\- st_isempty**  
```sql
select st_isempty(geom) from sdb
```
**\- st_isclosed**  
```sql
select st_isclosed(geom) from sdb
```
**\- st_isring**  
```sql
select st_isring(geom) from sdb
```
**\- st_isvalid**  
[st_isvalid](https://postgis.net/docs/ST_IsValid.html)는 유효한 geometry인지 true/false를 반환합니다.
```sql
select st_isvalid(geom) from sdb
```
**\- st_isvalidreason**  
[st_isvalidreason](https://postgis.net/docs/ST_IsValidReason.html)은 geometry의 근거를 반환합니다.
```sql
select st_isvalidreason(geom) from sdb
```
**\- st_setsrid**  
```sql
select st_setsrid(geom) from sdb
```
**\- st_transform**  
```sql
select st_transform(geom) from sdb
```

**\- st_asewkt**
[st_asewkt](https://postgis.net/docs/ST_AsEWKT.html)는 geometry를 sri와 함께 wkt(Well-Known Text)형태로 반환합니다.
```sql
select st_asewkt(geom) from sdb
```

### • Geometry Measurement Function
**\- st_length**  
[st_length](https://postgis.net/docs/ST_Length.html)은 geometry의 거리를 반환합니다. 이때, geometry는 위도/경도의 2d cartesian length(degree)를 geography는 타원에서의 length(meter)를 계산합니다.
```sql
select st_length(geom) from sdb
```
**\- st_3dlength**  

**\- st_area**  
[st_area](https://postgis.net/docs/ST_Area.html)은 geometry의 넓이를 반환합니다. 이때, geometry는 위도/경도의 2d cartesian area(degree^2)를 geography는 타원에서의 넓이(meter^2)를 계산합니다.
```sql
select st_isvalidreason(geom) from sdb
```

**\- st_distance**  

**\- st_3ddistance**  

**\- st_distancesphere**  

**\- st_3ddistancesphere**  

**\- st_closespoint**  

**\- st_shortesline**  

**\- st_maxdistance**  

**\- st_longgestdistance**  


## 참고 자료
[• 유튜브 강의](https://www.youtube.com/watch?v=qw--VYLpxG4)  
[• postgreSQL document](https://www.postgresql.org/docs/13/index.html)  
[• postgreSQL tutorial](https://www.postgresql.org/docs/online-resources/)

함수
https://www.tutorialspoint.com/postgresql/postgresql_useful_functions.htm