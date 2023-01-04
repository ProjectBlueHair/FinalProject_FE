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
          <Img wd="20rem" src={mainLogo} />
          <Img wd={iconSize} src={follows} />
        </Flex>

        <Flex>
          <Flex type="card" justify="flex-start" pd="0 0.5rem 0 2rem">
            <Input placeholder="검색" />
            <Img wd={iconSize} src={search} />
          </Flex>
        </Flex>
        
        <Flex justify="flex-end" gap="1.5rem">
          <Img wd={iconSize} src={message} />
          <Img wd={iconSize} src={notifications} />
          <Img wd={iconSize} src={upload} />
          <Img wd={iconSize} src={settings} />
          <Img wd={iconSize} src={account} />
        </Flex>
      </Grid>
  );
};

export default Header;
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;
