---
title: "NGINX"
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

# nginx

nginx란 이벤트 기반으로, 동시접속(concurrency) 요청에 특화된 웹서버입니다.
https://www.nginx.com/
https://nginx.org/

## web server

### • web server

http요청을 받아 서버에 저장되어 있는 static pages(html, css, js, image 등)를 응답하는 서버입니다

### • web application server

http요청을 받아 서버 애플리케이션을 통해, 로직 및 database를 거쳐 dynamic pages를 응답하는 서버입니다.

🔎 api 서버와는 다릅니다.

spa에서는 web server에서 페이지를 제공하고, 나머지는 api 서버에 요청해서 동적으로 페이지를 수정함

apache,
tomcat은 jsp를 해석하는 서버애플리케이션
jsp는 java로 만드는 서버 스크립트
php도 스크립트
-> 따라서 해석하는 애플리케이션이 필요하고 이를 apache, tomcat이 함...

was는 http 요청을 받아 동적으로 가공하여 응답합니다.
정적 컨텐츠는 부하가 적기에 효율을 위해 web server와 web application server를 분리합니다.
물리적으로 분리하여 보안을 강화합니다.
하나의 web server에 여러대의 was를 연결하여 로드밸런싱을 합니다.

## reverse proxy

nginx는 이벤트 기반

## 환경설정

### • 설치하기

https://nginx.org/en/docs/install.html

```shell
$ apt-get update
$ apt-get install nginx
```

```
$ ps aux | grep nginx
```

🔎 ubuntu 기반의 설명입니다.

### • 실행하기

systemd?

nginx -h 스크립트 도움말을 보여줍니다.

systemctl reload nginx

### • 종료하기

nginx -s stop

## nginx 내부변수

http://nginx.org/en/docs/varindex.html

## basic configuration

nginx는 nginx.conf에 정의된 diretive를 기반으로 작동합니다.
🔎 nginx -t로 형식이 올바른지 확인합니다.
`etc/nginx/nginx.conf`

http://nginx.org/en/docs/beginners_guide.html

### • directive

nginx의 name / parameter로 이루어진 설정의 단위입니다.
**\- simple directive**  
simple directive는 `;`로 끝납니다.

```
[name] = [parameter]
```

\*\*\- block directive
simple directive는 `{}`로 끝납니다.

```
[name] = { }
```

### • context

또다른 directive를 가진 directive를 context라 합니다.

```
[이름] = {
  [name] = [parameter]
}
```

user
worker_processes
error_log
pid

### • virtual host 만들기

http block에 virtual host를 정의합니다. listen에서 nginx에 들을 port를 정의합니다. (만일 listen 88로 설정되어 있는데, 80요청이 들어오면 요청을 받지 않습니다.)
server_name은 더 보자!

```
# nginx.conf

events {}

http {
  server {
    listen 80 #[서버 주소];
    server_name myserver #[서버이름];
    root /etc/nginx/pages #[절대경로];

    location /books { # [uri]
      root /etc/nginx #[절대경로];
    }

    location = /students { # [uri]
      return 200 'my student';
    }

    location ~ /class[0-1] { # [uri]
      root /etc/nginx #[절대경로];
    }
  }
}
```

아래는 해당 nginx.conf에 해당하는 파일 디렉토리입니다. 이때 localhost/index.html(= localhost/), localhost/a.html, localhost/b.html로 접속합니다.

```
etc
 |-nginx
    |-pages
       |-index.html
       |-a.html
       |-b.html
```

