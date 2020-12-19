# 프리티어 [Prettier]
- 코드를 보기 좋게 만듦.
- ESLint의 포매팅과 겹치는 부분도 있지만 프리티어는 일관적인 스타일로 코드를 다듬는다.
- 코드 품질과 관련된 기능은 하지 않는 것이 ESLint와 다른 점이다.

```
npm i prettier
```

```js
// app.js
console.log()
```

```
npx prettier app.js
-> console.log();

npx prettier app.js --write
app.js 파일 자체가 수정된다.
```

```
foo(testtesttesttesttesttest123(),testtesttesttesttesttest1234(),testtesttesttesttesttest12345(),testtesttesttesttesttest123456());

npx prettier app.js --write
foo(
  testtesttesttesttesttest123(),
  testtesttesttesttesttest1234(),
  testtesttesttesttesttest12345(),
  testtesttesttesttesttest123456()
);
```

### ESLint + Prettier

```js
// app.js
var foo = "";

console.log();;;;;;;
```

```
npx eslint app.js --fix
error  'foo' is assigned a value but never used  no-unused-vars

npx prettier app.js --write
console.log(); 으로 변경
```

### eslint-plugin-prettier
- 프리티어 규칙을 ESLint 규칙으로 추가하는 플로그인

```
npm i eslint-plugin-prettier
```

```js
// app.js
var foo = '';

console.log();;;;;;;
```

```js
// .eslintrc.js
{
  // extends: ["eslint:recommended", "eslint-config-prettier"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: [
    "prettier"
  ],
  rules: {
    "prettier/prettier" : "error" // 프리티어 규칙 위반 시 에러 출력
  }
}
```

```
npx eslint app.js --fix

1:5  error  'foo' is assigned a value but never used  no-unused-vars
```

```js
// app.js
var foo = "";

console.log();
```

<br/>

---

# 린트 [Lint]
- 코드 오류나 버그, 스타일 따위를 점검하는 것을 린트 혹은 린터라고 한다.

```
npm i eslint
```

## 예시

```js
console.log()
(function() {})()
```
```js
// 실행결과
TypeError: console.log(...) is not a function

// 이유
console.log();
(function() {})();
가 아니라

console.log()(function() {})() 으로 인식하게 된다.
```

<br/>

```js
// app.js
console.log()
(function() {})()
```

```js
// eslintrc.js
module.exports = {
  
}
```

```
npx eslint app.js
-> 아무런 반응 없음
```

<br/>

## 규칙 (Rules)

### no-unexpected-multiline

```js
// eslintrc.js
module.exports = {
  rules: {
    "no-unexpected-multiline": "error"
  }
}
```

```
npx eslint app.js
-> 
2:1  error  Unexpected newline between function and ( of function call  no-unexpected-multiline

✖ 1 problem (1 error, 0 warnings)
```

### no-extra-semi

```js
// app.js
console.log();;;
(function () {})();
```

```js
// eslintrc.js
module.exports = {
  rules: {
    "no-unexpected-multiline": "error"
  }
}
```

```
npx eslint app.js
-> 
 1:15  error  Unnecessary semicolon  no-extra-semi
  1:16  error  Unnecessary semicolon  no-extra-semi

✖ 2 problems (2 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.
```

```
npx eslint app.js --fix
```

```js
// app.js
// --fix로 인해 자동으로 불필요한 세미콜론이 제거되었다.
console.log();
(function () {})();
```

<br/>

### Extensible Config
- 여러 규칙들을 미리 정해 놓은 것이 eslint:recommened 설정.
- eslint 사이트 규칙 목록 중에 왼쪽에 체크 표시되어 있는 것이 이 설정에서 활성화 되어 있는 규칙이다.

```js
// eslintrc.js
module.exports = {
  extneds: [
    "eslint:recommended", // 미리 설정된 규칙 세트
  ]
}
```

```
npx eslint app.js --fix
```

<br/>

## 초기화 

```
npx eslint --init

// 코드 포맷팅과 품질까지 체크
? How would you like to use ESLint? ... 
  To check syntax only
> To check syntax and find problems
  To check syntax, find problems, and enforce code style

// 지금 사용 중인 모듈
√ How would you like to use ESLint? · problems    
? What type of modules does your project use? ... 
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

// 지금 사용 중인 프레임워크
√ How would you like to use ESLint? · problems    
√ What type of modules does your project use? · esm
? Which framework does your project use? ... 
  React
  Vue.js
> None of these

// 타입스크립트 유무
√ How would you like to use ESLint? · problems    
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
? Does your project use TypeScript? » No / Yes

// 현재 코드가 브라우저에서 돌아가나, 노드에서 돌아가나
√ How would you like to use ESLint? · problems    
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node

// 설정파일 선택
√ How would you like to use ESLint? · problems    
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
? What format do you want your config file to be in? ... 
> JavaScript
  YAML
  JSON

// eslint 최신버전 설치 유무
eslint@latest
? Would you like to install them now with npm? » No / Yes
```

