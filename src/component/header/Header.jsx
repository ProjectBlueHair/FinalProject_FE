import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  follows,
  mainLogo,
  message,
  notifications,
  searchMain,
  upload,
} from "../../asset/pic";
import { serverURL } from "../../dataManager/apiConfig";
import { getCookies, removeCookies } from "../../dataManager/cookie";
import useToggleOutSideClick from "../../modal/hooks/useToggleOutSideClick";
import useTypeModal from "../../modal/hooks/useTypeModal";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import {
  alarmSelector,
  searchSelector,
  __clearAlarmCount,
  __getAlarm,
  __typeSearch,
} from "../../redux/slice/mainSlice";
import { typeModalSelector } from "../../modal/typeModalSlice";
import {
  userSelector,
  __clearUser,
  __getGeneralUserInfo,
} from "../../redux/slice/userSlice";
import { PATH } from "../../Router";
import theme from "../../styles/theme";
import Button from "../elem/Button";
import Flex from "../elem/Flex";
import Img from "../elem/Img";
import Input, { StInput } from "../elem/Input";
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
  const searchObj = useAppSelector(searchSelector);
  const modalList = useSelector(typeModalSelector);
  const searchRef = useRef(null);

  const connectEvent = () => {
    let readyState = localStorage.getItem("readyState");
    if (readyState === null) readyState = 2;
    const isConnecting = Number(readyState) === 1 || Number(readyState) === 0;
    if (AccessToken && user.nickname && !isConnecting) {
      eventSource = new EventSource(`${serverURL}/subscribe/${user.nickname}`, {
        withCredentials: true,
        connection: "keep-alive",
      });
    }
    if (eventSource) {
      eventSource.onopen = () => {
        localStorage.setItem("readyState", eventSource.readyState);
      };
      eventSource.onmessage = (event) => {
        dispatch(__getAlarm());
      };
      eventSource.onerror = (e) => {
        eventSource.close();
        eventSource = new EventSource(
          `${serverURL}/subscribe/${user.nickname}`,
          {
            withCredentials: true,
            connection: "keep-alive",
          }
        );
        localStorage.setItem("readyState", eventSource.readyState);
      };
    }
  };
  useEffect(() => {
    if (!AccessToken && user.nickname) {
      batch(() => {
        dispatch(__clearUser());
        dispatch(__clearAlarmCount());
      });
    }
    if (AccessToken && !user.nickname) dispatch(__getGeneralUserInfo());
    connectEvent();
    return () => {
      eventSource?.close();
      localStorage.setItem("readyState", 2);
    };
  }, [user.nickname, AccessToken]);

  const onClickSetPage = () => {
    navigate("/setpage");
  };

  const onClickGuide = () => {
    // 가이드 페이지 이동
    window.open(
      "https://protective-whale-78f.notion.site/bb305c9f0a75495290c2ed47348aff6f"
    );
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

      <Flex data-name="searchElement">
        <Flex
          data-name="searchElement"
          type="card"
          shadow="none"
          justify="flex-start"
          hg="4rem"
          pd="0 0.5rem 0 2rem"
        >
          <SearchInput
            ref={searchRef}
            data-name="searchElement"
            value={searchObj.value}
            onChange={(e) => {
              dispatch(__typeSearch(e.target.value));
            }}
            onClick={() => {
              modalList.length === 0 && $openModal({ type: "search" });
            }}
            placeholder="검색"
          />
          {searchObj.value.length > 0 ? (
            <IoIosClose
              data-name="searchElement"
              cursor={"pointer"}
              onClick={() => {
                dispatch(__typeSearch(""));
                searchRef.current.focus();
              }}
              size={"4rem"}
              color={theme.color.main}
            />
          ) : (
            <Img data-name="searchElement" wd={iconSize} src={searchMain} />
          )}
        </Flex>
      </Flex>

      <Flex justify="flex-end" gap="1.5rem">
        <Button
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSelo9QpMlPgcwqvHt6TLrBuoOYcXMiv30ya5R7je1WCXFLz2A/viewform"
            )
          }
          style={{ cursor: "pointer", fontSize: "1.6rem" }}
          fw="700"
        >
          EVENT
        </Button>
        <Button
          onClick={onClickGuide}
          style={{ cursor: "pointer", fontSize: "1.6rem" }}
          fw="700"
        >
          GUIDE
        </Button>
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
              // dispatch(__openSearch)
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
            <Button
              onClick={onClickSignBtn}
              style={{ cursor: "pointer", fontSize: "1.6rem" }}
              fw="700"
              fc={theme.color.main}
            >
              LOGIN
            </Button>
          )}
          {user.nickname ? (
            <ToggleTotal>
              {isOpen ? (
                <ToggleDiv>
                  <Span
                    fc="var(--ec-main-color)"
                    fw="500"
                    style={{
                      wordBreak: "break-all",
                      width: "80%",
                      textAlign: "right",
                    }}
                  >
                    {user.nickname}
                  </Span>
                  <button onClick={onClickLogOut}>로그아웃</button>
                  <button onClick={onClickMypage}>마이페이지</button>
                  <button onClick={onClickSetPage}>계정설정</button>
                </ToggleDiv>
              ) : (
                ""
              )}
            </ToggleTotal>
          ) : (
            <div>
              {isOpen ? (
                <ToggleDiv2>
                  <button onClick={onClickSignBtn}>로그인</button>
                </ToggleDiv2>
              ) : (
                ""
              )}
            </div>
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
const SearchInput = styled(StInput)``;
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

const ToggleTotal = styled.div`
  position: relative;
`;

const ToggleDiv = styled.div`
  position: absolute;
  right: 110%;
  top: -30px;
  width: 100px;
  height: 150px;
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
    cursor: pointer;
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
  right: 5%;
  top: 4%;
  width: 100px;
  height: 50px;
  /* margin-top: 25px;
  margin-right: 80px; */
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
    cursor: pointer;
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
