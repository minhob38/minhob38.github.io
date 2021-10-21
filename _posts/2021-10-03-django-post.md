---
title: "Django"
categories:
  - programming
date: 2021-09-12 01:00:00 +0900
last_modified_at: 2021-09-12 01:00:00 +0900
---

https://velog.io/@moonyoung/Nginx%EC%99%80-Apache

---

아파치는 thread를 나누어, cpu 효율이 떨어짐 -> 성능 저하
nginx는 하나의 일을 하나의 cpu가 하는 느낌... -> 성능 저하는 없음

많은 요청이 오면 nginx는 일단 받음
예로들어 cpu가 하나 있다 가정하자...

usr/share/nginx/html

# Django

django란 python 서버 프레임워크입니다.
https://developer.mozilla.org/ko/docs/Learn/Server-side/Django/Introduction
https://www.djangoproject.com/

## 설치

### • 가상환경 만들기

python에는 하나의 라이브러리만 설치되기에, 형상관리를 위해 가상환경을 통해 django를 설치하는게 좋습니다.  
virtualenv를 통해 가상환경을 만들 수 있으며, python3에서는 virtualevnv가 기본적으로 내장되어 있습니다.

```
python3 -m venv [가상환경 이름]
```

`source bin/activate`
`deactive`로 비활성화 합니다.

### • django 설치하기

가상환경을 만들면, 경로에 `bin/activate`라는 실행파일이 생기며, `source bin/activate`를 통해 실행시킬 수 있습니다. 실행된 가상환경은 `deactivate`로 종료할 수 있습니다.

```
pip install django[==version]
```

`django-admin --version`을 통해 설치여부를 확인합니다.
🔎 pip 업데이트는 `python -m pip install --upgrade pip`를 통해 할 수 있습니다.

## Django Server 만들기 (basic)

### • 환경변수
https://github.com/jpadilla/django-dotenv

```
pip install django-dotenv
```
```
# manage.py
import dotenv

if __name__ == "__main__":
    dotenv.read_dotenv()
    main()
```
```
# 환경변수를 사용할 파일
import os
os.environ.get("A")
```
```
// .env
A = hello
```

### • project 만들기

아래 명령어를 통해 현재 경로에 project 경로와 project를 생성할 수 있습니다.

```
django-admin startproject [project 이름] .
```

이름바꾸면 setting.py, wsgi.py, manage.py 수정 (보통 프로젝트이름 config)

### • app 만들기

django-admin startapp [app 이름]

**\- app 이름 바꾸기**
해당 app 경로의 apps.py
해당 project 초기 프로젝트 폴더(config)의 settings.py installed app

**\- intalled app**
db연결
**\- url pattern**

### • server 켜기

```
python manage.py runserver
```

### • urlresolver

https://docs.djangoproject.com/ko/3.2/topics/http/urls/

include,
path

항상 끝에 슬래시 붙일것

post는 /없으면 리다이렉트 할떄 데이터 유실때문에 아래와 같은 에러 뜨는듯

```
RuntimeError: You called this URL via POST, but the URL doesn't end in a slash and you have APPEND_SLASH set. Django can't redirect to the slash URL while maintaining POST data. Change your form to point to localhost:8000/api/auth/signup/ (note the trailing slash), or set APPEND_SLASH=False in your Django settings.
```

장고 패키지/모듈 경로

from a import b

a는 root 경로
a -
|-b

같은 경로에 있으면 .으로, 아무것도 안붙이면 루트경로 부터 시작...

### • view function

https://docs.djangoproject.com/en/3.2/topics/http/views/
view 함수는 해당 route를 처리하는 controller 함수입니다.

```python
def view(request):

    return HttpResponse
```

request는 HttpRequest입니다.

**\- HttpRequest**
https://docs.djangoproject.com/en/3.2/ref/request-response/

**\- HttpResponse**
https://docs.djangoproject.com/en/3.2/ref/request-response/#httpresponse-objects

json parsing은 json 모듈

```
import json
json.loads()
json.dumps()
```
https://docs.python.org/ko/3/library/json.html

### • model

https://docs.djangoproject.com/en/3.0/topics/db/models/
https://docs.djangoproject.com/en/3.0/ref/models/meta/
modle field
https://docs.djangoproject.com/en/3.0/ref/models/fields/#field-types

### • migration? sqlite3?

model로부터 table을 만드는 것을 migration
setting.py installed app에 추가해야함
view 함수는 해당 route를 처리하는 controller 함수입니다.
https://foramonth.tistory.com/32

```
python manage.py migrate
```

새로운 모델 생성 및 기존 모델 변경이면 makemigrations를 먼저해야함

```
python manage.py makemigrations
```

makemigration을 하면, migrations 폴더에 xxxx_initail.py가 생김

https://sqlitebrowser.org

### • django admin

```
python manage.py createsuperuser
```

lint

```
{
    "python.pythonPath": "test\\Scripts\\python.exe"
}
```

```
{
    "python.pythonPath": "test\\Scripts\\python.exe",
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": [
        "--line-length",
        "100"
    ],
    "editor.formatOnSave": true
}
```

## View

### • 요청받기

json.loads()
**\- HttpRequest**
https://docs.djangoproject.com/en/3.2/ref/request-response/

### • 응답하기

**\- HttpResponse**
[HttpResponse](https://docs.djangoproject.com/en/3.2/ref/request-response/#httpresponse-objects)로 응답을 설계합니다.

**\- HttpResponseBadRequest**
HttpResponse와 동일하게 작동하지만, 400 code를 응답합니다.

**\- HttpResponseServerError**
HttpResponse와 동일하게 작동하지만, 500 code를 응답합니다.

## Model

https://velog.io/@ybear90/Django-Django-ORM-queryset-%EC%A0%95%EB%A6%ACmodel-filter-all-get-filter-exists-create-save

쿼리셋
https://docs.djangoproject.com/en/3.2/ref/models/querysets/

### • model 만들기

### • model data 삽입하기

### • model data 조회하기

**\- exists**
[exists](https://docs.djangoproject.com/en/3.2/ref/models/querysets/#exists)는 table에 조건에 맞는 행이 있는지 True/False로 반환합니다.

**\- get**

### • model data 삭제하기

### • model data 수정하기

### • model 기타 삭제하기

**\- str**
https://docs.djangoproject.com/en/2.2/ref/models/instances/#str

---

**settingpy**
https://docs.djangoproject.com/en/3.2/ref/settings/



### • scraping
pip install requests
import requests
https://docs.python-requests.org/en/latest/user/quickstart/
https://www.daleseo.com/python-requests/
https://me2nuk.com/Python-requests-module-example/

pip install beautifulsoup4
from bs4 import BeautifulSoup


beautiful soup
https://www.crummy.com/software/BeautifulSoup/bs4/doc/









참고자료
url/view
https://lar542.github.io/Django/2019-06-17-first_django_ptoject/

lint
https://velog.io/@city7310/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%BD%94%EB%93%9C-%ED%8F%AC%EB%A7%A4%ED%84%B0-%EC%9D%B4%EC%95%BC%EA%B8%B0-5wjxdei9iv

json body parsing
https://velog.io/@hojin11choi/TIL-Django-JSON-request.body

pipenv
https://packaging.python.org/tutorials/managing-dependencies/#managing-dependencies


폴더구조
https://timmyomahony.com/blog/general-django-project-structure-or-folder-layout
gitingore
https://djangowaves.com/tips-tricks/gitignore-for-a-django-project/