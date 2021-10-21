---
title: "nodejs file 다루기"
categories:
  - programming
date: 2021-06-22 01:00:00 +0900
last_modified_at: 2021-06-22 01:00:00 +0900
---
https://nodejs.org/api/stream.html#stream_readable_destroy_error
# CSV 다루기
https://stackoverflow.com/questions/54408334/readable-destroy-not-emitting-both-close-and-error-events-node-js

## 스트림  / 버퍼


## CSV 다루기
# CSV 다루기
https://leanylabs.com/blog/js-csv-parsers-benchmarks/
https://www.youtube.com/watch?v=Zhi7Y1oi5qs
https://stackabuse.com/reading-and-writing-csv-files-with-node-js


https://2ality.com/2018/04/async-iter-nodejs.html



## server로 file 보내기
front에서 file 다루기
### • input
<input id="file-box" type="file" />
const $fileBox = document.querySelector("#file-box");
console.log($fileBox.value) 선택한 file 경로
console.log($fileBox.files) 선택한 file 정보

### • multipart/form-data
form 요소에 여러 입력이 있어 content-type이 서로 다를 경우, 이를 서버에서 처리하기 위해 enctype을 multipart/form-data로 정의해줍니다.

https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types
<form enctype="application/x-www-form-urlencoded">
모든 입력을 인코딩합니다.
<form enctype="text/plain">
인코딩하지 않습니다. (공백은 +로 바뀜)
<form enctype="mulipart/form-data">
인콛
https://velog.io/@park2348190/%ED%8C%8C%EC%9D%BC-%EC%A0%84%EC%86%A1-%EC%8B%9C-multipartform-data-%EC%9D%B8%EC%BD%94%EB%94%A9

https://lena-chamna.netlify.app/post/http_multipart_form-data/

<content-transfer-encoding>


### • fileReader
https://programmingsummaries.tistory.com/367

**\- onload**
https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload

**\- readAsText**
file을 text로 읽습니다.
https://developer.mozilla.org/ko/docs/Web/API/FileReader/readAsText

**\- readAsArrayBuffer**
file을 array buffer로 읽습니다.
https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer

**\- readAsDataURL**
file을 array buffer로 읽습니다.
https://developer.mozilla.org/ko/docs/Web/API/FileReader/readAsDataURL
base64로 인코딩함
**\- result**
file을 읽은 결과를 반환하며, 데이터 형식은 읽기 작업(readAsText, readAsArrayBuffer 등)에 의해 정해집니다.


```
<input id="file-box" type="file" />
const $fileBox = document.querySelector("#file-box");

<script>
  $fileBox.addEventListener("change", (ev) => {
    const reader = new FileReader();
    reader.onload = (e) => console.log(e.target.result);

    reader.readAsTest(ev.target.files[0])
  })
</script>
```


### • blob
blob은 멀티미디어(이미지/사운드/비디오 등)을 다루기 위한, js 자료형입니다.
https://developer.mozilla.org/ko/docs/Web/API/Blob/Blob
const blob = new Blob(array[, option])

🔎 file 또한 특정한 blob입니다.

**ArrayBuffer**
[ArrayBuffer](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)는 byte로 이루어진 배열로, binary data를 저장하는 공간입니다. 만일 new ArrayBuffer(32)로 buffer를 만든다면, 32 byte의 저장공간을 만든것과 같습니다. 이 공간은 view interface(Int8Array, Int16Array 등)를 통해 읽고/쓸수 있습니다.
```
const buffer = new ArrayBuffer(16); //16byte 메모리 공간
 // buffer를 unsigned 8bit의 저장소로 읽고/쓸수 있으며, unsigned 8bit이기에 0~255의 수를 8개의 공간에 할당할 수 있습니다.
const uint8s = new Uint8Array(buffer);
(int16Array라면, -128 ~ 127 )
```
http://hacks.mozilla.or.kr/2017/11/a-cartoon-intro-to-arraybuffers-and-sharedarraybuffers/

new FormData()

https://code.tutsplus.com/tutorials/how-to-create-a-resumable-video-uploader-in-nodejs--net-25445



