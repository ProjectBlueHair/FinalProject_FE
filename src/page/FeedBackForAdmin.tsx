import { useEffect, useState } from "react";
import styled from "styled-components";
import Div from "../component/elem/Div";
import Flex, { StFlex } from "../component/elem/Flex";
import Header from "../component/header/Header";
import { apiClient } from "../dataManager/interceptors";
import theme from "../styles/theme";
interface FeedBack {
  contents: string;
  createdAt: string;
  nickname: string;
}
const getFeedbacks = () => {
  return apiClient.get(`bugreport`);
};

const FeedBackForAdmin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    getFeedbacks().then(({ data }) => {
      console.log("feedback data", data);
      setFeedbacks(data.data);
    });
  }, []);
  return (
    <Flex hg="100vh" direction="column">
      <Header />
      <Container>
        {feedbacks.map((feedback: FeedBack, index) => (
          <Flex key={index} justify="flex-start" gap="1rem">
            <Div fc={theme.color.rgbaText1}>{feedback.createdAt}</Div>
            <Div fs="1.6rem">{feedback.nickname}</Div>
            <Bubble isMine={index / 2 === 0}>{feedback.contents}</Bubble>
          </Flex> //others chat
        ))}
      </Container>
    </Flex>
  );
};

export default FeedBackForAdmin;
const Container = styled(StFlex)`
  overflow-y: hidden;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
  justify-content: flex-start;
  overflow-y: scroll;
  padding: 5rem 30rem;
`;
const Bubble = styled.div<{ isMine: boolean }>`
  background-color: ${(props) =>
    props.isMine
      ? props.theme.color.chatBubbleMine
      : props.theme.color.chatBubbleOther};
  padding: 1rem 2rem;
  word-break: break-all;
  border-radius: 20px;
  max-width: 55rem;
`;
