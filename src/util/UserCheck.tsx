import { Fragment } from "react";
import { getCookies } from "../dataManager/cookie";
import useTypeModal from "../modal/hooks/useTypeModal";
import { ALERT_TYPE } from "../modal/modals/AlertModal";
import { PATH } from "../Router";

const UserCheck = () => {
  const { $openModal } = useTypeModal();

  if (!getCookies("accesstoken")) {
    $openModal({
      type: "alert",
      props: {
        message: "로그인이 필요한 페이지 (기능) 입니다.",
        type: ALERT_TYPE.info,
        to: PATH.main,
      },
    });
  }

  return <Fragment></Fragment>;
};

export default UserCheck;
