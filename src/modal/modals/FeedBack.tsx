import React from "react";
import { mainLogo } from "../../asset/pic";
import Button from "../../component/elem/Button";
import Div from "../../component/elem/Div";
import Flex from "../../component/elem/Flex";
import Img from "../../component/elem/Img";
import Span from "../../component/elem/Span";
import TextArea from "../../component/elem/Textarea";
import { formStyle } from "../../component/posting/PostingForm";
import { instanceAxios } from "../../dataManager/apiConfig";
import useTextArea from "../../hook/useTextArea";
import theme from "../../styles/theme";
import useTypeModal from "../hooks/useTypeModal";
import TypeModalWrapper from "../TypeModalWrapper";
const postFeedback = (feedback: Object) => {
  return instanceAxios.post(`/bugreport`, feedback);
};
const FeedBack = () => {
  const feedbackInput = useTextArea("");
  const { $openModal, $closeModal } = useTypeModal();
  return (
    <TypeModalWrapper type={"feedback"}>
      <Flex direction="column" hg="100%" pd="5rem 2rem">
        <Img cursor="pointer" mg={"4rem 0"} wd="25rem" src={mainLogo} />
        <Flex
          direction="column"
          align="flex-start"
          style={{ ...formStyle, height: "23rem" }}
        >
          <Div pd="1rem 0" fc={theme.color.main}>
            자유롭게 피드백을 남겨주세요 :)
          </Div>
          <TextArea hg="100%" bg="transparent" {...feedbackInput} />
        </Flex>
        <Flex justify="flex-end" pd="0 1rem" mg="2rem 0">
          <Button
            btnType="basic"
            disabled={feedbackInput.value.length === 0}
            onClick={() => {
              $closeModal();
              postFeedback({ contents: feedbackInput.value }).then((data) => {
                console.log("fedback .. response",data);
                $openModal({ type: "thank", props: {} });
              });
            }}
          >
            피드백 보내기
          </Button>
        </Flex>
      </Flex>
    </TypeModalWrapper>
  );
};

export default FeedBack;
