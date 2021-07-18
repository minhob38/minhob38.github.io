---
title: "Mongoose"
categories: 
  - programming
date: 2021-07-18 01:00:00 +0900
last_modified_at: 2021-07-18 01:00:00 +0900
---

# Mongoose
[Mongoose](https://mongoosejs.com/)는 NoSQL을 위한 nodejs ODM(Object Document Mapping)입니다. Mongoose 관점에서 ODM이란 객체(JavaScript 객체)와 Document(MongoDB Document)를 맵핑해주는 프로그램을 의미합니다. 따라서 SQL문을 작성하지 않아도 Mongoose의 함수를 통해 MongoDB를 다룰 수 있습니다.

## 환경설정
### • 설치하기
npm을 통해 mongoose를 설치합니다.
```
npm install --save mongoose
```

### • 연결하기
**Node.js - MongoDB 연결하기**  
\- [mongoose.connect](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-connect)  
MongoDB 호스트 주소를 Node.js에 연결해줍니다. 예로들어 compass에서 `localhost/study`로 db를 연결했다면, `mongodb://localhost/study`로 Node.js에 연결해줍니다.  
syntax : `mongoose.connect(uri, [options], [callback])`

```js
const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/DBname',useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

**연결상태**  
\- [mongoose.prototype.connection](https://mongoosejs.com/docs/api/connection.html#connection_Connection)  
connection 객체를 통해 MongoDB와 nodejs의 연결상태를 모니터링 할 수 있으며, connection은 이벤트 에미터를 상속받습니다.

```js
  const db = mongoose.connection;
  db.on('error', () => console.log('connection error');
  db.once('open', () => console.log('connection open')'
```

### • 스키마
[스키마]((https://mongoosejs.com/docs/guide.html))란 Database의 구조, 표현방법, 관계 등을 형식 언어로 정의한 것을 의미합니다.

**스키마 만들기**  
모델을 만들기 전에 다큐먼트의 형식을 지정할 스키마를 만들어야 합니다.

[- mongoose.Schema](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-Schema)  
스키마를 만듭니다.  
syntax : `new mongoose.Schema({...})`

```js
const schema = new mongoose.Schema();
```

**스키마 타입 정의하기**  
[스키마 타입](https://mongoosejs.com/docs/schematypes.html)을 지정하여 document filed의 자료형을 지정할 수 있습니다. 스키마 타입으론  [String/Number/Boolean/Array/Buffer/Date/ObjectId/Mixed](https://mongoosejs.com/docs/api/schema.html#schema_Schema.Types)가 있습니다.

```js
const schema = new mongoose.Schema({
  a: String,
  b: Number,
  c: Boolean,
  d: Buffer,
  e: Date,
  f: mongoose.Types.ObjectId,
  g: mongoose.Types.Mixed
});
```

아래에서 각 스키마 타입에 대해 자세히 살펴보겠습니다.

[\- ObjectId](https://mongoosejs.com/docs/schematypes.html#objectids)  
ObjectId는 MongoDB에 쓰이는 unique identifier입니다. 또한 ObjectId는 객체이toString()을 통해 24자의 문자열로 변환할 수 있습니다. ObjectId는 mongoose.TypeObjectId()로 얻을 수 있으며, document를 만들때는 ObjectId 뿐만아니라 ObjectId문자열을 넣을 수 있습니다

```js
const objectId = new mongoose.Types.ObjectId()
const schema = new mongoose.Schema({
  a: mongoose.Types.ObjectId
  b: mongoose.Types.ObjectId
});
model.create({a: mongoose.Types.ObjectId, b:"6061b68a076c4013b266d98"})
```
MongoDB는 document의 [_id](https://mongoosejs.com/docs/guide.html#_id)를 식별자로 참조합니다. 따라서, 기본적으로 Mongoose자동으로 _id를 ObjectId 스키마로 정의하고 document에 넣어줍니다. 만일 별도로 _id스키마를 지정하고 document에 넣어주지 않으면 오류가 발생합니다.

[\- String](https://mongoosejs.com/docs/schematypes.html#strings)  
문자열 형식입니다. 만일 숫자형이 입력되면 문자열로 형변환하며, toString()함수의 반환값저장합니다.
```js
const schema = new mongoose.Schema({
  a: String
  b: String,
})
model.create({a: 3, b: {toString: () => "mongoose"}});
```

[\- Number](https://mongoosejs.com/docs/schematypes.html#numbers)  
숫자 형식입니다. 만일 숫자 문자열이 입력되면 숫자로 형변환하며, valueOf()함수의 반환값저장합니다.
```js
const schema = new mongoose.Schema({
  a: Number,
  b: Number
})
model.create({a: 3, b:{valueOf: () => "3"}});
```

[\- Date](https://mongoosejs.com/docs/schematypes.html#dates)  
날짜 형식이며 JavaScript Date 객체와 동일합니다. 따라서, new Date()에 입력으들어가는 형태를 넣어주면 됩니다. MongoDB에는 ISO8601형태로 저장되며 가져올때도 날짜(Date 객체)입니다.
```js
const schema = new mongoose.Schema({
  a: Date,
  b: Date,
  c: Date,
  d: Date,
  e: Date,
  f: Date
})
model.create({
    a: new Date(),
    b: new Date().toISOString(),
    c: new Date().getTime(),
    d: Date.now(),
    e: new Date("December 17, 2021 03:24:00"),
    f: "2021-1-18"
});
```
[\- Boolean](https://mongoosejs.com/docs/schematypes.html#booleans)  
불리언 형식입니다. true / 'true' / 1 / '1' / 'yes'는 true로 false / 'false/ 0 / '0' / 'no'는 false으로 저장합니다.
```js
const schema = new mongoose.Schema({
a: Boolean,
  b: Boolean,
  c: Boolean,
  d: Boolean,
  e: Boolean,
  f: Boolean,
  g: Boolean,
  h: Boolean,
  i: Boolean,
  j: Boolean
})
model.create({
  a: true,
  b: "true",
  c: 1,
  d: "1",
  e: "yes",
  f: false,
  g: "false",
  h: 0,
  i: "0",
  j: "no"
});
```

[\- Mixed](https://mongoosejs.com/docs/schematypes.html#booleans)  
불리언 형식입니다. true / 'true' / 1 / '1' / 'yes'는 true로 false / 'false/ 0 / '0' / 'no'는 false으로 저장합니다.
```js
const schema = new mongoose.Schema({
  a: {},
  b: Object,
  c: mongoose.Schema.Types.Mixed,
  d: mongoose.Mixed,
})
model.create({
  a: 1,
  b: "2",
  c: Date.now(),
  d: true,
});
```

**스키마 검증**  
[Validation](https://mongoosejs.com/docs/validation.html#validation)을 설정하면, 조건에 맞는 자료가 들어왔는지 검증을 합니다. Validation은 미들웨어로 스키마타입에 정의되어야 하며 기본적으로 pre(save) hook으로 설정되어 있습니다. 이처럼 Validation을 정의하면 형식 뿐만 아니라 자료를 정밀하게 다룰 수 있습니다. 아래에서 스키마 검증에 대해 자세히 살펴 보겠습니다.

[**\- unique**](https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator)  
자료가 중복되지 않도록 합니다.  
😺 unique는 validator가 아닙니다.

```js
const schema = new mongoose.Schema(
  a: { type: String, unique: true }
)
model.create({a: "mongoose"});
```

**\- 공통**  
[**required**](https://mongoosejs.com/docs/api.html#schematype_SchemaType-required)  
자료가 required(필수)인지 validation합니다. boolean / function / Object를 통해 required 한지(true) 아닌지(false) 판단하며, required한데 값이 없다면 에러메세지를 출력합니다.

```js
const schema = new mongoose.Schema({
  a: { type: String, required: true }, // required 활성화
  b: { type: String, required: false }, // required 비활성화
  c: { type: String, required: ":)" }, // error message
  d: { type: String, required: () => console.log(":(") },
  e: {
    type: String,
    required: function () {
      console.log(this);
    },
  },
  f: {
    type: String,
    required: () => console.log(this),
  },
  g: {  // a가 "b"가 아니면 not required
    type: String,
    required: function () {
      console.log(this.a === "a");
      return this.a === "b";
    },
  },
  h: {  // a가 "a"이면 required
    type: String,
    required: [
      function () {
        console.log(this.a === "b");
        return this.a === "a";
      },
      "error",
    ],
  },
});

model.create({
  a: "a",
  b: "b",
  c: "c",
  e: "e",
  g: "g",
  h: "h",
});
```

**default**  
자료의 기본값을 정의합니다.
```js
const schema = new mongoose.Schema(
  a: { type: String, default: ":(" },
  b: { type: Number, default: 3 },
  c: { type: String, default: () => ":(" },
  d: { type: String, default: () => 3 },

model.create({});
```

**select**  

[**validate**](https://mongoosejs.com/docs/api.html#schematype_SchemaType-validate)  
[validator](https://mongoosejs.com/docs/validation.html#custom-validators)를 만들 수 있습니다.
```js
const schema = new mongoose.Schema(
  a: { type: String, validate: (val) => val === "a" },
  b: { type: String, validate: [(val) => val === "b", "error"] },
  c: {
    type: String,
    validate: {
      validator: (val) => val === "c",
      message: (props) => `${props.value}`,
    },
  },
  d: {
    type: String,
    validate: [
      { validator: (val) => val === "d", message: (props) ={props.value}` },
      { validator: (val) => val === "e", message: (props) ={props.value}` },
    ],
  }
model.create({
  a: "a",
  b: "b",
  c: "c",
  d: "d"
});
```

**get**  

**set**  

**alias**  

**immutable**  

**tansform**  

[**\- 숫자**](https://mongoosejs.com/docs/schematypes.html#number-validators)  
**min / max**  
자료의 최소값 / 최대값을 정의합니다.
```js
const schema = new mongoose.Schema(
  a: { type: Number, min: 0, max: 10 }

model.create({a: 15});
```

**enum : ?**  

**popultate : ?**  

[**\- 문자열**](https://mongoosejs.com/docs/schematypes.html#string-validators)  
**minLength / maxLength**  
문자열 최소길이 / 최대길이를 정의합니다.
```js
const schema = new mongoose.Schema(
  a: { type: String, minLength: 5, maxLength: 10 },

model.create({a: "abcdefghijklmn"});
```

**lowercase / uppercase**
문자열을 소문자 / 대문자로 바꾸어 저장합니다. (JavaScript `toLowerCase` / `toUpperCase`와 동일합니다.)

```js
const schema = new mongoose.Schema(
  a: { type: String, uppercase: true },

model.create({a: "aBcDeFgHi"});
```

**trim**  
문자열 앞뒤 공백을 제거하여 저장합니다. (JavaScript `Trim`과 동일합니다.)
```js
const schema = new mongoose.Schema(
  a: { type: String, uppercase: true },

model.create({a: "aBcDeFgHi"});
```

**match**  
정규식과 일치하는지 검증합니다.
```js
const schema = new mongoose.Schema(
  a: { type: String, match: /a/g },

model.create({a: "abc"});
```

**enum : ?**  

**popultate : ?**  


## 참고 자료
[• Mongoose Getting Started](https://mongoosejs.com/docs/index.html)  
[• Mongoose Connection - 1](https://mongoosejs.com/docs/connections.html)  
[• Mongoose Connection - 2](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-Connection)  
[• Mongoose Connection based on Event Emitter](https://mongoosejs.com/docs/connections.html#connection-events)  
[• Mongoose Schema](https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250)