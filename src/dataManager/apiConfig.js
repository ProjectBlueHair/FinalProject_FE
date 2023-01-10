// import axios from "axios";

// const serverUrl = process.env.REACT_APP_API;

// export const ERROR_CODES = [];

// const client = axios.create({ baseURL: serverUrl });

// client.interceptors.request.use((config) => {
//   if (config === undefined) return;
//   const token = localStorage.getItem("jwt");
//   config.headers["Authorization"] = token;
//   config.headers["Access-Control-Allow-Origin"] = "*";
//   return config;
// });
// client.interceptors.response.use(
//   (response) => {
//     console.log("AXIOS RESPONSE TERCEPTOR RESPONSE : ", response);
//     response.headers["authorization"] &&
//       localStorage.setItem("jwt", response.headers["authorization"]);
//     return response.data;
//   },
//   (error) => {
//     const status = error.response.status;

//     // if(status===500) {

//     //     alert('서버 에러')
//     //    return window.location.href('/')
//     // }

//     return Promise.reject(error);
//   }
// );
// export default client;

import axios from "axios";
import { getCookies } from "./cookie";

const serverURL = process.env.REACT_APP_SERVER;

export const instanceAxios = axios.create({ baseURL: serverURL });

instanceAxios.interceptors.request.use((config) => {
  if (config === undefined) return;
  const acc = getCookies("accesstoken");
  const ref = getCookies("refreshtoken");
  config.headers["Authorization"] = `${acc},${ref}`;
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
});
