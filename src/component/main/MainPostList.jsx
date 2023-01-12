import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MainPost from "./MainPost";
import { useDispatch, useSelector } from "react-redux";
import { __getPostList } from "../../redux/slice/mainSlice";
const MainPostList = () => {
  const target = useRef(null);
  const scrollArea = useRef(null);
  const [trigger, setTrigger] = useState(false);
  const dispatch = useDispatch();
  const { posts, nextPage, isLoading } = useSelector((state) => state.main);
  console.log('posts',posts)

  let options = {
    root: scrollArea.current,
    rootMargin: "20px",
    threshold: 1,
  };

  useEffect(() => {
    if (!isLoading) {
      console.log('dispatch')
      dispatch(__getPostList(nextPage));
    }
  }, [trigger]);

  const callback = (entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTrigger((prev) => !prev);
      }
    });
  };
  useEffect(() => {
    const io = new IntersectionObserver(callback, options);
    io.observe(target.current);
  }, []);
  
  return (
    <ScrollContainer ref={scrollArea}>
      <PostListContainer>
        {posts?.map((post) => (
          // <MainPost playingId={currentMusic.postId} isPlaying ={currentMusic.isPlaying} key={post.id} post={post} />
          <MainPost key={post.id} post={post} />
        ))}
        <div name="target" ref={target}></div>
      </PostListContainer>
      {isLoading && <Loading />}
    </ScrollContainer>
  );
};

export default MainPostList;
const PostListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
`;
const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow-y: scroll;
  padding: 0 0 2rem;
`;

export const Loading = styled.div`
  margin: 2rem;
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--ec-main-color);
    border-color: var(--ec-main-color) transparent var(--ec-main-color)
      transparent;
    animation: lds-dual-ring 0.6s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
