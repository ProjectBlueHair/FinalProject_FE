import { useEffect, useRef, useState } from "react";
import { batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  account,
  follows,
  mainLogo,
  message,
  notifications,
  search,
  upload,
} from "../../asset/pic";
import { serverURL } from "../../dataManager/apiConfig";
import { getCookies, removeCookies } from "../../dataManager/cookie";
import { useStomp } from "../../hook/useStomp";
import useToggleOutSideClick from "../../modal/hooks/useToggleOutSideClick";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  alarmSelector,
  __clearAlarmCount,
  __getAlarm,
} from "../../redux/slice/mainSlice";
import {
  userSelector,
  __clearUser,
  __getGeneralUserInfo,
} from "../../redux/slice/userSlice";
import { PATH } from "../../Router";
import theme from "../../styles/theme";
import Div from "../elem/Div";
import Flex from "../elem/Flex";
import Img from "../elem/Img";
import Input from "../elem/Input";
import Span from "../elem/Span";
import useModal from "../modal/useModal";
const iconSize = "4rem";
let eventSource = null;
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
    dispatch(__clearAlarmCount());
    setIsOpen(false);
    navigate("/");
  };

  useToggleOutSideClick(Sign, setIsOpen);

  const { $openModal, $closeModal } = useTypeModal();
  const dispatch = useAppDispatch();
  const AccessToken = getCookies("accesstoken");
  const user = useAppSelector(userSelector);
  const alarmCount = useAppSelector(alarmSelector);

  useEffect(() => {
    if (!AccessToken && user.nickname) {
      batch(() => {
        dispatch(__clearUser());
        dispatch(__clearAlarmCount())
      });
    }
    if (AccessToken && !user.nickname) dispatch(__getGeneralUserInfo());
    console.log("access ... ", AccessToken);
    // if (AccessToken === undefined) onClickLogOut();
    let readyState = localStorage.getItem("readyState");
    if (readyState === null) readyState = 2;
    const isConnecting = Number(readyState) === 1 || Number(readyState) === 0;

    console.log(
      "AccessToken && user.nickname && !isConnecting",
      AccessToken && user.nickname && !isConnecting
    );
    if (AccessToken && user.nickname && !isConnecting) {
      eventSource = new EventSource(`${serverURL}/subscribe/${user.nickname}`, {
        withCredentials: true,
        connection: "keep-alive",
      });
    }
    if (eventSource) {
      eventSource.onopen = () => {
        console.log("on open ... ready state", eventSource.readyState);
        localStorage.setItem("readyState", eventSource.readyState);
      };
      eventSource.onmessage = (event) => {
        dispatch(__getAlarm());
      };
      eventSource.onerror = (e) => {
        eventSource.close();
        console.log("on error ... error message", e);
        console.log("on error ... readystate", eventSource.readyState);
        eventSource = new EventSource(
          `${serverURL}/subscribe/${user.nickname}`,
          {
            withCredentials: true,
            connection: "keep-alive",
          }
        );
        console.log(
          "on error ... after reconnect readystate",
          eventSource.readyState
        );
        localStorage.setItem("readyState", eventSource.readyState);
      };
    }
    return () => {
      console.log("unmounting ... eventsource : ", eventSource);
      eventSource?.close();
      console.log("unmounting ... readystate", eventSource?.readyState);
      localStorage.setItem("readyState", 2);
    };
  }, [user.nickname, AccessToken]);

  const onClickSetPage = () => {
    navigate("/setpage");
  };

  const onClickMypage = () => {
    navigate(`/mypage/${user.nickname}`);
    window.location.reload();
  };
  return (
    <Grid>
      <Flex justify="space-between">
        <Img
          onClick={() => navigate(PATH.main)}
          cursor="pointer"
          wd="18rem"
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
              $openModal({ type: "alarm" });
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
            <Div
              onClick={onClickSignBtn}
              style={{ cursor: "pointer" }}
              fs="1.6rem"
              fw="700"
              fc={theme.color.main}
            >
              Login
            </Div>

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
  padding: 1.3rem 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;
const AlarmCount = styled.div`
  position: fixed;
  top: 1.4rem;
  right: 12.8rem;
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
  z-index: 1000;
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
  z-index: 1000;
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