```js
// .eslintrc.js
// npx eslint --init으로 만들어진 eslint 설정
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
    }
};
```

```json
// package.json

"scripts": {
  "build": "webpack --progress",
  "lint": "eslint src --fix"
},

// src 폴더 전부 eslint로 검사하고 자동으로 고칠 수 있는건 고침
```

```
npm run lint

10:7  error  'foo' is assigned a value but never used  no-unused-vars
-> 사용하지 않는 변수 'foo'

사용하지 않는 변수는 지우는 것이 좋다.
```

<br/>

---

# 바벨 [Babel]
- 크로스브라우징의 혼란을 해결해 줄 수 있는 것이 바벨.
- ES6+로 작성한 코드를 모든 브라우저에서 동작하도록 호환성을 지켜줌
- 바벨로 변환하는 것을 '트랜스파일'이라고 한다.
- 트랜스파일은 추상화 수준을 유지한 상태로 코드를 변환

```
npm i @babel/core @babel/cli
```

```
// 실행방법
npx babel app.js

// 실행결과
const alert = msg => window.alert(msg);
```

바벨은 3 단계로 빌드를 진행
1. 파싱(Parsing)
2. 변환(Transforming)
3. 출력(Printing)

<br/>

- 코드를 읽고 추상 구문 트리(AST)로 변환하는 단계: 파싱
- 추상 구문 트리를 변경하는 것: 변환
- 변경된 결과물: 출력

<br/>

## Identifier

```js
// my-babel-plugin.js

module.exports = function mybabelPlugin() {
  return {
    // 커스텀 플러그인 만들 때 'visitor'라는 객체를 반환 해줘야 한다
    visitor: {
      Identifier(path) {
        const name = path.node.name;

        // 바벨이 만든 AST 노드를 출력
        console.log('Identifier() name:', name);

        // 변환작업: 코드 문자열을 역순으로 변환
        path.node.name = name
        .split("") // 문자열을 하나씩 쪼갬
        .reverse() // 문자열을 뒤집음
        .join(""); // 문자열을 합침
      }
    }
  }
}
```

```
// 실행방법
npx babel app.js --plugins './my-babel-plugin.js'

// 실행결과
Identifier() name: alert
Identifier() name: msg
Identifier() name: window
Identifier() name: alert
Identifier() name: msg
const trela = gsm => wodniw.trela(gsm);
```

<br/>

## VariableDeclaration

```js
// my-babel-plugin.js

module.exports = function mybabelPlugin() {
  return {
    // 커스텀 플러그인 만들 때 'visitor'라는 객체를 반환 해줘야 한다
    visitor: {
      VariableDeclaration(path) {
        console.log("VariableDeclaration() kind", path.node.kind);

        // const => var 변환
        if(path.node.kind === 'const') {
          path.node.kind = 'var'
        }
      }
    }
  }
}
```

```
// 실행방법
npx babel app.js --plugins './my-babel-plugin.js'

// 실행결과
VariableDeclaration() kind const
var alert = msg => window.alert(msg);
```

<br/>

## @babel/plugin-transform-block-scoping

<br/>

이러한 결과를 만드는 것이 'block-scoping' 플러그인.<br/>
const, let 처럼 블록 스코핑을 따르는 예약어를 함수 스코핑을 사용하는 var로 변경한다.

```
npm i @babel/plugin-transform-block-scoping
```

```js
// example

// In
{
  let a = 3;
}
let a = 3

// Out
{
  var _a = 3;
}
var a = 3;
```

```
// 실행방법
npx babel app.js --plugins @babel/plugin-transform-block-scoping

// 실행결과
var alert = msg => window.alert(msg);
```

<br/>

## @babel/plugin-transform-arrow-functions

```
npm i @babel/plugin-transform-arrow-functions
```

```js
// example

// In
var a = () => {};
var a = (b) => b;

// Out
var a = function() {};
var a = function(b) {
  return b;
}
```

```
// 실행방법
npx babel app.js --plugins @babel/plugin-transform-block-scoping  --plugins @babel/plugin-transform-arrow-functions

// 실행결과
var alert = function (msg) {
  return window.alert(msg);
};
```

