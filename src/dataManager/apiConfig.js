import axios from "axios";
import { getCookies, setCookie } from "./cookie";

const serverURL = process.env.REACT_APP_SERVER;

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

export const instanceAxios = axios.create({ baseURL: serverURL });

instanceAxios.interceptors.request.use((config) => {
  if (config === undefined) return;
  const acc = getCookies("accesstoken");
  const ref = getCookies("refreshtoken");
  config.headers["AccessToken"] = `${acc}`;
  config.headers["RefreshToken"] = `${ref}`;
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
});

// instanceAxios.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
//     if (status === 401) {
//       if (error.response.data.message === "만료된 Access Token입니다.") {
//         const orginalRequest = config;
//         const RefreshToken = getCookies("refreshtoken");
//         const AccessToken = getCookies("accesstoken");
//         const { data } = await instanceAxios.post("member/reissuance", {
//           AccessToken: AccessToken,
//           RefreshToken: RefreshToken,
//         });
//         // console.log(data);
//         const originalRequest = config;


//         const { headers } = await instanceAxios.post("member/reissuance");
//         const { accesstoken: newAccessToken, refreshtoken: newRefreshToken } =
//           headers;

       // setCookie("accesstoken", newAccessToken, {
       //   path: "/",
     //   });
       // setCookie("refreshtoken", newRefreshToken, {
      //    path: "/",
      //  });
        
      //  isTokenRefreshing = false;


//         setCookie("accesstoken", newAccessToken, {
//           path: "/",
//         });
//         setCookie("refreshtoken", newRefreshToken, {
//           path: "/",
//         });

//         originalRequest.headers.AccessToken = `${newAccessToken}`;
//         originalRequest.headers.RefreshToken = `${newRefreshToken}`;
//         return instanceAxios(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// instanceAxios.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
//     const originalRequest = config;
//     if (status === 401) {
//       if (!isTokenRefreshing) {
//         isTokenRefreshing = true;
//         const { headers } = await instanceAxios.post("member/reissuance");
//         const { accesstoken: newAccessToken, refreshtoken: newRefreshToken } =
//           headers;

//         setCookie("accesstoken", newAccessToken, {
//           path: "/",
//         });
//         setCookie("refreshtoken", newRefreshToken, {
//           path: "/",
//         });
//         isTokenRefreshing = false;

//         originalRequest.headers.RefreshToken = `${newRefreshToken}`;

//         onTokenRefreshed(newAccessToken);
//       }
//       const retryOriginalRequest = new Promise((resolve) => {
//         addRefreshSubscriber((accessToken) => {
//           originalRequest.headers.AccessToken = `${accessToken}`;
//           resolve(instanceAxios(originalRequest));
//         });
//       });
//       return retryOriginalRequest;
//     }
//     return Promise.reject(error);
//   }
// );
