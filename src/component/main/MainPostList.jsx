import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MainPost from "./MainPost";
import useFetch from "../../dataManager/useFetch";
const MainPostList = () => {
  const target = useRef(null);
  const scrollArea = useRef(null);
  const [pageNum, setPageNum] = useState(0);
  const { list, hasMore, isLoading, isLastPage } = useFetch(pageNum);
  console.log('list',list.length,'hasMore',hasMore,'isLoading',isLoading)
  let options = {
    root: scrollArea.current,
    rootMargin: "20px",
    threshold: 1,
  };
  const callback = (entries, io) => {
    entries.forEach((entry) => {
      console.log("entry target isinersecting",entry.isIntersecting);
      console.log("entry hasmore",hasMore);
      console.log("entry isLoading",isLoading);
      console.log("entry.isIntersecting && isLoading===false",entry.isIntersecting && isLoading===false);

      if (entry.isIntersecting) {
        // io.unobserve(entry.target);
        console.log('NEXT PAGE REQUEST', pageNum+1)
        setPageNum((page) => page + 1);
      }
    });
    // if (isLastPage) io.unobserve(target);
  };

  useEffect(() => {
    console.log('MAIN MOUNT')
    const io = new IntersectionObserver(callback, options);
    io.observe(target.current);
  }, []);

  useEffect(() => {}, []);
  return (
    <ScrollContainer ref={scrollArea}>
      <PostListContainer>
        {list?.map((post) => (
          <MainPost key={post.id} post={post} />
        ))}
        <div ref={target} />
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