<br/>

## @babel/plugin-transform-strict-mode
- 'use strict' 구문

```
npm i @babel/plugin-transform-strict-mode
```

```
// 실행방법
npx babel app.js --plugins @babel/plugin-transform-block-scoping  --plugins @babel/plugin-transform-arrow-functions --plugins @babel/plugin-transform-strict-mode

// 실행결과
"use strict";

var alert = function (msg) {
  return window.alert(msg); 
};
```


## babel.config.js

```js
// babel.config.js

module.exports = {
  plugins: [
    "@babel/plugin-transform-block-scoping",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-strict-mode",
  ],
};
```

```
// 실행방법
npx babel app.js

// 실행결과
"use strict";

var alert = function (msg) {
  return window.alert(msg); 
};
```

## 프리셋
- 목적에 맞게 여러가지 플로그인을 세트로 모아놓는 것을 '프리셋'이라 한다.

```js
// my-babel-preset.js

module.exports = function myBabelPreset() {
  return {
    plugins: [
      "@babel/plugin-transform-block-scoping",
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-strict-mode",
    ],
  };
}
```

```js
// babel.config.js

module.exports = {
  presets: [
    './my-babel-preset.js'
  ]
};
```

```
// 실행방법
npx babel app.js

// 실행결과
"use strict";

var alert = function (msg) {
  return window.alert(msg); 
};
```

<br/>

## 프리셋 사용하기
- preset-env
- preset-flow
- preset-react
- preset-typescript

preset-env는 연도별로 프리셋을 제공했지만 env 하나로 합쳐짐

```
npm i @babel/preset-env
```

```js
// babel.config.js

module.exports = {
  presets: [
    '@babel/preset-env'
  ]
};
```

```
// 실행방법
npx babel app.js

// 실행결과
"use strict";

var alert = function (msg) {
  return window.alert(msg); 
};
```

### 타겟 브라우저
- target 옵션에 브라우저 버전명만 지정하면 env 프리셋은 이에 맞는 플러그인을 찾아 최적의 코드를 출력

```js
// babel.config.js

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79", // 크롬 79까지 지원하는 코드를 만듦
        },
      },
    ],
  ],
};
```

```
// 실행방법
npx babel app.js

// 실행결과
"use strict";

const alert = msg => window.alert(msg);
```

<br/>

```js
// babel.config.js

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79", // 크롬 79까지 지원하는 코드를 만듦
          ie: '11'
        },
      },
    ],
  ],
};
```

```
// 실행방법
npx babel app.js

// 실행결과
"use strict";

var alert = function alert(msg) {
  return window.alert(msg);
};
```

<br/>

### primise()

```js
// app.js
new Promise();
```

```js
// babel.config.js

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79", // 크롬 79까지 지원하는 코드를 만듦
          ie: '11'
        },
      },
    ],
  ],
};
```

```
// 실행방법
npx babel app.js

// 실행결과
"use strict";

new Promise();
```

promise()는 크롬에선 지원하나 IE는 지원하지 않는다.

primise()는 ES5로 대체할 수 없으나 구현은 할 수 있다.


```js
// babel.config.js

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79", // 크롬 79까지 지원하는 코드를 만듦
          ie: '11'
        },
        useBuiltIns: 'usage', // 'entry', false
        corejs: {
          version: 2, // 3
        }
      },
    ],
  ],
};
```

```
// 실행방법
npx babel app.js

// 실행결과
"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

new Promise();
```

<br/>

## 웹팩 통합

```
npm i babel-loader
npm i core-js@2
```

```js
// webpack.config.js

entry: {
  // main: "./src/app.js",
  main: "./app.js",
},

rules: [
  {
    test: /\.js$/,
    loader: "babel-loader",
    exclude: /node_modules/, // 바벨이 처리하지 않음
  },
],
```

```
npm run build
```

<br/>

---

# 웹팩 [Webpack]

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

<br/>

---

### 자주 사용하는 로더

- npm i css-loader style-loader file-loader url-loader

```js
// app.js

import './app.css';
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `
})
```

```js
// webpack.config.js
module: {
  rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        publicPath: './dist/'
        name: '[name].[ext]?[hash]',
        limit: 20000,
      }
    }
  ],
},

test: /\.css$/, // 모든 css 파일
use: ['style-loader','css-loader']
// 두 가지 로더를 사용해서 css를 불러서 사용할 수 있음
// 순서는 css-loader -> style-loader순. 뒤에서부터 시작

