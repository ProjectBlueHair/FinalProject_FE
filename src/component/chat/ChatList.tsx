import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStomp } from "../../hook/useStomp";
import { Chat } from "../../model/ChatModel";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { userSelector } from "../../redux/slice/userSlice";
import { PATH } from "../../Router";
import Div from "../elem/Div";
import Flex, { StFlex } from "../elem/Flex";
import Img, { ImgType } from "../elem/Img";
import {
  chatSelector,
  connectionSelector,
  currentRoomIdSelector,
  __clearChat,
  __getChat,
  __updateChat,
} from "../../redux/slice/chatSlice";
const ChatList = () => {
  const user = useAppSelector(userSelector);
  const currentRoomId = useAppSelector(currentRoomIdSelector);
  const connected = useAppSelector(connectionSelector);
  console.log("roomid ... ", currentRoomId);

  const dispatch = useAppDispatch();
  const { subscribe, unsubscribe, subscriptions } = useStomp();
  const chat = useAppSelector(chatSelector);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    connected &&
      currentRoomId &&
      subscribe(
        { path: "/topic/chat/room", roomId: currentRoomId },
        (body: Chat) => {
          console.log("subscribe callback ... body", body);
          dispatch(__updateChat(body));
        }
      );
    return () => {
      if (subscriptions["/topic/chat/room"]) {
        unsubscribe("/topic/chat/room");
      }
      if (chat.length > 0) {
        console.log("chatlist ... clear chat ... ");
        dispatch(__clearChat());
      }
    };
  }, [connected, currentRoomId]);

  useEffect(() => {
    dispatch(__getChat(currentRoomId));
  }, [currentRoomId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [chat]);

  return (
    <ChatContainer ref={scrollRef}>
      {chat.map((chatItem, index) =>
        user.nickname === chatItem.nickname ? (
          //my chat
          <Flex key={index} justify="flex-end" gap="1rem" align="flex-end">
            <Div>{chatItem.time}</Div>
            <Flex wd="none" direction="column" gap="1rem" align="flex-end">
              <ChatBubble key={index} isMine={true}>
                {chatItem.message}
              </ChatBubble>
            </Flex>
          </Flex>
        ) : (
          <Flex key={index} justify="flex-start" gap="1rem" align="flex-start">
            <Img
              onClick={() => {
                navigate(`${PATH.mypage}/${chatItem.nickname}`);
              }}
              wd="3rem"
              hg="3rem"
              type={ImgType.shadowProfile}
              src={chatItem.profileImg}
            />
            <Flex wd="none" direction="column" gap="1rem" align="flex-start">
              <ChatBubble key={index} isMine={false}>
                {chatItem.message}
              </ChatBubble>
            </Flex>
            <Flex wd="none" align="flex-end" hg="100%">
              {chatItem.time}
            </Flex>
          </Flex> //others chat
        )
      )}
    </ChatContainer>
  );
};

export default ChatList;
const ChatContainer = styled(StFlex)`
  overflow-y: hidden;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
  justify-content: flex-start;
  overflow-y: scroll;
  padding: 0 2rem 2rem;
`;

const ChatBubble = styled.div<{ isMine: boolean }>`
  background-color: ${(props) =>
    props.isMine
      ? props.theme.color.chatBubbleMine
      : props.theme.color.chatBubbleOther};
  padding: 1rem 2rem;
  word-break: break-all;
  border-radius: 20px;
  max-width: 55rem;
`;
