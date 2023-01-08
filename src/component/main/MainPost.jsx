import React from "react";
import Img from "../elem/Img";
import Flex from "../elem/Flex";
import { like, playButton, view } from "../../asset/pic";
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
        <Img type="icon" mg="1rem" wd="15%" src={playButton} />
        <Flex flex="1" direction="column" align="flex-start" gap="1rem">
          <div>{post.title}</div>
          <PostBottomContainer>
            <Flex align="center" justify="flex-start">
              <Img
                z="3"
                type="shadowProfile"
                wd="3rem"
                src={post.collabo[0].profile}
              />
              <Img
                z="2"
                type="shadowProfile"
                wd="3rem"
                mg={profile_margin}
                src={post.collabo[1].profile}
              />
              <Img
                z="1"
                type="shadowProfile"
                wd="3rem"
                mg={profile_margin}
                src={post.collabo[2].profile}
              />
            </Flex>
            <Flex justify="flex-start" gap="0.5rem">
              <Img wd="1.8rem" src={view} />
              <span
                style={{ color: "var(--ec-secondary-text", fontSize: "1.2rem" }}
              >
                {post.view}
              </span>
            </Flex>
            <Flex justify="flex-start" gap="0.5rem">
              <Img wd="1.5rem" src={like} />
              <span
                style={{ color: "var(--ec-secondary-text", fontSize: "1.2rem" }}
              >
                {post.like}
              </span>
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
  grid-template-columns: 1.5fr 1fr 1fr;
`;
