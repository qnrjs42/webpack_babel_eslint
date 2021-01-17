/* eslint-disable no-undef */
// import * as math from './math.js';

// console.log(math.sum(1, 2));

// import nyancat from "./nyancat.jpg";
import "./app.css";
import form from "./form";
import result from "./result";

let resultEl;
let formEl;

document.addEventListener("DOMContentLoaded", async () => {
  formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  resultEl = document.createElement("div");
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
  // const res = await axios.get("api/users");
  // console.log(res);
  // document.body.innerHTML = (res.data || [])
  //   .map((user) => {
  //     return `<div>${user.id}: ${user.name}</div>`;
  //   })
  //   .join("");
});

if (module.hot) {
  console.log("핫 모듈 켜짐");

  module.hot.accept("./result", async () => {
    console.log("result 모듈 변경됨");
    resultEl.innerHTML = await result.render();
  });

  module.hot.accept("./form", async () => {
    console.log("form 모듈 변경됨");
    formEl.innerHTML = form.render();
  });
}

// console.log(process.env.NODE_ENV);
// console.log(TWO); // '1+1'
// console.log(api.domain);
