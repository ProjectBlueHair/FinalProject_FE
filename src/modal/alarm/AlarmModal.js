import React from "react";
import TypeModalWrapper from "../TypeModalWrapper";
import TextButton from "../../component/elem/TextButton";
import Flex, { StFlex } from "../../component/elem/Flex";
import styled from "styled-components";
import AlarmDot from "../../asset/icon/AlarmDot";
import Span from "../../component/elem/Span";
import Img from "../../component/elem/Img";
import { arrowRight } from "../../asset/pic";
function AlarmModal() {
  const alarmGap = "0.7rem";
  const alarmObj = {
    content: "this is test",
    createdAt: "2020-11-01",
    isRead: true,
    url: "urlpath",
    postImg: "",
  };
  const arr = new Array(20).fill(alarmObj);

  //content
  // profileImg : nickname, follower?
  //date

  // arrow button

  // 알림 더 보기 with top border

  return (
    <TypeModalWrapper type="alarm">
      <AlarmContainer hg="100%" direction="column">
        {arr.map((obj, index) => (
          <Flex key={index} direction="column">
            <Flex direction="column" cursor="pointer" gap={alarmGap}>
              <Flex justify="flex-start" gap={alarmGap}>
                <AlarmDot />{" "}
                <Span fw="400" fs="1.4rem">
                  콜라보 요청이 들어왔어요
                </Span>
              </Flex>
              <Flex justify="flex-start" gap={alarmGap}>
                <Img
                  wd="5rem"
                  hg="5rem"
                  radius="10px"
                  src="/testRandomPost/2.jpg"
                />
                <Flex
                  direction="column"
                  wd="none"
                  flex="1"
                  align="flex-start"
                  gap={alarmGap}
                >
                  <Span fs="1.4rem">name</Span>
                  <Span fs="1.2rem">like</Span>
                </Flex>
                <Img mg={"0 2rem 0 0"} wd="3.5rem" src={arrowRight} />
              </Flex>
              <Flex justify="flex-start">
                <Span fc={"var(--ec-secondary-text)"}>Nov.12.2020</Span>
              </Flex>
            </Flex>
            <Flex hg="0" mg="1rem 0" border="0.3px solid var(--ec-secondary-text)"></Flex>
          </Flex>
        ))}
      </AlarmContainer>
    </TypeModalWrapper>
  );
}

export default AlarmModal;
const AlarmContainer = styled(StFlex)`
  direction: column;
  padding: 2rem;
  /* height: 100%; */
  flex: 1;
  overflow-y: scroll;
  justify-content: flex-start;
`;
