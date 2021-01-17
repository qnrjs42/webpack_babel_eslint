// import * as math from './math.js';

// console.log(math.sum(1, 2));

import axios from "axios";
import "./app.css";
// import nyancat from "./nyancat.jpg";

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get("api/users");
  console.log(res);

  document.body.innerHTML = (res.data || [])
    .map((user) => {
      return `<div>${user.id}: ${user.name}</div>`;
    })
    .join("");
});

// console.log(process.env.NODE_ENV);
// console.log(TWO); // '1+1'
// console.log(api.domain);
