import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AlarmDot from "../../asset/icon/AlarmDot";
import { arrowRight } from "../../asset/pic";
import Div from "../../component/elem/Div";
import Flex, { StFlex } from "../../component/elem/Flex";
import Img from "../../component/elem/Img";
import Span from "../../component/elem/Span";
import { apiClient } from "../../dataManager/interceptors";
import { useAppDispatch } from "../../redux/config";
import { __readAlarm } from "../../redux/slice/mainSlice";
import useTypeModal from "../hooks/useTypeModal";
import TypeModalWrapper from "../TypeModalWrapper";
import { ALERT_TYPE } from "./AlertModal";

interface Alarm {
  id: string;
  content: string;
  type: string;
  typeId: string | number;
  postId: string | number | null | undefined;
  sender: string;
  senderImg: string;
  isRead: boolean;
  createdAt: string;
}
const alarmGap = "0.7rem";

const AlarmModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [alarmState, setAlarmState] = useState<Alarm[]>([]);
  const { $closeModal, $openModal } = useTypeModal();

  useEffect(() => {
    apiClient
      .get("/notifications")
      .then(({ data }) => {
        setAlarmState(data.data);
      })
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
        {alarmState.length === 0 ? (
          <Div>전달된 알람이 없습니다.</Div>
        ) : (
          alarmState?.map((alarm, index) => (
            <Flex key={index} direction="column">
              <Flex
                onClick={() => {
                  //todo: 임시
                  $closeModal({ type: "alarm" });
                  dispatch(__readAlarm(alarm.id));
                  navigate(
                    `/${alarm.type}/${alarm.typeId}/${alarm.postId || ""}`
                  );
                }}
                direction="column"
                cursor="pointer"
                gap={alarmGap}
              >
                <Flex justify="flex-start" gap={alarmGap}>
                  {alarm.isRead ? null : <AlarmDot />}
                  <Span fw="400" fs="1.4rem">
                    {alarm.content}
                  </Span>
                </Flex>
                <Flex justify="flex-start" gap={alarmGap}>
                  <Img
                    wd="5rem"
                    hg="5rem"
                    radius="10px"
                    src={alarm.senderImg}
                  />
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
          ))
        )}
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
