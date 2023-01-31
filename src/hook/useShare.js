import { useEffect, useState } from "react";

const useShare = (src) => {
  // 스크립트 상태 추적
  const [status, setStatus] = useState(src ? "loading" : "idle");

  useEffect(() => {
    // 전달된 스크립트 URL을 구성하는 데 필요한 다른 데이터를 기다리는 경우 잘못된 src 값을 허용
    if (!src) {
      setStatus("idle");
      return;
    }

    // 기존 스크립트 요소 가져오기
    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      // 스크립트 생성
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      //문서 바디에 스크립트 추가
      document.body.appendChild(script);

      // 스크립트 속성에 상태를 저장
      const setAttributeFromEvent = (e) => {
        script.setAttribute(
          "data-status",
          e.type === "load" ? "ready" : "error"
        );
      };

      script.addEventListener("load", setAttributeFromEvent);
      script.addEventListener("error", setAttributeFromEvent);
    } else {
      // 기존 스크립트 상태를 가져와 상태를 설정
      setStatus(script.getAttribute("data-status"));
    }

    // 상태를 업데이트할 스크립트 이벤트 핸들러
    const setStateFromEvent = (e) => {
      setStatus(e.type === "load" ? "ready" : "error");
    };

    // 스크립트 이벤트 리스너 추가
    script.addEventListener("load", setStateFromEvent);
    script.addEventListener("error", setStateFromEvent);

    return () => {
      // 끝날시 이벤트리스너 제거
      if (script) {
        script.removeEventListener("load", setStateFromEvent);
        script.removeEventListener("error", setStateFromEvent);
      }
    };
    // 의존성 배열에 src가 변경될때 마다 리렌더링시킴
  }, [src]);
  return status;
};

export { useShare };
