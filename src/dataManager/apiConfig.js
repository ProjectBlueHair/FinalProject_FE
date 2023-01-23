import axios from "axios";
import { getCookies, removeCookies, setCookie } from "./cookie";

export const serverURL = process.env.REACT_APP_SERVER;

export const instanceAxios = axios.create({ baseURL: serverURL });
export const reassuranceAxios = axios.create({ baseURL: serverURL });

instanceAxios.interceptors.request.use((config) => {
  if (config === undefined) return;
  const acc = getCookies("accesstoken");
  const ref = getCookies("refreshtoken");
  config.headers["AccessToken"] = `${acc}`;
  config.headers["RefreshToken"] = `${ref}`;
  config.headers["Access-Control-Allow-Origin"] = "*";
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

instanceAxios.interceptors.response.use(
  (res) => {
    //만료 access:4015
    const { status, data, config } = res;
    console.log("res interceptor status", status);
    console.log("res interceptor data", data);
    console.log("res interceptor res", res);

    if (data.customHttpStatus === 4011) {
      console.log("4011");
      removeCookies("accesstoken", { path: "/" });
      removeCookies("refreshtoken", { path: "/" });
      throw new Error("4011 : 로그인이 필요한 페이지 (기능) 입니다.");
    } else if (data.customHttpStatus === 4013) {
      throw new Error(
        "유효하지 않은 로그인 정보입니다. 재로그인이 필요합니다."
      );
    } else if (data.customHttpStatus === 4003) {
      throw new Error("유효하지 않음 음원입니다. WAV 형식을 이용해 주세요.");
    } else if (data.customHttpStatus === 4041) {
      throw new Error("존재하지 않는 게시물입니다. ");
    } else if (data.customHttpStatus === 4015) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        const RefreshToken = getCookies("refreshtoken");
        const AccessToken = getCookies("accesstoken");
        reassuranceAxios
          .post(
            "member/reissuance",
            {},
            {
              headers: {
                AccessToken: AccessToken,
                RefreshToken: RefreshToken,
              },
            }
          )
          .then((data) => {
            const { accesstoken, refreshtoken } = data.headers;
            console.log("TOKEN ACCESS", accesstoken);
            console.log("TOKEN REFRESH", refreshtoken);
            if (!accesstoken || !refreshtoken) {
              removeCookies("accesstoken", { path: "/" });
              removeCookies("refreshtoken", { path: "/" });
              alert(
                "로그인이 만료되었습니다. 다시 로그인 해주세요" +
                  accesstoken +
                  refreshtoken
              );
              throw new Error("undefined token, removing cookies");
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
            return Promise.reject(err);
          });
      }
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accesstoken, refreshtoken) => {
          config.headers.AccessToken = accesstoken;
          config.headers.RefreshToken = refreshtoken;
          resolve(instanceAxios.request(config));
        });
      });
      return retryOriginalRequest;
    }

    return res;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
