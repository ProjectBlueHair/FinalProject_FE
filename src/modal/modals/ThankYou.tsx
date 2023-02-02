import React from "react";
import MainLogo from "../../asset/icon/MainLogo";
import { mainLogo } from "../../asset/pic";
import Button from "../../component/elem/Button";
import Div from "../../component/elem/Div";
import Flex from "../../component/elem/Flex";
import Img from "../../component/elem/Img";
import Span from "../../component/elem/Span";
import TextArea from "../../component/elem/Textarea";
import { formStyle } from "../../component/posting/PostingForm";
import useTextArea from "../../hook/useTextArea";
import theme from "../../styles/theme";
import useTypeModal from "../hooks/useTypeModal";
import TypeModalWrapper from "../TypeModalWrapper";
import { underlineStyle } from "./AlertModal";
const ThankYou = () => {
  const { $openModal, $closeModal } = useTypeModal();
  return (
    <TypeModalWrapper type={"thank"}>
      <Flex direction="column" hg="100%" pd="5rem 2rem" gap="2rem">
        <Flex gap="1rem">
          <MainLogo />
          <Span fs="2rem" fc={theme.color.main}>
            감사합니다.
          </Span>
        </Flex>
        <Button
          style={{...underlineStyle}}
          onClick={() => {
            $closeModal();
          }}
        >
          확인
        </Button>
      </Flex>
    </TypeModalWrapper>
  );
};

export default ThankYou;
