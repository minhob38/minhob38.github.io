---
title: "Linux"
categories:
  - programming
date: 2021-08-28 01:00:00 +0900
last_modified_at: 2021-08-28 01:00:00 +0900
---

# Linux

docker는 애플리케이션이 운영체제(os)와 분리되어 실행될 수 있는 공간인 container를 기반으로 하는 오픈소스 가상화 플랫폼입니다.
**\- whoami**

**\- hostname**

**\- hostname**

### • command 설명
**\- man**  
`man [command 이름]`으로 command의 설명을 볼 수 있습니다.  
**\- whatis**  
`whatis [command 이름]`으로 command의 설명을 볼 수 있습니다.  
**\- --help**  
`[command 이름] --help`으로 command의 설명을 볼 수 있습니다.  
### • network

**\- ifconfig / ip**

ctrl + c

### • path

**\- cd**  
cd(Change Directory)는 해당 경로로 바꿉니다.  
`cd /[절대 경로]`: 절대경로로 이동합니다.  
 `cd [상대 경로]`: 상대경로로 이동합니다.  
`cd /`: root 경로로 이동합니다.  
`cd ..`: 상위 경로로 이동합니다.  
**\- pwd**  
pwd(Print Working Directory)는 현재 작업 경로를 보여줍니다.  
**\- ls**  
ls(LiSt)는 현재 작업 경로의 폴더/파일을 보여줍니다.  
🔎 절대경로는 /로 시작하며, 상대경로는 /없이 현재 경로를 기준으로 이동합니다.

ssh -l iafzal 192.168.1.x

### • file 만들기

`touch [file 이름]`: file을 만듭니다.
`cp [원본 file 이름] [새로운 file 이름]`: file을 복사합니다.
`vi [file 이름]`: file을 만들고 편집합니다.
🔎 :wq!로 나올 수 있습니다.

**\-vi**

**\-vi**


**\- > 또는 >>**
`[command] > [file 이름]` command 결과가 file에 write됩니다.

**\- echo > 또는 >>**
`echo "..." > [file 이름]`
>는 overwrite
>>는 append

**\- tee**
`[command] | tee [file 이름]`tee는 출력 및 reditect를 실행합니다.

pipe는 한 명령어의 출력을 다른 명령어의 입력으로 쓰이게 해줍니다.
`[command] |`

### • directory(folder) 만들기

`mkdir [directory 이름]`: directory(folder)를 만듭니다.


### • file 복사



### • file 종류

| 기호 | 의미                 |
| ---- | -------------------- |
| -    | regular file         |
| d    | directory            |
| l    | link                 |
| c    | special, device file |
| s    | socket               |
| p    | named pipe           |
| b    | block device         |

### • file 찾기

`find [기준 경로] -name [file 이름]`: 해당 file을 찾으며, file이 있는 경로를 보여줍니다.  
🔎 root부터 찾는다면 `/`, 현재 경로부터 찾는다면 `.`, `./`로 기준 경로를 설정합니다.  
`locate [file 이름]`: 해당 file을 찾으며, file을 포함한 경로를 보여줍니다.  
🔎 find가 모든 경로를 탐색하는 것과 달리, locate는 db에 경로를 저장하고 있어보다 탐색 속도가 빠릅니다 하지만, db가 최신화되어 있지 않을 수 있기에 updatedb를 통해 db를 업데이트 할 수 있습니다.


### • file 복사하기
`cp [file 이름] / [directory 이름]`: file을 지웁니다.

### • file 이동하기
`cp [현재 file 이름] [새로운 file 이름]`: file을 지웁니다.
`cp [file 이름] / [directory 이름]`: file을 지웁니다.

### • file 지우기
`rm [file 이름]`: file을 지웁니다.


### • directory 지우기
`rm -r [directory 이름]`: directory를 지웁니다.
`rmdir [directory 이름]`: directory를 지웁니다.


### • file 보기
`cat [file 이름]`으로 file 내용을 볼 수 있습니다. (scroll)
`more [file 이름]`으로 file 내용을 볼 수 있습니다. (page)
`less [file 이름]`으로 file 내용을 볼 수 있습니다. (line)
`head -[숫자] [file 이름]`으로 file 내용을 위로부터 숫자행만큼 볼 수 있습니다.
`tail -[숫자] [file 이름]`으로 file 내용을 아래부터 숫자행만큼 볼 수 있습니다.

### • file permission
file 권한으로 r(ead)/w(rite)/(e)x(ecute)가 있습니다.
r/w/x의 권한으로 u(ser)/g(roup)/o(ther)가 있습니다.
-rwxrwxrwx
(u/g/o 순서)
**\- chmod**
chmod로 permission을 바꿀 수 있습니다.
`chmod [a|u|g|o][+|-][r|w|x] [file 이름]`
-는 권한삭제 + 권한추가

```
chmod ugo+r [file 이름]
chmod 444 [file 이름]
chmod ugo+r [file 이름]

```
|-|-|-|
|number|permission|symbol|
|0|no permission|---|
|1|execute|--x|
|2|write|-w-|
|3|execute + write|-wx|
|4|read|r--|
|5|read + execute|r-x|
|6|read + write|rw-|
|7|read + write + execute|rwx|

### • file ownership
user/group의 소유권만 있음

**\- chown**
user owner를 바꿉니다.
`chown [user 이름] [file 이름]`
**\- chgrp**
group owner를 바꿉니다.
`chgrp [group 이름] [file 이름]`

🔎 root user만 변경할 수 있습니다. (`su`)


### • 비밀번호

`passwd [계정 id]`로 비밀번호를 바꿀 수 있습니다.

### • wildcard

**\- \***  
0개 이상의 문자  
**\- ?**  
단일 문자  
**\- []**  
문자의 범위  
**\- \\**  
escape 문자  
**\- ^**  
행의 시작  
**\- $**  
행의 끝

echo
내용을 넣으면서 파일을 만듬

```
$ echo [내용] > [file 이름]
```

inode
soft link
ln -ㄴ [원본] [소프트링크 이름]
hard link
ln [원본] [하드링크 이름]
ls -ltr
echo
cat

date
date %H

/asdas.sh . .
%1 %2

export

### • wildcard

chown

chmod

systemctl

## 참고자료

[• ...]

find ./ -name "bank\*" -type d | xargs rm -rf


