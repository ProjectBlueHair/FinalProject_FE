import React from "react";
import Img from "../elem/Img";
import Flex from "../elem/Flex";
import { like, playButton, playButtonSecond, view } from "../../asset/pic";
import styled from "styled-components";
const MainPost = ({ post }) => {
  const profile_margin = "0 0 0 -1rem";

  return (
    // <GridWrapper>
    <Flex
      data-name="PostContainer"
      direction="column"
      align="flex-start"
      gap="1rem"
    >
      <Img hg="20rem" type="radius" src={post.postImg} />
      <Flex direction="row" justify="flex-start" gap="1rem">
        <Img type="icon" mg="1rem" wd="15%" src={playButtonSecond} />
        <Flex flex="1" direction="column" align="flex-start" gap="1rem">
          <div>{post.title}</div>
          <PostBottomContainer>
            <Flex align="center" justify="flex-start">
              {post.collabo.map((member, index) =>
                index <= 2 ? (
                  <Img
                    z={-index}
                    type="shadowProfile"
                    wd="3rem"
                    mg={index === 0 ? 0 : profile_margin}
                    src={member.profile}
                  />
                ) : index === post.collabo.length - 1 ? (
                  <ProfileCount>+{index - 2}</ProfileCount>
                ) : (
                  null
                )
              )}
            </Flex>
            <Flex justify="flex-start" gap="0.4rem">
              <Img wd="1.8rem" src={view} />
              <IconSpan>{post.view}</IconSpan>
            </Flex>
            <Flex justify="flex-start" gap="0.4rem">
              <Img type='iconSmall' wd="1.5rem" src={like} />
              <IconSpan>{post.like}</IconSpan>
            </Flex>
          </PostBottomContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MainPost;
const PostBottomContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.5rem;
`;
const ProfileCount = styled.div`
  width: ${({ wd }) => wd || "3rem"};
  height: ${({ hg }) => hg || "3rem"};
  box-shadow: ${({ shadow }) => shadow || "0px 2px 10px rgba(0, 0, 0, 0.26)"};
  border-radius: 50%;
  margin: ${({ mg }) => mg || "0 0 0 -1rem"};
  z-index: -3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: var(--ec-primary-text);
  font-size: 1rem;
  padding: 0 0.4rem 0 0;
  background-color: rgba(0, 0, 0, 0.1);
`;
const IconSpan = styled.span`
  color: var(--ec-secondary-text);
  font-size: 1rem;
`;