## nodejs (file module)

fs.exists

### • 파일 열기
**\- fs.open**
fs.open은 file을 엽니다. https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback
fs.open([file 경로], [w|r|a], (err, fd) => {
  ...
});
w일때 file이 없다면 새로 만듭니다.


fs.unlink

fs.readFile

fs.appendFile

fs.isFile

fs.rename

## nodejs (multer)
[multer](https://www.npmjs.com/package/multer)는 multipart/form-data를 다루기 위한 라이브러리입니다.

```
npm install --save multer
```


client
```
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
```


```
const express = require('exress');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express()

app.post('/upload', upload.single('avatar'), (req, res, next) => {
  ...

  //req.body에 담겨져있습니다.
})

```

**\- configuration**
```js
const upload = multer({
  dest: '/dist' // 저장될 directory 이름
  limit: { fileSize: 10 * 1024 * 1024 } // file 제한
  fileFilter: ... // 어떤 file을 다룰지 정의
  preserverPath: ...
})

```

### • stroageç
**\- disk storage**
```js
const upload = multer({
  // server disk에 저장하며, destination/filename 정의합니다.
  storage: multer.diskStorage({
    // disk에 저장되는 directory를 설정합니다.
    destination(req, file, cb) {
      cb(null, [directory 이름])
    }
    // disk에 저장되는 file 이름을 설정합니다.
    filename: (req, file, cb) => {
      cb(null, [file 이름])
    }
  })
})

```

### • file 정보
fieldname
originamlname
encoding
memetype
size
destination
filename
path
buffer


### • middleware
multer는 middleware로 작동하여, single, array, field, none, any로 form에서 요청온 file들을 처리할 수 있습니다. multer는 이들 요청을 처리한 후 라우터 핸들러에 file 정보를 담아 보냅니다.
(text type은 body에 담는듯?)
**\- single**
단일 field에서 보내진 하나의 file을 처리하고, file 정보를 req.files에 담습니다.
app.post('/upload', upload.single('my-id'), (req, res, next) => {
  console.log(req.file)
});
// my-id field를 처리합니다.

**\- array**
단일 field에서 보내진 여러개의 file들을 처리하고, file 정보를 req.files에 담습니다.
app.post('/upload', upload.array('my-id'), (req, res, next) => {
  console.log(req.files)
});
// my-id field를 처리합니다.

**\- field**
여러 field에서 보내진 여러개의 file들을 처리하고, file 정보를 req.files에 담습니다.
app.post('/upload', upload.single([{ name: 'my-id' }, { name: 'your-id' }]), (req, res, next) => {
  console.log(req.files)
});
// my-id, your-id field를 처리합니다.


field 이름은 form에서 정의됨





## nodejs (socketio)

https://stackoverflow.com/questions/59478402/how-do-i-send-image-to-server-via-socket-io

socketio bible...?
https://code.tutsplus.com/tutorials/how-to-create-a-resumable-video-uploader-in-nodejs--net-25445


**bucket upload**
https://ichi.pro/ko/nodejsleul-sayonghayeo-google-cloud-storage-beokis-e-pail-eul-eoblodeuhaneun-bangbeob-25584973883807


file api
https://pks2974.medium.com/file-api-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-729fa6a3a0ba

http://mohwa.github.io/blog/javascript/2015/08/31/binary-inJS/


multer
bucket
https://uju-tech.tistory.com/entry/GCPNodejs-Cloud-Storage-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C
https://r4bb1t.tistory.com/29



readAsDataUR -> base64?



drag n drop , url
https://www.zerocho.com/category/HTML&DOM/post/592827558653d6001804a0a5


buffer
https://tk-one.github.io/2018/08/28/nodejs-buffer/


## gcp bucket
https://medium.com/@olamilekan001/image-upload-with-google-cloud-storage-and-node-js-a1cf9baa1876

https://masteringjs.io/tutorials/node/google-cloud-storage

https://ichi.pro/ko/nodejsleul-sayonghayeo-google-cloud-storage-beokis-e-pail-eul-eoblodeuhaneun-bangbeob-25584973883807