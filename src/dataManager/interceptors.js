import axios from "axios";
import { reissuance } from "../util/Reissuance";
import { getCookies, removeCookies, setCookie } from "./cookie";
import { URL_SERVER, URL_SEARCH, KEY_SEARCH } from "../constants/ApiConstants";
import { Response } from "./ResponseModel.types";
export const apiClient = axios.create({ baseURL: URL_SERVER });
export const searchClient = axios.create({ baseURL: URL_SEARCH });

searchClient.interceptors.request.use((config) => {
  if (config === undefined) return;
  config.headers["Authorization"] = KEY_SEARCH;
  return config;
});

apiClient.interceptors.request.use((config) => {
  if (config === undefined) return;
  const acc = getCookies("accesstoken");
  config.headers["AccessToken"] = `${acc}`;
  return config;
});

let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accesstoken, refreshtoken) => {
  refreshSubscribers.map((callback) => callback(accesstoken, refreshtoken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

apiClient.interceptors.response.use(
  (res) => {
    const { data, config } = res;
    switch (data.customHttpStatus) {
      case 4003:
        throw new Error(
          "채널 수(2채널) 혹은 비트 수(8비트 또는 16비트)가 맞지 않아 처리할 수 없습니다"
        );
      case 4011: //토큰 없음 : undefined인 case 존재
        removeCookies("accesstoken", { path: "/" });
        removeCookies("refreshtoken", { path: "/" });
        throw new Error("4011 : 로그인이 필요한 페이지 (기능) 입니다.");
      case 4013:
        throw new Error(
          "유효하지 않은 로그인 정보입니다. 재로그인이 필요합니다."
        );
      case 4041:
        throw new Error("4041 : 존재하지 않는 게시물입니다. ");
      case 4015:
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;
          reissuance()
            .then((data) => {
              const { accesstoken, refreshtoken } = data.headers;
              if (!accesstoken || !refreshtoken) {
                removeCookies("accesstoken", { path: "/" });
                removeCookies("refreshtoken", { path: "/" });
                throw new Error(
                  "로그인이 만료되었습니다. 다시 로그인 해주세요"
                );
              }
              setCookie("accesstoken", accesstoken, {
                path: "/",
              });
              setCookie("refreshtoken", refreshtoken, {
                path: "/",
              });
              isTokenRefreshing = false;

              onTokenRefreshed(accesstoken, refreshtoken);
            })
            .catch((err) => {
              console.log("reassuarance err", err);
              throw new Error("로그인이 만료되었습니다. 다시 로그인 해주세요");
            });
        }
        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((accesstoken, refreshtoken) => {
            config.headers.AccessToken = accesstoken;
            config.headers.RefreshToken = refreshtoken;
            resolve(apiClient.request(config));
          });
        });
        return retryOriginalRequest;
      default:
        return res;
    }
  },
  async (error) => {
    console.log("AXIOS INTERCEPTOR ERROR :", error);
    return Promise.reject(error);
  }
);
