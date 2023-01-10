import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import MainPost from "./MainPost";
import useFetch from "../../dataManager/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { __getPostList } from "../../redux/slice/mainSlice";
const MainPostList = () => {
  const target = useRef(null);
  const scrollArea = useRef(null);
  const [trigger, setTrigger] = useState(false);
  const dispatch = useDispatch();
  const { posts, nextPage, isLoading } = useSelector((state) => state.main);

  console.log(
    "LOG0 posts",
    posts,
    "LOG0 trigger",
    trigger,
    "LOG0 isLoading",
    isLoading,
    "LOG0 nextPage",
    nextPage
  );

  // const [pagingState, setPagingState] = useState({
  //   loading: isLoading,
  //   page: nextPage,
  // });

  // const callback = (entries, io) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting && !isLoading) {
  //       dispatch(__getPostList(nextPage));
  //     }
  //   });
  //   // if (isLastPage) io.unobserve(target);
  // };
  let options = {
    root: scrollArea.current,
    rootMargin: "20px",
    threshold: 1,
  };
  // useEffect(() => {
  // const io = new IntersectionObserver(callback, options);
  // console.log("LOG1 MAIN MOUNT");
  //   io.observe(target.current);
  //   // dispatch(__getPostList());
  // }, [target, posts, nextPage, isLoading, scrollArea, options]);

  useEffect(() => {
    console.log(
      "LOG3 triggered",
      trigger,
      "LOG3 triggered isLoading ? ",
      isLoading
    );
    if (!isLoading) {
      console.log("LOG4 dispatch ", nextPage);
      dispatch(__getPostList(nextPage));
      // setTrigger(false)
    }
  }, [trigger]);

  // const { list, hasMore, isLoading, isLastPage } = useFetch(pageNum);
  // console.log('list',list.length,'hasMore',hasMore,'isLoading',isLoading)

  const callback = (entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("LOG X intersecting");
        // io.unobserve(entry.target);
        // console.log("NEXT PAGE REQUEST", nextPage);
        // setPageNum((page) => page + 1);
        // dispatch(__getPostList(pagingState.page));
        setTrigger((prev) => !prev);
        // setTrigger(true)
      }
    });
    // if (isLastPage) io.unobserve(target);
  };

  useEffect(() => {
    const io = new IntersectionObserver(callback, options);
    console.log("LOG1 MAIN MOUNT");
    io.observe(target.current);
  }, []);
  return (
    <ScrollContainer ref={scrollArea}>
      <PostListContainer>
        {console.log("post length", posts.length)}
        {posts?.map((post) => (
          <MainPost key={post.id} post={post} />
        ))}
        <div name="target" ref={target} />
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
