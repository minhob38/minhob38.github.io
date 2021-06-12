---
title: "번들러"
categories: 
  - programming
date: 2021-06-12 01:00:00 +0900
last_modified_at: 2021-06-12 01:00:00 +0900
---

# 번들러
간단한 애플리케이션이라면 하나의 JavaScript로 개발이 가능하지만, 애플리케이션의 규모가 커지면 여러개의 JavaScript가 필요합니다. 하지만 단순히 JavaScript를 여러개 만들고 HTML에서 가져오면 변수 스코프 등 문제가 발생합니다. 이를 해결하기 위해 AMD, Common.js는 하나의 JavaScript가 독립적인 공간을 가지고 또한 다른 JavaScipt를 가져올 수 있도록 모듈을 만들었습니다. 하지만, 모듈화가 되면 파일도 많아지기 때문에 애플리케이션 용량이 커집니다. 또한 모듈끼리 서로 참조하기 때문에 실행시간이 오래 걸립니다. 이러한 문제를 해결하고자 번들러는 여러 모듈을 하나의 파일로 묶어줍니다. 더나아가 번들 과정 중에 불필요한 코드를 삭제하거나, CSS를 전처리 및 image 압축 등을 해줌으로써 애플리케이션 개발을 편리하게 해줍니다. 이러한 특성과 함께, 번들러는 여러 모듈(JavaScript, HTML, CSS, HBS, Image 등)을 하나로 묶어 하나의 결과물(파일)로 만들어주며 모듈 기반 애플리케이션 개발을 도와주는 도구를 의미합니다. 일반적으로 webpack과 parcel이 사용되며, 아래에서 이들에 대해 설명드리겠습니다.

😺 번들러는 JavaScript 뿐만 아니라 애플리케이션을 구성하는 Static Resource 또한 모듈로 바라봅니다.

## webpack

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5bdb34e1-8baa-40d9-b252-13ef070c61c7/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5bdb34e1-8baa-40d9-b252-13ef070c61c7/Untitled.png)

### webpack 환경 설정

webpack을 사용하기 위해, 다음과 같이 환경을 설정합니다.

