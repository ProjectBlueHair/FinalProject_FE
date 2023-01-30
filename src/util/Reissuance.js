import { instanceAxios } from "../dataManager/apiConfig";
import { getCookies, removeCookies, setCookie } from "../dataManager/cookie";

export const reissuance = ()=>{
    const RefreshToken = getCookies("refreshtoken");
    const AccessToken = getCookies("accesstoken");
    instanceAxios
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
        return true
      }).catch(e=>{
        throw new Error('재발행 실패')
      })
}