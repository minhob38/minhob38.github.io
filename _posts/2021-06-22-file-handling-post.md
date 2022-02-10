---
title: "python / nodejs file 다루기"
categories:
  - programming
date: 2021-06-22 01:00:00 +0900
last_modified_at: 2021-06-22 01:00:00 +0900
---

## Front-End에서 file 다루기

### • input tag

```
<input id="file-box" type="file" />
const $fileBox = document.querySelector("#file-box");
console.log($fileBox.value) 선택한 file 경로
console.log($fileBox.files) 선택한 file 정보
```

### • multipart/form-data

form 요소에 여러 입력이 있어 content-type이 서로 다를 경우, 이를 서버에서 처리하기 위해 enctype을 multipart/form-data로 정의해줍니다.

```
<form enctype="mulipart/form-data">
```

```
const formData = new Form()
fetch("http://localhost:3000", {
  method: "POST",
  body: formData
})

// new Form을 넣어서 보내면, 자동으로 mulipart/form-data로 전송됩니다.
```

### • fileReader

file을 비동기로 읽은 web api입니다.

**\- onload**  
file이 load되었을때 실행되는 event listener입니다.

**\- readAsText**  
file을 text로 읽습니다.

**\- readAsArrayBuffer**  
file을 array buffer로 읽습니다.

**\- readAsDataURL**  
file을 array buffer로 읽습니다. (base64로 인코딩됩니다.)

**\- result**  
file을 읽은 결과를 반환하며, 데이터 형식은 읽기 작업(readAsText, readAsArrayBuffer 등)에 의해 정해집니다.

```
<input id="file-box" type="file" />
const $fileBox = document.querySelector("#file-box");

<script>
  $fileBox.addEventListener("change", (ev) => {
    const reader = new FileReader();
    reader.onload = (e) => console.log(e.target.result);

    reader.readAsText(ev.target.files[0])
  })
</script>
```

### • blob

blob은 멀티미디어(이미지/사운드/비디오 등)을 다루기 위한, js 자료형입니다.

```
const blob = new Blob(array[, option])
```

🔎 file 또한 특정한 blob의 형태입니다.

**\- ArrayBuffer**  
ArrayBuffer는 byte로 이루어진 배열로, binary data를 저장하는 공간입니다. 만일 new ArrayBuffer(32)로 buffer를 만든다면, 32 byte의 저장공간을 만든것과 같습니다. 이 공간은 view interface(Int8Array, Int16Array 등)를 통해 읽고/쓸수 있습니다.

```
const buffer = new ArrayBuffer(16); //16byte 메모리 공간
const uint8s = new Uint8Array(buffer); // buffer를 unsigned 8bit의 저장소로 읽고/쓸수 있으며, unsigned 8bit이기에 0~255의 수를 8개의 공간에 할당할 수 있습니다.
(int16Array라면, -128 ~ 127 )
```

## python file 다루기

### • 파일 열기

**\- open**  
file 객체를 반환합니다.

```python
f = open([file 경로], [모드])
```

🔎 모드는 w(쓰기)/r(읽기)/a(추가)가 있습니다.

### • 파일 닫기

open으로 열려있는 file객체를 close로 닫아줍니다.

```python
f.close()
```

## nodejs file 다루기

### • 파일 열기

**\- fs.open**  
fs.open은 file을 엽니다.

```
fs.open([file 경로], [w|r|a], (err, fd) => {
...
});
```

### • multer

multer는 multipart/form-data를 다루기 위한 라이브러리입니다.  
**\- 설치**

```
npm install --save multer
```

**\- 예시 코드**

```html
<!-- client -->
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
```

