import React, { useEffect, useState } from "react";
import TypeModalWrapper from "../TypeModalWrapper";
import Flex, { StFlex } from "../../component/elem/Flex";
import styled from "styled-components";
import AlarmDot from "../../asset/icon/AlarmDot";
import Span from "../../component/elem/Span";
import Img from "../../component/elem/Img";
import { arrowRight } from "../../asset/pic";
import { instanceAxios } from "../../dataManager/apiConfig";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../Router";
import { url } from "inspector";
import useTypeModal from "../hooks/useTypeModal";

interface Alarm {
  content: string;
  type: string;
  typeId: string | number;
  postId: string | number | null | undefined;
  sender: string;
  senderImg: string;
  isRead: boolean;
  createdAt: string;
}
const AlarmModal = () => {
  const navigate = useNavigate();
  const alarmGap = "0.7rem";
  const alarmObj = {
    content: "this is test",
    createdAt: "2020-11-01",
    isRead: true,
    url: "urlpath",
    postImg: "",
  };
  const arr = new Array(20).fill(alarmObj);
  const getAlarm = () => {
    return instanceAxios.get("/notifications");
  };
  const [alarmState, setAlarmState] = useState<Alarm[]>([]);
  const { $closeModal, $openModal } = useTypeModal();
  console.log(alarmState);

  useEffect(() => {
    getAlarm()
      .then(({ data }) => setAlarmState(data.data))
      .catch((err) => {
        $closeModal();
        $openModal({
          type: "alert",
          props: { message: "" + err, type: "error" },
        });
      });
  }, []);

  return (
    <TypeModalWrapper type="alarm">
      <AlarmContainer hg="100%" direction="column">
        {alarmState?.map((alarm, index) => (
          <Flex key={index} direction="column">
            <Flex
              onClick={() => {
                //todo: 임시
                $closeModal({ type: "alarm" });
                navigate(
                  `/${alarm.type}/${alarm.typeId}/${alarm.postId || ""}`
                );
              }}
              direction="column"
              cursor="pointer"
              gap={alarmGap}
            >
              <Flex justify="flex-start" gap={alarmGap}>
                <AlarmDot />{" "}
                <Span fw="400" fs="1.4rem">
                  {alarm.content}
                </Span>
              </Flex>
              <Flex justify="flex-start" gap={alarmGap}>
                <Img wd="5rem" hg="5rem" radius="10px" src={alarm.senderImg} />
                <Flex
                  direction="column"
                  wd="none"
                  flex="1"
                  align="flex-start"
                  gap={alarmGap}
                >
                  <Span fs="1.4rem">{alarm.sender}</Span>
                  {/* <Span fs="1.2rem">like</Span> */}
                </Flex>
                <Img mg={"0 2rem 0 0"} wd="3.5rem" src={arrowRight} />
              </Flex>
              <Flex justify="flex-start">
                <Span fc={"var(--ec-secondary-text)"} fw="400" fs="1.2rem">
                  {alarm.createdAt}
                </Span>
              </Flex>
            </Flex>
            <Flex
              hg="0"
              mg="1rem 0"
              border="0.3px solid var(--ec-secondary-text)"
            ></Flex>
          </Flex>
        ))}
      </AlarmContainer>
    </TypeModalWrapper>
  );
};

export default AlarmModal;
const AlarmContainer = styled(StFlex)`
  direction: column;
  padding: 2rem;
  /* height: 100%; */
  flex: 1;
  overflow-y: scroll;
  justify-content: flex-start;
`;
const ItemContainer = styled(StFlex)<{ gap: string }>`
  direction: column;
  cursor: pointer;
  gap: ${({ gap }) => gap};
`;
