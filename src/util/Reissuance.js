import { instanceAxios } from "../dataManager/apiConfig";
import { getCookies, removeCookies, setCookie } from "../dataManager/cookie";

export const reissuance = ()=>{
    const RefreshToken = getCookies("refreshtoken");
    const AccessToken = getCookies("accesstoken");
  return  instanceAxios
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
      
}