import useTypeModal from "../modal/hooks/useTypeModal";
import { getCookies } from "../dataManager/cookie";
import { ALERT_TYPE } from "../modal/modals/AlertModal";
import { PATH } from "../Router";
import { Fragment } from "react";
import { useAppSelector } from "../redux/config";
import { userSelector } from "../redux/slice/userSlice";
import { postingErrorSelector } from "../redux/slice/postingSlice";

const ErrorCheck = () => {
  const { $openModal } = useTypeModal();
  const postingError = useAppSelector(postingErrorSelector);

  if (postingError) {
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

export default ErrorCheck;
