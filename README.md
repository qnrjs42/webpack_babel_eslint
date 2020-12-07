# 웹팩을 사용하는 이유

## 문제점 

```js
// src/math.js
function sum(a, b) {
  return a + b;
}

// src/app.js
console.log(sum(1, 2));
```

```html
<body>
  <script src="src/math.js"></script>
  <script src="src/app.js"></script>
</body>
```

```
//결과
3

위의 코드의 문제점: 전역 스코프가 오염.
즉, window 객체에 등록되어 있어 sum()함수에 다른 값을 할당할 수가 있다.

```

## 해결책 IIFE(즉시 실행 함수 표현) 방식의 모듈

```js
// src/math.js
var math = math || {};

(function () {
  function sum(a, b) {
    return a + b;
  }

  math.sum = sum;
})();

// src/app.js
console.log(math.sum(1, 2));
```

```
// 결과
3
```

<br/>

---

## 다양한 모듈 스펙

```
commonJS: 자바스크립트를 사용하는 모든 환경에서 모듈을 사용하는 것
exports 키워드로 모듈을 만들고 require()함수로 불러 들이는 방식

AMD(Asynchronous Module Definition): 비동기로 로딩되는 환경에서 모듈을 사용하는 것, 주로 브라우저 환경

UMD(Universal Module Definition)는 AMD기반으로 CommonJS 방식까지 지원하는 통합형태

각 커뮤니티에서 각자 스펙을 제안하다 ES5에서 표준 모듈 시스템을 내놓음
지금은 바벨과 웹팩을 이용해 모듈 시스템을 사용
```

```js
// src/math.js
export function sum(a, b) { return a + b; }

// src/app.js
import * as math from './math.js';
math.sum(1, 2);
```

<br/>

---

## webpack 설치

```
npm i -D webpack webpack-cli
```

## webpack 실행

```
- powershell에서 안 되고,
- /(슬래시) \(역슬래시) 구분해야 함

node_modules\.bin\webpack --mode development --entry ./src/app.js --output-path dist/main.js 

node_modules/.bin/webpack --mode development --entry ./src/app.js --output-path dist/main.js 
```

<br/>

```js
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development', // 개발모드
  entry: {
    main: './src/app.js' // 주 파일
  },
  output: {
    path: path.resolve('./dist'), // dist 폴더로 선택
    filename: '[name].js' // 번들링될 파일 명 | entry에서 설정된 키 값, 즉 main으로 설정
  }
}

// mode: 'development'
// entry: 어플리케이션 진입점인 src/app.js
// output에 설정한 [name]은 entry에 추가한 main이 문자열로 들어옴
```

<br/>

---

## webpack 설정 순서

### 1. npm i webpack webpack-cli


### 2. package.json

```json
"scripts": {
 "build": "webpack"
}
```

### 3. webpack.config.js

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  }
}
```

### 4. load script
```html
<body>
  ...
  <script src="dist/main.js"></script>
</body>
```

### 5. npm run build

<br/>

---

## 로더

```
웹팩은 모든 파일을 모듈로 바라봄.
자바스크립트로 만든 모듈,  스타일시트, 이미지, 폰트까지 전부 모듈로 봐서 import 구문을 사용하면 자바스크립트 코드 안으로 가져올 수 있다.

로더는 TS같은 다른 언어를 자바스크립트 문법으로 변환하거나 이미지를 data URL 형식의 문자열로 변환한다.
뿐만 아니라 CSS 파일을 자바스크립트에서 직접 로딩할 수 있도록 해준다.
```

```js
// webpack.config.js

output: {
  path: path.resolve("./dist"),
  filename: "[name].js",
},
module: {
  rules: [
    {
      test: /\.js$/,
      use: [path.resolve("./my-webpack-loader.js")],
    },
  ],
},

// test: 모든 js 파일들을 거쳐서
// use: 커스텀한 로더 함수 실행
```