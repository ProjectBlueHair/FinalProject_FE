import React from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../dataManager/cookie";
import { kakao } from "../../dataManager/social";

const KakaoLoginHandler = () => {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");

  kakao(code).then((res) => {
    if (res.data.customHttpStatus === 2000) {
      setCookie("accesstoken", res.headers.accesstoken, {
        path: "/",
        maxAge: 1800,
      });
      setCookie("refreshtoken", res.headers.refreshtoken, {
        path: "/",
        maxAge: 1800,
      });
      navigate("/");
    } else {
      alert("로그인 실패");
    }
  });
};

export default KakaoLoginHandler;
