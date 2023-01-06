import React from "react";
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

const Header = () => {
  const iconSize = "4rem";
  return (
    <Grid>
      <Flex justify="space-between">
        <Img cursor='pointer' wd="20rem" src={mainLogo} />
        <Img type="icon" wd={iconSize} src={follows} />
      </Flex>

      <Flex>
        <Flex type="card" justify="flex-start" pd="0 0.5rem 0 2rem">
          <Input placeholder="검색" />
          <Img wd={iconSize} src={search} />
        </Flex>
      </Flex>

      <Flex justify="flex-end" gap="1.5rem">
        <Img type="icon" wd={iconSize} src={message} />
        <Img type="icon" wd={iconSize} src={notifications} />
        <Img type="icon" wd={iconSize} src={upload} />
        <Img type="icon" wd={iconSize} src={settings} />
        <Img type="icon" wd={iconSize} src={account} />
      </Flex>
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
