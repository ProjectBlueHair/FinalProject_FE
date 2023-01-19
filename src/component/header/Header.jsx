import React, { useRef, useState } from "react";
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
import AlarmDot from "../../asset/icon/AlarmDot";
import { PATH } from "../../Router";
import { getCookies, removeCookies } from "../../dataManager/cookie";
import useToggleOutSideClick from "../../modal/hooks/useToggleOutSideClick";

const Header = () => {
  const navigate = useNavigate();
  const iconSize = "4rem";
  const Sign = useRef(null);
  // 토글창 상태관리
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const { $openModal, $closeModal } = useTypeModal();
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
    setIsOpen(false);
    navigate("/");
  };
  const acToken = getCookies("accesstoken");
  useToggleOutSideClick(Sign, setIsOpen);
  const [isClicked, setIsClicked] = useState({ alarm: false });

  return (
    <Grid>
      <Flex justify="space-between">
        <Img
          onClick={() => navigate(PATH.main)}
          cursor="pointer"
          wd="20rem"
          src={mainLogo}
        />
        <Img type="icon" wd={iconSize} src={follows} />
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
        <Img type="icon" wd={iconSize} src={message} />
        <Flex direction="row" wd="none">
          <Img
            onClick={() => {
              !isClicked.alarm
                ? $openModal({ type: "alarm" })
                : $closeModal({ type: "alarm" });
              setIsClicked({ ...isClicked, alarm: !isClicked.alarm });
            }}
            type="icon"
            wd={iconSize}
            src={notifications}
          />
          <AlarmDot mg="-2rem 0 0 -1.5rem" />
        </Flex>
        <Img
          onClick={() => navigate("/post")}
          type="icon"
          wd={iconSize}
          src={upload}
        />
        <Img type="icon" wd={iconSize} src={settings} />
        <Img
          type="icon"
          wd={iconSize}
          src={account}
          onClick={() => toggleMenu()}
        />
      </Flex>
      {acToken ? (
        <>
          {isOpen ? (
            <ToggleDiv ref={Sign}>
              <button onClick={onClickLogOut}>로그아웃</button>
              <button>마이페이지</button>
              <button>계정설정</button>
            </ToggleDiv>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          {isOpen ? (
            <ToggleDiv2 ref={Sign}>
              <button onClick={onClickSignBtn}>로그인</button>
            </ToggleDiv2>
          ) : (
            ""
          )}
        </>
      )}
    </Grid>
  );
};

export default Header;
const Grid = styled.div`
  padding: 2rem 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

const ToggleDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 120px;
  margin-top: 25px;
  margin-right: 80px;
  background-color: white;
  border: 2px solid #ff4d00;
  border-radius: 10px;
  z-index: 1;
  padding: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  button {
    margin-top: 10px;
    background-color: white;
    border: white;
    font-size: 15px;
    :hover {
      border-bottom: 1px solid #ff4d00;
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
  button {
    margin-top: 10px;
    background-color: white;
    border: white;
    font-size: 15px;
    :hover {
      border-bottom: 1px solid #ff4d00;
    }
  }
`;
