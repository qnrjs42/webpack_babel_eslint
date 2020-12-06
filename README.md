## 웹팩을 사용하는 이유

### 문제점 

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

### 해결책 IIFE(즉시 실행 함수 표현) 방식의 모듈

```js
// src/math.js
var math = math || {};

(function() {
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