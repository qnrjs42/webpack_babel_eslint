module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  // TODO: 프리티어 설정을 추가하세요.
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error", // 프리티어 규칙 위반 시 에러 출력
  },
};