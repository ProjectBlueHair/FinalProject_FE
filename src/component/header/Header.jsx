import { useEffect, useRef, useState } from "react";
import Flex from "../elem/Flex";
import Img from "../elem/Img";
import {
  account,
  follows,
  mainLogo,
  message,
  notifications,
  search,
  settings,
  upload,
} from "../../asset/pic";
import styled from "styled-components";
import Input from "../elem/Input";
import useModal from "../modal/useModal";
import { useNavigate } from "react-router-dom";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { PATH } from "../../Router";
import { getCookies, removeCookies } from "../../dataManager/cookie";
import useToggleOutSideClick from "../../modal/hooks/useToggleOutSideClick";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  userSelector,
  __clearUser,
  __getGeneralUserInfo,
} from "../../redux/slice/userSlice";
import Span from "../elem/Span";
import Div from "../elem/Div";
import { instanceAxios, serverURL } from "../../dataManager/apiConfig";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { alarmSelector, __getAlarm } from "../../redux/slice/mainSlice";
import * as ssePolyfill from 'event-source-polyfill/src/eventsource.min.js';
const iconSize = "4rem";
const EventSource = EventSourcePolyfill || NativeEventSource;
global.EventSource = EventSourcePolyfill || NativeEventSource;
const Header = () => {
  const navigate = useNavigate();
  const Sign = useRef(null);
  // 토글창 상태관리
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 모달창(로그인)
  const onClickSignBtn = () => {
    openModal({ type: "signIn" });
    setIsOpen(false);
  };

  const onClickLogOut = () => {
    removeCookies("accesstoken", { path: "/" });
    removeCookies("refreshtoken", { path: "/" });
    dispatch(__clearUser());
    setIsOpen(false);
    navigate("/");
  };

  useToggleOutSideClick(Sign, setIsOpen);

  const [isClicked, setIsClicked] = useState({ alarm: false });
  const { $openModal, $closeModal } = useTypeModal();
  const dispatch = useAppDispatch();
  const RefreshToken = getCookies("refreshtoken");
  const AccessToken = getCookies("accesstoken");
  const user = useAppSelector(userSelector);
  const alarmCount = useAppSelector(alarmSelector);

  const listenAlarm = () => {
    let eventSource = new ssePolyfill.EventSourcePolyfill(`${serverURL}/subscribe`, {
      headers: {
        AccessToken: AccessToken,
        RefreshToken: RefreshToken,
      },
      withCredentials:true
      // heartbeatTimeout: 3600 * 1000, // 1시간
    });
    console.log("credentials", eventSource.withCredentials);
    eventSource.onopen = () => {
      console.log("open connection");
    };
    eventSource.onmessage = (event) => {
      console.log("EVENT DATA", JSON.parse(event.data));
      dispatch(__getAlarm());
    };
    eventSource.onerror = (e) => {
      eventSource.close();
    };
  };
  useEffect(() => {
    if (AccessToken && user.nickname) listenAlarm();
    if (!AccessToken && user.nickname) dispatch(__clearUser());
    if (AccessToken && !user.nickname) dispatch(__getGeneralUserInfo());
  }, [user.nickname, AccessToken]);

  const onClickSetPage = () => {
    navigate("/setpage");
  };

  const onClickMypage = () => {
    navigate(`/mypage/${user.nickname}`);
  };
  return (
    <Grid>
      <Flex justify="space-between">
        <Img
          onClick={() => navigate(PATH.main)}
          cursor="pointer"
          wd="20rem"
          src={mainLogo}
        />
        <Img
          onClick={() => {
            $openModal({
              type: "alert",
              props: {
                message: "해당 기능은 곧 준비될 예정입니다 !",
                type: "confirm",
              },
            });
          }}
          type="icon"
          wd={iconSize}
          src={follows}
        />
      </Flex>

      <Flex>
        <Flex
          type="card"
          shadow="none"
          justify="flex-start"
          pd="0 0.5rem 0 2rem"
        >
          <Input placeholder="검색" />
          <Img wd={iconSize} src={search} />
        </Flex>
      </Flex>

      <Flex justify="flex-end" gap="1.5rem">
        <Img
          onClick={() => {
            navigate(PATH.chat);
          }}
          type="icon"
          wd={iconSize}
          src={message}
        />
        <Flex direction="row" wd="none">
          <Img
            onClick={() => {
              !isClicked.alarm ? $openModal({ type: "alarm" }) : $closeModal();
              setIsClicked({ ...isClicked, alarm: !isClicked.alarm });
            }}
            type="icon"
            wd={iconSize}
            src={notifications}
          />
          {/* <AlarmCount>4</AlarmCount> */}
          {alarmCount ? <AlarmCount>{alarmCount}</AlarmCount> : null}
        </Flex>
        <Img
          onClick={() => navigate("/post")}
          type="icon"
          wd={iconSize}
          src={upload}
        />
        <Img
          onClick={() => {
            $openModal({
              type: "alert",
              props: {
                message: "설정 기능은 곧 준비될 예정입니다 !",
                type: "confirm",
              },
            });
          }}
          type="icon"
          wd={iconSize}
          src={settings}
        />
        <div ref={Sign}>
          {user.profileImg ? (
            <Img
              cursor="pointer"
              onClick={() => toggleMenu()}
              type="shadowProfile"
              src={user.profileImg}
              hg="3.5rem"
            />
          ) : (
            <Img
              type="icon"
              wd={iconSize}
              src={account}
              onClick={() => toggleMenu()}
            />
          )}
          {user.nickname ? (
            <>
              {isOpen ? (
                <ToggleDiv>
                  <Span fc="var(--ec-main-color)" fw="700">
                    {user.nickname}
                  </Span>
                  <button onClick={onClickLogOut}>로그아웃</button>
                  <button onClick={onClickMypage}>마이페이지</button>
                  <button onClick={onClickSetPage}>계정설정</button>
                </ToggleDiv>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {isOpen ? (
                <ToggleDiv2>
                  <button onClick={onClickSignBtn}>로그인</button>
                </ToggleDiv2>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </Flex>
    </Grid>
  );
};

export default Header;
const Grid = styled.div`
  padding: 1.5rem 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;
const AlarmCount = styled.div`
  position: absolute;
  top: 20px;
  right: 193px;
  border-radius: 20px;
  color: white;
  padding: 0.3rem 0.7rem;
  background-color: ${(props) => props.theme.color.main};
  font-size: 1.1rem;
`;

const ToggleDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 120px;
  margin-top: 25px;
  margin-right: 75px;
  background-color: white;
  border: 2px solid #ff4d00;
  border-radius: 10px;
  z-index: 1;
  padding: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  animation: toggleDiv;
  animation-duration: 0.5s;
  button {
    margin-top: 10px;
    background-color: white;
    border: white;
    font-size: 15px;
    :hover {
      border-bottom: 1px solid #ff4d00;
    }
  }
  @keyframes toggleDiv {
    0% {
      transform: scaleY(0.1);
      transform-origin: 100% 0%;
    }
    100% {
      transform: scaleY(1);
      transform-origin: 100% 0%;
    }
  }
`;

const ToggleDiv2 = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 50px;
  margin-top: 25px;
  margin-right: 80px;
  background-color: white;
  border: 2px solid #ff4d00;
  border-radius: 10px;
  z-index: 1;
  padding: 5px 10px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  animation: toggleDiv2;
  animation-duration: 0.5s;
  button {
    margin-top: 10px;
    background-color: white;
    border: white;
    font-size: 15px;
    :hover {
      border-bottom: 1px solid #ff4d00;
    }
  }
  @keyframes toggleDiv2 {
    0% {
      transform: scaleY(0.1);
      transform-origin: 100% 0%;
    }
    100% {
      transform: scaleY(1);
      transform-origin: 100% 0%;
    }
  }
`;