```js
// server
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

**\- middleware**  
multer는 middleware로 작동하여, single, array, field, none, any로 form에서 요청온 file들을 처리할 수 있습니다. multer는 이들 요청을 처리한 후 라우터 핸들러에 file 정보를 담아 보냅니다.
(text type은 body에 담는듯?)

**\- single**  
단일 field에서 보내진 하나의 file을 처리하고, file 정보를 req.files에 담습니다.

```js
app.post("/upload", upload.single("my-id"), (req, res, next) => {
  console.log(req.file);
});
// my-id field를 처리합니다.
```

**\- array**  
단일 field에서 보내진 여러개의 file들을 처리하고, file 정보를 req.files에 담습니다.

```js
app.post("/upload", upload.array("my-id"), (req, res, next) => {
  console.log(req.files);
});
// my-id field를 처리합니다.
```

**\- field**  
여러 field에서 보내진 여러개의 file들을 처리하고, file 정보를 req.files에 담습니다.

```js
app.post(
  "/upload",
  upload.single([{ name: "my-id" }, { name: "your-id" }]),
  (req, res, next) => {
    console.log(req.files);
  }
);
// my-id, your-id field를 처리합니다.
```

🔎 field 이름은 form에서 정의됩니다.

### • socketio

**\- 데이터 보내기**

```js
// client
const handleChangeFileInputREST = async (ev) => {
  const file = ev.target.files[0];
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch("/portfolios/memos", {
    method: "POST",
    body: formData,
  });
  console.log(await res.json());
};
```

```js
// client
const handleChangeFileInput = (ev) => {
  setFiles(ev.currentTarget.value);
  const reader = new FileReader();
  const file = ev.currentTarget.files[0];
  console.log(file.type);
  console.log(file.name);
  console.log(file.size);
  reader.readAsArrayBuffer(ev.currentTarget.files[0]);
  reader.onload = () => {
    console.log(reader.result);
    currentSocket.emit("file-upload", {
      type: "file-upload",
      payload: { binary: reader.result, mime: file.type, name: file.name },
      auth: { token },
    });
  };
};
```

```js
// server
export async function fileUpload(data) {
  try {
    const namespace = this.nsp;
    const { binary, mime, name } = data.payload;

    const filePath = path.join(__dirname, "files");
    const lastDotIdx = name.lastIndexOf(".");
    const extension = name.substring(lastDotIdx);

    fs.openSync(`${filePath}/${name}`, "w");
    fs.writeFileSync(`${filePath}/${name}`, binary);

    const serviceKey = path.join(__dirname, "..", "config/gcp_bucket_key.json");

    const storage = new Storage({ keyFilename: serviceKey });
    const bucketname = "vos-bucket";
    const res = await storage.bucket(bucketname).upload(`${filePath}/${name}`, {
      destination: `memo_files/${name}`,
    });

    const url = res[0].metadata.mediaLink;
    // namespace.in(bookmarkId).emit('file-upload', {
    //     type: 'file-upload',
    //     status: 'success',
    //     message: 'file uploaded',
    //     payload:"..."
    // })
    // https://storage.googleapis.com/vos-bucket/memo_files/a
    // console.log(res)
  } catch (error) {
    this.emit("edit-memo", {
      type: "edit-memo",
      status: "error",
      message: error.message,
    });
  }
}
```

## 참고자료

[• python 파일 읽기/쓰기](https://wikidocs.net/26)  
[• mime type mdn](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)  
[• javascript csv - a](https://leanylabs.com/blog/js-csv-parsers-benchmarks/)  
[• javascript csv - b](https://stackabuse.com/reading-and-writing-csv-files-with-node-js)  
[• javascript csv - c](https://www.youtube.com/watch?v=Zhi7Y1oi5qs)  
[• javascript csv - d](https://2ality.com/2018/04/async-iter-nodejs.html)  
[• form enctype 종류](https://velog.io/@park2348190/%ED%8C%8C%EC%9D%BC-%EC%A0%84%EC%86%A1-%EC%8B%9C-multipartform-data-%EC%9D%B8%EC%BD%94%EB%94%A9)  
[• mutipart/form-data](https://lena-chamna.netlify.app/post/http_multipart_form-data/)  
[• FileReader API](https://programmingsummaries.tistory.com/367)  
[• FileReader API (readAsTest)](https://developer.mozilla.org/ko/docs/Web/API/FileReader/readAsText)  
[• FileReader API (onload)](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload)  
[• FileReader API (readAsArrayBuffer)](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer)  
[• FileReader API (readAsDataUrl)](https://developer.mozilla.org/ko/docs/Web/API/FileReader/readAsDataURL)  
[• blob mdn](https://developer.mozilla.org/ko/docs/Web/API/Blob/Blob)
[• ArrayBuffer mdn](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)  
[• ArrayBuffer](http://hacks.mozilla.or.kr/2017/11/a-cartoon-intro-to-arraybuffers-and-sharedarraybuffers/)

<!--
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

quill custom button
https://github.com/zenoamaro/react-quill/issues/111

quill image upload
https://reference-m1.tistory.com/359
https://www.c-sharpcorner.com/article/how-to-add-image-upload-control-in-react-quill-rich-text-editor/
https://kaloraat.com/articles/react-quill-wysiwyg-rich-text-editor-image-upload-to-server

https://www.youtube.com/watch?v=vZPk0wHdnSk

quill manual
https://velog.io/@onezerokang/Quill%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%84%9C-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EC%97%90%EB%94%94%ED%84%B0-%EB%A7%8C%EB%93%A4%EA%B8%B0-API5



### GCP Bucket 연동

multer
https://any-ting.tistory.com/20

### thumbnail 만들기

https://stackoverflow.com/questions/38410079/how-to-generate-thumb-pdf-file-only-first-page-in-node-js

# nodejs pdf to image

https://codinghub.medium.com/how-to-convert-pdf-file-pages-to-png-images-node-js-dccec010bf13

https://openbase.com/categories/js/best-nodejs-pdf-generator-libraries

pdf-kit
https://stackoverflow.com/questions/48903816/how-to-save-png-format-to-pdf-format-using-pdfkit-in-nodejs-code-included

https://www.youtube.com/watch?v=iDbh3nMf9bs

pdf library study
https://openbase.com/categories/js/best-nodejs-pdf-generator-libraries

- pdfmake
  텍스트를 치고 pdf를 만드는 방법
- pdfkit
  텍스트를 치고 pdf를 만드는 방법

- jspdf
  텍스트를 치고 pdf를 만드는 방법

- pdfjs-dist
- html-pdf
- pdf-parse

pspdfkit

docx-pdf //오래됨
sharp

libre-office
libre가 설치되어있어야함

https://www.pdftron.com/blog/nodejs/generate-pdf-convert-docx-to-pdf-with-nodejs/

pdftron
https://www.youtube.com/watch?v=OfCarU-t89M

pdf 결론
os레벨에서 pdf 변환
linux
cupspdf
unoconv
lowriter
alpine에 설치
https://superuser.com/questions/156189/how-to-convert-word-doc-to-pdf-in-linux

https://stackoverflow.com/questions/65194122/in-a-node-alpine-environment-performing-a-pdf-conversion-using-libreoffice-brea

https://ourcodeworld.com/articles/read/867/how-to-convert-a-word-file-to-pdf-docx-to-pdf-in-libreoffice-with-the-cli-in-ubuntu-2004
https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=dme1004&logNo=220712110937

socketio bible...?
https://code.tutsplus.com/tutorials/how-to-create-a-resumable-video-uploader-in-nodejs--net-25445

https://stackoverflow.com/questions/59478402/how-do-i-send-image-to-server-via-socket-io

https://code.tutsplus.com/tutorials/how-to-create-a-resumable-video-uploader-in-nodejs--net-25445
](https://www.npmjs.com/package/multer)

-->
