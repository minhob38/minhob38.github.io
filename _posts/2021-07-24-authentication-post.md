---
title: "Authentication"
categories: 
  - programming
date: 2021-07-24 01:00:00 +0900
last_modified_at: 2021-07-24 01:00:00 +0900
---
# Authentication
Session, Token 기반 인증에 대해 살펴보겠습니다.

## Token 기반 인증
### token

## Login Form
```
<form action="/login" method="POST" target="_blank">
  <input type="email" name="email">
  <input type="password" name="password">
  <input type="submit" value="로그인"/>
</form>
```
email 정규식  
password 정규식  





## Passport
[Passport](http://www.passportjs.org/)는 nodejs 인증 라이브러리로 인증전략(Strategy)를 통해 로컬 로그인, 소셜 로그인(Google/Facebook/Github/Naver 등)을 만들 수 있도록 해줍니다.

### • Token 로그인
**\- 인증 요청/처리**  
설정된 전략에 따라 인증을 수행합니다. 예로들어 /login으로 post 요청이 들어오면, `passport.authenticate`는 post로 전달된 body와 함께 Strategy의 verify callback 함수를 호출합니다. `passport.authenticate`가 인증을 요청하고 Strategy가 인증 결과를 다시 passport.authenticate에 전달합니다. 이때 인증 결과를 Redirect와 Callback으로 처리할 수 있습니다.

**Redirect를 통한 인증 결과 처리**
인증이 성공하면 successRedirect 경로로, 실패하면 failureRedirect로 Redirect 시킵니다.
```js
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);
```

**Callback을 통한 인증 결과 처리**
인증이 성공하면 callback이 실행되고 req.user에 접근할 수 있습니다. 만일 인증이 실패하면 401 에러를 응답합니다.
```js
app.post(
  "/login",
  passport.authenticate("local", (req, res) => {
    console.log("authentication success"),
    res.redirect("/");
  }
);
```

**\- 인증전략**  
passport.authenticate로부터 인증 요청이 오면, Passport가 유효한 사용자인지 판단하기 위한 [인증전략](http://www.passportjs.org/docs/configure/)을 먼저 만들어야 합니다. 인증 전략은 new LocalStrategy를 통해 만들 수 있으며, Passport는 new LocalStrategy에 인자로 넘겨준 verify callback을 통해 인증요청을 처리합니다. verify callback은 인자로 usernameField, passwordField, done을 전달받으며 usernameField, passwordField를 통한 로직에 의해 done을 호출하여 인증 결과를 만듭니다. done(null, user)는 인증성공, done(null, false)는 인증실패, done(err)은 에러입니다. 인증에 성공했다면 done에 전달한 두번째 인자는 serializeUser로 전달되며, serializeUser callback을 실행시킵니다. 

😺 usernameField, passwordField는 form에서 보낸 정보와 맞추어야합니다. (기본값은 username, password 입니다.)

😺 return done()을 해야, verify callback이 종료되고 passport.authenticate에 인증결과를 전달해줄 수 있습니다.

```js
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    function (username, password, done) {
      done(null, false);
    },
  ),
);
```



https://swalloow.github.io/implement-jwt/