import useTypeModal from "../modal/hooks/useTypeModal";
import { getCookies } from "../dataManager/cookie";
import { ALERT_TYPE } from "../modal/modals/AlertModal";
import { PATH } from "../Router";
import { Fragment } from "react";
import { useAppSelector } from "../redux/config";
import { userSelector } from "../redux/slice/userSlice";

const UserCheck = () => {
  const { $openModal } = useTypeModal();
  const user = useAppSelector(userSelector);

  if (!getCookies("accesstoken") || !user.nickname) {
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
