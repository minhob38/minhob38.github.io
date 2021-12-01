---
title: "Django"
categories:
  - programming
date: 2021-09-12 01:00:00 +0900
last_modified_at: 2021-09-12 01:00:00 +0900
---
# Django
django란 python 서버 프레임워크입니다.

## 설치
### • 가상환경 만들기
python에는 하나의 라이브러리만 설치되기에, 형상관리를 위해 가상환경을 통해 django를 설치하는게 좋습니다.  
virtualenv를 통해 가상환경을 만들 수 있으며, python3에서는 virtualevnv가 기본적으로 내장되어 있습니다.  
🔎 이미 있는 경로에 가상환경을 만들 수 있습니다.
```
python3 -m venv [가상환경 이름(경로 이름)]
```
가상환경을 만들면, 경로에 `bin/activate`라는 실행파일이 생기며, `source bin/activate`를 통해 실행시킬 수 있습니다. 실행된 가상환경은 `deactivate`로 종료할 수 있습니다.

### • django 설치하기
```
pip install django[==version]
```
`django-admin --version`을 통해 설치여부를 확인합니다.
🔎 pip 업데이트는 `python -m pip install --upgrade pip`를 통해 할 수 있습니다.

### • 패키지 관리
freez를 통해 패키지 관리를 할 수 있습니다.  
**\- 패키지 저장**
```
pip freeze > requirements.txt
```
**\- 패키지 설치**
```
pip install -r requirements.txt
```

## Django Server 만들기 (basic)
### • 환경변수
django는 [django-dotenv](https://github.com/jpadilla/django-dotenv)를 통해 환경변수를 관리할 수 있습니다.
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
🔎 만일 project 이름을 바꾸면 setting.py, wsgi.py, manage.py를 수정합니다.
(보통 프로젝트이름을 config로 합니다.)

**\- setting.py**
https://docs.djangoproject.com/en/3.2/ref/settings/



### • app 만들기
아래 명령어를 통해 app을 생성할 수 있습니다.
```
django-admin startapp [app 이름]
```
🔎 만일 app 이름을 바꾸면, 해당 app의 apps.py와 project의 settings.py installed app을 수정합니다.
**\- intalled app**
db연결
**\- url pattern**

### • server 켜기

```
python manage.py runserver
```

## url
urls.py에서 서버 route를 정의합니다. 일반적으로, project urls.py에서 app들의 url을 include를 통해 종합하여 관리하며, app urls.py에서 route들을 정의합니다.
**\- project urls.py**
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/a/', include('a.url')),
    path('api/b/', include('b.url'))
]
```
항상 끝에 슬래시 붙일것
django는 요청이 들어왔을때 해당되는 것이 없으면 /를 붙여 리다이렉트 합니다. (301)
post는 /없으면 리다이렉트 할떄 데이터 유실때문에 아래와 같은 에러 뜨는듯

```
RuntimeError: You called this URL via POST, but the URL doesn't end in a slash and you have APPEND_SLASH set. Django can't redirect to the slash URL while maintaining POST data. Change your form to point to localhost:8000/api/auth/signup/ (note the trailing slash), or set APPEND_SLASH=False in your Django settings.
```

## view
### • view function
Class Based View
https://docs.djangoproject.com/en/3.2/topics/class-based-views/intro/

Funtion Baseed View
view 함수는 해당 route를 처리하는 controller 함수입니다.
```python
def view(request):
    ...
    return HttpResponse
```

### • 요청받기
**\- HttpRequest**  
request는 HttpRequest입니다.  
**\- path parameter**   
path parametet는 url에 <>로 넣으며, view 함수의 **kwargs 인자로 전달됩니다.
```python
urlpatterns = [
    path('/school/<id>', view.school)
    path('/class/<id>', view.school)
]

def school(request, id):
  if request.method == "GET":

def class(request, **kwargs):
  if request.method == "GET":
...
```
**\- json parsing**  
json.loads는 json을 dictionary로 바꾸어줍니다.


### • 응답하기
**\- HttpResponse**
[HttpResponse](https://docs.djangoproject.com/en/3.2/ref/request-response/#httpresponse-objects)로 응답을 설계합니다.  
**\- HttpResponseBadRequest**  
HttpResponse와 동일하게 작동하지만, 400 code를 응답합니다.  
**\- HttpResponseServerError**  
HttpResponse와 동일하게 작동하지만, 500 code를 응답합니다.  
**\- json**  
json.dumps는 dictionary를 json으로 바꾸어줍니다.



## Model
django에서 model을 통해 database를 다룰 수 있습니다.

### • migration
model로부터 table을 만드는 것을 migration이라 합니다.
```
python manage.py migrate
```
새로운 모델 생성 및 기존 모델 변경이면 makemigrations를 먼저 한후, migration해야합니다.
```
python manage.py makemigrations
```
🔎 setting.py installed app에 해당 app을 추가해야합니다.

makemigration을 하면, migrations 폴더에 xxxx_initail.py가 생김


https://velog.io/@ybear90/Django-Django-ORM-queryset-%EC%A0%95%EB%A6%ACmodel-filter-all-get-filter-exists-create-save

쿼리셋
https://docs.djangoproject.com/en/3.2/ref/models/querysets/

### • model 만들기
해당 app의 model.py에 


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

### • model

db 여러개 연결
raw query


https://docs.djangoproject.com/en/3.0/topics/db/models/
https://docs.djangoproject.com/en/3.0/ref/models/meta/
modle field
https://docs.djangoproject.com/en/3.0/ref/models/fields/#field-types

### • migration? sqlite3?







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










## django gitingore
https://foramonth.tistory.com/32


https://www.codingforentrepreneurs.com/blog/django-virtualenv-python-gitignore-file
https://djangowaves.com/tips-tricks/gitignore-for-a-django-project/

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





## 참고자료
[• mdn django 정의](https://developer.mozilla.org/ko/docs/Learn/Server-side/Django/Introduction)  
[• django 공식홈페이지](https://www.djangoproject.com/)  
[• django model](https://docs.djangoproject.com/en/3.2/topics/db/models/)
[• django urls](https://docs.djangoproject.com/ko/3.2/topics/http/urls/)  
[• django  view](https://docs.djangoproject.com/en/3.2/topics/http/views/)
[• django request/response](https://docs.djangoproject.com/en/3.2/ref/request-response/)  
[• python json](https://docs.python.org/ko/3/library/json.html)


[• tutorial djangogirls](https://tutorial.djangogirls.org/ko/django_models/)
[• django queryset blog](https://velog.io/@ybear90/Django-Django-ORM-queryset-%EC%A0%95%EB%A6%ACmodel-filter-all-get-filter-exists-create-save)

장고 패키지/모듈 경로

from a import b

a는 root 경로
a -
|-b

같은 경로에 있으면 .으로, 아무것도 안붙이면 루트경로 부터 시작
(상대경로로 찾는다면 ./ -> .[폴더이름] )