test: /\.(png|jpg|gif|svg)$/, // 해당 이미지 파일들
loader: 'url-loader', // use 대신
options: {
  publicPath: './dist/', // file-loader가 처리할 경로
  name: '[name].[ext]?[hash]', // 파일명.확장자?해쉬무력화
  limit: 20000, // url-loader가 test의 파일을 처리할 때 20kb 미만인 파일은 url-loader로 base64로 변환
  // 20kb 이상인 경우 file-loader가 실행
}
```

---

## 플러그인

```
로더가 파일 단위로 처리하는 반면 플러그인은 번들된 결과물을 처리.
번들된 자바스크립트를 난독화 한다거나 특정 텍스트를 추출하는 용도로 사용.
```

<br/>

### BannerPlugin
- 결과물에 빌드 정보나 커밋 버전같은 걸 추가할 수 있다.


```js
// webpack.config.js

const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.BannerPlugin({
      banner: '이것은 배너 입니다.',
    })
  ]
}

또는
배너 정보가 많다면 별도 파일로 분리
new webpack.BannerPlugin({
  banner: () => `빌드 날짜: ${new Date().toLocalsString()}`
})
```

<br/>

### DefinePlugin
- 개발환경, 운영환경나눠서 운영 환경에 따라 API 서버 주소가 다를 수 있다.
- 배포할 때마다 코드를 수정하면 에러 발생이 쉬움.

```js
// webpack.config.js

const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      TWO: JSON.stringify("1+1"),
      'api.domain': JSON.stringify('http://dev/api/domain.com')
    }),
  ]
}
```

```js
// ./src/app.js

console.log(process.env.NODE_ENV);
console.log(TWO); // '1+1'
console.log(api.domain); // http://dev/api/domain.com
```

<br/>

### HtmlTemplatePlugin
- HTML 후처리하는데 사용. 빌드 타임의 값을 넣거나 코드를 압축

```
npm i html-webpack-plugin
```

```html
<!-- src/index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <title>타이틀<%= env %></title>
</head>
<body>
  <!-- 로딩 스크립트 제거 -->
  <!-- <script src="dist/main.js"></script> -->
</body>
</html>
```

```js
// webpack.config.js

new HtmlWebpackPlugin({
  template: './src/index.html',
  templateParameters: {
    env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
  },
  minify: process.env.NODE_ENV === 'production' ?  { // 배포모드일 때만 하는게 효과적
    collapseWhitespace: true, // 빈칸 제거
    removeComments: true // 주석 제거
  } : false
})
```

<br/>

### CleanWebpackPlugin
- 빌드 이전 결과물을 제거하는 플러그인.
- 즉, 빌드할 때마다 'dist'폴더를 지웠다가 새로 생성한다.
- 빌드 결과물은 아웃풋 경로에 모이는데 과거 파일이 남아 있을 수 있다.
- 이전 빌드내용이 덮여 씌여지면 상관없지만 그렇지 않으면 아웃풋 폴더에 여전히 남아 있을 수 있다.

```
npm i clean-webpack-plugin
```
```js
// webpack.config.js
const { CleanWebpackPlugin }  = require("clean-webpack-plugin");

plugins: [
  new CleanWebpackPlugin({})
],
```

<br/>

### MiniCssExtractPlugin
- css를 별도 파일로 뽑아내는 플러그인.
- css가 점점 많아지면 하나의 자바스크립트 결과물로 만드는 것이 부담일 수 있다.
- 번들 결과에서 css 코드만 뽑아서 별도의 css 파일로 만들어 역할에 따라 파일을 분리하는 것이 좋다.
- 브라우저에서 큰 파일 하나를 내려받는 것 보다, 여러 개 작은 파일을 동시에 다운로드하는 것이 더 빠르다.
- 개발환경에서는 css를 하나의 모듈로 처리해도 상관없지만 프로덕션 환경에서는 분리하는 것이 효과적이다.


```
npm i mini-css-extract-plugin
```
```js
// webpack.config.js
const { CleanWebpackPlugin }  = require("mini-css-extract-plugin");

use: [
  {
    loader:
      process.env.NODE_ENV === "production"
        ? MiniCssExtractPlugin.loader
        : "style-loader",
    options: {
      publicPath: ''
    }
  },
  {
    loader: "css-loader",
  },
],

plugins: [
  ...(process.env.NODE_ENV === 'production' ?
   [new MiniCssExtractPlugin({
    filename: '[name].css'
  })] : [])
],
```