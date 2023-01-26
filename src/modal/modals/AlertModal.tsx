import React from "react";
import { alertError, alertInfo, message } from "../../asset/pic";
import Div from "../../component/elem/Div";
import Flex from "../../component/elem/Flex";
import Img from "../../component/elem/Img";
import Button from "../../component/elem/Button";
import TypeModalWrapper from "../TypeModalWrapper";
import useTypeModal from "../hooks/useTypeModal";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../Router";
/** type : error / info / confirm*/


export const ALERT_TYPE = { 
  error : 'error',
  info : 'info',
  confirm : 'confirm'
}


const AlertModal: React.FC<{ message?: string; type?: string; to?: string }> = (
  props
) => {
  const errorMessage = "다음과 같은 에러가 발생했습니다 ㅠ.ㅠ";
  const { $closeModal } = useTypeModal();
  const navigate = useNavigate();

  return (
    <TypeModalWrapper type="alert">
      <Flex direction="column" justify="flex-start">
        <Img wd="95%" src={props.type === "error" ? alertError : alertInfo} />

        {props.type === "error" ? (
          <>
            <Div fs="3.2rem" fw="700">
              ...어?
            </Div>
            <Div mg="1rem 0">{errorMessage}</Div>
            <Div mg="1rem 0" fc="var(--ec-secondary-text)">
              {props.message}
            </Div>
          </>
        ) : props.type === "info" ? (
          <>
            <Div fs="3.2rem" fw="700">
              목표 발견 !
            </Div>
            <Div fs="1.8rem" mg="2rem 0" fc="var(--ec-main-color)">
              {props.message}
            </Div>
          </>
        ) : (
          <>
            <Div fs="4rem" fw="700" mg="-2rem 0 0">
              👏
            </Div>

            <Div fs="1.8rem" mg="2.2rem 0" fc="var(--ec-main-color)">
              {props.message}
            </Div>
          </>
        )}

        <Button
          onClick={() => {
            if (props.to) {
              navigate(props.to);
            }
            $closeModal();
          }}
          mg="2rem 0"
          btnType="basic"
        >
          확인
        </Button>
      </Flex>
    </TypeModalWrapper>
  );
};

export default AlertModal;
