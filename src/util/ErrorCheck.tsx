import { Fragment, useEffect } from "react";
import useTypeModal from "../modal/hooks/useTypeModal";
import { ALERT_TYPE } from "../modal/modals/AlertModal";
import { useAppSelector } from "../redux/config";
import { mainErrorSelector } from "../redux/slice/mainSlice";
import { postingErrorSelector } from "../redux/slice/postingSlice";
import { PATH } from "../Router";

const ErrorCheck = () => {
  const { $openModal } = useTypeModal();
  const postingError = useAppSelector(postingErrorSelector);
  const mainError = useAppSelector(mainErrorSelector);
  const needRedirect = ("" + postingError)?.includes("4041");

  useEffect(() => {
    if (postingError || mainError) {
      console.log("postingerror", postingError);
      console.log("mainError", mainError);

      $openModal({
        type: "alert",
        props: {
          message: "" + postingError || mainError,
          type: ALERT_TYPE.error,
          to: needRedirect ? PATH.main : null,
        },
      });
    }
  }, [postingError, mainError]);

  return <Fragment></Fragment>;
};

export default ErrorCheck;