[Getting Started | webpack](https://webpack.js.org/guides/getting-started/)

- **webpack 설치하기**

    webpack은 npm에서 설치합니다.

    ```bash
    npm install webpack webpack-cli --save-dev
    ```

- **webpack 실행**

    webpack configuration을 설정하지 않았다면, 기본적으로 'src/index.js'를 entry point로 'dist/main.js'가 output으로 설정되어 있기 때문에 아래와 같이 작업폴더를 구성해야 합니다. ('index.js' 뿐만 아니라 다른 모듈 또한 일반적으로 'src' 아래에 위치시키며, 'dist' 및 'dist/main.js'는 번들러의 출력 파일이기 때문에 만들지 않아도 됩니다.) `npx webpack`을 통해 번들을 하면 dist/main.js가 만들어집니다.

    ```
      webpack-study
      |- package.json
    + |- /src
    +   |- index.js
    +   |- modules.js
    ```

- **webpack configuration 설정 및 실행**

    아래와 같이 webpack configuration을 정의하는 webpack.config.js를 만들고 `npx webpack`을 통해 번들을 하면 output/bundle.js가 만들어집니다.

    ```
      webpack-study
      |- package.json
      |- webpack.config.js
      |- index.js
      |- modules.js
    ```

    ```jsx
    //webpack.config.js
    const path = require('path');
    module.exports = {
      entry: './entry.js',
      output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.js'
      },
      //target: 'node'
    };
    ```

### Entry / Output / Mode / Loader / Plugin

- **Entry**

    Entry Point는 서로 의존관계가 있는 모듈들에서 어디를 기준으로 묶을지를 정의합니다.

    [Entry Points | webpack](https://webpack.js.org/concepts/entry-points/)

    entry는 webpack.config.js에 설정하며, entry에 시작 파일의 상대 경로를 지정해줍니다. 다음은 entry를 설정한 webpack.config.js를 보여줍니다.

    ```jsx
    //webpack.config.js
    module.exports = {
      entry: './entry.js',
    };
    ```

- **Output**

    Output은 번들된 결과를 어떻게 만들지를 정의합니다.

    [Entry Points | webpack](https://webpack.js.org/concepts/entry-points/)

    output은 webpack.config.js에 설정합니다. path에 출력파일의 절대 경로를, filename에 출력파일의 이름을 지정합니다. 다음은 Output를 설정한 webpack.config.js를 보여줍니다.

    ```jsx
    //webpack.config.js
    const path = require('path');
    module.exports = {
      output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.js'
      },
    };
    ```

- **Mode**

    번들 옵션을 지정할 수 있습니다.

    [Mode | webpack](https://webpack.js.org/configuration/mode/)

    Mode는 webpack.config.js에 설정합니다. mode(none, production, development)에 번들 옵션을 지정합니다. 다음은 Mode를 설정한 webpack.config.js를 보여줍니다.

    ```jsx
    //webpack.config.js
    module.exports = {
      mode: 'development'
    }
    ```

- **Loader**

    webpack은 JavasScript 뿐만 아니라, 다른 정적 리소스 (css, img) 또한 모듈로 처리합니다. 이처럼JavaScript가 아닌 다양한 모듈들을 처리하기 위해 Loader가 사용됩니다.

    [Loaders | webpack](https://webpack.js.org/concepts/loaders/)

    Loader는 webpack.config.js에 설정합니다. test에는 loader를 적용할 파일(일반적으로 정규표현식)을 지정하며, use에는 적용할 loader를 정의합니다. 이때 해당조건에 맞는 파일들의 내용이 loader의 인자로 들어가게 됩니다. 추가적으로 Loader는 rule을 읽을때 오른쪽, 아래부터 코드를 읽습니다.

    다음은 Loader를 설정한 webpack.config.js를 보여줍니다. 먼저 `npm install --save-dev css-loader sass-loader style-loader` 를 통해 해당 패키지를 설치해야합니다.

    ```jsx
    //webpack.config.js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: 'stype-loader'
          },
          {
            test: /\.css$/,
            use: ['css-loader', 'sass-loader']
          }
        ]
      }
    }
    ```

    다음 코드는 로더 작동 원리를 보여줍니다.

    ```jsx
    //webpack.config.js
    const path = require('path');
    module.exports = {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: path.resolve(__dirname, './myLoader.js'),
          }
       ]
      }
    };
    ```

    ```jsx

    //myLoader.js
    module.exports = function myLoader(content) { //test를 통과한 파일의 내용
        let result;
        result = content + content;
        console.log("myloader");
        console.log(content);
        return content + content // 파일의 내용이 result로 바뀜
      }
    ```

- **Plugin**

    Plugin은 번들된 파일을 처리합니다.

    [Plugins | webpack](https://webpack.js.org/concepts/plugins/)

    Plugin은 webpack.config.js에 설정합니다. 설정할때 생성자 함수의 인스턴스를 배열에 넣어 받습니다.

    다음은 Loader를 설정한 webpack.config.js를 보여줍니다. 먼저 `npm install --save-dev html-webpack-plugin을` 통해 해당 패키지를 설치해야합니다.

    ```jsx
    //webpack.config.js
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      plugins: [new HtmlWebpackPlugin()]  
    }
    ```

### 더나아가기...

- html과 연동하기
- hash 만들기
- CSS 연동
- Babel 연동

## parcel

[Parcel](https://ko.parceljs.org/)

### parcel 환경 설정

parcel을 사용하기 위해, 다음과 같이 환경을 설정합니다.

[🚀 시작하기](https://ko.parceljs.org/getting_started.html)

- **parcel 설치하기**

    parcel은 npm 또는 yarn에서 설치합니다.

    ```bash
    npm install parcel-bundler --save-dev
    ```

- **parcel 실행**

    전역 설치라면 `parcel entry`를, 로컬 설치라면 `npx parcel entry` 또는 npm script로 parcel을 실행합니다. 일반적으로 html 파일을 entry로 하여 실행합니다. 빌드 후 dist 폴더에 만들어진 번들파일이 만들어집니다.

    😺 http//localhost:1234/에 연결하면, 실행 결과를 볼 수 있으며, port를 바꾸고 싶다면 `npx parcel index.html p -port number`를 입력합니다. 

    ```bash
    npx parcel index.html
    ```

- **환경 설정**

    일반적으로 폴더 구조는 다음과 같이 구성합니다.

    ```
      parcle-app
      |- package.json
      |- index.html
      |- app
        |- index.js
        |- *.js
      |- assets
        |- styles
          |- *.css
        |- images
          |- *.jpg
    ```

## 참조문헌 및 읽을거리

[프론트엔드 개발환경의 이해: 웹팩(기본)](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)

[Loader | 웹팩 핸드북](https://joshua1988.github.io/webpack-guide/concepts/loader.html#css-loader-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