**\- listen**  
virtual host의 address입니다.  
**\- server_name**  
virtual host의 이름입니다.  
**\- root**  
[root](https://nginx.org/en/docs/http/ngx_http_core_module.html#root)는 static pages의 경로를 지정합니다.  
🔎 location에 있는 root의 경로는 location uri와 합쳐집니다.

**\- location**  
요청 uri에 대한 처리 및 static pages 응답을 정의합니다. 이때 정의한 uri는 prefix이며 nginx는 정의한 uri를 prefix로 하여 매칭되는 location을 작동시킵니다. prefix가 아닌 exact로 경로를 매칭시키기 위해선 =을 붙입니다. 또한 ~로 정규식으로 경로를 매칭시킬 수 있습니다.
🔎 매칭 우선 순위  
1\. exact match `=`  
2\. preferential prefix match `^~`  
3\. regex match `~*`  
4\. prefix match ``

🔎 정적파일을 보낼떄는 ext match로 하면 안됨...
location = /a 로하면, /a/index.html을 못찾기떄문...

location /a -> /a/b/c/d url 처리가능 (prefilx라서) 처리후에는 /b/c/d가 파일 찾는데 사용
location /a와 /a/의 차이는 /ab요청이 오면 /a는 응답이 가능하고 /a/a는 처리가 안됩니다.

### • variables

`set`을 통해 변수를 선언할 수 있으며, 변수는 앞에 `$`가 붙습니다.

```
set $[변수 이름] $[변수 값]
```

🔎 아래는 nginx의 미리 만들어져있는 변수들입니다.
https://nginx.org/en/docs/varindex.html

http* http://nginx.org/en/docs/http/ngx_http_core_module.html#var_http*
http\_[header 이름]

```
# nginx.conf
events {}

http {
  server {
    listen 80 #[서버 주소];
    server_name myserver #[서버이름];
    root /etc/nginx/pages #[절대경로];

    set $mon 'no';

    if ($date_local ~ 'Monday') {
      set $mon 'yes;
    }

    location = /students { # [uri]
      return 200 '$mon ';
    }
  }
}
```

### • rewrite / redirect

### • \_try_files

https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files

### • logging

기본적으로 `/var/log/nginx/`에 `access.log`, `error.log`가 저장됩니다.
**\- error log**  
https://nginx.org/en/docs/ngx_core_module.html#error_log
**\- access log**  
https://nginx.org/en/docs/http/ngx_http_log_module.html#access_log

```
# nginx.conf
events {}

http {
  server {
    listen 80 #[서버 주소];
    server_name myserver #[서버이름];
    root /etc/nginx/pages #[절대경로];
    access_log /etc/nginx/access.log; #[절대경로]
  }
}
```

### • inheritance ?

**\- standard directive**  
해당 context안에서 한번만 정의될 수 있는 directive입니다. (eg: root)
**\- array directive**  
해당 context안에서 여러번 정의될 수 있는 directive입니다. (eg: access_log)
**\- action directive**  
요청의 흐름을 중단시키고, 해당 context안에서 한번만 정의될 수 있는 directive입니다. (eg: rewrite)

## performance

### • master process / worker process ?

nginx는 비동기로 설계되었습니다. master process 요청을 처리하지 않고 worker process에 전달합니다. worker process는 하나의 cpu를 차지하여 요청을 처리합니다.
https://nginx.org/en/docs/ngx_core_module.html
https://nginx.org/en/docs/ngx_core_module.html#worker_processes
https://nginx.org/en/docs/ngx_core_module.html#worker_connections
ulimit -n
lscpu

```
# nginx.conf
worker_processes 1 # [숫자] 최대 cpu core 개수 만큼

events { worker_connections 1024 # [숫자]}

http {
  server {
    listen 80 #[서버 주소];
    server_name myserver #[서버이름];
    root /etc/nginx/pages #[절대경로];
  }
}
```

worker_process \* worker_connections

### • buffers / timeout ?

```
# nginx.conf
worker_processes 1 # [숫자]

events { worker_connections 1024 # [숫자]}

http {
  client_body_buffer_size 10K;
  client_max_body_size 8m;
  client_header_buffer_size 1k

  client_body_timeout 12;
  client_header_timeout 12;

  keepalive_timeout 15;

  send_timeout 10;

sendfile on;


  server {
    listen 80 #[서버 주소];
    server_name myserver #[서버이름];
    root /etc/nginx/pages #[절대경로];
  }
}
```

### • adding dynamic module

### • header

캐시
**\- add_header**  
**\- expires**

### • gzip

**\- gzip**
**\- gzip_comp_level**
**\- gzip_types**

### • fastCGI cache

### • http2

openssl req -x509 -days 10 -nodes -newkey?

### • http2_push?

## reverse proxy / load balancing

### • reverse proxy

reverse proxy는 browser와 server의 중간에 있는 서버입니다.
reverse proxy 설명 더넣기...

**\- proxy_pass**  
https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
설정한 uri로 요청을 전달합니다.
uri/ vs uri

```
# nginx.conf
events {}

http {
  server {
    listen 80 #[서버 주소];
    server_name myserver #[서버이름];
    root /etc/nginx/pages #[절대경로];
    proxy_pass 'http://localhost:3000'; #[uri]
  }
}
```

### • loadbalancing

https://nginx.org/en/docs/http/load_balancing.html
**\- upstream**  
https://nginx.org/en/docs/http/ngx_http_upstream_module.html#upstream

```
# nginx.conf
events {}

http {
  server {
    listen 80 #[서버 주소];
    server_name myserver #[서버이름];
    root /etc/nginx/pages #[절대경로];
    upstream my_servers {
      server localhost:3001; #[server domain / port]
      server localhost:3002;
      server localhost:3003;
    }
    proxy_pass http://my_servers; #[upstream server 이름]
  }
}
```

round robin으로 load balancing합니다.
**\- ip_hash**  
같은 ip는 이전 서버로 보냅니다.
**\- lest_conn**  
connection이 적은 서버로 보냅니다.

nginx -c?

```nginx.conf
user       www www;  ## Default: nobody
worker_processes  5;  ## Default: 1
error_log  logs/error.log;
pid        logs/nginx.pid;
worker_rlimit_nofile 8192;

events {
  worker_connections  4096;  ## Default: 1024
}

http {
  include    conf/mime.types;
  include    /etc/nginx/proxy.conf;
  include    /etc/nginx/fastcgi.conf;
  index    index.html index.htm index.php;

  default_type application/octet-stream;
  log_format   main '$remote_addr - $remote_user [$time_local]  $status '
    '"$request" $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log   logs/access.log  main;
  sendfile     on;
  tcp_nopush   on;
  server_names_hash_bucket_size 128; # this seems to be required for some vhosts

  server { # php/fastcgi
    listen       80;
    server_name  domain1.com www.domain1.com;
    access_log   logs/domain1.access.log  main;
    root         html;

    location ~ \.php$ {
      fastcgi_pass   127.0.0.1:1025;
    }
  }

  server { # simple reverse-proxy
    listen       80;
    server_name  domain2.com www.domain2.com;
    access_log   logs/domain2.access.log  main;

    # serve static files
    location ~ ^/(images|javascript|js|css|flash|media|static)/  {
      root    /var/www/virtual/big.server.com/htdocs;
      expires 30d;
    }

    # pass requests for dynamic content to rails/turbogears/zope, et al
    location / {
      proxy_pass      http://127.0.0.1:8080;
    }
  }

  upstream big_server_com {
    server 127.0.0.3:8000 weight=5;
    server 127.0.0.3:8001 weight=5;
    server 192.168.0.1:8000;
    server 192.168.0.1:8001;
  }

  server { # simple load balancing
    listen          80;
    server_name     big.server.com;
    access_log      logs/big.server.access.log main;

    location / {
      proxy_pass      http://big_server_com;
    }
  }
}
```

## react 연결

## 무중단 배포

https://dev-jwblog.tistory.com/42

https://www.nginx.com/nginx-wiki/build/dirhtml/start/topics/examples/systemd/

https://whatisthenext.tistory.com/123

https://sddev.tistory.com/82

https://codechacha.com/ko/deploy-react-with-nginx/
https://velog.io/@ksso730/Nginx-Apache-%EB%B9%84%EA%B5%90

stack academy

https://nginx.org/en/docs/beginners_guide.html

tutorial
https://www.digitalocean.com/community/tutorials
https://codex.wordpress.org/nginx
https://github.com/fcambus/nginx-resources

http://labs.ssen.name/Server/NginX/include%EB%A5%BC%20%EC%82%AC%EC%9A%A9%ED%95%B4%EC%84%9C%20NginX%EC%9D%98%20%EC%84%A4%EC%A0%95%EC%9D%84%20%EB%82%98%EB%88%84%EA%B8%B0.html

https://ohgyun.com/556

nginx설정값
https://developer88.tistory.com/299

!!!! socket nginx
https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/

static nginx
https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/

https://docs.nginx.com/nginx/admin-guide/web-server/web-server/

```
events {}

http {
  log_format server_log 'request:$request | status:$status | '
                        'proxy_add_x_forwarded_for: $proxy_add_x_forwarded_for | host: $host | '
                        'http_upgrade: $http_upgrade | http_connection: $http_connection | ';

  server {
    listen 80;
    server_name myserver;

    include /etc/nginx/mime.types;

    access_log /etc/nginx/logs/access.log server_log;

    location / {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $host;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_pass http://34.64.177.34:3001;
    }

    location /client {
      alias /etc/nginx/statics/;
      index index.html; #uri .../client/'s default static file
    }

    location /static/js {
      alias /etc/nginx/statics/static/js/;
    }

    location = /students {
      return 200 'my students';
    }
  }
}
```

nginx.conf 위치

- nginx:/etc/nginx

service nginx restart
service nginx reload
nginx -s reload
nginx -s quit
nginx -s stop
nginx -s reopen

## cheating sheet

### • nginx location

nginx는 location 처리시, 자세한 location에 맞추어 응답합니다.

```
events {}

http {
  server {
    listen 80;
    server_name myserver;

    location / {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $host;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_pass http://34.64.177.34:3001;
    }

      location = /a {
          return 200 '/a';
      }
      location = /a/ {
          return 200 '/a/';
      }
      # /b***인 path를 처리합니다.
      location /b {
          return 200 '/b';
      }
      # /b***인 path에 포함되지만, /b/c가 자세하기 /b/c***인 path를 처리합니다.
      location /b/c {
          return 200 '/b/c';
      }
      location /c {
          return 200 '/c';
      }
      location /c/ {
          return 200 '/c/';
      }
      location /cd {
          return 200 '/cd';
      }
  }
}

```

### • nginx api

### • nginx static page
