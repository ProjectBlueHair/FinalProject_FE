import React from "react";
import Img from "../elem/Img";
import Flex from "../elem/Flex";
import {
  like,
  pause,
  playButton,
  playButtonSecond,
  view,
} from "../../asset/pic";
import styled from "styled-components";
import StLink from "../elem/Link";
import { CiPause1 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { __togglePlay } from "../../redux/slice/mainSlice";
const MainPost = ({ post, playingId, isPlaying }) => {
  const profile_margin = "0 0 0 -1rem";
  const dispatch = useDispatch();
  const currentMusic = useSelector((state) => state.main.currentMusic);
  console.log("currentMusic.post.postId", currentMusic.post.postId);
  console.log("post.postId", post.postId);
  console.log("currentMusic.isPlaying", currentMusic.isPlaying);

  return (
    // <GridWrapper>
    <Flex
      data-name="PostContainer"
      direction="column"
      justify="flex-start"
      align="flex-start"
      gap="1.5rem"
    >
      <Img hg="20rem" type="radius" src={post.postImg} />
      {/* play box */}
      <Flex direction="row" justify="flex-start" gap="1rem" pd="0 1rem">
        <Img
          onClick={() => dispatch(__togglePlay(post.postId))}
          type="icon"
          wd="15%"
          // src={
          //   playingId === post.postId ? isPlaying
          //     ? pause
          //     : playButtonSecond : playButtonSecond
          // }
          src={
            currentMusic.post.postId === post.postId
              ? currentMusic.isPlaying
                ? pause
                : playButtonSecond
              : playButtonSecond
          }
        />

        <Flex flex="1" direction="column" align="flex-start" gap="1rem">
          <div>{post.title}</div>
          {/* grid */}
          <PostBottomContainer>
            <Flex align="center" justify="flex-start">
              {post.collabo.map((member, index) =>
                index <= 2 ? (
                  <Img
                    key={index}
                    z={-index}
                    type="shadowProfile"
                    wd="3rem"
                    mg={index === 0 ? 0 : profile_margin}
                    src={member.profile}
                  />
                ) : index === post.collabo.length - 1 ? (
                  <ProfileCount key={index}>+{index - 2}</ProfileCount>
                ) : null
              )}
            </Flex>
            <Flex justify="flex-start" gap="0.4rem">
              <Img wd="1.8rem" src={view} />
              <IconSpan>{post.view}</IconSpan>
            </Flex>
            <Flex justify="flex-start" gap="0.4rem">
              <Img type="iconSmall" wd="1.5rem" src={like} />
              <IconSpan>{post.like}</IconSpan>
            </Flex>
          </PostBottomContainer>
        </Flex>
      </Flex>
      {/* tag list */}
      <Flex
        flexWrap="wrap"
        justify="flex-start"
        align="center"
        gap="0.5rem"
        pd="0 1rem"
      >
        {post.tags.map((tag, index) => (
          // console.log(tag)
          <StLink key={index} to={`/tag/${tag}`}>
            <TagCard># {tag}</TagCard>
          </StLink>
        ))}
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
const TagCard = styled.div`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid var(--ec-secondary-text);
  color: var(--ec-primary-text);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
