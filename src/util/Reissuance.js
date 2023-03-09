import { apiClient } from "../dataManager/interceptors";
import { getCookies, removeCookies, setCookie } from "../dataManager/cookie";

export const reissuance = () => {
  const RefreshToken = getCookies("refreshtoken");
  const AccessToken = getCookies("accesstoken");
  return apiClient.post(
    "member/reissuance",
    {},
    {
      headers: {
        AccessToken: AccessToken,
        RefreshToken: RefreshToken,
      },
    }
  );
};
//닉네임 변경 시 토큰 재발행 위해서 작성
export const onIssued = (data) => {
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
}