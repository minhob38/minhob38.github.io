---
title: "Authentication"
categories: 
  - programming
date: 2021-07-24 01:00:00 +0900
last_modified_at: 2021-07-24 01:00:00 +0900
---
# Authentication
Session, Token 기반 인증에 대해 살펴보겠습니다.

## Sign-up / Sign-in Form
회원가입 또는 로그인 정보는 form을 통해 서버에 전달됩니다.
```
<form action="/login" method="POST" target="_blank">
  <input type="email" name="email">
  <input type="password" name="password">
  <input type="submit" value="로그인"/>
</form>
```
email 정규식  
password 정규식  

## Password
### • 암호화
bcrypt 알고리즘을 통해 평문의 비밀번호를 해시화합니다. bcrypt는 보안을 위해 salt라는 임의의 키를 넣어 해시화합니다.  
\- salt key : `$2b$10$iviWS8fuFn/ND0pIG.40wu`  
\- hash key : `$2b$10$iviWS8fuFn/ND0pIG.40wuedPTL9xy1AQw/9uvhmvaXNnFM.pe/B.`  
🔎 nodejs의 [bcrypt](https://www.npmjs.com/package/bcrypt)입니다.

## Token 기반 인증
### • token
토큰이란 서버가 클라이언트에 발급해주는 동전(인증서)과 같은 개념입니다. 유효한 토큰을 가지고 요청을 하면 서버에서 응답을 받을 수 있습니다.

### • jwt
[JWT](https://jwt.io/)는 JSON 형태의 정보를 문자열로 바꾼 토큰입니다. JWT는 다음과 같이 세부분으로 이루어져 있습니다.  
**\- Header** : 토큰타입과 알고리즘 정보가 담겨져 있습니다.  
**\- Payload** : 보낼 자료, 유효기간 등이 담겨져 있습니다.  
**\- Verify Signature** : 인증 정보가 담겨져 있습니다.  
<img src="/assets/images/jwt.png" alt="image" width="80%">

### • nodejs jwt
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) nodejs의 jwt 라이브러리입니다.  
**\- sign**  
JWT 토큰을 만듭니다.  
`jwt.sign(payload, secretOrPrivateKey, [options, callback])`  
```js
const token = jwt.sign({ jwt: "token" }, "abc", { expiresIn: '10' }); // sec 단위
const token = jwt.sign({ jwt: "token" }, "abc", { expiresIn: '7d' }, (err, token) ={
  console.log(err);
  console.log(token);
});
```
**\- verify**  
유효한 토큰인지 확인합니다.  
`jwt.verify(token, secretOrPrivateKey, [options, callback])`
```jsx
const decoded = jwt.verify(token, "abc");
const decoded = jwt.verify(token, "abc", (err, decoded) => {
  console.log(err);
  console.log(decoded);
});
const decoded = jwt.verify(token, "abc", { ignoreExpiration: true });
```
🔎 같은 인자를 전달해도 만드는 시간에 따라 발급된 토큰은 다릅니다.  
🔎 콜백없이 작성하면 반환값으로 payload를 받으며, 토큰이 인증되지 않으면에러를 발생시킵니다. 반면 콜백으로 작성하면 payload를 에러를 콜백에서 받을 수 있습니다. 이때 콜백은 동기 콜백입니다.  

### • 과정
**\- 인증정보 입력** : id, email, password 등 인증에 필요한 정보를 입력하여, 서버에 요청합니다.  
**\- 인증 확인** : 서버에서 받은 인증정보를 가지고 회원인지 확인합니다.  
**\- 토큰 발급** : 인증된 회원이라면 서버는 토큰을 발급합니다.  
**\- 서버 응답 (with Token, Webstorage)** : 로그인이 되면 서버는 발급한 token을 클라이언트에게 (body에 실어)보내줍니다.  
**\- 서버 요청(with Token)** : 클라이언트는 `authorization` 헤더에 `bearer [token]`을 담아 서버에 요청합니다.
**\- 토큰 검사** : 서버는 헤더에 담긴 토큰이 유효한지 검사하여 응답을 할지 결정합니다.

🔎 클라이언트는 토큰을 cookie 또는 web storage(local/session storage)에 저장합니다.

xss
csrf

httpOnly
document.cookie로 접근할 수 없습니다. (브라우저 자바스크립트로)
https://dev-dain.tistory.com/73
https://www.stackhoarder.com/2019/07/17/node-js-passport-js-jwt-token-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84/

## Passport
[Passport](http://www.passportjs.org/)는 nodejs 인증 라이브러리로 인증전략(Strategy)를 통해 로컬 로그인, 소셜 로그인(Google/Facebook/Github/Naver 등)을 만들 수 있도록 해줍니다.

설정된 전략에 따라 인증을 수행합니다. 예로들어 `/login`으로 post 요청이 들어오면, `passport.authenticate`는 post로 전달된 body와 함께 Strategy의 verify callback 함수를 호출합니다. `passport.authenticate`가 인증을 요청하고 Strategy가 인증 결과를 다시 passport.authenticate에 전달합니다. 이때 인증 결과를 Redirect와 Callback으로 처리할 수 있습니다.

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
인증이 성공하면 callback이 실행되고 `req.user`에 접근할 수 있습니다. 만일 인증이 실패하면 401 에러를 응답합니다.
```js
app.post(
  "/login",
  passport.authenticate("local"), (req, res) => {
    console.log("authentication success"),
    res.redirect("/");
  }
);
```

**Custom Callback을 통한 인증 결과 처리**  
미들웨어가 아닌, 라우터 핸들러 안에서 passport가 호출됩니다. 인증전략의 verify callback의 done 인자에  따라, err, user, info의 결과를 전달받습니다.  
🔎 `done(err, user, info...)` -> `(err, user, info) => { ... }`
```js
app.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    // To Do...
  })
});
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

## 참고자료

https://swalloow.github.io/implement-jwt/

SSR에서는 Body로 헤더 및 쿠키 아니면 전달불가한가? (AJAX는 Body에 토큰을 보낼 수 있음)

### • http 인증
https://developer.mozilla.org/ko/docs/Web/HTTP/Authentication

bearer token?

RFC 6750
https://datatracker.ietf.org/doc/html/rfc6750
https://swagger.io/docs/specification/authentication/bearer-authentication/

https://velog.io/@yaytomato/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0


[• 클라이언트 토큰 저장위치](https://velog.io/@neity16/NodeJS-Token-%EC%A0%80%EC%9E%A5-%EC%9C%84%EC%B9%98%EC%9D%98-%EA%B3%A0%EC%B0%B0)

https://woowacourse.github.io/tecoble/post/2020-08-31-where_to_store_token/


authenticate-> strategy -> ctx.login -> serializer -> session -> deserializer