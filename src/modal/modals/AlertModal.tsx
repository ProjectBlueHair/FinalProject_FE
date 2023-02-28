import { type } from "os";
import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { alertError, alertInfo, message } from "../../asset/pic";
import Button from "../../component/elem/Button";
import Div from "../../component/elem/Div";
import Flex from "../../component/elem/Flex";
import Img from "../../component/elem/Img";
import { PATH } from "../../Router";
import theme from "../../styles/theme";
import useTypeModal from "../hooks/useTypeModal";
import TypeModalWrapper from "../TypeModalWrapper";
/** type : error / info / confirm*/

export const ALERT_TYPE = {
  error: "error",
  info: "info",
  confirm: "confirm",
};
export const underlineStyle = {
  textDecoration: "underline",
  cursor: "pointer",
  color: theme.color.secondaryText,
  fontWeight: "400",
};

const AlertModal: React.FC<{
  message?: string;
  submessage?: string;
  type?: string;
  to?: string;
}> = (props) => {
  const { $closeModal, $openModal } = useTypeModal();
  const navigate = useNavigate();
  const isError = props.type === "error";
  const needRedirect = ("" + props.message)?.includes("4011");

  return (
    <TypeModalWrapper type="alert">
      <Flex direction="column" justify="flex-start" gap="2rem">
        <Img wd="85%" src={props.type === "error" ? alertError : alertInfo} />
        {props.type === "error" ? (
          <>
            {/* <Div fs="3rem" fw="700">
              ...어?
            </Div> */}
            <Div fc="var(--ec-secondary-text)">{props.message}</Div>
          </>
        ) : props.type === "info" ? (
          <>
            {/* <Div fs="3.2rem" fw="700">
              목표 발견 !
            </Div> */}
            <Div fs="1.8rem" fc="var(--ec-main-color)">
              {props.message}
            </Div>
          </>
        ) : (
          <>
            <Div fs="4rem" fw="700" mg="-2rem 0 0">
              👏
            </Div>
            <Div fs="1.8rem" fc="var(--ec-main-color)">
              {props.message}
            </Div>
            {props.submessage ? (
              <Div fs="1.4rem" fc={theme.color.primaryText}>
                {props.submessage}
              </Div>
            ) : null}
          </>
        )}
        <Flex
          direction={props.type === "error" ? "column" : "column-reverse"}
          gap="2rem"
        >
          <Button
            style={
              !isError
                ? {
                    ...underlineStyle,
                  }
                : {}
            }
            onClick={() => {
              $closeModal();
              $openModal({ type: "feedback", props: {} });
            }}
            btnType={isError ? "basic" : ""}
          >
            피드백 보내기
          </Button>
          <Button
            style={
              isError
                ? {
                    ...underlineStyle,
                  }
                : {}
            }
            btnType={isError ? "" : "basic"}
            onClick={() => {
              $closeModal();

              if (props.to) {
                return navigate(props.to);
              }
              if (needRedirect) {
                return navigate(PATH.main);
              }
            }}
          >
            {isError ? "혼자 간직하기" : "확인"}
          </Button>
        </Flex>
      </Flex>
    </TypeModalWrapper>
  );
};

export default AlertModal;
