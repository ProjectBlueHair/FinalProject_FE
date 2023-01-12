import React, { useState } from "react";
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

const Header = () => {
  const iconSize = "4rem";
  // 토글창 상태관리
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // 모달창(로그인)
  const onClickSignBtn = () => {
    openModal({ type: "signIn" });
  };
  return (
    <Grid>
      <Flex justify="space-between">
        <Img cursor="pointer" wd="20rem" src={mainLogo} />
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
        <Img type="icon" wd={iconSize} src={notifications} />
        <Img type="icon" wd={iconSize} src={upload} />
        <Img type="icon" wd={iconSize} src={settings} />
        <Img
          type="icon"
          wd={iconSize}
          src={account}
          onClick={() => toggleMenu()}
        />
      </Flex>
      {isOpen ? (
        <ToggleDiv>
          <button onClick={onClickSignBtn}>로그인</button>
          <button>마이페이지</button>
          <button>계정설정</button>
        </ToggleDiv>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default Header;
const Grid = styled.div`
  padding: 2rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

const ToggleDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 110px;
  height: 120px;
  margin-top: 25px;
  margin-right: 65px;
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
