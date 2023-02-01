import useTypeModal from "../modal/hooks/useTypeModal";
import { getCookies } from "../dataManager/cookie";
import { ALERT_TYPE } from "../modal/modals/AlertModal";
import { PATH } from "../Router";
import { Fragment } from "react";
import { useAppSelector } from "../redux/config";
import { userSelector } from "../redux/slice/userSlice";
import { postingErrorSelector } from "../redux/slice/postingSlice";
import { mainErrorSelector } from "../redux/slice/mainSlice";

const ErrorCheck = () => {
  const { $openModal } = useTypeModal();
  const postingError = useAppSelector(postingErrorSelector);
  const mainError = useAppSelector(mainErrorSelector);
  const needRedirect = (''+postingError)?.includes("4041");

  if (postingError || mainError) {
    $openModal({
      type: "alert",
      props: {
        message: "" + postingError,
        type: ALERT_TYPE.error,
        to: needRedirect ? PATH.main : null,
      },
    });
  }

  return <Fragment></Fragment>;
};

export default ErrorCheck;
