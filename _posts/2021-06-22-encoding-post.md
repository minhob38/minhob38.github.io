---
title: "Encoding"
categories:
  - programming
date: 2023-03-07 01:00:00 +0900
last_modified_at: 2021-06-22 01:00:00 +0900
---

# Encoding

컴퓨터는 자료를 숫자로 저장하기에 문자를 표현하기 위해서, `A → 인코딩 → 65`처럼 문자별로 숫자를 할당해야합니다. 이처럼 컴퓨터가 문자를 표현(읽기/쓰기)할 수 있도록 문자를 숫자에 맵핑시키는 것을 인코딩이라 합니다. 만일 인코딩을 다르게 한다면 프로그램에 따라 문자가 다르게 보일 수 있습니다. 따라서 규격이 필요하며 이러한 인코딩 규격에는 UTF-8, UTF-16, EUC-KR 등이 있습니다.

(인코딩이란 간단히 자료를 숫자로 바꾸는 것입니다.)

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

🔎 utf-8 vs utf-16
'가'의 유니코드는 ac00 44032로 utf8은 3byte로 저장하며, utf16은 2byte로 저장합니다.
따라서 utf-8이라면 컴퓨터가 연속된 3byte에서 문자를 계산합니다. 아래는 utf-8의 저장방식입니다.

```
utf-8의 3byte 구조는 아래와 같으며, 44032의 이진수인 1010110000000000은 다음과 같이 삽입됩니다.
1110xxxx/10xxxxxx/10xxxxxx
1110(1010)/10(110000)/10(000000)
```

### • UTF-16, 32...

### • EUC-KR

UTF-8로 한글을 인코딩할 수 있지만, EUC-KR을 통해서도 한글을 인코딩할 수 있습니다.
UTF-8은 한글을 조합형태로 저장하기에 3byte가 필요합니다. 반면 EUC-KR으 완성형으로 저장하기에 2byte가 필요합니다. 예로들어 '공'이라는 문자가 있다면 UTF-8은 'ㄱ' + 'ㅗ' + 'ㅇ'으로 인코딩하며 EUC-KR은 '공'으로 인코딩합니다.

### • BASE64

BASE64는 자료를 ascii 코드(64진법)로 바꾸어 저장합니다. 이때 원 데이터를 6bit 단위로 인코딩하기에, 글자수가 3글자(24bit)였다면 4(6bit \* 4= 24bit)글자로 인코딩됩니다. 따라서 글자마다 2bit가 더 붙게되어 33% 용량이 증가됩니다.
📝 base64로 인코딩하면, 시스템 환경마다 다르게 해석될 수 있는 특수문자 및 ascii의 남는 1bit를 보내지 않기 때문에, 안전하게 데이터를 보낼 수 있습니다.

<br>

### • URL encoding

url이 ascii코드로만 이루어지도록 encoding합니다.
\- `! * ' ( ) ; : @ & = + $ , / ? # [ ]`는 예약어로 정해진 문자로 인코딩됩니다.  
\- 알파벳(`A-Z a-z`)/숫자(`0-9`)/특수기호(`- _ . ~`) 는 비예약어 인코딩을 하지 않습니다.  
\- 나머지는 percent 인코딩을 합니다.

x-url-encode
url 인코딩
= & 키쌍

### percent 인코딩

percent encoding은 url에 encoding(utf-8, euc-kr 등)된 문자를 %로 8bit 단위로 끊고 64진수로 문자를 표현하는 방식입니다. 아래는 `한`을 percent encoding 한 예시입니다.

```
한 -> 유니코드 인코딩(utf-8) (3bit) -> %'%ED%95%9C'
```

### x-www-form-urlencoded

x-www-form-urlencoded는 form에서 post방식으로 데이터를 보낼때, key/value를 =/&로 구분하고 url encoding하는 방식입니다.

## 참고자료

[• base64](https://effectivesquid.tistory.com/entry/Base64-%EC%9D%B8%EC%BD%94%EB%94%A9%EC%9D%B4%EB%9E%80)

[• base64 javascript](https://pks2974.medium.com/base-64-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-da50fdfc49d2)

[• encoding 종류](https://it-eldorado.tistory.com/61)

[• percent encoding mdn](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding)

[• percent encoding wiki](https://ko.wikipedia.org/wiki/%ED%8D%BC%EC%84%BC%ED%8A%B8_%EC%9D%B8%EC%BD%94%EB%94%A9)

[• post x-www-form-urlencoded](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/POST)
