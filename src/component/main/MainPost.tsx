import React from "react";
import Img from "../elem/Img";
import Flex from "../elem/Flex";
import {
  fillHeart,
  like,
  pause,
  playButtonSecond,
  view,
} from "../../asset/pic";
import styled from "styled-components";
import StLink from "../elem/Link";
import {
  __playDifferentSrc,
  __MainTogglePlay,
  __mainPostLike,
} from "../../redux/slice/mainSlice";
import { CurrentMusic, Post } from "../../model/PostModel";
import { useAppDispatch, useAppSelector } from "../../redux/config";
import { useNavigate } from "react-router-dom";
const MainPost: React.FC<{ post: Post; index: number }> = (props) => {
  const profile_margin = "0 0 0 -1rem";
  const dispatch = useAppDispatch();
  const currentMusic = useAppSelector<CurrentMusic>(
    (state) => state.main.currentMusic
  );
  const onClickPlayHandler = () => {
    currentMusic.post.id === props.post.id
      ? dispatch(__MainTogglePlay(!currentMusic.isPlayingPlayer))
      : dispatch(__playDifferentSrc(props.post.id));
  };
  const navigate = useNavigate();
  return (
    // <GridWrapper>
    <Flex
      data-name="PostContainer"
      direction="column"
      justify="flex-start"
      align="flex-start"
      gap="1.5rem"
    >
      <Img
        onClick={() => navigate(`/detail/${props.post.id}`)}
        hg="20rem"
        type="radius"
        src={props.post?.postImg}
      />
      {/* play box */}
      <Flex direction="row" justify="flex-start" gap="1rem" pd="0 1rem">
        <Img
          onClick={onClickPlayHandler}
          type="icon"
          wd="15%"
          src={
            currentMusic.post.id === props.post.id
              ? currentMusic.isPlayingPlayer
                ? pause
                : playButtonSecond
              : playButtonSecond
          }
        />

        <Flex flex="1" direction="column" align="flex-start" gap="1rem">
          <div>{props.post.title}</div>
          {/* grid */}
          <PostBottomContainer>
            <Flex align="center" justify="flex-start">
              {props.post.mainProfileList?.map((member, index) =>
                index <= 2 ? (
                  <Img
                    key={index}
                    z={-index}
                    type="shadowProfile"
                    wd="3rem"
                    mg={index === 0 ? 0 : profile_margin}
                    src={member.profileImg}
                  />
                ) : index === props.post.mainProfileList.length - 1 ? (
                  <Img type="profileCount" key={index}>
                    +{index - 2}
                  </Img>
                ) : null
              )}
            </Flex>
            <Flex justify="flex-start" gap="0.4rem">
              <Img wd="1.8rem" src={view} />
              <IconSpan>{props.post.viewCount}</IconSpan>
            </Flex>
            <Flex justify="flex-start" gap="0.4rem">
              <Img
                onClick={() =>
                  dispatch(
                    __mainPostLike({
                      postId: props.post.id,
                      index: props.index,
                    })
                  )
                }
                type="iconSmall"
                wd="1.5rem"
                src={props.post.isLiked ? fillHeart : like}
              />
              <IconSpan>{props.post.likeCount}</IconSpan>
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
        {props.post.tagList?.map((tag, index) => (
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
