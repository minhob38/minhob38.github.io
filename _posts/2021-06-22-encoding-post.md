---
title: "Encoding"
categories:
  - programming
date: 2021-06-22 01:00:00 +0900
last_modified_at: 2021-06-22 01:00:00 +0900
---

# Encoding
 컴퓨터는 자료를 숫자로 저장하기에 문자를 표현하기 위해서, `A → 인코딩 → 65`처럼 문자별로 숫자를 할당해야합니다. 이처럼 컴퓨터가 문자를 표현(읽기/쓰기)할 수 있도록 문자를 숫자에 맵핑시키는 것을 인코딩이라 합니다. 만일 인코딩을 다르게 한다면 프로그램에 따라 문자가 다르게 보일 수 있습니다. 따라서 규격이 필요하며 이러한 인코딩 규격에는 UTF-8, UTF-16, EUC-KR 등이 있습니다.

(인코딩이란 간단히 자료를 숫자로 바꾸는 것입니다.)

유니코드 / 아스키 코드

## 문자표
인코딩하여 맵핑시킬 문자표입니다.
### • ASCII
ASCII(American Standard Code for Information Interchange)는 숫자 10개, 영어 알파벳(대/소문자) 52개, 특수문자 32개, 공백문자 1개, 제어문자 33개, 총 128개로 구성되어 있는 문자표입니다.

### • 유니코드
모든 문자를 표현하는 표준 문자표입니다.

## 인코딩 방식
### • UTF-8
UTF-8(8-bit Unicode Transformation Format)은 유니코드 기반 인코딩 방식입니다.  
문자를 1byte ~ 4byte로 표현하며, 첫번째 byte의 비트를 보고 문자의 byte 수를 식별합니다.  
- `0xxxxxxx` : 1byte
- `110xxxxx` : 2byte
- `1110xxxx` : 3byte
- `11110xxx` : 4byte

### • UTF-16, 32...

### • EUC-KR
UTF-8로 한글을 인코딩할 수 있지만, EUC-KR을 통해서도 한글을 인코딩할 수 있습니다.
UTF-8은 한글을 조합형태로 저장하기에 3byte가 필요합니다. 반면 EUC-KR으 완성형으로 저장하기에 2byte가 필요합니다. 예로들어 '공'이라는 문자가 있다면 UTF-8은 'ㄱ' + 'ㅗ' + 'ㅇ'으로 인코딩하며 EUC-KR은 '공'으로 인코딩합니다.

<br>

## Encoding Programming
### JavaScript
JavaSript에선 iconv 라이브러리를 통해 인코딩을 다룰 수 있습니다.

https://perfectacle.github.io/2019/11/24/aes/


HEX
BASE64 (자료를 acscii 코드로 바꿈 (64bit로 표현))
https://effectivesquid.tistory.com/entry/Base64-%EC%9D%B8%EC%BD%94%EB%94%A9%EC%9D%B4%EB%9E%80

원 데이터를 6bit 단위로 인코딩, 따라서 글자수가 3글자(24bit)였는데 4(6bit * 4= 64bit)글자로 인코딩 4/3 33% 용량 증가
base64

binary data를 ascii 64진법으로 변환
https://devuna.tistory.com/41
https://effectivesquid.tistory.com/entry/Base64-%EC%9D%B8%EC%BD%94%EB%94%A9%EC%9D%B4%EB%9E%80
https://pks2974.medium.com/base-64-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-da50fdfc49d2



byte자료형
https://dojang.io/mod/page/view.php?id=2462




https://it-eldorado.tistory.com/61

https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean

base64 vs multipart
https://stackoverflow.com/questions/47095294/what-is-difference-between-base64-and-multipart